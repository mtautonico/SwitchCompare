import './BrandCards.css';
import {useEffect, useState} from "react";

function BrandCards() {
    const [brands, setBrands] = useState([]);
    const getBrands = async () => {
        try {
            const response = await
                fetch("http://127.0.0.1:8000/api/brand");
            const json = await response.json();
            setBrands(json.data);
        } catch (e) {
            console.error(e);
        }
    }
    useEffect (() => {
        getBrands();
    }, []);
    console.log(data);
    return (
        <div>
            <span></span>
        </div>
    )
}

export default BrandCards