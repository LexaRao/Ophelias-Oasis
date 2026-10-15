import "./NavBar.css"
import { Link } from "react-router-dom"
import { Outlet } from "react-router-dom";

function NavBar() {
    return (
        <div>
            {/*This will hold the links to different pages.*/}
            <nav className="navbar">
                <ul className="links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/reservation">Reservations</Link></li>
                </ul>
            </nav>

            <main>
                <Outlet/>
            </main>
        </div>

    );
}

export default NavBar;