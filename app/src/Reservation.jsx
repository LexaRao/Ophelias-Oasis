import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ReservationForm from "./components/ReservationForm";
import PageHeading from "./components/PageHeading";
import { liveBackend } from "./supabaseClient";
import { useDemo } from "./demo/DemoContext";
import {
  dateOffset,
  displayDate,
  money,
  plans,
  quoteStay,
} from "./demo/booking";

export default function Reservation() {
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const { rates, bookings, profile } = useDemo();
  const [arrival, setArrival] = useState(
    search.get("arrival") || dateOffset(7),
  );
  const [departure, setDeparture] = useState(
    search.get("departure") || dateOffset(10),
  );
  const [plan, setPlan] = useState(
    plans[search.get("plan")] ? search.get("plan") : "conventional",
  );
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const quote = quoteStay(arrival, departure, plan, rates, bookings);
  function review(event) {
    event.preventDefault();
    if (quote.error) return;
    navigate("/payment", {
      state: {
        demo: true,
        booking: {
          name: name.trim(),
          email,
          arrival,
          departure,
          plan,
          ...quote,
        },
      },
    });
  }
  return (
    <div className="page">
      <PageHeading
        eyebrow="Make time for a little quiet"
        title="Book your stay"
      />
      {liveBackend ? (
        <div className="card narrow">
          <ReservationForm />
        </div>
      ) : (
        <>
          <p className="demo-notice">
            <span className="status-dot" /> Demo booking · No payment or real
            reservation
          </p>
          <div className="booking-layout">
            <form className="booking-form" onSubmit={review}>
              <h2>
                01 <span>Your dates</span>
              </h2>
              <div className="form-row">
                <label>
                  Arrival
                  <input
                    type="date"
                    value={arrival}
                    min={dateOffset()}
                    onChange={(event) => setArrival(event.target.value)}
                    required
                  />
                </label>
                <label>
                  Departure
                  <input
                    type="date"
                    value={departure}
                    min={arrival ? dateOffset(1, arrival) : dateOffset(1)}
                    onChange={(event) => setDeparture(event.target.value)}
                    required
                  />
                </label>
              </div>
              <h2>
                02 <span>Your plan</span>
              </h2>
              <fieldset className="plan-options">
                <legend className="sr-only">Reservation plan</legend>
                {Object.entries(plans).map(([key, item]) => (
                  <label
                    className={
                      plan === key ? "plan-option selected" : "plan-option"
                    }
                    key={key}
                  >
                    <input
                      type="radio"
                      name="plan"
                      value={key}
                      checked={plan === key}
                      onChange={() => setPlan(key)}
                    />
                    <span>
                      <strong>{item.name}</strong>
                      <small>{item.detail}</small>
                    </span>
                    <span className="plan-saving">
                      {item.factor < 1
                        ? `−${Math.round((1 - item.factor) * 100)}%`
                        : "Standard"}
                    </span>
                  </label>
                ))}
              </fieldset>
              <h2>
                03 <span>Guest details</span>
              </h2>
              <div className="form-row">
                <label>
                  Full name
                  <input
                    value={name}
                    autoComplete="name"
                    onChange={(event) => setName(event.target.value)}
                    required
                    pattern=".*\S.*"
                  />
                </label>
                <label>
                  Email
                  <input
                    type="email"
                    value={email}
                    autoComplete="email"
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </label>
              </div>
              {quote.error && (
                <p className="form-message" role="alert">
                  {quote.error}
                </p>
              )}
              <button disabled={Boolean(quote.error)}>Review stay ↗</button>
            </form>
            <aside className="booking-summary card">
              <img src="/images/room.jpg" alt="The Oasis Room" />
              <div className="card-body">
                <p className="eyebrow">Your escape</p>
                <h2>The Oasis Room</h2>
                <p>One room · Desert view</p>
                {!quote.error && (
                  <>
                    <dl className="detail-list">
                      <div>
                        <dt>Arrival</dt>
                        <dd>{displayDate(arrival)}</dd>
                      </div>
                      <div>
                        <dt>Departure</dt>
                        <dd>{displayDate(departure)}</dd>
                      </div>
                      <div>
                        <dt>{quote.nights.length} nights</dt>
                        <dd>{plans[plan].name}</dd>
                      </div>
                      <div className="total">
                        <dt>Total · AUD</dt>
                        <dd>{money(quote.total)}</dd>
                      </div>
                    </dl>
                    <p className="small-note">
                      Sample rates. Room assigned on arrival.
                    </p>
                  </>
                )}
                <Link to="/policies">Booking policies ↗</Link>
              </div>
            </aside>
          </div>
        </>
      )}
    </div>
  );
}
