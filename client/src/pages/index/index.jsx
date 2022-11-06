import BrandCards from "../../components/brand-cards";
import "./index.css"
import Navbar from "../../components/navbar";
import React from "react";
import Footer from "../../components/footer";

export default function Index() {
    return (
        <div>
            <div className="content">
                <Navbar/>
                <div className="center">
                    <BrandCards/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
