// TODO: Make this not look like shit
import "./navbar.css";

export default function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar__logo">
                <a href="/">
                    <img src={"/media/navbar-logo.png"} className="navlogo" alt="logo"/>
                </a>
            </div>
        </div>
    );
}