import './components-styles/brand-cards.css';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {QueryClient, QueryClientProvider, useQuery} from '@tanstack/react-query'

// We have to use react-query because useEffect is fucking shit
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
})

// React-query provider to make api calls without useEffect
export default function BrandCards() {
    return (
        <QueryClientProvider client={queryClient}>
            <Module/>
        </QueryClientProvider>
    )
}

function Module() {
    // I need this here to navigate to the next page
    const naviate = useNavigate();
    const [brands, setBrands] = useState([]);
    // Fetches the brands and adds them to the hooked list
    const response = useQuery(['response'], async () => {
        setBrands(((await (await fetch(`/api/brand`)).json()).data));
        // Something has to be returned don't ask why kuz idk either
        return "no";
    });
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
