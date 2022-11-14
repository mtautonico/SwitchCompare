import {useParams} from "react-router-dom";
import {useState} from "react";
import "./brands.css";
import {QueryClient, QueryClientProvider, useQuery} from '@tanstack/react-query'
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import {
    Table, TableCell, TableContainer, TableHead, TableRow, TableBody, Paper, ThemeProvider, createTheme
} from "@mui/material";
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

// Function to create usable data for the mui table
function createData(id, brand, model, type, actuation_distance, bottom_distance, operating_force, bottom_force) {
    return {id, brand, model, type, actuation_distance, bottom_distance, operating_force, bottom_force};
}

// Functions to determine the order of sorting for the table
function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

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

    // Function to create the rows for the table for each switch
    const rows = switches.map((item) => {
        return createData(item.id, item.brand, item.model, item.type, item.actuation_distance, item.bottom_distance, item.operating_force, item.bottom_force);
    })

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
                    <div className="dataGrid">
                        {/*TODO: Style it with dark theme and make the width smaller*/}
                        <TableContainer component={Paper}>
                            <Table aria-label="SwitchTable">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell align="center">Brand</TableCell>
                                        <TableCell align="center">Model</TableCell>
                                        <TableCell align="center">Type</TableCell>
                                        <TableCell align="center">Actuation Distance</TableCell>
                                        <TableCell align="center">Bottom Distance</TableCell>
                                        <TableCell align="center">Operating Force</TableCell>
                                        <TableCell align="center">Bottom Force</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.number}>
                                            <TableCell component="th" scope="row">{row.id}</TableCell>
                                            <TableCell align="center">{row.brand}</TableCell>
                                            <TableCell align="center">{row.model}</TableCell>
                                            <TableCell align="center">{capitalizeFirstLetter(row.type)}</TableCell>
                                            <TableCell align="center">{parseFloat(row.actuation_distance)}</TableCell>
                                            <TableCell align="center">{parseFloat(row.bottom_distance)}</TableCell>
                                            <TableCell align="center">{parseFloat(row.operating_force)}</TableCell>
                                            <TableCell align="center">{parseFloat(row.bottom_force)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
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