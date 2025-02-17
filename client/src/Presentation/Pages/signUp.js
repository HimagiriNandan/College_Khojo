import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/style1.css";
import OTPModalSignUp from "../Components/OTPModal";


export default function SignUp() {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [location, setLocation] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassWord] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    // const [otpsection, setOtpsection] = useState(false); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [otp, setOtp] = useState('');


    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/auth/signup", {
                name: fullName,
                email,
                location,
                password
            }, { withCredentials: true });

            if (response.data.message === "User registered successfully. Please verify OTP.") {
                setError("");
                setSuccess(response.data.message);
                setIsModalOpen(true);
            }
            else {
                setError(response.data.message);
            }


        } catch (err) {
            setError(err.response?.data?.message || "Signup failed");
        }
    }

    return (
        <>
            {isModalOpen && <OTPModalSignUp
                email={email}
                setIsModalOpen={setIsModalOpen}
                navigate={navigate}
                setError={setError}
                showModal={setIsModalOpen}
            />}

            <div className="signUp-container">
                {/* Left Side - Sign Un Form */}

                <div className="sign-up-content">

                    <h1>Welcome!</h1>
                    <p className="sign-up-subheading">create a free account</p>

                    {error && <p style={{color:"red", fontWeight:600}}>{error}!</p>}
                    {success && <p style={{color:"#05B79D", fontWeight:600}}>{success}</p>}

                    <form onSubmit={handleSubmit} className="sign-up-form">
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />


                        <label>Full Name</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}

                        />

                        <label>Location</label>
                        <select
                            name="location"
                            value={location}
                            onChange={(e) => { setLocation(e.target.value) }}
                        >
                            <option value="" disabled>Select Location</option>
                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                            <option value="Assam">Assam</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Chhattisgarh">Chhattisgarh</option>
                            <option value="Goa">Goa</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="Haryana">Haryana</option>
                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                            <option value="Jharkhand">Jharkhand</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Manipur">Manipur</option>
                            <option value="Meghalaya">Meghalaya</option>
                            <option value="Mizoram">Mizoram</option>
                            <option value="Nagaland">Nagaland</option>
                            <option value="Odisha">Odisha</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Sikkim">Sikkim</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Tripura">Tripura</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="Uttarakhand">Uttarakhand</option>
                            <option value="West Bengal">West Bengal</option>
                            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                            <option value="Chandigarh">Chandigarh</option>
                            <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                            <option value="Lakshadweep">Lakshadweep</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Puducherry">Puducherry</option>
                        </select>

                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                            title="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
                            required
                        // className={passwordError ? "input-error" : ""}
                        />
                        {/* {passwordError && <p style={{color:"red" , fontWeight:400}}>{passwordError}</p>} */}


                        <label>Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setconfirmPassWord(e.target.value)}

                            onBlur={(e) => {
                                if (e.target.value !== password) {
                                    e.target.setCustomValidity("Passwords do not match!");
                                } else {
                                    e.target.setCustomValidity("");
                                }
                            }}
                            required
                        />


                        <button type="submit" className="sign-up-btn">Sign Up</button>

                        <p className="signin-link">Already have an account? <a href="/signin">Sign in</a></p>
                    </form>
                </div>


                {/* Right Side - Image */}
                <div className="sign-up-image">
                    <img src="https://res.cloudinary.com/duyuxtpau/image/upload/v1739688085/a0lw8uv3cny5efun3ksq.webp" alt="Educational theme" />
                </div>
            </div>
        </>
    );
}
