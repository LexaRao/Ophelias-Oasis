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
  if (!state?.demo || !state?.booking)
    return (
      <div className="page narrow">
        <PageHeading title="Payment" />
        <p>
          {state?.id
            ? "Online payment is not connected yet. Your booking has not been completed."
            : "Choose your dates to review a stay."}
        </p>
        <Link className="button" to="/reservation">
          Back to reservations
        </Link>
      </div>
    );
  const booking = state.booking;
  const prepaid = booking.plan === "prepaid";
  function confirm(event) {
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
  return (
    <div className="page narrow">
      <PageHeading eyebrow="One last look" title="Review your stay" />
      <p className="demo-notice">Demo only · No card details or real charges</p>
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
              {displayDate(booking.arrival)} — {displayDate(booking.departure)}
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
          <div>
            <dt>{prepaid ? "Sample payment today" : "Due today"}</dt>
            <dd>{money(prepaid ? booking.total : 0)}</dd>
          </div>
        </dl>
        <p>
          {booking.plan === "sixty_day"
            ? `Payment due by ${displayDate(dateOffset(-30, booking.arrival))}.`
            : prepaid
              ? "The demo will mark this stay as paid."
              : "Payment due at check-out. A card guarantee will be required for live bookings."}
        </p>
        <form onSubmit={confirm}>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(event) => setAccepted(event.target.checked)}
              required
            />
            <span>
              I agree to the <Link to="/policies">booking policies</Link>.
            </span>
          </label>
          <div className="button-row">
            <button disabled={!accepted}>Confirm demo reservation</button>
            <Link
              to={`/reservation?arrival=${booking.arrival}&departure=${booking.departure}&plan=${booking.plan}`}
            >
              Edit stay
            </Link>
          </div>
        </form>
      </article>
    </div>
  );
}
