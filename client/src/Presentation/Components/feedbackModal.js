//React file imports
import { useState, useContext } from "react";
import { MdCancel } from "react-icons/md";

//component imports
import Loading from "../Pages/Loading";
import { ToastContext } from "../../Application/Context";

// css import
import "../Styles/feedbackModal.css";
import { giveFeedback } from "../../Application/Services/api";


const FeedbackModal = ({showModal}) => {
  const [description, setDescription] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [stat, setStat] = useState(false);
  const [rating, setRating] = useState(0);

  const { onToast } = useContext(ToastContext);


  async function submitFeedback(e) {
    e.preventDefault();

    try {
      setIsloading(true);

      const res = await giveFeedback({
        message: description,
        rating: rating
      });

      if (res.status === 200) {
        onToast({
          msg: res.data.message,
          type: "success"
        });

        setStat(true);
      } else {
        onToast({
          msg: res.data.message || "Unable to submit the feedback",
          type: "error"
        });

        setStat(false);
      }
    } catch (err) {
      onToast({
        msg:
          err.response?.data?.message ||
          "Unable to submit the feedback at the moment",
        type: "error"
      });
    } finally {
      setIsloading(false);
    }
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
          <div>
            <label className="feedbackmodallabels">Your Review : </label><br/>
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
