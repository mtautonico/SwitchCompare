// TODO: Make this not look like shit
import "./navbar.css";
import {useNavigate} from "react-router-dom";
import logo from "../../images/navbar-logo.png";

export default function Navbar() {
    const navigate = useNavigate();
    return (
        <div className="navbar">
            <div className="navbar__logo">
                <a href="#" onClick={() => navigate('/')}>
                    <img src={logo} className="navlogo" alt="logo"/>
                </a>
            </div>
        </div>
    );
}