import '../Styles/Footer.css';
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';


const Footer = () =>{
    const [contact, setContact] = useState("");
    const user = useSelector(state => state.user.data);
    const handleSubmit = (e) => {
        const res = axios.post("https://khojo-college-server.vercel.app/auth/contactus",{
            name : user.name,
            email : user.email,
            message : contact
        })
        console.log(contact);
        setContact("");
        alert("Message sent successfully");
    }
    return (
        <footer>
            <div id="footer-box" className="line">
            </div>

            <div className="footer-container">
                <div className="footer-left">
                    <div  className="footer-links">
                        <h1 className="footer-heading">Developers</h1>
                        <h2 className="footer-links">Sudharsan B</h2>
                        <h2 className="footer-links">Himagiri Nandan</h2>
                        <h2 className="footer-links">Ajay Verma</h2>
                    </div>
                    <div className="logo" id="first-footer">
                        <h1 >Khojo College</h1>
                    </div>
                </div>
                <div className="footer-left">
                    <div className="footer-links">
                        <h1 className="footer-heading">Pages</h1>
                        <a href="/home" className="footer-links">Home</a>
                        <a href="/tests" className="footer-links">Exams</a>
                        <a href="/materials" className="footer-links">Materials</a>
                        <a href="/helpandfeedback" className="footer-links">Help</a>
                        <a href="/#" className="footer-links">Contact Us</a>
                    </div>
                </div>
                <div id="footer-mob" className="footer-left">
                    <div className="footer-links">
                        <h1 className="footer-heading">Quick Links</h1>
                        <a href="/home" className="footer-links">About Us</a>
                        <a href="/profile" className="footer-links">Profile</a>
                        <a href="/#" className="footer-links">After +2</a>
                        <a href="/#" className="footer-links">Hero</a>
                        <a href="/#" className="footer-links">Colleges</a>
                    </div>
                </div>
                <div className="footer-left">
                    <h1 className="footer-heading">Contact Us</h1>
                    <textarea className="footer-textarea" placeholder="Enter your message"
                        onChange={(e) => setContact(e.target.value)} value={contact}
                    ></textarea>
                    <button style={{marginTop:"20px"}} className="herobutton" onClick={handleSubmit} >Send</button>
                </div>
            </div>

            <div className="line">
            </div>
            <h1 className="footer-bottom">2025 @ Copyrights</h1>

        </footer>
    )

}


export default Footer;