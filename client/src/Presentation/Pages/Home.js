// React Imports
import { useEffect } from "react";

// Component Imports
import Hero from "../Components/Hero";
import About from "../Components/About";
import Paths from "../Components/Paths";
import FindCollege from "../Components/FindCollege";
import Footer from "../Components/Footer";

// Main Component
const Home = () =>{

    // UseEffects
    useEffect(()=>{
        if (window.location.hash === "#footer-box") {
            const element = document.getElementsByTagName("footer")[0];
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' ,offsetTop: 500});
            }
          }
    },[]);

    // Rendered Component
    return (
    <div >
        <Hero/>
        <About/>
        <div className="paths">
            <div className="heading-cont">
                <h1 className="heading">Paths after +12</h1>
                <Paths/>
            </div>
        </div>
        <FindCollege/>
        <Footer/>
    </div>
    )
}

export default Home;