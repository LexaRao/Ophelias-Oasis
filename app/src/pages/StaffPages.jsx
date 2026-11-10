import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PageHeading from "../components/PageHeading";
import Bill from "../components/Bill";
import { useDemo } from "../demo/DemoContext";
import {
  dateOffset,
  displayDate,
  isActive,
  money,
  onNight,
  plans,
} from "../demo/booking";

function Metrics({ items }) {
  return (
    <div className="metrics">
      {items.map(([label, value]) => (
        <article key={label}>
          <p>{label}</p>
          <strong>{value}</strong>
        </article>
      ))}
    </div>
  );
}
function BookingTable({ bookings, action }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Guest</th>
            <th>Stay</th>
            <th>Plan</th>
            <th>Room</th>
            <th>Status</th>
            {action && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>
                <Link to={`/preview/staff/reservation?id=${b.id}`}>
                  {b.name}
                </Link>
                <small>{b.id}</small>
              </td>
              <td>
                {displayDate(b.arrival)}
                <small>to {displayDate(b.departure)}</small>
              </td>
              <td>{plans[b.plan].name}</td>
              <td>{b.room || "Unassigned"}</td>
              <td>
                <span className="badge">{b.status}</span>
              </td>
              {action && <td>{action(b)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
      {!bookings.length && (
        <p className="empty-state">No reservations to display.</p>
      )}
    </div>
  );
}
export function StaffOverview() {
  const { bookings } = useDemo();
  const today = dateOffset();
  const arrivals = bookings.filter((b) => b.arrival === today && isActive(b));
  const occupied = bookings.filter((b) => b.status === "Checked in");
  const departures = occupied.filter((b) => b.departure === today);
  return (
    <div className="page">
      <PageHeading eyebrow={displayDate(today)} title="Today at the oasis">
        <Link className="button" to="/reservation">
          New reservation ↗
        </Link>
      </PageHeading>
      <Metrics
        items={[
          ["Rooms occupied", `${occupied.length} / 45`],
          ["Arriving today", arrivals.length],
          ["Departing today", departures.length],
        ]}
      />
      <div className="section-heading">
        <h2>Today’s arrivals</h2>
        <Link to="/preview/staff/arrivals">View all ↗</Link>
      </div>
      <BookingTable bookings={arrivals} />
      <div className="quick-links">
        <Link to="/preview/staff/tasks">Daily tasks ↗</Link>
        <Link to="/preview/staff/rates">Room rates ↗</Link>
        <Link to="/preview/staff/reports">Management reports ↗</Link>
      </div>
    </div>
  );
}
export function StaffReservations() {
  const { bookings } = useDemo();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const filtered = bookings.filter(
    (b) =>
      `${b.name} ${b.id}`.toLowerCase().includes(query.toLowerCase()) &&
      (status === "All" || b.status === status),
  );
  return (
    <div className="page">
      <PageHeading title="Reservations">
        <Link className="button" to="/reservation">
          New reservation ↗
        </Link>
      </PageHeading>
      <div className="filters">
        <label>
          Find a reservation
          <input
            type="search"
            placeholder="Guest name or reference"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label>
          Status
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            {[
              "All",
              "Confirmed",
              "Checked in",
              "Checked out",
              "Cancelled",
              "No-show",
            ].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>
      <BookingTable bookings={filtered} />
    </div>
  );
}
function CheckInAction({ booking }) {
  const { bookings, updateBooking } = useDemo();
  const [room, setRoom] = useState("");
  const unavailable = new Set(
    bookings.filter((b) => b.status === "Checked in").map((b) => b.room),
  );
  const needsPayment =
    ["prepaid", "sixty_day"].includes(booking.plan) &&
    booking.paid < booking.total;
  if (booking.status === "Checked in") return <span>Checked in</span>;
  if (needsPayment)
    return (
      <Link to={`/preview/staff/bills?id=${booking.id}`}>Payment due ↗</Link>
    );
  return (
    <form
      className="checkin-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (room && !unavailable.has(Number(room)))
          updateBooking(booking.id, {
            room: Number(room),
            status: "Checked in",
          });
      }}
    >
      <label className="sr-only" htmlFor={booking.id}>
        Room for {booking.name}
      </label>
      <select
        id={booking.id}
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        required
      >
        <option value="">Room</option>
        {Array.from({ length: 45 }, (_, i) => i + 1)
          .filter((n) => !unavailable.has(n))
          .map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
      </select>
      <button disabled={!room || unavailable.has(Number(room))}>
        Check in
      </button>
    </form>
  );
}
export function StaffArrivals() {
  const { bookings } = useDemo();
  const [date, setDate] = useState(dateOffset());
  const arrivals = bookings
    .filter((b) => b.arrival === date && isActive(b))
    .sort((a, b) => a.name.localeCompare(b.name));
  return (
    <div className="page">
      <PageHeading title="Arrivals & check-in" />
      <label className="filter-field">
        Arrival date
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>
      <BookingTable
        bookings={arrivals}
        action={
          date === dateOffset()
            ? (b) => <CheckInAction booking={b} />
            : undefined
        }
      />
    </div>
  );
}
export function StaffOccupancy() {
  const { bookings, updateBooking } = useDemo();
  const occupied = bookings
    .filter((b) => b.status === "Checked in")
    .sort((a, b) => a.room - b.room);
  return (
    <div className="page">
      <PageHeading title="Guests & check-out" />
      <BookingTable
        bookings={occupied}
        action={(b) =>
          b.paid < b.total ? (
            <Link to={`/preview/staff/bills?id=${b.id}`}>
              Settle {money(b.total - b.paid)} ↗
            </Link>
          ) : (
            <button
              className="secondary"
              onClick={() => updateBooking(b.id, { status: "Checked out" })}
            >
              Check out
            </button>
          )
        }
      />
      <p className="small-note">{occupied.length} of 45 rooms occupied</p>
    </div>
  );
}
export function StaffBills() {
  const { bookings, updateBooking } = useDemo();
  const [search] = useSearchParams();
  const [id, setId] = useState(search.get("id") || bookings[0]?.id);
  const booking = bookings.find((b) => b.id === id) || bookings[0];
  const [message, setMessage] = useState("");
  return (
    <div className="page">
      <PageHeading title="Payments & bills" />
      <label className="filter-field no-print">
        Reservation
        <select
          value={booking?.id || ""}
          onChange={(e) => {
            setId(e.target.value);
            setMessage("");
          }}
        >
          {bookings.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name} · {b.id}
            </option>
          ))}
        </select>
      </label>
      {booking && (
        <>
          <Bill booking={booking} />
          {booking.total > booking.paid && (
            <div className="button-row no-print">
              <button
                onClick={() => {
                  updateBooking(booking.id, {
                    paid: booking.total,
                    paidOn: dateOffset(),
                  });
                  setMessage("Sample payment recorded. No card was charged.");
                }}
              >
                Record demo payment · {money(booking.total - booking.paid)}
              </button>
            </div>
          )}
        </>
      )}
      {message && (
        <p className="success-message" role="status">
          {message}
        </p>
      )}
    </div>
  );
}
export function StaffTasks() {
  const { bookings, completedTasks, setData, updateBooking } = useDemo();
  const [message, setMessage] = useState("");
  const tasks = bookings
    .filter((b) => b.status === "Confirmed")
    .flatMap((b) => {
      if (b.arrival < dateOffset())
        return [{ booking: b, type: "No-show review", key: `noshow-${b.id}` }];
      if (
        b.plan === "sixty_day" &&
        b.paid < b.total &&
        dateOffset(-30, b.arrival) <= dateOffset()
      )
        return [
          { booking: b, type: "Overdue payment", key: `overdue-${b.id}` },
        ];
      if (
        b.plan === "sixty_day" &&
        b.paid < b.total &&
        dateOffset(-45, b.arrival) <= dateOffset()
      )
        return [
          { booking: b, type: "Payment reminder", key: `reminder-${b.id}` },
        ];
      return [];
    })
    .filter((task) => !completedTasks.includes(task.key));
  function complete(task) {
    const b = task.booking;
    if (task.type === "No-show review") {
      const penalty = ["conventional", "incentive"].includes(b.plan)
        ? b.nights[0].price
        : 0;
      updateBooking(b.id, {
        status: "No-show",
        penalty,
        originalTotal: b.total,
        total: penalty || b.total,
      });
    } else if (task.type === "Overdue payment") {
      updateBooking(b.id, { status: "Cancelled" });
    }
    setData((data) => ({
      ...data,
      completedTasks: [...data.completedTasks, task.key],
    }));
    setMessage(
      task.type === "Payment reminder"
        ? "Reminder marked as reviewed. No email was sent."
        : "Reservation updated in the demo.",
    );
  }
  return (
    <div className="page">
      <PageHeading eyebrow={displayDate(dateOffset())} title="Daily tasks" />
      <div className="stack">
        {tasks.map((task) => (
          <article className="task-row card card-body" key={task.key}>
            <div>
              <p className="eyebrow">{task.type}</p>
              <h2>{task.booking.name}</h2>
              <p>
                {task.booking.id} · Arrival {displayDate(task.booking.arrival)}
              </p>
              {task.type === "No-show review" && (
                <p className="small-note">
                  Confirm the guest has not called. First-night charge:{" "}
                  {money(
                    ["conventional", "incentive"].includes(task.booking.plan)
                      ? task.booking.nights[0].price
                      : 0,
                  )}
                  .
                </p>
              )}
            </div>
            <button className="secondary" onClick={() => complete(task)}>
              {task.type === "No-show review"
                ? "Mark no-show"
                : task.type === "Overdue payment"
                  ? "Cancel unpaid stay"
                  : "Mark reminder reviewed"}
            </button>
          </article>
        ))}
        {!tasks.length && (
          <div className="empty-state">
            <h2>All caught up.</h2>
            <p>No outstanding tasks.</p>
          </div>
        )}
      </div>
      {message && (
        <p className="success-message" role="status">
          {message}
        </p>
      )}
    </div>
  );
}
export function StaffRates() {
  const { rates, setData } = useDemo();
  const [from, setFrom] = useState(dateOffset());
  const [to, setTo] = useState(dateOffset(6));
  const [price, setPrice] = useState(rates.default);
  const [message, setMessage] = useState("");
  function save(event) {
    event.preventDefault();
    if (
      !from ||
      !to ||
      to < from ||
      from < dateOffset() ||
      Number(price) <= 0
    ) {
      setMessage("Choose valid dates and a positive rate.");
      return;
    }
    const updates = {};
    for (let date = from; date <= to; date = dateOffset(1, date))
      updates[date] = Number(price);
    setData((data) => ({ ...data, rates: { ...data.rates, ...updates } }));
    setMessage(
      "Rates updated. Existing reservations keep their booked prices.",
    );
  }
  return (
    <div className="page">
      <PageHeading title="Room rates" />
      <p className="small-note">Daily base rate · All 45 rooms · AUD</p>
      <form className="card card-body" onSubmit={save}>
        <div className="form-row three">
          <label>
            From
            <input
              type="date"
              min={dateOffset()}
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              required
            />
          </label>
          <label>
            Through
            <input
              type="date"
              min={from}
              max={dateOffset(365, from)}
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
            />
          </label>
          <label>
            Nightly rate
            <input
              type="number"
              min="1"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>
        </div>
        <button>Save rates</button>
        {message && <p role="status">{message}</p>}
      </form>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Base rate</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 14 }, (_, i) => dateOffset(i)).map((date) => (
              <tr key={date}>
                <td>{displayDate(date)}</td>
                <td>{money(rates[date] ?? rates.default)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export function StaffReports() {
  const { bookings } = useDemo();
  const [report, setReport] = useState("Expected occupancy");
  const management = [
    "Expected occupancy",
    "Expected income",
    "Incentive discounts",
  ].includes(report);
  const rows = Array.from({ length: 30 }, (_, i) => {
    const date = dateOffset(i);
    const stays = bookings.filter((b) => onNight(b, date));
    const income = stays.reduce(
      (sum, b) => sum + (b.nights.find((n) => n.date === date)?.price || 0),
      0,
    );
    const discount = stays
      .filter((b) => b.plan === "incentive")
      .reduce((sum, b) => {
        const night = b.nights.find((n) => n.date === date);
        return sum + (night ? night.base - night.price : 0);
      }, 0);
    return { date, stays, income, discount };
  });
  const total = rows.reduce(
    (sum, row) =>
      sum +
      (report === "Expected occupancy"
        ? (row.stays.length / 45) * 100
        : report === "Expected income"
          ? row.income
          : row.discount),
    0,
  );
  const daily = bookings
    .filter((b) =>
      report === "Today’s arrivals"
        ? b.arrival === dateOffset() && isActive(b)
        : b.arrival <= dateOffset(-1) &&
          b.departure > dateOffset(-1) &&
          ["Checked in", "Checked out"].includes(b.status),
    )
    .sort((a, b) =>
      report === "Today’s arrivals"
        ? a.name.localeCompare(b.name)
        : a.room - b.room,
    );
  return (
    <div className="page reports">
      <PageHeading
        eyebrow={
          management
            ? `${displayDate(dateOffset())} — ${displayDate(dateOffset(29))}`
            : displayDate(dateOffset())
        }
        title="Reports"
      >
        <button className="secondary no-print" onClick={() => window.print()}>
          Print report
        </button>
      </PageHeading>
      <label className="filter-field no-print">
        Report
        <select value={report} onChange={(e) => setReport(e.target.value)}>
          {[
            "Expected occupancy",
            "Expected income",
            "Incentive discounts",
            "Today’s arrivals",
            "Previous evening’s occupancy",
          ].map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>
      <h2>{report}</h2>
      {management ? (
        <>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  {report === "Expected occupancy" ? (
                    <>
                      <th>Prepaid</th>
                      <th>60-day</th>
                      <th>Flexible</th>
                      <th>Incentive</th>
                      <th>Total</th>
                      <th>Occupancy</th>
                    </>
                  ) : (
                    <th>
                      {report === "Expected income"
                        ? "Income · AUD"
                        : "Discount · AUD"}
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.date}>
                    <td>{displayDate(row.date)}</td>
                    {report === "Expected occupancy" ? (
                      <>
                        {[
                          "prepaid",
                          "sixty_day",
                          "conventional",
                          "incentive",
                        ].map((plan) => (
                          <td key={plan}>
                            {row.stays.filter((b) => b.plan === plan).length}
                          </td>
                        ))}
                        <td>{row.stays.length}</td>
                        <td>{((row.stays.length / 45) * 100).toFixed(1)}%</td>
                      </>
                    ) : (
                      <td>
                        {money(
                          report === "Expected income"
                            ? row.income
                            : row.discount,
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th>
                    {report === "Expected occupancy"
                      ? "Average occupancy"
                      : "Total / nightly average"}
                  </th>
                  <td colSpan={report === "Expected occupancy" ? 6 : 1}>
                    {report === "Expected occupancy"
                      ? `${(total / 30).toFixed(1)}%`
                      : `${money(total)} / ${money(total / 30)}`}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </>
      ) : (
        <>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Guest</th>
                  <th>Room</th>
                  <th>Plan</th>
                  <th>Departure</th>
                </tr>
              </thead>
              <tbody>
                {daily.map((b) => (
                  <tr key={b.id}>
                    <td>
                      {b.name}
                      {report !== "Today’s arrivals" &&
                      b.departure === dateOffset()
                        ? " *"
                        : ""}
                    </td>
                    <td>{b.room || "Unassigned"}</td>
                    <td>{plans[b.plan].name}</td>
                    <td>{displayDate(b.departure)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!daily.length && (
              <p className="empty-state">No guests for this report.</p>
            )}
          </div>
          {report !== "Today’s arrivals" && (
            <p className="small-note">* Departing today</p>
          )}
        </>
      )}
    </div>
  );
}
