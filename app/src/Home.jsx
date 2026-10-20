import { Link } from "react-router-dom";
import TemplatePage from "./components/TemplatePage";

export default function Home() {
  return (
    <TemplatePage
      title="Welcome to Ophelia’s Oasis"
      description="This page will introduce the hotel and help visitors plan a stay."
      placeholder="Hotel images and introduction will go here"
    >
      <div className="button-row">
        <Link className="button" to="/rooms">
          Explore rooms
        </Link>
        <Link className="button secondary" to="/reservation">
          Reservations
        </Link>
      </div>
    </TemplatePage>
  );
}
