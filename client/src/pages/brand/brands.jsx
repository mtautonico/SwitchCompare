import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import "./brands.css";


export default function Brands() {
    const {brand} = useParams();
    const [switches, setSwitches] = useState([]);
    const getBrands = async () => {
        try {
            const response = await
                fetch(`/api/switch/${brand}`);
            const json = await response.json();
            setSwitches(json.data);
        } catch (e) {
            console.error(e);
        }
    }
    console.log(switches);
    useEffect(() => {
        getBrands();
    }, []);
    return (
        // TODO: Create a table with the fetched switches
        // TODO: Add icon signifying selected switch
        <span></span>
    )
}

