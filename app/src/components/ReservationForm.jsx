import { useState } from "react";

export default function ReservationForm() {
    const [arrival, setArrival] = useState("");
    const [departure, setDeparture] = useState("");
    const [reservationType, setReservationType] = useState("");
    const [id, setID] = useState("")


    return (

        <form>
            <label htmlFor="arrival"> Arrival Date </label>
            <input
                id="arrival"
                type="date"
                value={arrival}
                onChange={(event) => setArrival(event.target.value)}
                min= {new Date().toISOString().split("T")[0]}
                required
            />

            <label htmlFor="departure">Departure date</label>
            <input
                id="departure"
                type="date"
                value={departure}
                onChange={(event) => setDeparture(event.target.value)}
                min={arrival || undefined}
                required
            />

            <label htmlFor="reservationType"> Reservation type </label>
            <select
                id="reservationType"
                value={reservationType}
                onChange={(event) =>
                    setReservationType(event.target.value)
                }
                required
            >
                <option value="">Select a reservation plan</option>
                <option value="prepaid"> Prepaid </option>
                <option value="sixty_day"> 60 Days in Advance </option>
                <option value="conventional"> Conventional </option>
                <option value="incentive"> Incentive </option>
            </select>

            <button type="submit"> Make Reservation </button>

        </form>
    )

}