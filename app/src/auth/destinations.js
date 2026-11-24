export function bookingDestination(value) {
  if (typeof value !== "string") return null;
  // Accept only our booking page, never an external redirect.
  if (value === "/reservation" || value.startsWith("/reservation?"))
    return value;
  return null;
}

export function accountDestination(isStaff, next) {
  return isStaff ? "/staff" : bookingDestination(next) || "/guest";
}

export function authLink(path, next) {
  return next ? `${path}?next=${encodeURIComponent(next)}` : path;
}
