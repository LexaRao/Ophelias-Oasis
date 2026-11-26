import { Link } from "react-router-dom";

export default function PaymentCancelled() {
    return (
        <div>
            <h1>Payment Cancelled</h1>

            <p>
                Your payment was not completed.
                You can return and try again.
            </p>

            <Link to="/reservation">Return to Reservations</Link>
        </div>
    );
}