import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import "../Styles/style.css";
import { useSelector, useDispatch } from "react-redux";
import { setUserData, setUserId } from "../../Application/StateManagement/slices/UserSlice";
import Loading from "./Loading";
import { ToastContext } from "../../Application/Context";

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const {onToast} = useContext(ToastContext);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post("https://khojo-college-server.vercel.app/auth/login", {
                email,
                password
            }, { headers: { "Content-Type": "application/json" }, withCredentials: true });
            if (response.status === 200) {
                const respo = await axios.get("https://khojo-college-server.vercel.app/auth/profile", { withCredentials: true });
                onToast({msg: 'Login Successfull!!!', type: 'success'});
                dispatch(setUserData(respo.data.data));
                dispatch(setUserId(respo.data.data._id));
            }
            
            navigate("/home"); 
        } catch (err) {
            onToast({msg: err.response?.data?.message || "Invalid email or password", type: 'error'});
        } finally{
            setIsLoading(false);
        }
    }


    return (
        <div className="container">
            {isLoading && <Loading />}
            <div className="sign-in-content">
                <h1>Welcome!</h1>
                <div className="div-para">
                    <p className="subheading">Login to your account</p>
                </div>


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
