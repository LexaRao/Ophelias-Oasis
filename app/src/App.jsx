import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Reservation from "./Reservation";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import Payment from "./Payment";
import { Rooms, Gallery, About, Policies, NotFound } from "./pages/PublicPages";
import TemplatePage from "./components/TemplatePage";
import PreviewLayout from "./components/PreviewLayout";
import { guestPages, staffPages } from "./previewPages";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NavBar />}>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/payment" element={<Payment />} />

          {/* Preview routes are separate from real account authentication. */}
          <Route path="/preview/guest" element={<PreviewLayout kind="guest" />}>
            {guestPages.map((page) => (
              <Route
                key={page.slug}
                index={page.slug === ""}
                path={page.slug || undefined}
                element={<TemplatePage {...page} />}
              />
            ))}
          </Route>

          <Route path="/preview/staff" element={<PreviewLayout kind="staff" />}>
            {staffPages.map((page) => (
              <Route
                key={page.slug}
                index={page.slug === ""}
                path={page.slug || undefined}
                element={<TemplatePage {...page} />}
              />
            ))}
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
