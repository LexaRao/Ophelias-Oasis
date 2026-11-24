import test from "node:test";
import assert from "node:assert/strict";
import {
  accountDestination,
  authLink,
  bookingDestination,
} from "./destinations.js";

test("guests return to their booking, including the selected dates", () => {
  const next = "/reservation?arrival=2027-01-10&departure=2027-01-12";
  assert.equal(accountDestination(false, next), next);
  const signup = new URL(authLink("/signUp", next), "http://localhost");
  assert.equal(signup.searchParams.get("next"), next);
});

test("normal guest login goes to the guest dashboard", () => {
  assert.equal(accountDestination(false, null), "/guest");
  assert.equal(accountDestination(false, "/staff"), "/guest");
});

test("staff always go to their dashboard", () => {
  assert.equal(accountDestination(true, "/reservation"), "/staff");
  assert.equal(accountDestination(true, null), "/staff");
});

test("redirects cannot leave the website or point to an unrelated page", () => {
  for (const next of [
    "https://example.com",
    "//example.com",
    "/reservation/other",
    "/logIn",
    "\\\\example.com",
  ]) {
    assert.equal(bookingDestination(next), null);
    assert.equal(accountDestination(false, next), "/guest");
  }
});
