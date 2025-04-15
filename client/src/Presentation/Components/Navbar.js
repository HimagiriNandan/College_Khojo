//React file imports
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LiaUniversitySolid } from "react-icons/lia";
import { MdCancel } from "react-icons/md";

// components import
import Loading from '../Pages/Loading';

//slices import
import { resetUserData } from '../../Application/StateManagement/slices/UserSlice';
import { resetPrivateColleges } from '../../Application/StateManagement/slices/PrivateColleges';
import { resetTestData } from '../../Application/StateManagement/slices/MocktestSlice';
import { resetTimer } from '../../Application/StateManagement/slices/TimerSlice';
import { clearBooks } from '../../Application/StateManagement/slices/BookSlice';

//images import
import profile from '../Assests/profile.svg';
import home from '../Assests/navbar-icons/home.svg';
import exam from '../Assests/navbar-icons/exams.svg';
import materials from '../Assests/navbar-icons/materials.svg';

// css import
import '../Styles/Navbar.css';

// api import
import { userLogout } from '../../Application/Services/api';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [navbarActive, setNavbarActive] = useState("");
    const [loading, setLoading] = useState(false);
    const dropdownRef = useRef(null);
    const sidebarRef = useRef(null);
    
    
    const handleLogout = async () => {
        try {
            setLoading(true);
            const res = await userLogout();
            Cookies.remove('token');
            Cookies.remove('access-token');
            if(res.status === 200){
                dispatch(resetUserData());
                dispatch(resetPrivateColleges());
                dispatch(resetTestData());
                dispatch(resetTimer());
                dispatch(clearBooks());
                navigate("/signin");
            }
        } catch (error) {
            console.error("Logout failed:", error);
        } finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }

            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setShowSidebar(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const path = window.location.pathname;

        if (path.includes("/home")) {
            setNavbarActive("home");
        } else if (path === "/tests") {
            setNavbarActive("tests");
        } else if (path === "/materials") {
            setNavbarActive("materials");
        } else if (path === "/entrancexams") {
            setNavbarActive("entrancexams");
        } else if (path === "/helpandfeedback") {
            setNavbarActive("helpandfeedback");
        }
        console.log(path);
    }, [window.location.pathname]);

    const getLinkClass = (route) => navbarActive === route ? "nav-link nav-active" : "nav-link";

    return (
        <nav>
            
            <div ref={sidebarRef} className={`sidebar${showSidebar ? " sidebar-active" : ""}`}>
                <div className="sidebar-btn">
                    <button onClick={() => setShowSidebar(false)}>
                        <MdCancel color="#05B97D" size="1.5rem" />
                    </button>
                </div>
                <div className={getLinkClass("home")}>
                    <img src={home} alt="Home" />
                    <Link to="/home">Home</Link>
                </div>
                <div className={getLinkClass("tests")}>
                    <img src={exam} alt="Exams" />
                    <Link to="/tests">Tests</Link>
                </div>
                <div className={getLinkClass("materials")}>
                    <img src={materials} alt="Materials" />
                    <Link to="/materials">Materials</Link>
                </div>
                <div className={getLinkClass("entrancexams")}>
                    <LiaUniversitySolid className={"onHover"+(navbarActive==="entrancexams"? " hovered-on-hover":"")} />
                    <Link to="/entrancexams">Entrance Tests</Link>
                </div>
                <div className={getLinkClass("helpandfeedback")}>
                    <Link to="/helpandfeedback">? Help</Link>
                </div>
            </div>

            <div className="menu-btn">
                <h1 onClick={() => setShowSidebar(true)}>☰</h1>
            </div>

            <div className="logo">
                <h1>Khojo College</h1>
            </div>

            <div className="nav-links">
                <div className={getLinkClass("home")}>
                    <img src={home} alt="Home" />
                    <Link to="/home">Home</Link>
                </div>
                <div className={getLinkClass("tests")}>
                    <img src={exam} alt="Exams" />
                    <Link to="/tests">Tests</Link>
                </div>
                <div className={getLinkClass("materials")}>
                    <img src={materials} alt="Materials" />
                    <Link to="/materials">Materials</Link>
                </div>
                <div className={getLinkClass("entrancexams")}>
                    <LiaUniversitySolid className="onHover" />
                    <Link to="/entrancexams">Entrance Tests</Link>
                </div>
                <div className={getLinkClass("helpandfeedback")}>
                    <Link to="/helpandfeedback">? Help</Link>
                </div>
            </div>

            <div className="prof-btn" ref={dropdownRef}>
                <img
                    onClick={() => setShowDropdown(!showDropdown)}
                    src={profile}
                    alt="Profile"
                />
                {loading && <Loading />}
                <div className={`nav-dropdown${showDropdown ? " drop-active" : ""}`}>
                    <Link to="/profile">Profile</Link>
                    <Link style={{cursor:"pointer"}} onClick={handleLogout} >Logout</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
