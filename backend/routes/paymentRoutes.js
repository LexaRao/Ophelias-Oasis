import express from "express";
import stripe from "../stripe.js";
import supabaseAdmin from "../supabaseAdmin.js";

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

export default router;