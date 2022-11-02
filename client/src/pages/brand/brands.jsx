import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import "./brands.css";
import Navbar from "../../components/navbar/navbar";
import {QueryClient, QueryClientProvider, useQuery} from '@tanstack/react-query'

// We have to use react-query because useEffect is fucking shit
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
})

export default function Brands() {
    return (
        <QueryClientProvider client={queryClient}>
            <Module/>
        </QueryClientProvider>
    )
}

function Module() {
    const {brand} = useParams();
    const [switches, setSwitches] = useState([]);
    // Fetches the switches and adds them to the hooked list
    const response = useQuery(['response'], async () => {
        setSwitches(((await (await fetch(`/api/switch/${brand}`)).json()).data));
        // Something has to be returned don't ask why kuz idk either
        return "no";
    });
    console.log(switches)
    return (
        // TODO: Add icon signifying selected brand
        <div>
            <Navbar/>
            {/*Loops through the list of switches and creates a card for each entry*/}
            {switches.map(Switch => (
                // TODO: Create a table with the fetched switches
                <div key={Switch.id}>
                    <span>{Switch.brand}</span>
                    <br/>
                    <span>{Switch.model}</span>
                    <br/>
                    <img style={{width: "auto", height: "200px"}} src={Switch.image} alt={Switch.model + " image"}/>
                    <br/>
                </div>))}
        </div>
    )
}

