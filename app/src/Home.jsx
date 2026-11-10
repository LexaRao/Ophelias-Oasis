import { Link, useNavigate } from "react-router-dom";
import { dateOffset } from "./demo/booking";

export default function Home() {
  const navigate = useNavigate();
  function findStay(event) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    navigate(
      `/reservation?arrival=${fields.get("arrival")}&departure=${fields.get("departure")}`,
    );
  }
  return (
    <>
      <section className="hero">
        <img
          className="hero-image"
          src="/images/hero.jpg"
          alt="Red earth and open skies in the Australian outback"
          fetchPriority="high"
        />
        <div className="hero-copy">
          <p className="eyebrow">
            A mountaintop retreat in the Australian desert
          </p>
          <h1>
            Room to
            <br />
            breathe.
          </h1>
          <p>
            Forty-five rooms. An endless horizon.
            <br />A world away from the everyday.
          </p>
          <Link className="hero-link" to="/rooms">
            Discover your stay <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <span className="hero-caption">OPEN SKIES. QUIET MOMENTS.</span>
      </section>
      <form className="stay-search" onSubmit={findStay}>
        <div className="search-title">
          <span className="eyebrow">Your next escape</span>
          <strong>Stay a little longer.</strong>
        </div>
        <label>
          Arrival
          <input
            name="arrival"
            type="date"
            min={dateOffset()}
            defaultValue={dateOffset(7)}
            required
          />
        </label>
        <label>
          Departure
          <input
            name="departure"
            type="date"
            min={dateOffset(1)}
            defaultValue={dateOffset(10)}
            required
          />
        </label>
        <button>Find your stay ↗</button>
      </form>
      <section className="section split">
        <div className="image-wrap">
          <img
            src="/images/room.jpg"
            alt="Sunlit bedroom with white bedding and warm timber details"
            loading="lazy"
          />
          <span className="image-caption">SPACE TO SLOW DOWN</span>
        </div>
        <div className="editorial-copy">
          <p className="eyebrow">The rooms</p>
          <h2>
            A quieter kind
            <br />
            of getaway.
          </h2>
          <p>
            Wake up above the Amlet Desert. Every room at Ophelia’s Oasis opens
            onto an uninterrupted desert view.
          </p>
          <div className="fact-row">
            <span>
              <strong>45</strong>rooms
            </span>
            <span>
              <strong>One</strong>extraordinary view
            </span>
          </div>
          <Link className="button secondary" to="/rooms">
            Explore the rooms ↗
          </Link>
        </div>
      </section>
      <section className="desert-banner">
        <img
          src="/images/desert.jpg"
          alt="Golden evening light across the Australian desert"
          loading="lazy"
        />
        <div>
          <p className="eyebrow">Away from it all</p>
          <h2>Take the scenic route.</h2>
          <p>
            125 miles from the nearest town.
            <br />
            Some places are worth the journey.
          </p>
          <Link className="button light" to="/about">
            Find our oasis ↗
          </Link>
        </div>
      </section>
    </>
  );
}
