import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/style.css";
import signInImage from "../Assests/SignIn-signUp/sign_in_image.png";
import {useSelector,useDispatch} from "react-redux";
import {setUserData} from "../../Application/StateManagement/slices/UserSlice";


export default function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setconfirmPassWord] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [otp, setOtp] = useState('');
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axios.post("https://khojo-college-server.vercel.app/auth/resetpassword", {
                email,
                password,
                confirmpassword
            }, { withCredentials: true });

            if(response.data.error === false){
                setError("");
                setOtpsection(true);
            }
            else{
                setError(response.data.message);
            }
            
            // const respo = await axios.post("https://khojo-college-server.vercel.app/auth/profile")
            // dispatch(setUserData(respo.data.user));
            // navigate("/home"); // Redirect after login
        } catch (err) {
            setError(err.response?.data?.message || "Invalid email or password");
        }
    }

    const [otpsection, setOtpsection] = useState(false);

    async function handleOTPSubmit(event) {
        event.preventDefault();
        try {
            const response = await axios.post("https://khojo-college-server.vercel.app/auth/verifyresetotp", {
                email,
                otp
            }, { withCredentials: true });

            if(response.data.error===false){
                setTimeout(() => navigate("/signin"), 1500);
            }
            else{
                setError("Invalid OTP");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Invalid OTP");
        }
    }


    return (
        <div className="container">
            {/* Left Side - Sign In Form */}
            {
                !otpsection ?

                <div className="sign-in-content">
                <h1>Welcome!</h1>
                <div className="div-para">
                <p className="subheading">Forget Password</p>
                </div>

                {error && <p className="error">{error}</p>}

                <form onSubmit={handleSubmit} className="sign-in-form">
                    <label>Email Address</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        // placeholder="Enter your email"
                    />

                    <label> New Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        // placeholder="Enter your password"
                    />

                    <label> Confirm Password</label>
                    <input 
                        type="confirm-password" 
                        value={confirmpassword} 
                        onChange={(e) => setconfirmPassWord(e.target.value)} 
                        // placeholder="Enter your password"
                    />

                    <a href="/signin" className="forgot-password">already know the password ?</a>

                    <button type="submit" style={{marginTop:"40px"}} className="herobutton">Update Password</button>

                </form>
            </div> :

            <div className="sign-in-content">
                <h1>Welcome!</h1>
                <div className="div-para">
                <p className="subheading">Verify Your OTP</p>
                </div>

                {error && <p className="error">{error}</p>}

                <form onSubmit={handleOTPSubmit} className="sign-in-form">
                    
                    <label>OTP</label>
                    <input 
                        type="confirm-password" 
                        value={otp} 
                        onChange={(e) => setOtp(e.target.value)} 
                        // placeholder="Enter your password"
                    />

                    <button type="submit" style={{marginTop:"40px"}} className="herobutton">Verify OTP</button>
                </form>
            </div>
        }

            {/* Right Side - Image */}
            <div className="sign-in-image">
                <img src={signInImage} alt="Educational theme" />
            </div>
        </div>
    );
}


