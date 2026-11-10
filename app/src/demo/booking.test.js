import test from "node:test";
import assert from "node:assert/strict";
import { dateOffset, nightsBetween, quoteStay } from "./booking.js";

const rates = { default: 240 };
const stay = (advance, count = 3, plan = "conventional", bookings = []) =>
  quoteStay(
    dateOffset(advance),
    dateOffset(advance + count),
    plan,
    rates,
    bookings,
  );

test("date calculations cross year and daylight-saving boundaries", () => {
  assert.equal(dateOffset(1, "2026-12-31"), "2027-01-01");
  assert.equal(nightsBetween("2026-03-07", "2026-03-09"), 2);
});
test("rejects empty, backwards, zero-length, and past stays", () => {
  assert.ok(quoteStay("", "", "conventional", rates).error);
  assert.ok(stay(5, -1).error);
  assert.ok(stay(5, 0).error);
  assert.ok(stay(-1).error);
});
test("prepaid and 60-day plans enforce booking windows", () => {
  assert.ok(stay(89, 3, "prepaid").error);
  assert.equal(stay(90, 3, "prepaid").total, 540);
  assert.equal(stay(60, 3, "sixty_day").total, 612);
  assert.ok(stay(59, 3, "sixty_day").error);
  assert.ok(stay(61, 3, "sixty_day").error);
});
test("incentive requires under 30 days and at most 60 percent occupancy", () => {
  const bookings = Array.from({ length: 27 }, (_, i) => ({
    id: i,
    arrival: dateOffset(3),
    departure: dateOffset(7),
    status: "Confirmed",
  }));
  assert.equal(stay(3, 3, "incentive", bookings).total, 576);
  assert.ok(stay(30, 3, "incentive").error);
  assert.ok(stay(3, 3, "incentive", [...bookings, bookings[0]]).error);
});
test("capacity excludes cancelled stays and the booking being changed", () => {
  const bookings = Array.from({ length: 45 }, (_, i) => ({
    id: i,
    arrival: dateOffset(3),
    departure: dateOffset(7),
    status: "Confirmed",
  }));
  assert.ok(stay(3, 3, "conventional", bookings).error);
  assert.equal(
    quoteStay(dateOffset(3), dateOffset(6), "conventional", rates, bookings, 0)
      .total,
    720,
  );
  bookings[0].status = "Cancelled";
  assert.equal(stay(3, 3, "conventional", bookings).total, 720);
});
test("daily prices are snapshotted and checkout night is not billed", () => {
  const dailyRates = { default: 240, [dateOffset(4)]: 300 };
  const quote = quoteStay(
    dateOffset(3),
    dateOffset(5),
    "conventional",
    dailyRates,
  );
  assert.equal(quote.total, 540);
  dailyRates[dateOffset(4)] = 500;
  assert.equal(quote.nights[1].price, 300);
  assert.equal(quote.nights.length, 2);
});
