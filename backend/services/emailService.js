import resend from "../resend.js";
import stripe from "../stripe.js";

export async function sendPaymentReminder(booking, email) {

    // Create a fresh Stripe Checkout session.
    const session = await stripe.checkout.sessions.create({
        mode: "payment",

        customer_email: email,

        line_items: [
            {
                price_data: {
                    currency: "aud",
                    product_data: {
                        name: "Ophelia's Oasis - 60 Day Reservation"
                    },
                    unit_amount: Math.round(
                        Number(booking.total_cost) * 100
                    )
                },
                quantity: 1
            }
        ],

        metadata: {
            reservation_id: booking.id
        },

        success_url:
            `${process.env.FRONTEND_URL}/payment-success`,

        cancel_url:
            `${process.env.FRONTEND_URL}/payment-cancelled`
    });

    // Send the Stripe link through Resend.
    const { data, error } = await resend.emails.send({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Payment Required - Ophelia's Oasis",

        html: `
            <h1>Ophelia's Oasis</h1>

            <h2>Your reservation payment is due</h2>

            <p>
                Your reservation is approaching its payment deadline.
            </p>

            <p>
                <strong>Arrival:</strong> ${booking.arrival_date}
            </p>

            <p>
                <strong>Departure:</strong> ${booking.departure_date}
            </p>

            <p>
                <strong>Total:</strong>
                AUD $${Number(booking.total_cost).toFixed(2)}
            </p>

            <p>
                Please complete payment within 15 days
                to avoid cancellation.
            </p>

            <a href="${session.url}">
                Pay for Your Reservation
            </a>
        `
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}