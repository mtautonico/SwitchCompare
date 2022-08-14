import {useParams} from "react-router-dom";
import {server_url} from "../index";
import "./brands.css";


function Brands() {
    const {brand} = useParams();
    return (
        <span>{brand}</span>
    )
}

export default Brands;