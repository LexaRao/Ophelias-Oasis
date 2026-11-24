import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useAuth } from "../auth/AuthContext";
import PageHeading from "../components/PageHeading";
import { displayDate, money, plans } from "../demo/booking";

export default function AccountDashboard() {
  const { user, isStaff } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function loadDashboard() {
      try {
        let bookingsQuery = supabase
          .from("bookings")
          .select(
            "id, arrival_date, departure_date, reservation_type, status, total_cost, profiles(first_name, last_name)",
          )
          .order("arrival_date");
        if (!isStaff) bookingsQuery = bookingsQuery.eq("user_id", user.id);
        const [profile, bookings, rooms] = await Promise.all([
          supabase
            .from("profiles")
            .select("first_name, last_name")
            .eq("id", user.id)
            .maybeSingle(),
          bookingsQuery,
          isStaff
            ? supabase
                .from("rooms")
                .select("id", { count: "exact", head: true })
            : Promise.resolve({ count: 0 }),
        ]);
        if (profile.error || bookings.error || rooms.error)
          throw new Error("Dashboard query failed");
        if (active)
          setData({
            profile: profile.data,
            bookings: bookings.data,
            rooms: rooms.count,
          });
      } catch {
        if (active)
          setError("Unable to load your dashboard. Please try again.");
      }
    }
    loadDashboard();
    return () => {
      active = false;
    };
  }, [user.id, isStaff]);

  if (error) {
    return (
      <div className="page">
        <p role="alert">{error}</p>
        <button onClick={() => window.location.reload()}>Try again</button>
      </div>
    );
  }
  if (!data)
    return (
      <div className="page">
        <p role="status">Loading your dashboard…</p>
      </div>
    );

  return (
    <div className="page">
      <PageHeading
        eyebrow={isStaff ? "Hotel workspace" : "Your stay"}
        title={
          isStaff
            ? "Staff dashboard"
            : `Welcome${data.profile?.first_name ? `, ${data.profile.first_name}` : ""}.`
        }
      >
        {!isStaff && (
          <Link className="button" to="/reservation">
            Book a stay ↗
          </Link>
        )}
      </PageHeading>
      {isStaff && (
        <div className="metrics">
          <article>
            <p>Rooms</p>
            <strong>{data.rooms}</strong>
          </article>
          <article>
            <p>Reservations</p>
            <strong>{data.bookings.length}</strong>
          </article>
        </div>
      )}
      <div className="section-heading">
        <h2>{isStaff ? "Reservations" : "My reservations"}</h2>
      </div>
      {data.bookings.length ? (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {isStaff && <th>Guest</th>}
                <th>Stay</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Total · AUD</th>
              </tr>
            </thead>
            <tbody>
              {data.bookings.map((booking) => (
                <tr key={booking.id}>
                  {isStaff && (
                    <td>
                      {[
                        booking.profiles?.first_name,
                        booking.profiles?.last_name,
                      ]
                        .filter(Boolean)
                        .join(" ") || "Guest"}
                    </td>
                  )}
                  <td>
                    {displayDate(booking.arrival_date)} —{" "}
                    {displayDate(booking.departure_date)}
                  </td>
                  <td>
                    {plans[booking.reservation_type]?.name ||
                      booking.reservation_type}
                  </td>
                  <td>
                    <span className="badge">
                      {booking.status.replaceAll("_", " ")}
                    </span>
                  </td>
                  <td>{money(booking.total_cost)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="empty-state">No reservations yet.</p>
      )}
    </div>
  );
}
