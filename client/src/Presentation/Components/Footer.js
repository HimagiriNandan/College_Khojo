//React file imports
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// css import
import '../Styles/Footer.css';

// api imports
import { contactUs } from '../../Application/Services/api';

const Footer = () =>{
    const user = useSelector(state => state.user.data);
    const [contact, setContact] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await contactUs({
                name : user.name,
                email : user.email,
                message : contact
            })
            setContact("");
            if(res.status === 200){
                alert("Message sent successfully");
            }
        }catch(err){
            console.log("Error: " + err.message);
            alert("Please write something in the message and submit")
        }
        
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
                        <Link to="/home" className="footer-links">Home</Link>
                        <Link to="/tests" className="footer-links">Exams</Link>
                        <Link to="/materials" className="footer-links">Materials</Link>
                        <Link to="/helpandfeedback" className="footer-links">Help</Link>
                        <Link to="/#" className="footer-links">Contact Us</Link>
                    </div>
                </div>
                <div id="footer-mob" className="footer-left">
                    <div className="footer-links">
                        <h1 className="footer-heading">Quick Links</h1>
                        <Link to="/home" className="footer-links">About Us</Link>
                        <Link to="/profile" className="footer-links">Profile</Link>
                        <Link to="/#" className="footer-links">After 12th</Link>
                        <Link to="/#" className="footer-links">Hero</Link>
                        <Link to="/#" className="footer-links">Colleges</Link>
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