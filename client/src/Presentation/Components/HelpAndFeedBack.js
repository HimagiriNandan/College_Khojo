import "../Styles/HelpAndFeedBack.css";
import FeedbackModal from "./feedbackModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const HelpAndFeedBack = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1)); // Remove the '#' symbol
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);
  return (
    <>
    {showModal && <FeedbackModal showModal = {setShowModal}/>}
    <div className='helpandfeedbackMainContainer'>
      <div className="hfContent">
        <h1 className="feedbackHeading">Help And FeedBack</h1>
        <div>
        <h3 className="valuefeedback">We value your Feedback</h3>
        <p className="hfContentPara">Your feedback is essential for us to improve our platform and provide you with the best possible experience. We want to hear from you—whether you have suggestions, encountered problems, or simply want to share your thoughts.</p>
        </div>
        <div className="hfBtnContainer">
          <button className="hfBtn" onClick={(e) => setShowModal(true)}>FeedBack</button>
          <button onClick={()=>{ navigate("/home#footer-box")}} className="hfBtn">Contact Us</button>
        </div>
      </div>
      <div>
        <img src="https://res.cloudinary.com/duyuxtpau/image/upload/v1739688083/kfrhxsbkl1racym5pnhi.webp" alt="helpandfeedback" className="hfImage"/>
      </div>
    </div>
    </>
  )
}

export default HelpAndFeedBack
