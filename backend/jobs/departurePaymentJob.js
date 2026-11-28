import cron from "node-cron";
import stripe from "../stripe.js";
import supabaseAdmin from "../supabaseAdmin.js";

export async function chargeDepartureReservations() {

    console.log("Checking departure payments...");

    // Use the hotel's local timezone.
    const today = new Intl.DateTimeFormat("en-CA", {
        timeZone: process.env.HOTEL_TIME_ZONE || "Australia/Adelaide"
    }).format(new Date());

    const { data: bookings, error } = await supabaseAdmin
        .from("bookings")
        .select("*")
        .in("reservation_type", [
            "conventional",
            "incentive"
        ])
        .eq("departure_date", today)
        .eq("status", "confirmed");

    if (error) {
        console.error("Failed to retrieve bookings:", error);
        return;
    }

    for (const booking of bookings ?? []) {

        try {

            // Find the Stripe customer using reservation metadata.
            const customers = await stripe.customers.search({
                query:
                    `metadata['reservation_id']:'${booking.id}'`
            });

            const customer = customers.data[0];

            if (!customer) {
                console.error(
                    "No Stripe customer found:",
                    booking.id
                );
                continue;
            }

            // Prevent charging the same reservation twice.
            if (customer.metadata.departure_paid === "true") {
                continue;
            }

            // Retrieve the saved card.
            const paymentMethods =
                await stripe.paymentMethods.list({
                    customer: customer.id,
                    type: "card"
                });

            if (!paymentMethods.data.length) {
                console.error(
                    "No saved card found:",
                    booking.id
                );
                continue;
            }

            const paymentMethod = paymentMethods.data[0];

            // Charge the guest.
            const paymentIntent =
                await stripe.paymentIntents.create({
                    amount: Math.round(
                        Number(booking.total_cost) * 100
                    ),

                    currency: "aud",

                    customer: customer.id,

                    payment_method: paymentMethod.id,

                    off_session: true,

                    confirm: true,

                    metadata: {
                        reservation_id: booking.id,
                        payment_type: "departure"
                    }
                }, {
                    idempotencyKey:
                        `departure-payment-${booking.id}`
                });

            if (paymentIntent.status !== "succeeded") {
                console.error(
                    "Payment not completed:",
                    booking.id
                );
                continue;
            }

            // Record payment completion in Stripe metadata.
            await stripe.customers.update(customer.id, {
                metadata: {
                    departure_paid: "true",
                    departure_payment_intent: paymentIntent.id
                }
            });

            console.log(
                `Successfully charged reservation ${booking.id}`
            );

        } catch (error) {

            console.error(
                `Payment failed for reservation ${booking.id}:`,
                error.message
            );

        }
    }
}

// Run every morning at 8 AM.
cron.schedule(
    "0 8 * * *",
    chargeDepartureReservations,
    {
        timezone: process.env.HOTEL_TIME_ZONE || "Australia/Adelaide"
    }
);