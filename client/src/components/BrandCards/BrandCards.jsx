import './BrandCards.css';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function BrandCards() {
    // I need this here to navigate to the next page
    const naviate = useNavigate();
    const [brands, setBrands] = useState([]);
    // Fetches the brands and adds them to the hooked list
    const getBrands = async () => {
        try {
            const response = await
                fetch(`/api/brand`);
            const json = await response.json();
            setBrands(json.data);
        } catch (e) {
            console.error(e);
        }
    }
    // This runs on mount I think idk I didn't read the documentation for useEffect
    useEffect(() => {
        getBrands();
    }, []);
    return (
        <div>
            {/* Loops through every brand and creates a card for each with a map*/}
            {brands.map(brand => (
                <div key={brand.id} className="card"
                     onClick={() => {
                         naviate(`/brand/${brand.name.toLowerCase()}`)
                     }}>
                    <img className="cardLogo" src={brand.logo} alt={brand.name + " logo"}/>
                    <span className="cardText">{brand.name}</span>
                </div>))}
        </div>
    );
}
