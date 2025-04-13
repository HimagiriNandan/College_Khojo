//React file imports
import { useEffect, useState } from 'react';

//components import
import Loading from '../Pages/Loading';

// css and animation import
import '../Styles/Hero.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Hero = () =>{
    const [isloading, setIsloading] = useState(true);

    useEffect(()=>{
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-in-out'
        });
        setIsloading(false);
    },[])

    return (
        <div className="hero">
            {isloading && <Loading />}
            <div className="hero-left">
                <h1 data-aos="fade-up">“Your future starts with the right choice. Let us guide you to the path that fits you best.”</h1>
                <button data-aos="fade-up"  data-aos-delay="400" className="herobutton">Find your Path</button>
            </div>
            <div className="hero-right">
                <div className="hero-img">
                    <img data-aos="fade-right" data-aos-delay="" className="pic1" src="https://res.cloudinary.com/duyuxtpau/image/upload/v1739687194/znqgjrasxxjncrxwfsxr.webp"  alt="hero" />
                    <img data-aos="fade-up" data-aos-delay="200"  className="pic2" src="https://res.cloudinary.com/duyuxtpau/image/upload/v1739687196/sgsjaipl6jfu1znpyj5r.webp" alt="hero" />
                </div>
                <div className="hero-img">
                    <img data-aos="fade-down" data-aos-delay="400" className="pic3" src="https://res.cloudinary.com/duyuxtpau/image/upload/v1739687194/tqxe56tpx4hqxaumimod.webp" alt="hero" />
                    <img data-aos="fade-left" data-aos-delay="600" className="pic4" src="https://res.cloudinary.com/duyuxtpau/image/upload/v1739687194/qt4bdidydegwjfpfttov.webp" alt="hero" />
                </div>
            </div>
            <div className="hero-right" id="hero-for-mobile-3">
                    <img data-aos="fade-right" data-aos-delay="" className="pic1" src="https://res.cloudinary.com/duyuxtpau/image/upload/v1739783423/user_profiles/zaknr1xab0k2aslahuge.webp "  alt="hero" />
            </div>
        </div>
    )
}



export default Hero;