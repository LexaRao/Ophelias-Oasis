import { Link } from "react-router-dom";
import TemplatePage from "../components/TemplatePage";

export function Rooms() {
  return (
    <TemplatePage
      title="Our rooms"
      description="Room photographs and general information about a stay will appear here."
      placeholder="Room images and information will go here"
    >
      <p className="page-note">Specific rooms are assigned on arrival day.</p>
      <Link className="button" to="/reservation">
        Reservations
      </Link>
    </TemplatePage>
  );
}

export function Gallery() {
  return (
    <TemplatePage
      title="Gallery"
      description="Visitors will be able to browse photographs of the hotel and its surroundings."
      placeholder="Hotel image gallery will go here"
    />
  );
}

export function About() {
  return (
    <TemplatePage
      title="About & contact"
      description="The hotel introduction, location, and contact information will appear here."
      placeholder="Hotel and contact information will go here"
    />
  );
}

export function Policies() {
  return (
    <TemplatePage
      title="Booking policies"
      description="This page will explain the four reservation plans, payment timing, and change or cancellation rules."
      placeholder="Booking policies will go here"
    />
  );
}

export function NotFound() {
  return (
    <section className="page">
      <h1>Page not found</h1>
      <p>This address is not part of the template.</p>
      <Link className="button" to="/">
        Return home
      </Link>
    </section>
  );
}
