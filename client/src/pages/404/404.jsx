import './404.css';
import modCheck from "../../images/modCheck.gif";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

export default function FourOhFour() {
    return (
        <div>
            <div className="content">
                <Navbar/>
                {/*I inlined all of these kuz yea TODO: Make this not the way it currently is*/}
                <div style={{display: "flex", justifyContent: "center"}}>
                    <img style={{borderRadius: "10px", width: "10em", height: "auto"}} src={modCheck}
                         alt="modCheck"/>
                    <br/>
                </div>
                <span style={{display: "flex", justifyContent: "center"}}>Page not found</span>
            </div>
            <Footer/>
        </div>
    )
}