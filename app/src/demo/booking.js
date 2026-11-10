export const plans = {
  conventional: {
    name: "Flexible stay",
    factor: 1,
    detail:
      "Pay at check-out. Cancel at least 3 days before arrival without a fee.",
  },
  prepaid: {
    name: "Early escape",
    factor: 0.75,
    detail: "Book 90+ days ahead. Pay now. Non-refundable.",
  },
  sixty_day: {
    name: "60-day advance",
    factor: 0.85,
    detail:
      "Book 60 days ahead. Pay by 30 days before arrival. Non-refundable.",
  },
  incentive: {
    name: "Last-minute escape",
    factor: 0.8,
    detail:
      "Arrive in under 30 days. Available when expected occupancy is 60% or less.",
  },
};

export function dateOffset(days = 0, from = new Date()) {
  const date =
    typeof from === "string" ? new Date(`${from}T12:00:00`) : new Date(from);
  date.setDate(date.getDate() + days);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function nightsBetween(arrival, departure) {
  return Math.round(
    (Date.parse(`${departure}T00:00:00Z`) -
      Date.parse(`${arrival}T00:00:00Z`)) /
      86400000,
  );
}
export const money = (value) =>
  new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 2,
  }).format(value);
export const displayDate = (value) =>
  new Date(`${value}T12:00:00`).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
export const isActive = (booking) =>
  ["Confirmed", "Checked in"].includes(booking.status);
export const onNight = (booking, date) =>
  isActive(booking) && booking.arrival <= date && booking.departure > date;

export function quoteStay(
  arrival,
  departure,
  plan,
  rates,
  bookings = [],
  excludeId,
) {
  const count = nightsBetween(arrival, departure);
  const advance = nightsBetween(dateOffset(), arrival);
  if (!Number.isFinite(count) || count < 1 || count > 365 || advance < 0)
    return { error: "Choose a future stay of 1–365 nights." };
  if (!plans[plan]) return { error: "Choose a reservation plan." };
  const nights = Array.from({ length: count }, (_, i) => {
    const date = dateOffset(i, arrival);
    return { date, base: Number(rates[date] ?? rates.default) };
  });
  const occupancy = nights.map(
    ({ date }) =>
      bookings.filter((b) => b.id !== excludeId && onNight(b, date)).length,
  );
  if (occupancy.some((count) => count >= 45))
    return { error: "No rooms available for these dates. Try another stay." };
  if (plan === "prepaid" && advance < 90)
    return { error: "Early escape requires at least 90 days’ notice." };
  if (plan === "sixty_day" && advance !== 60)
    return {
      error: "Choose an arrival exactly 60 days from today for this plan.",
    };
  if (
    plan === "incentive" &&
    (advance >= 30 || occupancy.reduce((a, b) => a + b, 0) / count / 45 > 0.6)
  )
    return {
      error:
        "This offer requires arrival in under 30 days and expected occupancy of 60% or less.",
    };
  const pricedNights = nights.map((night) => ({
    ...night,
    price: Math.round(night.base * plans[plan].factor * 100) / 100,
  }));
  return {
    nights: pricedNights,
    total:
      Math.round(
        pricedNights.reduce((sum, night) => sum + night.price, 0) * 100,
      ) / 100,
  };
}
