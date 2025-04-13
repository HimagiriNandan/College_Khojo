import { useEffect, useState } from "react";
import "../Styles/Test.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { setQuestionindex, setSubindex } from "../../Application/StateManagement/slices/MocktestSlice";
import "../Styles/AnalysisPage.css";
const Analysis = () => {
  const { index } = useParams();
  const parsedIndex = Number(index);
  const attemptedMocks = useSelector((state) => state.user.data?.attempted_mocks || []);
  const data = attemptedMocks[parsedIndex] || { sections: [] }; // Fallback to avoid undefined errors

  const [subject, setSubject] = useState("Physics");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const subIndex = useSelector((state) => state.mocktest.subjectIndex);
  const questionIndex = useSelector((state) => state.mocktest.questionIndex);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  function onPrevious(){
    if(questionIndex > 0){
      dispatch(setQuestionindex({ questionIndex: questionIndex - 1 }));
    }
  }
  function onNext(){
    if(questionIndex < 24){
      dispatch(setQuestionindex({ questionIndex: questionIndex + 1 }));
    }
  }

  useEffect(()=>{
    setSubject(data.sections[subIndex].name);
  }, [subIndex]);
  return (
    <div className="testPage">
      <button className={`toggle-sidebar-btn ${sidebarOpen ? " colouring" : ""}`} onClick={toggleSidebar}>
        {sidebarOpen ? "\u2715" : "\u2630"}
      </button>
      <div className={`test-sidebar2 ${sidebarOpen ? " test-open" : ""}`}>
        <h2 className="selected-subject">{subject}</h2>
        <div className={`test-sidebar ${sidebarOpen ? "test-sidebartoopen" : ""}`}>
          {[...Array(25)].map((_, index) => {
            const isAnswered = data?.sections?.[subIndex]?.questions?.[index]?.selectedOption !== "";
            const isActive = questionIndex === index;

            return (
              <button
                className={`herobutton ${isAnswered ? "answered-btn2" : "not-hero-btn"} ${isActive ? "active-btn2" : ""}`}
                id="test-nav-btn1"
                key={index}
                onClick={() => {
                  dispatch(setQuestionindex({ questionIndex: index }));
                  window.location.reload();
                }}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>

      <div className="test-container">
        <div className="test-header">
          <h1>{data.title}</h1>
        </div>
        <div className="test-header2">
          <button
            className={"herobutton" + (subIndex !== 2 ? " test-disabled" : "")}
            id="test-nav-btn"
            onClick={() => {
              setSubject("Maths");
              dispatch(setSubindex({ subIndex: 2 }));
              dispatch(setQuestionindex({ questionIndex: 0 }));
            }}
          >
            Maths
          </button>
          <button
            className={"herobutton" + (subIndex !== 0 ? " test-disabled" : "")}
            id="test-nav-btn"
            onClick={() => {
              setSubject("Physics");
              dispatch(setSubindex({ subIndex: 0 }));
              dispatch(setQuestionindex({ questionIndex: 0 }));
            }}
          >
            Physics
          </button>
          <button
            className={"herobutton" + (subIndex !== 1 ? " test-disabled" : "")}
            id="test-nav-btn"
            onClick={() => {
              setSubject("Chemistry");
              dispatch(setSubindex({ subIndex: 1 }));
              dispatch(setQuestionindex({ questionIndex: 0 }));
            }}
          >
            Chemistry
          </button>
        </div>

        <div className="test-body">
          <h1>Question {questionIndex + 1}.</h1>
          <h2>{data?.sections?.[subIndex]?.questions?.[questionIndex]?.question || ""}</h2>
          {data?.sections?.[subIndex]?.questions?.[questionIndex]?.question_image && (
            <img
              src={data.sections[subIndex].questions[questionIndex].question_image}
              className="test-question-image"
              alt="Question"
            />
          )}
          <div className="test-options">
            {["a", "b", "c", "d"].map((option, index) => {
              const question = data?.sections?.[subIndex]?.questions?.[questionIndex];
              const selectedOption = question?.selectedOption;
              const correctOption = question?.correctOption;

              let optionClass = "test-option"; // Default class

              if (selectedOption === "") {
                optionClass += option === correctOption ? " correct-highlight" : "";
              } else if (selectedOption !== correctOption) {
                if (option === correctOption) {
                  optionClass += " correct-answer"; // Green for correct answer
                } else if (option === selectedOption) {
                  optionClass += " wrong-answer"; // Red for selected wrong answer
                }
              } else if (selectedOption === correctOption) {
                optionClass += option === correctOption ? " correct-answer" : "";
              }

              return (
                <div key={index} className={optionClass}>
                  <div style={{ display: "flex", padding: "1%", paddingLeft: "7px", borderRadius: "10px" }}>
                    <p style={{ paddingRight: "6px" }}>{option.toUpperCase()}</p>
                    <p>{question?.options?.[option] || ""}</p>
                    {question?.options?.[`${option}_image_link`] && (
                      <img src={question.options[`${option}_image_link`]} alt={`Option ${option}`} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="test-header" id="test-buttons">
            <button className="herobutton" id="test-nav-btn" onClick={() => {onPrevious()}}>
              Previous
            </button>
            <button className="herobutton" id="test-nav-btn" onClick={() => {onNext()}}>
              Next
            </button>
          </div>
          <div className="explanation-container">
            <h2>Explanation for this question:</h2>
            <p>{data?.sections?.[subIndex]?.questions?.[questionIndex]?.explanation || ""}</p>
            {data?.sections?.[subIndex]?.questions?.[questionIndex]?.explanation_image && (
              <img
                src={data.sections[subIndex].questions[questionIndex].explanation_image}
                className="test-question-image"
                alt="Explanation"
              />
            )}
          </div>
          <div className="submit-container">
            <button className="herobutton" id="submit-nav-btn" onClick={() => navigate("/tests")}>
              Go to Tests
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
