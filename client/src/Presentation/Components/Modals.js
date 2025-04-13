//React file imports
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

//slices import
import { startTime, resetTime } from "../../Application/StateManagement/slices/TimerSlice";

// css import
import "../Styles/Modals.css"
import "../Styles/feedbackModal.css";


const StartTestModal = ({showModal, confirmation, id}) => {
  const navigate = useNavigate();
  const disptach = useDispatch();

  const cancelTest= () => {
    showModal()
  }

  function handleStart(){
    confirmation("start");
    disptach(startTime(id));
    disptach(resetTime());
    navigate("/instructionpage");
  }
  return (
    <div className="feedbackModalmain" id="Modal-background">
      <div className="feedbackModal" id="startModal">
        <div>
          <p className="confirmation-text">Are you ready to start the test?</p>
          <div className="start-modal-button-container">
            <button className="start-modal-btns" id="cancel-btn" onClick={() => {cancelTest()}}>Cancel</button>
            <button className="start-modal-btns" id="start-btn" onClick={() => {handleStart()}}>Start Test</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StartTestModal