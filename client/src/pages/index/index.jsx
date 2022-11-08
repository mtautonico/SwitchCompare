import BrandCards from "../../components/brand-cards";
import "./index.css"
import Navbar from "../../components/navbar";
import React from "react";
import Footer from "../../components/footer";

export default function Index() {
    return (
        <div>
            <div className="content">
                {/*The navbar has to be in the content div for some reason don't ask why kuz idk either im mad asf and
                 it's late ok*/}
                <Navbar/>
                <div className="center">
                    <BrandCards/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
