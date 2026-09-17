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
  }, [dispatch, id]);


  // Rendered Component
  return (
    <>

      {isloading && <Loading />}

      <div className="InstructionPage">

        <h1 className="InstructionHeading">Mock Test Instructions</h1>

        <div className="InstructionContent">

          <p
            className="textFormatting"
            style={{ textAlign: "center" }}
          >
            Welcome to the JEE Mains Mock Test. Please read all instructions
            carefully before starting the test.
          </p>

          <p
            className="textFormatting"
            style={{
              textAlign: "center",
              marginTop: "10px",
              fontSize: "20px"
            }}
          >
            Important Instructions
          </p>

          <p className="textFormatting" style={{ marginTop: "10px" }}>
            1. Before Starting the Test:
          </p>
          <p>• Make sure you are ready to complete the test in a quiet environment.</p>
          <p>• Ensure that your internet connection is stable.</p>
          <p>• Close unnecessary tabs and applications to avoid interruptions.</p>
          <p>• Use a computer or laptop for the best experience.</p>

          <p className="textFormatting" style={{ marginTop: "10px" }}>
            2. Test Details:
          </p>
          <p>
            <span className="textFormatting">Duration:</span> 3 Hours
          </p>
          <p>
            <span className="textFormatting">Questions:</span> 75
            (25 each from Physics, Chemistry, and Mathematics)
          </p>
          <p>
            <span className="textFormatting">Total Marks:</span> 300
          </p>
          <p>
            <span className="textFormatting">Question Types:</span> MCQs and Numerical Type Questions
          </p>

          <p className="textFormatting" style={{ marginTop: "10px" }}>
            3. During the Test:
          </p>
          <p>• The timer will continue to run while the test is in progress.</p>
          <p>• You can move between Physics, Chemistry, and Mathematics sections.</p>
          <p>• You can review and change your answers before submitting the test.</p>
          <p>• For MCQs, select one option as your answer.</p>
          <p>• For Numerical Type Questions, enter your answer in the provided field.</p>

          <p className="textFormatting" style={{ marginTop: "10px" }}>
            4. Marking Scheme:
          </p>
          <p>• Correct answer: +4 marks.</p>
          <p>• Incorrect MCQ answer: -1 mark.</p>
          <p>• Unanswered questions: No marks are awarded.</p>

          <p className="textFormatting" style={{ marginTop: "10px" }}>
            5. Pause and Resume:
          </p>
          <p>
            • You can pause the test using the available Pause option.
          </p>
          <p>
            • When you resume the test, your previously saved answers will be restored.
          </p>
          <p>
            • The remaining time will be restored when you resume the test.
          </p>

          <p className="textFormatting" style={{ marginTop: "10px" }}>
            6. Submitting the Test:
          </p>
          <p>
            • Review your answers before submitting the test.
          </p>
          <p>
            • Once the test is submitted, you cannot change your answers.
          </p>
          <p>
            • Make sure you have completed all questions you want to attempt before submission.
          </p>

          <p
            className="textFormatting"
            style={{
              textAlign: "center",
              marginTop: "10px",
              fontSize: "20px"
            }}
          >
            Important Warning
          </p>

          <p>
            • Do not switch to other browser tabs or windows during the test.
          </p>
          <p>
            • Switching tabs may trigger a warning, and repeated violations can result
            in the test being submitted automatically.
          </p>
          <p>
            • Do not refresh or close the browser unnecessarily while the test is in progress.
          </p>
          <p>
            • Do not use unfair means or external help during the test.
          </p>
          <p>
            • Make sure you have a stable internet connection before starting.
          </p>

          <p
            className="textFormatting"
            style={{
              textAlign: "center",
              marginTop: "10px",
              fontSize: "20px"
            }}
          >
            Technical Instructions
          </p>

          <p className="textFormatting" style={{ marginTop: "10px" }}>
            1. Browser:
          </p>
          <p>
            Use Google Chrome or Mozilla Firefox on a computer or laptop for the best experience.
          </p>

          <p className="textFormatting" style={{ marginTop: "10px" }}>
            2. Internet Connection:
          </p>
          <p>
            Keep a stable internet connection throughout the test to avoid interruptions.
          </p>

          <p className="textFormatting" style={{ marginTop: "10px" }}>
            3. Technical Issues:
          </p>
          <p>
            If you face a technical issue, avoid repeatedly refreshing the page.
            Use the available resume option to continue your saved test when applicable.
          </p>

          <p
            className="textFormatting"
            style={{
              textAlign: "center",
              marginTop: "10px",
              fontSize: "20px"
            }}
          >
            Final Reminder
          </p>

          <p>
            Please make sure you understand these instructions before clicking the
            Start button. Once you are ready, click Start to begin the mock test.
          </p>

          <p>
            Good luck, and we hope this mock test helps you prepare for your JEE Mains!
          </p>

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
