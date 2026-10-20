import { Link } from "react-router-dom";
import TemplatePage from "./components/TemplatePage";

export default function Reservation() {
  return (
    <TemplatePage
      title="Reservations"
      description="Guests will choose their dates and reservation plan, then provide booking details here."
      placeholder="Reservation form will go here"
    >
      <p className="page-note">
        This is a layout placeholder. Booking and payment functionality will be
        added later.
      </p>
      <div className="button-row">
        <Link to="/logIn">Log in</Link>
        <Link to="/signUp">Create an account</Link>
        <Link to="/preview/guest">View guest preview</Link>
      </div>
    </TemplatePage>
  );
}
