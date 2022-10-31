import BrandCards from "../../components/BrandCards/BrandCards";
import Navbar from "../../components/navbar/navbar";
import "./index.css"

export default function Index() {
    return (
        <div>
            <Navbar/>
            <div className="center">
                <BrandCards/>
            </div>
        </div>
    );
}
