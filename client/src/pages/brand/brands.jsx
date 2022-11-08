import {useParams} from "react-router-dom";
import {useState} from "react";
import "./brands.css";
import {QueryClient, QueryClientProvider, useQuery} from '@tanstack/react-query'
import FourOhFour from "../404/404";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

// We have to use react-query because useEffect is fucking shit
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
})

// React-query provider to make api calls without useEffect
export default function Brands() {
    return (
        <QueryClientProvider client={queryClient}>
            <Module/>
        </QueryClientProvider>
    )
}

function Module() {
    // Get the brand name from the url
    const {brand} = useParams();
    const [switches, setSwitches] = useState([]);
    const [isSwitchesEmpty, setIsSwitchesEmpty] = useState(null);
    // Fetches the switches and adds them to the hooked list
    const response = useQuery(['response'], async () => {
        let res = ((await (await fetch(`/api/switch/${brand}`)).json()).data)
        // This is to prevent glitchy outputs when the page is loading
        if (res.length === 0) {
            setIsSwitchesEmpty(true);
        } else {
            setIsSwitchesEmpty(false);
            setSwitches(res);
        }
        // Something has to be returned don't ask why kuz idk either
        return "no";
    });
    console.log(switches)
    // If the switches are empty then it will return modCheck
    if (isSwitchesEmpty === true) {
        return (
            <FourOhFour/>
        )
        // Put the table if there is data in the request
    } else if (isSwitchesEmpty === false) {
        return (
            // TODO: Add icon signifying selected brand
            <div>
                <div className="content">
                    <Navbar/>
                    <table cellSpacing="0" className="switchTable">
                        <tbody>
                        <tr className="switchTableHeader">
                            <th className="headerItem borderTopLeft">Brand</th>
                            <th className="headerItem">Model</th>
                            <th className="headerItem switchType">Type</th>
                            <th className="headerItem">Actuation Distance</th>
                            <th className="headerItem">Bottom Distance</th>
                            <th className="headerItem">Operating Force</th>
                            <th className="headerItem borderTopRight">Bottom Force</th>
                        </tr>
                        {/*Create table data using .map to make a data entry for each item from the API request*/}
                        {switches.map(Switch => (
                            // TODO: Create a table with the fetched switches
                            <tr key={Switch.id} className="switchTableData">
                                <td>{Switch.brand}</td>
                                <td>{Switch.model}</td>
                                {/*The class fixes the "Type" field not being capitalized*/}
                                <td className="switchType">{Switch.type}</td>
                                {/* "Math.trunc" is needed to fix the decimal place*/}
                                <td>{Math.trunc(Switch.actuation_distance)}mm</td>
                                <td>{Math.trunc(Switch.bottom_distance)}mm</td>
                                <td>{Switch.operating_force}g</td>
                                <td>{Switch.bottom_force}g</td>
                            </tr>))}
                        </tbody>
                    </table>
                </div>
                <Footer/>
            </div>
        )
        //  Output nothing when the data is still loading/determining if there should be data or modCheck
    } else {
        return (<div/>)
    }
}

