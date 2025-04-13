//React file imports
import { useEffect } from 'react';

// css and animation import
import '../Styles/About.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {

    useEffect(()=>{
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-in-out'   
        })
    },[])

    return (
        <div className="about">
            <img data-aos="fade-right" src="https://res.cloudinary.com/duyuxtpau/image/upload/v1739688086/a4vw3rhc7uz0tvsf0vfj.webp" alt="about"/>
            <div className="about-right">
                <h1 data-aos="zoom-in" data-aos-delay="200" className="heading">About Us</h1>
                <p data-aos="zoom-in" data-aos-delay="200" className="explanation">We help students navigate college admissions by offering personalized recommendations based on their JEE Mains and other competitive exam scores. Our platform also provides mock tests with detailed explanations to help students prepare effectively. Whether you're aiming for top colleges or improving your scores, we're here to support your journey.</p>
            </div>
        </div>
    );
}

export default About;