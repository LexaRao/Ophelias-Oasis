import express from "express";
import stripe from "../stripe.js";
import supabaseAdmin from "../supabaseAdmin.js";
import resend from "../resend.js";

const router = express.Router();
router.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    async (req, res) => {
        const signature = req.headers["stripe-signature"];

        let event;

        // Verify that the request genuinely came from Stripe
        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                signature,
                process.env.STRIPE_WEBHOOK_SECRET
            );
        } catch (error) {
            console.error("Webhook signature verification failed:", error.message);
            return res.status(400).send(`Webhook Error: ${error.message}`);
        }

        try {
            // Successful checkout
            if (
                event.type === "checkout.session.completed" ||
                event.type === "checkout.session.async_payment_succeeded"
            ) {
                const session = event.data.object;

                if (session.mode === "setup") {

                    const setupIntent = await stripe.setupIntents.retrieve(
                        session.setup_intent
                    );

                    if (setupIntent.status !== "succeeded") {
                        return res.json({ received: true });
                    }

                    const reservationId =
                        setupIntent.metadata.reservation_id;

                    if (
                        !reservationId ||
                        setupIntent.customer !== session.customer
                    ) {
                        throw new Error("Invalid reservation payment setup.");
                    }

                    const { data: booking, error } = await supabaseAdmin
                        .from("bookings")
                        .select("id, reservation_type, status")
                        .eq("id", reservationId)
                        .single();

                    if (error || !booking) {
                        throw new Error("Booking not found.");
                    }

                    if (!["conventional", "incentive"].includes(
                        booking.reservation_type
                    )) {
                        throw new Error("Invalid reservation type.");
                    }

                    if (booking.status === "pending") {

                        const { error: updateError } = await supabaseAdmin
                            .from("bookings")
                            .update({
                                status: "confirmed"
                            })
                            .eq("id", reservationId)
                            .eq("status", "pending");

                        if (updateError) {
                            throw updateError;
                        }
                    }

                    return res.json({ received: true });
                }


                // Only confirm bookings for payments actually received
                if (session.payment_status !== "paid") {
                    return res.json({ received: true });
                }

                const reservationId = session.metadata?.reservation_id;

                if (!reservationId) {
                    console.error("Missing reservation ID in Stripe metadata.");
                    return res.status(400).json({
                        error: "Missing reservation ID."
                    });
                }

                const { data, error } = await supabaseAdmin
                    .from("bookings")
                    .update({
                        status: "confirmed"
                    })
                    .eq("id", reservationId)
                    .select();

                if (error) {
                    console.error("Supabase booking update failed:", error);
                    return res.status(500).json({
                        error: "Failed to confirm reservation."
                    });
                }

                if (!data || data.length === 0) {
                    console.error("No booking found with ID:", reservationId);

                    return res.status(404).json({
                        error: "Booking not found."
                    });
                }
            }


            // Handle successful conventional and incentive departure payments.
            if (event.type === "payment_intent.succeeded") {

                const paymentIntent = event.data.object;

                // Only process departure payments.
                if (paymentIntent.metadata.payment_type === "departure") {

                    const reservationId =
                        paymentIntent.metadata.reservation_id;

                    const { data: booking, error } = await supabaseAdmin
                        .from("bookings")
                        .select("*")
                        .eq("id", reservationId)
                        .single();

                    if (error || !booking) {
                        throw new Error("Booking not found.");
                    }

                    if (!["conventional", "incentive"].includes(
                        booking.reservation_type
                    )) {
                        throw new Error("Invalid departure payment reservation type.");
                    }

                    // Find the guest's email.
                    const { data, error: userError } =
                        await supabaseAdmin.auth.admin.getUserById(
                            booking.user_id
                        );

                    if (userError || !data.user?.email) {
                        throw new Error("Guest email not found.");
                    }

                    // Send payment confirmation.
                    const { error: emailError } = await resend.emails.send({
                        from: process.env.EMAIL_FROM,
                        to: data.user.email,
                        subject: "Payment Confirmation - Ophelia's Oasis",

                        html: `
                <h1>Thank you for staying with us!</h1>

                <p>Your accommodation payment was successful.</p>

                <p>
                    <strong>Arrival:</strong>
                    ${booking.arrival_date}
                </p>

                <p>
                    <strong>Departure:</strong>
                    ${booking.departure_date}
                </p>

                <p>
                    <strong>Amount paid:</strong>
                    AUD $${(
                                paymentIntent.amount_received / 100
                            ).toFixed(2)}
                </p>

                <p>We hope you enjoyed your stay!</p>
            `
                    });

                    if (emailError) {
                        throw new Error(emailError.message);
                    }

                    // Remove the saved card after successful payment.
                    if (paymentIntent.payment_method) {

                        await stripe.paymentMethods.detach(
                            paymentIntent.payment_method
                        );
                    }

                    console.log(
                        `Departure payment completed: ${reservationId}`
                    );
                }
            }


            res.json({ received: true });

        } catch (error) {
            console.error("Webhook processing error:", error);

            res.status(500).json({
                error: "Webhook processing failed."
            });
        }
    }
);

router.post("/create-checkout-session", async (req, res) => {
    try {
        const { amount, reservationId } = req.body;

        if (!amount || !reservationId) {
            return res.status(400).json({
                error: "Missing payment information."
            });
        }

        const session = await stripe.checkout.sessions.create({
            mode: "payment",

            line_items: [
                {
                    price_data: {
                        currency: "aud",
                        product_data: {
                            name: "Ophelia's Oasis - Prepaid Reservation"
                        },
                        unit_amount: Math.round(amount * 100)
                    },
                    quantity: 1
                }
            ],

            metadata: {
                reservation_id: reservationId
            },

            success_url: "http://localhost:5173/payment-success",
            cancel_url: "http://localhost:5173/payment-cancelled"
        });

        res.json({
            url: session.url
        });

    } catch (error) {
        console.error("Stripe error:", error);

        res.status(500).json({
            error: "Unable to create checkout session."
        });
    }
});

router.post("/create-card-setup", async (req, res) => {
    try {
        const { reservationId } = req.body;

        const { data: booking, error } = await supabaseAdmin
            .from("bookings")
            .select("*")
            .eq("id", reservationId)
            .single();

        if (error || !booking) {
            return res.status(404).json({
                error: "Reservation not found."
            });
        }

        const token = req.headers.authorization?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                error: "Authentication required."
            });
        }

        const { data: authData, error: authError } =
            await supabaseAdmin.auth.getUser(token);

        if (authError || !authData.user) {
            return res.status(401).json({
                error: "Invalid session."
            });
        }

        if (booking.user_id !== authData.user.id) {
            return res.status(403).json({
                error: "You cannot access this reservation."
            });
        }

        if (!["conventional", "incentive"].includes(
            booking.reservation_type
        )) {
            return res.status(400).json({
                error: "Invalid reservation type."
            });
        }

        const { data, error: userError } =
            await supabaseAdmin.auth.admin.getUserById(
                booking.user_id
            );

        if (userError || !data.user?.email) {
            return res.status(400).json({
                error: "Guest email not found."
            });
        }

        // Create a Stripe customer specifically for this reservation.
        const customer = await stripe.customers.create({
            email: data.user.email,
            metadata: {
                reservation_id: booking.id
            }
        });

        const session = await stripe.checkout.sessions.create({
            mode: "setup",

            customer: customer.id,

            allowed_payment_method_types: ["card"],

            setup_intent_data: {
                metadata: {
                    reservation_id: booking.id
                }
            },

            success_url:
                `${process.env.FRONTEND_URL}/payment-success`,

            cancel_url:
                `${process.env.FRONTEND_URL}/payment-cancelled`
        });

        res.json({
            url: session.url
        });

    } catch (error) {
        console.error("Card setup error:", error);

        res.status(500).json({
            error: "Unable to collect card information."
        });
    }
});

export default router;