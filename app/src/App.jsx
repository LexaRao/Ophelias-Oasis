import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Reservation from "./Reservation";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import Payment from "./Payment";
import { Rooms, Gallery, About, Policies, NotFound } from "./pages/PublicPages";
import {
  GuestOverview,
  GuestReservations,
  ReservationDetails,
  GuestBills,
  GuestProfile,
} from "./pages/GuestPages";
import {
  StaffOverview,
  StaffReservations,
  StaffArrivals,
  StaffOccupancy,
  StaffBills,
  StaffTasks,
  StaffRates,
  StaffReports,
} from "./pages/StaffPages";
import PreviewLayout from "./components/PreviewLayout";
import { DemoProvider } from "./demo/DemoContext";
import "./App.css";

export default function App() {
  return (
    <DemoProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<NavBar />}>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/logIn" element={<LogIn />} />
            {/* Demo routes use local sample data, separate from live authentication. */}
            <Route
              path="/preview/guest"
              element={<PreviewLayout kind="guest" />}
            >
              <Route index element={<GuestOverview />} />
              <Route path="reservations" element={<GuestReservations />} />
              <Route
                path="reservation"
                element={<ReservationDetails kind="guest" />}
              />
              <Route path="bills" element={<GuestBills />} />
              <Route path="profile" element={<GuestProfile />} />
            </Route>
            <Route
              path="/preview/staff"
              element={<PreviewLayout kind="staff" />}
            >
              <Route index element={<StaffOverview />} />
              <Route path="reservations" element={<StaffReservations />} />
              <Route
                path="reservation"
                element={<ReservationDetails kind="staff" />}
              />
              <Route path="arrivals" element={<StaffArrivals />} />
              <Route path="occupancy" element={<StaffOccupancy />} />
              <Route path="bills" element={<StaffBills />} />
              <Route path="tasks" element={<StaffTasks />} />
              <Route path="rates" element={<StaffRates />} />
              <Route path="reports" element={<StaffReports />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DemoProvider>
  );
}
