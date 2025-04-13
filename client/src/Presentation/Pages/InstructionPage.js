// React Imports
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Slices Imports
import { setMockTestData } from "../../Application/StateManagement/slices/MocktestSlice";
import { resetTime, setTime } from "../../Application/StateManagement/slices/TimerSlice";

// Components Imports
import Loading from "./Loading";

// Styles Imports
import "../Styles/InstructionPage.css";

// Api Routes Imports
import { fetchMockTest, saveMockTest } from "../../Application/Services/api";


// Main Component
const InstructionPage = () => {
  // States and Variables
  const [testData, setTestData] = useState(useSelector((state) => state.mocktest.mockTestData));
  const [isloading, setIsloading] = useState(false);

  const id = useSelector((state) => state.timer.id);
  const user_id = useSelector((state) => state.user.id);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Functions
  async function onStart() {
    try {
      setIsloading(true);
      const res = await saveMockTest({
        userId: user_id,
        data: testData,
      });

      if (res.data.existing === true) {
        dispatch(setMockTestData(res.data.data));
        dispatch(setTime(res.data.data.timer));
        navigate("/test");
      } else {
        navigate("/test");
      }
    } catch (error) {
      console.error("Error starting the test: ", error);
    } finally {
      setIsloading(false);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setIsloading(true);
        const response = await fetchMockTest(
          { id: id }
        );
        const data = await response.data;
        if (!data) {
          console.log("Test data not found");
        } else {
          setTestData(data);
          dispatch(setMockTestData(data));
          dispatch(resetTime());
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setIsloading(false);
      }
    }
    if (id) fetchData();
  }, []);


  // Rendered Component
  return (
    <>

      {isloading && <Loading />}

      <div className="InstructionPage">

        <h1 className="InstructionHeading">Mock Test Instructions</h1>

        <div className="InstructionContent">
          <p className="textFormatting" style={{ textAlign: "center" }} > Welcome to the JEE Mains Mock Test! Follow the instructions carefully to ensure you have a smooth experience while taking the test.</p>


          <p className="textFormatting" style={{ textAlign: "center", marginTop: "10px", fontSize: "20px" }} > Test Details </p>
          <p> <span className="textFormatting">Total Duration:</span> 3 Hours </p>
          <p> <span className="textFormatting">Total Number of Questions:</span> 75{" "} (25 Questions each from Physics, Chemistry, and Mathematics) </p>
          <p> <span className="textFormatting">Type of Questions:</span> Multiple Choice Questions (MCQs) and Numerical Type Questions </p>
          <p> <span className="textFormatting">Total Marks:</span> 300 (4 Marks for each correct answer, -1 Mark for each wrong answer in MCQs)</p>


          <p className="textFormatting" style={{ textAlign: "center", marginTop: "10px", fontSize: "20px" }} >General Instructions</p>

          <p className="textFormatting" style={{ marginTop: "10px" }}> 1. Before Starting the Test: </p>
          <p>Ensure that you are in a quiet environment without distractions.</p>
          <p>Close any unnecessary tabs or applications to avoid interruptions.</p>
          <p>Check that your internet connection is stable for uninterrupted access to the test.</p>

          <p className="textFormatting" style={{ marginTop: "10px" }}> 2. Login: </p>
          <p>Use your registered credentials (username and password) to log into the mock test portal.</p>
          <p>If you encounter login issues, contact support immediately.</p>

          <p className="textFormatting" style={{ marginTop: "10px" }}> 3. Test Interface: </p>
          <p>The test will have a timer displayed on the top right corner, counting down from 180 minutes.</p>
          <p>There are 3 sections: Physics, Chemistry, and Mathematics.</p>
          <p>Section Navigation: You can switch between sections during the test. However, the timer will keep running continuously.</p>
          <p>You can review and change answers during the test until the test is submitted.</p>

          <p className="textFormatting" style={{ marginTop: "10px" }}> 4. Answering Questions:</p>
          <p>Multiple Choice Questions (MCQs): Select one correct answer from four options.</p>
          <p>Numerical Type Questions: Enter your answer in the provided space. No options are provided for these questions.</p>
          <p>Each question has a mark value of 4 for a correct answer and -1 for a wrong answer in MCQs.</p>

          <p className="textFormatting" style={{ marginTop: "10px" }}>5. Marking Questions:</p>
          <p>If you are unsure of an answer, you can mark it for review and come back to it later.</p>
          <p>The system will highlight any unanswered questions at the end, so you can choose to answer them before submission.</p>
          
          <p className="textFormatting" style={{ marginTop: "10px" }}>6. Submit Your Test:</p>
          <p>When you have finished, click the Submit button to finalize your answers. Once submitted, you cannot change your answers.</p>
          <p>Ensure that you have answered all questions you intend to answer before submitting.</p>



          <p className="textFormatting" style={{ textAlign: "center", marginTop: "10px", fontSize: "20px" }}>Technical Instructions</p>

          <p className="textFormatting" style={{ marginTop: "10px" }}>1. Browser Compatibility:</p>
          <p>For the best experience, use Google Chrome or Mozilla Firefox on a computer or laptop.</p>
          <p>Avoid using mobile phones or tablets for the test as it may affect the layout and functionality.</p>
          
          <p className="textFormatting" style={{ marginTop: "10px" }}>2. Time Limit:</p>
          <p>You will be given 180 minutes to complete the test. The timer will automatically start when you begin and will count down throughout the test.</p>
          <p>You cannot pause or stop the timer. The test will automatically end when the timer reaches zero.</p>

          <p className="textFormatting" style={{ marginTop: "10px" }}> 3. Resuming the Test:</p>
          <p>If you face any technical issues (e.g., the internet disconnects), you can log back in, and the test will resume from where you left off.</p>
          <p>However, be aware that the timer will still continue to run.</p>

          <p className="textFormatting" style={{ marginTop: "10px" }}>4. Results and Feedback:</p>
          <p>Once the test is submitted, you will receive a provisional score immediately.</p>
          <p>A detailed analysis will be available post-test, including the correct answers and explanations for all questions.</p>

          <p className="textFormatting" style={{ marginTop: "10px" }}> 5. Important Reminders:</p>
          <p>No cheating or unfair practices will be tolerated. This mock test is intended to simulate the actual exam environment.</p>
          <p>Ensure you have completed all sections before submitting your test.</p>
          <p>If you have any queries or encounter technical issues during the test, contact support immediately.</p>
          <p>Good luck, and we hope this mock test helps you prepare for your JEE Mains!</p>

        </div>
        <div className="InstructionBtns">
          <Link to="/tests">
            <button className="cancelBtn">Cancel</button>
          </Link>
          <button className="startBtn" onClick={onStart}>
            Start
          </button>
        </div>
      </div>
    </>
  );
};

export default InstructionPage;
