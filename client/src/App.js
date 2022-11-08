import {BrowserRouter as Router, useRoutes} from "react-router-dom";
import React from 'react';
import Index from "./pages/index/index";
import Brands from "./pages/brand/brands";

function App() {
    // List of possible routes, paths containing a ":" can be used to pass parameters to the route
    return useRoutes([
        {path: "/", element: <Index/>},
        {path: "/brand/:brand", element: <Brands/>}
    ]);
}

// TODO: Hopefully figure out a way to make the navbar and footer not reload on every page change
export default function AppWrapper() {
    return (
        <Router>
            <App/>
        </Router>
    );
}

