// TODO: Make this not look like shit
import "./components-styles/navbar.css";
import {useNavigate} from "react-router-dom";
import logo from "../images/navbar-logo.png";

export default function Navbar() {
    // I need this to navigate to the home page
    const navigate = useNavigate();
    return (
        <div className="navbar">
            {/*I have 2 divs next to eachother kuz I might add shit later idk, only time will tell*/}
            <div className="navbar_logo">
                <a href="#" onClick={() => navigate('/')}>
                    <img src={logo} className="navlogo" alt="logo"/>
                </a>
            </div>
        </div>
    );
}