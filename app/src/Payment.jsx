
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import PageHeading from "./components/PageHeading";
import { useDemo } from "./demo/DemoContext";
import { dateOffset, displayDate, money, plans } from "./demo/booking";

export default function Payment() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { addBooking } = useDemo();

    const [accepted, setAccepted] = useState(false);
    const [busy, setBusy] = useState(false);
    const [message, setMessage] = useState("");

    // LIVE RESERVATION
    const live = state?.live === true;

    async function handleLivePayment(event) {
        event.preventDefault();

        if (!accepted || busy) return;

        setBusy(true);
        setMessage("");

        try {
            const response = await fetch(
                "http://localhost:5000/api/payments/create-checkout-session",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        amount: state.amount,
                        reservationId: state.bookingId,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Unable to start payment.");
            }

            // Redirect guest to Stripe Checkout
            window.location.href = data.url;

        } catch (error) {
            setMessage(error.message);
            setBusy(false);
        }
    }

    // DEMO RESERVATION
    function handleDemoPayment(event) {
        event.preventDefault();

        if (!accepted) return;

        const id = addBooking({
            ...booking,
            paid: prepaid ? booking.total : 0,
            paidOn: prepaid ? dateOffset() : null,
        });

        navigate(`/preview/guest/reservation?id=${id}&created=1`, {
            replace: true,
        });
    }

    // LIVE PAYMENT PAGE
    if (live) {
        return (
            <div className="page narrow">
                <PageHeading
                    eyebrow="One last step"
                    title="Complete your payment"
                />

                <article className="card card-body">
                    <h2>Ophelia's Oasis - Prepaid Reservation</h2>

                    <dl className="detail-list">
                        <div>
                            <dt>Arrival</dt>
                            <dd>{state.arrival}</dd>
                        </div>

                        <div>
                            <dt>Departure</dt>
                            <dd>{state.departure}</dd>
                        </div>

                        <div className="total">
                            <dt>Total payment · AUD</dt>
                            <dd>{money(state.amount)}</dd>
                        </div>
                    </dl>

                    <form onSubmit={handleLivePayment}>
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={accepted}
                                onChange={(event) =>
                                    setAccepted(event.target.checked)
                                }
                                required
                            />
                            <span>
                                I agree to the{" "}
                                <Link to="/policies">
                                    booking policies
                                </Link>.
                            </span>
                        </label>

                        <button disabled={!accepted || busy}>
                            {busy
                                ? "Redirecting to Stripe..."
                                : "Continue to payment"}
                        </button>

                        <p role="alert">{message}</p>
                    </form>
                </article>
            </div>
        );
    }

    // EXISTING DEMO PAYMENT PAGE
    if (!state?.demo || !state?.booking) {
        return (
            <div className="page narrow">
                <PageHeading title="Payment" />
                <p>
                    Choose your dates to review a stay.
                </p>
                <Link className="button" to="/reservation">
                    Back to reservations
                </Link>
            </div>
        );
    }

    const booking = state.booking;
    const prepaid = booking.plan === "prepaid";

    return (
        <div className="page narrow">
            <PageHeading eyebrow="One last look" title="Review your stay" />

            <p className="demo-notice">
                Demo only · No card details or real charges
            </p>

            <article className="card card-body">
                <h2>The Oasis Room</h2>

                <dl className="detail-list">
                    <div>
                        <dt>Guest</dt>
                        <dd>{booking.name}</dd>
                    </div>

                    <div>
                        <dt>Dates</dt>
                        <dd>
                            {displayDate(booking.arrival)} —{" "}
                            {displayDate(booking.departure)}
                        </dd>
                    </div>

                    <div>
                        <dt>Plan</dt>
                        <dd>{plans[booking.plan].name}</dd>
                    </div>

                    <div className="total">
                        <dt>Total · AUD</dt>
                        <dd>{money(booking.total)}</dd>
                    </div>
                </dl>

                <p>
                    {prepaid
                        ? "The demo will mark this stay as paid."
                        : "Payment due at check-out."}
                </p>

                <form onSubmit={handleDemoPayment}>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={accepted}
                            onChange={(event) =>
                                setAccepted(event.target.checked)
                            }
                            required
                        />
                        <span>
                            I agree to the{" "}
                            <Link to="/policies">booking policies</Link>.
                        </span>
                    </label>

                    <button disabled={!accepted}>
                        Confirm demo reservation
                    </button>
                </form>
            </article>
        </div>
    );
}
