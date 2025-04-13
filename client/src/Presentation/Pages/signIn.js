import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import "../Styles/style.css";
import { useSelector, useDispatch } from "react-redux";
import { setUserData, setUserId } from "../../Application/StateManagement/slices/UserSlice";


export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [hidePassword, setHidePassword] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axios.post("https://khojo-college-server.vercel.app/auth/login", {
                email,
                password
            }, { headers: { "Content-Type": "application/json" }, withCredentials: true });
            console.log(response);
            if (response.status === 200) {
                const respo = await axios.get("https://khojo-college-server.vercel.app/auth/profile", { withCredentials: true });
                console.log(respo);
                dispatch(setUserData(respo.data.data));
                dispatch(setUserId(respo.data.data._id));
            }
            navigate("/home");
        } catch (err) {
            setError(err.response?.data?.message || "Invalid email or password");
        }
    }


    return (
        <div className="container">
            {/* Left Side - Sign In Form */}
            <div className="sign-in-content">
                <h1>Welcome!</h1>
                <div className="div-para">
                    <p className="subheading">Login to your account</p>
                </div>

                {error && <p style={{ color: "red", fontWeight: 600 }}>{error} !</p>}

                <form onSubmit={handleSubmit} className="sign-in-form">
                    <label>Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        // placeholder="Enter your email"
                        required
                    />

                    <label>Password</label>
                    <div className="sign-in-password-field">
                        <input
                            type={hidePassword ? "password" : "text"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span
                            className="sign-in-eye-icon"
                            onClick={() => setHidePassword(!hidePassword)}
                        >
                            {hidePassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
             
                    <a href="/forgetpassword" className="forgot-password">Forget Password?</a>

                    <button type="submit" className="sign-in-btn">Sign in</button>

                    <p className="signup-link">Don't have an account? <a href="/signup">Sign up</a></p>
                </form>
            </div>

            {/* Right Side - Image */}
            <div className="sign-in-image">
                <img src="https://res.cloudinary.com/duyuxtpau/image/upload/v1739688085/eyvitigtz2x8nphsj6i6.webp" alt="Educational theme" />
            </div>
       </div>
    );
}
