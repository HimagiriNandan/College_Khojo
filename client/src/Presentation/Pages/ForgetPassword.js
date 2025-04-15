// React Imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Styles and Images Imports
import "../Styles/style.css";
import signInImage from "../Assests/SignIn-signUp/sign_in_image.png";

// Main Component
export default function ForgetPassword() {
    // States and  Variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setconfirmPassWord] = useState('');
    const [error, setError] = useState('');
    const [otp, setOtp] = useState('');

    const [otpsection, setOtpsection] = useState(false);

    const navigate = useNavigate();

    // Functions
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/auth/resetpassword", {
                email,
                password,
                confirmpassword
            }, { withCredentials: true });

            if (response.data.error === false) {
                setError("");
                setOtpsection(true);
            }
            else {
                setError(response.data.message);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Invalid email or password");
        }
    }

    async function handleOTPSubmit(event) {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/auth/verifyresetotp", {
                email,
                otp
            }, { withCredentials: true });

            if (response.data.error === false) {
                setTimeout(() => navigate("/signin"), 1500);
            }
            else {
                setError("Invalid OTP");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Invalid OTP");
        }
    }

    // Rendered Component
    return (
        <div className="container">
            {
                !otpsection ?
                    (
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
                            />

                            <label> New Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <label> Confirm Password</label>
                            <input
                                type="confirm-password"
                                value={confirmpassword}
                                onChange={(e) => setconfirmPassWord(e.target.value)}
                            />

                            <a href="/signin" className="forgot-password">already know the password ?</a>

                    <button type="submit" style={{marginTop:"40px"}} className="herobutton">Update Password</button>

                        </form>
                    </div>
                    )
                    :
                    (
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
                            />

                            <button type="submit" style={{ marginTop: "40px" }} className="herobutton">Verify OTP</button>
                        </form>
                    </div>
                    )
            }

            <div className="sign-in-image">
                <img src={signInImage} alt="Educational theme" />
            </div>
        </div>
    );
}


