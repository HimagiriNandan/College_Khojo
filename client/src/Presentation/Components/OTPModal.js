//React file imports
import { useState, useContext } from "react";
import { MdCancel } from "react-icons/md";

// component imports
import Loading from "../Pages/Loading";

//css imports
import "../Styles/OTPModal.css"; 
import { ToastContext } from "../../Application/Context";


//api imports
import { verifyOTP } from "../../Application/Services/api";

const OTPModalSignUp = ({ email, setIsModalOpen, navigate, showModal }) => {

  const [otp, setOtp] = useState(["", "", "", "","",""]);
  const [isloading, setIsloading] = useState(false);

  const {onToast} = useContext(ToastContext);

  
  const handleOtpChange = (e, index) => {
    let newOtp = [...otp];
  
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        document.getElementById(`otp-${index - 1}`).focus();
        newOtp[index - 1] = "";
      }
    } else {
      newOtp[index] = e.target.value.slice(0, 1);
    }
  
    setOtp(newOtp);
    if (newOtp[index] !== "" && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleOTPSubmit = async (event) => {
    event.preventDefault();
    const otpString = otp.join("");
    setIsloading(true);

    try {
      const response = await verifyOTP(
        { email, otp: otpString },
      );

      if (response.data.message === "OTP verified successfully. Account created.") {
        setIsModalOpen(false);
        onToast({msg: 'OTP verified Successfully!!!', type: 'success'});
        setTimeout(() => navigate("/signin"), 1500); 

      } else {
        onToast({msg: 'please enter valid OTP', type: 'warning'});
      }
    } catch (err) {
        onToast({msg: err.response?.data?.message || "OTP verification failed", type: 'error'});
    } finally{
        setIsloading(false);
    }
  };

  return (
    <div className="OTPModalMain">
      {isloading && <Loading />} {/* Show loading indicator if OTP submission is in progress */}
      <div className="OTPModal">
        <div className="cancelIcon" onClick={() => showModal(false)}>
          <MdCancel className="cancelIcon" color="#05B97D" size="1.5rem" />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label className="EnterOtpLabel">Enter OTP received: </label>
          <div style={{justifyContent:"center", display:"flex"}}>
          <p style={{color:"#B6B6B6"}}>A OTP has been sent to your email !</p>
          </div>
          <div className="otp-container">
            {otp.map((digit, index) => (
              <input
                type="text"
                id={`otp-${index}`}
                key={index}
                className="otp-input"
                value={digit}
                maxLength="1"
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleOtpChange(e, index)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="OTPSubmitSection">
        <form onSubmit={handleOTPSubmit}>
          <div className="btncontainer">
            <button type="submit" className="OTPSubmitBtn">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPModalSignUp;
