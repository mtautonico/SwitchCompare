import {BrowserRouter as Router, useRoutes, useNavigate} from "react-router-dom";
import React from 'react';
import Index from "./pages/index/index";
import Brands from "./pages/brand/brands";

function App() {
    // I need this here to redirect
    const navigate = useNavigate();
    // List of possible routes, paths containing a ":" can be used to pass parameters to the route
    return useRoutes([
      {path: "/", element: <Index/>},
      {path: "/brand/:brand", element: <Brands/>}
  ]);
}

function AppWrapper () {
    return (
        <Router>
            <App/>
        </Router>
    );
}

export default AppWrapper;
