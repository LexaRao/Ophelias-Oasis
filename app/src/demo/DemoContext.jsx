import { createContext, useContext, useEffect, useState } from "react";
import { dateOffset, plans } from "./booking";

const DemoContext = createContext(null);
const storageKey = "ophelias-demo-v1";

function initialData() {
  const guests = [
    ["OO-1042", "Alex Morgan", 12, 15, "conventional", "Confirmed", null, true],
    ["OO-1043", "Jamie Chen", 0, 3, "prepaid", "Confirmed", null],
    ["OO-1044", "Sam Rivera", 0, 2, "incentive", "Confirmed", null],
    ["OO-1038", "Taylor Brooks", -3, 0, "conventional", "Checked in", 12],
    ["OO-1039", "Jordan Lee", -2, 2, "sixty_day", "Checked in", 8],
    ["OO-1045", "Casey Patel", 45, 48, "sixty_day", "Confirmed", null],
    ["OO-1037", "Riley Wilson", -1, 2, "conventional", "Confirmed", null],
    ["OO-1021", "Alex Morgan", -20, -18, "prepaid", "Checked out", 16, true],
  ];
  return {
    profile: { name: "Alex Morgan", email: "alex@example.com", phone: "" },
    rates: { default: 240 },
    completedTasks: [],
    bookings: guests.map(([id, name, start, end, plan, status, room, own]) => {
      const nights = Array.from({ length: end - start }, (_, i) => ({
        date: dateOffset(start + i),
        base: 240,
        price: 240 * plans[plan].factor,
      }));
      const total = nights.reduce((sum, night) => sum + night.price, 0);
      const paid =
        plan === "prepaid" || (status === "Checked in" && plan === "sixty_day")
          ? total
          : 0;
      return {
        id,
        name,
        own: Boolean(own),
        arrival: dateOffset(start),
        departure: dateOffset(end),
        plan,
        status,
        room,
        nights,
        total,
        paid,
        paidOn: paid ? dateOffset(-30) : null,
      };
    }),
  };
}
function readDemo() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey));
    if (saved?.bookings && saved?.rates && saved?.profile) return saved;
  } catch {
    /* Storage is optional for the demo. */
  }
  return initialData();
}
export function DemoProvider({ children }) {
  const [data, setData] = useState(readDemo);
  useEffect(() => {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(data));
    } catch {
      /* Keep changes in memory. */
    }
  }, [data]);
  function updateBooking(id, changes) {
    setData((current) => ({
      ...current,
      bookings: current.bookings.map((booking) =>
        booking.id === id ? { ...booking, ...changes } : booking,
      ),
    }));
  }
  function addBooking(booking) {
    const id = `OO-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    setData((current) => ({
      ...current,
      bookings: [
        { ...booking, id, own: true, status: "Confirmed", room: null },
        ...current.bookings,
      ],
    }));
    return id;
  }
  return (
    <DemoContext.Provider
      value={{
        ...data,
        setData,
        updateBooking,
        addBooking,
        reset: () => setData(initialData()),
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}
export function useDemo() {
  return useContext(DemoContext);
}
