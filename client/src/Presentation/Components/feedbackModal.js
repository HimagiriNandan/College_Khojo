import { useState, useEffect } from "react";
import "../Styles/feedbackModal.css";
import { MdCancel } from "react-icons/md";
import Loading from "../Pages/Loading";
import axios from "axios";
import { useSelector } from "react-redux";
const FeedbackModal = ({showModal}) => {
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [stat, setStat] = useState(false);
  const email = useSelector((state) => state.user.data.email);
  const [rating, setRating] = useState(0);
  async function submitFeedback(e){
    e.preventDefault();
    console.log(email);
    try{
      setIsloading(true);
      const res = await axios.post("https://khojo-college-server.vercel.app/auth/feedback", {
        name: username,
        email: email,
        message: description,
        rating: rating
      });
      if(res.status === 200){
        setStat(true);
      }else{
        setStat(false);
      }
    }catch(err){
      console.log(err);
    }finally{
      setIsloading(false);
    }
  }
  const handleUsername = (e) => {
    setUsername(e.target.value);
  }
  const handleDesc = (e) => {
    setDescription(e.target.value);
  }
  return (
    <div className="feedbackModalmain">
      {isloading && <Loading />}
      {stat ? 
        <div className="feedbackModal">
          <div className="cancelIcon" onClick={() => showModal(false)}>
            <MdCancel className="cancelIcon" color="#05B97D" size="1.5rem"/>
          </div>
          <h1 className="receivedFeedback">Thanks for your valuable feedback!!!</h1>
        </div>
      : 
      <div className="feedbackModal">
        <form onSubmit={(e) => submitFeedback(e)}>
          <div className="cancelIcon" onClick={() => showModal(false)}>
            <MdCancel className="cancelIcon" color="#05B97D" size="1.5rem"/>
          </div>
          <div style={{marginBottom: "15px"}}>
            <label className="feedbackmodallabels">Username: </label><br/>
            <input type="text" placeholder="Enter your name..." className="feedbackmodalinputs" value={username} onChange={handleUsername}></input><br/>
          </div>
          <div>
            <label className="feedbackmodallabels">Description: </label><br/>
            <textarea rows="6" placeholder="Give us your valuable feedbacks" className="feedbackmodalinputs" value={description} onChange={handleDesc}></textarea>
          </div>
          <div className="rating-container">
              <h3 style={{color: "#05B97D"}}>Rate Our Website:</h3>
              <div className="stars">
                  {[1, 2, 3, 4, 5].map((num) => (
                      <span
                          key={num}
                          className={num <= rating ? "star filled" : "star"}
                          onClick={() => setRating(num)}
                      >
                          ★
                      </span>
                  ))}
              </div>
          </div>
          <div className="btncontainer">
            <button type="submit" className="feedbackSubmitbtn">Submit</button>
          </div>
        </form>
      </div>
      }
      
    </div>
  )
}

export default FeedbackModal
