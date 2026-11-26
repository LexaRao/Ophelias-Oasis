import { Link } from "react-router-dom";

export default function PaymentSuccess() {
    return (
        <div>
            <h1>Thank you for your payment!</h1>
            <p>
                Your payment was submitted successfully.
                We are verifying your reservation.
            </p>

            <Link to="/">Return to Home</Link>
        </div>
    );
}