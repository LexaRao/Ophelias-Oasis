import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import PageHeading from "../components/PageHeading";
import { plans } from "../demo/booking";

const photos = [
  {
    src: "/images/hero.jpg",
    title: "The open horizon",
    category: "Landscape",
    alt: "Red outback terrain beneath a vast blue sky",
  },
  {
    src: "/images/room.jpg",
    title: "A moment of quiet",
    category: "Rooms",
    alt: "White bedding and timber furnishings in a sunlit hotel room",
  },
  {
    src: "/images/desert.jpg",
    title: "The golden hour",
    category: "Landscape",
    alt: "Sunset over Australian desert grasses and trees",
  },
];

export function Rooms() {
  return (
    <div className="page">
      <PageHeading
        eyebrow="Rest above the desert"
        title="One room. Endless views."
      />
      <div className="split room-feature">
        <img
          className="feature-photo"
          src="/images/room.jpg"
          alt={photos[1].alt}
        />
        <div className="editorial-copy">
          <p className="eyebrow">Your desert retreat</p>
          <h2>The Oasis Room</h2>
          <p>
            A peaceful place to return to, with the Amlet Desert stretching out
            beyond your window.
          </p>
          <ul className="feature-list">
            <li>Uninterrupted desert views</li>
            <li>Mountaintop setting</li>
            <li>One room category, four booking plans</li>
            <li>Room assigned on the morning of arrival</li>
          </ul>
          <Link className="button" to="/reservation">
            Choose your dates ↗
          </Link>
        </div>
      </div>
      <section className="section compact">
        <PageHeading eyebrow="A stay that suits you" title="Plan your escape" />
        <div className="plan-grid">
          {Object.entries(plans).map(([key, plan]) => (
            <article className="plan-card" key={key}>
              <p className="eyebrow">
                {plan.factor === 1
                  ? "More flexibility"
                  : `Save ${Math.round((1 - plan.factor) * 100)}%`}
              </p>
              <h3>{plan.name}</h3>
              <p>{plan.detail}</p>
              <Link to={`/reservation?plan=${key}`}>Select plan ↗</Link>
            </article>
          ))}
        </div>
        <p className="small-note">
          All rates in AUD. <Link to="/policies">View booking policies</Link>
        </p>
      </section>
    </div>
  );
}
export function Gallery() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(photos[0]);
  const dialog = useRef(null);
  return (
    <div className="page">
      <PageHeading eyebrow="A sense of place" title="Life at a slower pace." />
      <div className="segmented" aria-label="Gallery filters">
        {["All", "Rooms", "Landscape"].map((item) => (
          <button
            key={item}
            aria-pressed={filter === item}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="gallery-grid">
        {photos
          .filter((photo) => filter === "All" || photo.category === filter)
          .map((photo) => (
            <button
              className="photo-tile"
              key={photo.src}
              onClick={() => {
                setSelected(photo);
                dialog.current.showModal();
              }}
              aria-label={`Enlarge ${photo.title}`}
            >
              <img src={photo.src} alt={photo.alt} loading="lazy" />
              <span>
                {photo.title}
                <span aria-hidden="true">↗</span>
              </span>
            </button>
          ))}
      </div>
      <p className="small-note">
        Illustrative photography for our school project.
      </p>
      <dialog ref={dialog} className="photo-dialog">
        <button
          className="dialog-close"
          aria-label="Close photograph"
          onClick={() => dialog.current.close()}
        >
          Close ×
        </button>
        <img src={selected.src} alt={selected.alt} />
        <p>{selected.title}</p>
      </dialog>
    </div>
  );
}
export function About() {
  return (
    <div className="page">
      <PageHeading
        eyebrow="Amlet Desert, Australia"
        title="Somewhere worth finding."
      />
      <div className="split about-feature">
        <div className="editorial-copy">
          <h2>
            Above the desert.
            <br />
            Beyond the rush.
          </h2>
          <p>
            Ophelia’s Oasis is a 45-room mountaintop hotel overlooking the Amlet
            Desert. A remote setting, a wide-open landscape, and a view from
            every room.
          </p>
          <div className="fact-row">
            <span>
              <strong>125</strong>miles to the nearest town
            </span>
            <span>
              <strong>45</strong>rooms with a view
            </span>
          </div>
          <Link className="button" to="/reservation">
            Plan your stay ↗
          </Link>
        </div>
        <img
          className="portrait-photo"
          src="/images/desert.jpg"
          alt={photos[2].alt}
        />
      </div>
      <section className="narrow section compact">
        <h2>Before you travel</h2>
        <details>
          <summary>Where is Ophelia’s Oasis?</summary>
          <p>
            On a mountaintop overlooking Australia’s Amlet Desert, 125 miles
            from the nearest town. The hotel and location are part of a
            fictional school project.
          </p>
        </details>
        <details>
          <summary>Can I choose a specific room?</summary>
          <p>
            All rooms share the same daily base rate and desert view. Rooms are
            assigned on the morning of arrival.
          </p>
        </details>
        <details>
          <summary>What if I arrive late?</summary>
          <p>
            Contact the hotel before 11:59 pm on your arrival date to avoid
            being marked as a no-show. Contact details will be added before live
            bookings open.
          </p>
        </details>
        <details>
          <summary>How can I manage my stay?</summary>
          <p>
            Review your dates, booking plan, and bill in{" "}
            <Link to="/preview/guest">My stay</Link>.
          </p>
        </details>
      </section>
    </div>
  );
}
export function Policies() {
  return (
    <div className="page narrow">
      <PageHeading eyebrow="Good to know" title="Booking policies" />
      {Object.entries(plans).map(([key, plan]) => (
        <details key={key} open={key === "conventional"}>
          <summary>{plan.name}</summary>
          <p>{plan.detail}</p>
          {key === "conventional" || key === "incentive" ? (
            <p>
              A credit card guarantees the booking. Late cancellation or a
              no-show incurs the first night’s charge.
            </p>
          ) : (
            <p>
              Cancellations are non-refundable. Changes depend on availability;
              any additional payment is the amount by which 110% of the new
              stay’s current base price exceeds the original reservation cost.
            </p>
          )}
          {key === "sixty_day" && (
            <p>
              A reminder is due 45 days before arrival. Payment is due within 15
              days of that reminder; unpaid reservations are then cancelled.
            </p>
          )}
        </details>
      ))}
      <details>
        <summary>Rates, rooms & arrival</summary>
        <p>
          All 45 rooms have the same daily base rate. Rate changes do not affect
          existing bookings. Rooms are assigned on the morning of arrival.
        </p>
        <p>
          Check in or contact the hotel by 11:59 pm on your arrival date.
          Otherwise, the booking is treated as a no-show.
        </p>
      </details>
      <Link className="button" to="/reservation">
        Choose your dates ↗
      </Link>
    </div>
  );
}
export function NotFound() {
  return (
    <div className="page empty-state">
      <p className="eyebrow">404</p>
      <h1>A little off the beaten path.</h1>
      <Link className="button" to="/">
        Back to the oasis
      </Link>
    </div>
  );
}
