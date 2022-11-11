import {useParams} from "react-router-dom";
import {useState} from "react";
import "./brands.css";
import {QueryClient, QueryClientProvider, useQuery} from '@tanstack/react-query'
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
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

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'brand', headerName: 'Brand', width: 130},
        {field: 'model', headerName: 'Model', width: 130},
        {field: 'type', headerName: 'Type', width: 130},
        {field: 'actuation_distance', headerName: 'Actuation Distance', width: 130},
        {field: 'bottom_distance', headerName: 'Bottom Distance', width: 130},
        {field: 'operating_force', headerName: 'Operating Force', width: 130},
        {field: 'bottom_force', headerName: 'Bottom Force', width: 130},
    ]
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
                    <div style={{height: 400, width: '100%'}}>
                        <DataGrid
                            columns={columns}
                            rows={switches}
                            pageSize={5}
                            rowsPerPageOptions={[5]}/>
                    </div>
                </div>
                <Footer/>
            </div>
        )
        //  Output nothing when the data is still loading/determining if there should be data or modCheck
    } else {
        return (<div/>)
    }
}

