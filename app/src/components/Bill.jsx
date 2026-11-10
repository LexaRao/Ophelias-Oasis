import { dateOffset, displayDate, money, plans } from "../demo/booking";

export default function Bill({ booking }) {
  return (
    <article className="card card-body bill">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Ophelia’s Oasis · Sample bill</p>
          <h2>Accommodation bill</h2>
          <p>{booking.id}</p>
        </div>
        <button className="secondary no-print" onClick={() => window.print()}>
          Print bill
        </button>
      </div>
      <dl className="detail-list">
        <div>
          <dt>Issued</dt>
          <dd>{displayDate(dateOffset())}</dd>
        </div>
        <div>
          <dt>Guest</dt>
          <dd>{booking.name}</dd>
        </div>
        <div>
          <dt>Room</dt>
          <dd>{booking.room || "Assigned on arrival"}</dd>
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
          <dt>Nights / plan</dt>
          <dd>
            {booking.nights.length} / {plans[booking.plan].name}
          </dd>
        </div>
        <div className="total">
          <dt>Total</dt>
          <dd>{money(booking.total)}</dd>
        </div>
        <div>
          <dt>
            Paid{booking.paidOn ? ` · ${displayDate(booking.paidOn)}` : ""}
          </dt>
          <dd>{money(booking.paid)}</dd>
        </div>
        <div>
          <dt>Balance · AUD</dt>
          <dd>{money(Math.max(0, booking.total - booking.paid))}</dd>
        </div>
        {booking.penalty > 0 && (
          <div>
            <dt>Cancellation / no-show charge</dt>
            <dd>{money(booking.penalty)}</dd>
          </div>
        )}
      </dl>
    </article>
  );
}
