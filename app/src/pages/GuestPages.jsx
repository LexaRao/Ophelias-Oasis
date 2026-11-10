import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDemo } from "../demo/DemoContext";
import {
  dateOffset,
  displayDate,
  money,
  nightsBetween,
  plans,
  quoteStay,
} from "../demo/booking";
import PageHeading from "../components/PageHeading";
import Bill from "../components/Bill";

export function StayCard({ booking }) {
  return (
    <article className="stay-card card">
      <img src="/images/room.jpg" alt="The Oasis Room" />
      <div className="card-body">
        <div className="row-between">
          <p className="eyebrow">{booking.id}</p>
          <span className="badge">{booking.status}</span>
        </div>
        <h2>The Oasis Room</h2>
        <p>
          {displayDate(booking.arrival)} — {displayDate(booking.departure)}
        </p>
        <p>
          {booking.nights.length} nights · {plans[booking.plan].name}
        </p>
        <Link to={`/preview/guest/reservation?id=${booking.id}`}>
          View reservation ↗
        </Link>
      </div>
    </article>
  );
}
export function GuestOverview() {
  const { profile, bookings } = useDemo();
  const next = bookings
    .filter((b) => b.own && ["Confirmed", "Checked in"].includes(b.status))
    .sort((a, b) => a.arrival.localeCompare(b.arrival))[0];
  return (
    <div className="page">
      <PageHeading
        eyebrow="Your oasis awaits"
        title={`Welcome, ${profile.name.split(" ")[0]}.`}
      >
        <Link className="button" to="/reservation">
          Book a stay ↗
        </Link>
      </PageHeading>
      {next ? (
        <StayCard booking={next} />
      ) : (
        <div className="empty-state">
          <h2>Your next escape is waiting.</h2>
          <Link to="/reservation">Explore a stay ↗</Link>
        </div>
      )}
      <div className="quick-links">
        <Link to="/preview/guest/bills">
          <span>Payments & bills</span>↗
        </Link>
        <Link to="/preview/guest/profile">
          <span>Your details</span>↗
        </Link>
        <Link to="/about">
          <span>Plan your arrival</span>↗
        </Link>
      </div>
    </div>
  );
}
export function GuestReservations() {
  const { bookings } = useDemo();
  const [filter, setFilter] = useState("Upcoming");
  const own = bookings.filter(
    (b) =>
      b.own &&
      (filter === "Upcoming"
        ? ["Confirmed", "Checked in"].includes(b.status)
        : !["Confirmed", "Checked in"].includes(b.status)),
  );
  return (
    <div className="page">
      <PageHeading title="My reservations">
        <Link className="button" to="/reservation">
          New stay ↗
        </Link>
      </PageHeading>
      <div className="segmented">
        {["Upcoming", "Past & cancelled"].map((item) => (
          <button
            key={item}
            aria-pressed={filter === item}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="stack">
        {own.map((booking) => (
          <StayCard key={booking.id} booking={booking} />
        ))}
        {!own.length && (
          <p className="empty-state">No reservations in this view.</p>
        )}
      </div>
    </div>
  );
}
export function ReservationDetails({ kind = "guest" }) {
  const { bookings, updateBooking, rates } = useDemo();
  const [search] = useSearchParams();
  const booking = search.has("id")
    ? bookings.find((b) => b.id === search.get("id"))
    : bookings.find((b) => b.own && b.status === "Confirmed");
  if (!booking)
    return (
      <div className="page">
        <PageHeading title="Reservation details" />
        <p>Reservation not found.</p>
        <Link to="/preview/guest/reservations">Back to reservations</Link>
      </div>
    );
  return (
    <ReservationEditor
      key={booking.id}
      booking={booking}
      bookings={bookings}
      rates={rates}
      updateBooking={updateBooking}
      created={search.has("created")}
      kind={kind}
    />
  );
}
function ReservationEditor({
  booking,
  bookings,
  rates,
  updateBooking,
  created,
  kind,
}) {
  const [editing, setEditing] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [message, setMessage] = useState(
    created ? "Your demo reservation is confirmed." : "",
  );
  const [arrival, setArrival] = useState(booking.arrival);
  const [departure, setDeparture] = useState(booking.departure);
  const advancePlan = ["prepaid", "sixty_day"].includes(booking.plan);
  const quote = quoteStay(
    arrival,
    departure,
    advancePlan ? "conventional" : booking.plan,
    rates,
    bookings,
    booking.id,
  );
  const newTotal = quote.error
    ? 0
    : advancePlan
      ? Math.max(booking.total, Math.round(quote.total * 1.1 * 100) / 100)
      : quote.total;
  const penalty = advancePlan
    ? 0
    : nightsBetween(dateOffset(), booking.arrival) < 3
      ? booking.nights[0].price
      : 0;
  function saveDates(event) {
    event.preventDefault();
    if (quote.error) return;
    const difference = Math.max(0, newTotal - booking.total);
    // Keep a price snapshot so later rate edits do not change this stay.
    const nights = quote.nights.map((night) => ({
      ...night,
      price: (newTotal * night.price) / quote.total,
    }));
    updateBooking(booking.id, {
      arrival,
      departure,
      total: newTotal,
      nights,
      paid: advancePlan ? booking.paid + difference : booking.paid,
      paidOn: advancePlan && difference ? dateOffset() : booking.paidOn,
    });
    setEditing(false);
    setMessage("Stay updated in the demo.");
  }
  function cancel() {
    updateBooking(booking.id, {
      status: "Cancelled",
      penalty,
      originalTotal: booking.total,
      total: advancePlan ? booking.total : penalty,
    });
    setCancelOpen(false);
    setEditing(false);
    setMessage("Reservation cancelled in the demo.");
  }
  return (
    <div className="page">
      <PageHeading
        eyebrow={booking.id}
        title={kind === "staff" ? "Reservation details" : "Your reservation"}
      >
        <span className="badge">{booking.status}</span>
      </PageHeading>
      {message && (
        <p className="success-message" role="status">
          {message}
        </p>
      )}
      <div className="card card-body">
        <h2>The Oasis Room</h2>
        <dl className="detail-list">
          <div>
            <dt>Guest</dt>
            <dd>{booking.name}</dd>
          </div>
          <div>
            <dt>Arrival</dt>
            <dd>{displayDate(booking.arrival)}</dd>
          </div>
          <div>
            <dt>Departure</dt>
            <dd>{displayDate(booking.departure)}</dd>
          </div>
          <div>
            <dt>Room</dt>
            <dd>{booking.room || "Assigned on arrival"}</dd>
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
        <p>{plans[booking.plan].detail}</p>
        <div className="button-row">
          {booking.status === "Confirmed" && (
            <>
              <button
                className="secondary"
                onClick={() => {
                  setEditing(!editing);
                  setCancelOpen(false);
                }}
              >
                Change dates
              </button>
              <button
                className="text-button danger"
                onClick={() => {
                  setCancelOpen(!cancelOpen);
                  setEditing(false);
                }}
              >
                Cancel reservation
              </button>
            </>
          )}
          <Link to={`/preview/${kind}/bills?id=${booking.id}`}>
            View bill ↗
          </Link>
        </div>
        {editing && (
          <form className="inset-form" onSubmit={saveDates}>
            <h3>Change your stay</h3>
            <div className="form-row">
              <label>
                Arrival
                <input
                  type="date"
                  min={dateOffset()}
                  value={arrival}
                  onChange={(e) => setArrival(e.target.value)}
                  required
                />
              </label>
              <label>
                Departure
                <input
                  type="date"
                  min={dateOffset(1, arrival)}
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                  required
                />
              </label>
            </div>
            {quote.error ? (
              <p role="alert">{quote.error}</p>
            ) : (
              <p>
                New total: <strong>{money(newTotal)}</strong>
                {advancePlan &&
                  ` · Additional demo payment: ${money(Math.max(0, newTotal - booking.total))}`}
              </p>
            )}
            <div className="button-row">
              <button
                disabled={
                  Boolean(quote.error) ||
                  (arrival === booking.arrival &&
                    departure === booking.departure)
                }
              >
                Save dates
              </button>
              <button
                type="button"
                className="secondary"
                onClick={() => setEditing(false)}
              >
                Keep current dates
              </button>
            </div>
          </form>
        )}
        {cancelOpen && (
          <div className="inset-form">
            <h3>Cancel this stay?</h3>
            <p>
              {advancePlan
                ? "This plan is non-refundable. Payments already made will be retained."
                : `Cancellation charge: ${money(penalty)}.`}
            </p>
            <div className="button-row">
              <button onClick={cancel}>Confirm cancellation</button>
              <button
                className="secondary"
                onClick={() => setCancelOpen(false)}
              >
                Keep reservation
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export function GuestBills() {
  const { bookings } = useDemo();
  const [search] = useSearchParams();
  const own = bookings.filter((b) => b.own);
  const [id, setId] = useState(search.get("id") || own[0]?.id || "");
  const booking = own.find((b) => b.id === id) || own[0];
  return (
    <div className="page">
      <PageHeading title="My bills" />
      <label className="filter-field no-print">
        Reservation
        <select
          value={booking?.id || ""}
          onChange={(e) => setId(e.target.value)}
        >
          {own.map((b) => (
            <option value={b.id} key={b.id}>
              {b.id} · {displayDate(b.arrival)}
            </option>
          ))}
        </select>
      </label>
      {booking ? <Bill booking={booking} /> : <p>No bills yet.</p>}
    </div>
  );
}
export function GuestProfile() {
  const { profile, setData } = useDemo();
  const [message, setMessage] = useState("");
  function save(event) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    setData((data) => ({ ...data, profile: values }));
    setMessage("Profile saved in this tab.");
  }
  return (
    <div className="page">
      <PageHeading title="My profile" />
      <form
        className="card card-body auth-form"
        onSubmit={save}
        key={profile.name + profile.email}
      >
        <label>
          Full name
          <input
            name="name"
            autoComplete="name"
            defaultValue={profile.name}
            required
            pattern=".*\S.*"
          />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={profile.email}
            required
          />
        </label>
        <label>
          Phone (optional)
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            defaultValue={profile.phone}
          />
        </label>
        <button>Save details</button>
        {message && <p role="status">{message}</p>}
      </form>
    </div>
  );
}
