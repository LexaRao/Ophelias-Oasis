import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function ReservationForm() {
    const [arrival, setArrival] = useState("");
    const [departure, setDeparture] = useState("");
    const [reservationType, setReservationType] = useState("");
    const [id, setID] = useState(null)
    const [message, setMessage] = useState("");
    const [busy, setBusy] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        async function getID() {
            if (!supabase) {
                setMessage(
                    "Supabase is not configured locally. Use the preview links to explore without an account.",
                );
                return;
            }

            const response = await supabase.auth.getSession();

            if (response.error) {
                setMessage("Please log in to make a reservation.");
                return;
            }

            // Make the user log in to access this page.
            if (!response.data.session) {
                setMessage("Please log in to make a reservation.");
                navigate("/logIn");
                return;
            }
            setID(response.data.session.user.id);
        }
        getID();
    }, [navigate]);


    function getDaysInAdvance() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const arrivalDate = new Date(arrival + "T00:00:00");

        const difference = arrivalDate - today;

        return difference / (1000 * 60 * 60 * 24);
    }


    function confirmDayConditions() {
        const days = getDaysInAdvance();
        if (reservationType === "prepaid") {

            if (days < 90) {
                setMessage(
                    "Your arrival date must be at least 90 days away for this plan."
                );
                return false;
            }

            return true;
        }
        else if (reservationType === "sixty_day") {
            if (days != 60) {
                setMessage(
                    "Your arrival date must be 60 days away for this plan."
                );
                return false;
            }
            return true;

        }
        else if (reservationType === "incentive") {
            if (days >= 30) {
                setMessage(
                    "Your arrival date must be 30 days away for this plan."
                );
                return false;
            }
            return true;
        }

        return true;
    }

    async function calculateReservationCost() {
        const { data: rates, error } = await supabase
            .from("base_rates")
            .select("rate_date, base_rate")
            .gte("rate_date", arrival)
            .lt("rate_date", departure)
            .order("rate_date");

        if (error) {
            setMessage(`Failed to retrieve rates: ${error.message}`);
            return null;
        }
        const arrivalTime = Date.parse(arrival + "T00:00:00Z");
        const departureTime = Date.parse(departure + "T00:00:00Z");

        const numberOfNights = (departureTime - arrivalTime) / (1000 * 60 * 60 * 24);

        if (rates.length !== numberOfNights) {
            setMessage("Rates are missing for one or more nights.");
            return null;
        }

        let multiplier;
        switch (reservationType) {
            case "prepaid":
                multiplier = 0.75;
                break;

            case "sixty_day":
                multiplier = 0.85;
                break;

            case "conventional":
                multiplier = 1.00;
                break;

            case "incentive": {
                const occupancy = await calculateAverageOccupancy();

                if (occupancy === null) {
                    return null;
                }
                multiplier = occupancy <= 60 ? 0.80 : 1.00;
                break;
            }

            default:
                return null;
        }

        const bookingNights = rates.map((rate) => {
            const baseRate = Number(rate.base_rate);

            const nightlyPrice = Math.round(baseRate * multiplier * 100) / 100;

            return {
                stay_date: rate.rate_date,
                base_rate_at_booking: baseRate,
                nightly_price: nightlyPrice
            };
        });
        const totalCost = Math.round(
            bookingNights.reduce(
                (total, night) => total + night.nightly_price, 0) * 100) / 100;

        return {
            totalCost,
            bookingNights
        };

    }

    async function calculateAverageOccupancy() {
        const response = await supabase
            .from("bookings")
            .select("arrival_date, departure_date, status")
            .lt("arrival_date", departure)
            .gt("departure_date", arrival)
            .in("status", ["pending", "confirmed"]);

        if (response.error) {
            setMessage(`Failed to retrieve occupancy: ${response.error.message}`);
            return null;
        }

        const bookings = response.data ?? [];

        const arrivalTime = Date.parse(arrival + "T00:00:00Z");
        const departureTime = Date.parse(departure + "T00:00:00Z");

        const numberOfNights =
            (departureTime - arrivalTime) / (1000 * 60 * 60 * 24);

        let totalReservedRooms = 0;

        for (let i = 0; i < numberOfNights; i++) {
            const stayDate = new Date(
                arrivalTime + i * 24 * 60 * 60 * 1000
            ).toISOString().split("T")[0];

            const reservedRooms = bookings.filter((booking) =>
                booking.arrival_date <= stayDate &&
                booking.departure_date > stayDate
            ).length;

            totalReservedRooms += reservedRooms;
        }

        return (totalReservedRooms / numberOfNights / 45) * 100;
    }


    async function handleCreateReservation(event) {
        event.preventDefault();
        if (busy) {
            return;
        }

        setMessage("");

        if (!confirmDayConditions()) {
            return;
        }

        if (!supabase) {
            setMessage(
                "Supabase is not configured locally. Use the preview links to explore without an account.",
            );
            return;
        }
        if (!id) {
            setMessage("Please log in before making a reservation.");
            return;
        }
        setBusy(true);

        try {
            const result = await calculateReservationCost();
            if (result === null) {
                return;
            }

            const cost = result.totalCost;
            const bookingNights = result.bookingNights;

            if (reservationType === "prepaid") {
                navigate("/payment", { state: { id, arrival, departure, cost, reservationType } })
                return;
            }

            const response = await supabase
                .from("bookings")
                .insert({
                    user_id: id,
                    arrival_date: arrival,
                    departure_date: departure,
                    reservation_type: reservationType,
                    status: "pending",
                    total_cost: cost
                })
                .select()
                .single();

            if (response.error) {
                setMessage(`Failed to create reservation: ${response.error.message}`);
                return;
            }

            const nightsToInsert = bookingNights.map((night) => ({
                ...night,
                booking_id: response.data.id
            }));

            const { error: nightsError } = await supabase
                .from("booking_nights")
                .insert(nightsToInsert);

            if (nightsError) {
                setMessage(`Failed to save nightly prices: ${nightsError.message}`);
                return;
            }

            setMessage("Reservation created");
        } catch (error) {
            setMessage(`An unexpected error occurred: ${error.message}`);

        } finally {
            setBusy(false);
        }
    }

    return (

        <form onSubmit={handleCreateReservation}>
            <label htmlFor="arrival"> Arrival Date </label>
            <input
                id="arrival"
                type="date"
                value={arrival}
                onChange={(event) => setArrival(event.target.value)}
                min={new Date().toISOString().split("T")[0]}
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

            <button type="submit" disabled={busy}>
                {busy ? "Making Reservation..." : "Make Reservation"}
            </button>

            <p role="alert">{message}</p>
        </form>
    )

}