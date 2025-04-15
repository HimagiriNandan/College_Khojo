import { useState, useEffect, useContext } from "react"
import "../Styles/Test.css"
import { useDispatch, useSelector } from "react-redux";
import { decrementTime, autoSubmit, submitTest, startTime, setTime } from "../../Application/StateManagement/slices/TimerSlice";
import { selectOption, clearOption, setQuestionindex, setSubindex, resetTestData } from "../../Application/StateManagement/slices/MocktestSlice";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { setUserData, setUserId } from "../../Application/StateManagement/slices/UserSlice";
import axios from "axios";
import { ToastContext } from "../../Application/Context";
const Test = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState(useSelector((state) => state.mocktest.data));
  const [subIndex, setSubIndex] = useState(useSelector(state => state.mocktest.subjectIndex)); // subject index
  const [questionIndex, setQuestionIndex] = useState(useSelector(state => state.mocktest.questionIndex)); // question index
  const [subject, setSubject] = useState(data.sections[subIndex].name);
  const [ghost, setGhost] = useState(false);
  const [selectedoption, setSelectedoption] = useState("");

  const dispatch = useDispatch();
  const user_id = useSelector((state) => state.user.id);
  const testData = useSelector((state) => state.mocktest.data);
  const time = useSelector((state) => state.timer.time);
  const testSubmitted = useSelector((state) => state.timer.testSubmitted);
  const [isloading, setIsloading] = useState(false);
  const userid = useSelector((state) => state.user.id);

  const { onToast } = useContext(ToastContext);

  const navigate = useNavigate();

  const formatTime = (seconds) => { // gives format as HH:MM:SS
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }
  useEffect(() => {
    setSubject(data.sections[subIndex].name);
  },[subIndex]);
  
  useEffect(() => {
    if(testSubmitted) return;
    if(time <= 0){
      dispatch(autoSubmit());
      return;
    }
    const timer = setInterval(() => {
      dispatch(decrementTime());
    }, 1000);
    return () => clearInterval(timer);
  }, [testSubmitted, time, dispatch]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  async function fetchData(){
    try{
      setIsloading(true);
      const res = await axios.post('https://khojo-college-server.vercel.app/mock/addMocktoUser', {
        userId: user_id,
        data: testData,
        timer: time,
        change: "modify",
      });
      console.log(res);
      if(res.status === 200){
        onToast({msg: 'Test Paused Successfully!!!', type: 'success'});
      }
      navigate("/tests");
    }catch(err){
      onToast({msg: 'Error Resuming the test', type: 'error'});
    }finally{
      setIsloading(false);
    }
  }


  async function onTestEnd(istabSwitched){
    try{
      setIsloading(true);
      const res = await axios.post('https://khojo-college-server.vercel.app/mock/addAttemptedMocktoUser', {userId : userid, data: testData});
      const response = await axios.get("https://khojo-college-server.vercel.app/auth/profile", { withCredentials: true });
      dispatch(setUserData(response.data.data));
      dispatch(setUserId(response.data.data._id));
      if(res.status === 200){
        setSubIndex(0);
        setQuestionIndex(0);
        navigate("/tests");
        if(!istabSwitched){
          onToast({msg: 'Test Submitted Successfully...', type: 'success'});
        }
      }
      resetTestData();
    }catch(err){
      onToast({ msg: 'Unable to submit the test', type: 'error'});
    }finally{
      setIsloading(false);
    }
  }

  useEffect(() => {
    dispatch(startTime());
  }, []);

  function reloadfunc(){
    setIsloading(false);
    window.location.reload();
    setIsloading(true);
  }

  function onPrevious(){
    if(questionIndex > 0){
      dispatch(setQuestionindex({ questionIndex: questionIndex - 1 }));
      reloadfunc();
    }
  }
  function onNext(){
    if(questionIndex < 24){
      dispatch(setQuestionindex({ questionIndex: questionIndex + 1 }));
      reloadfunc();
    }
  }

  useEffect(() => {
    let switchCount = 0;
  
    const handleVisibilityChange = () => {
      if (document.hidden) {
        switchCount += 1;
  
        if (switchCount === 1) {
          onToast({ msg: "First warning: Don't switch tabs!", type: "warning" });
        } else if (switchCount === 2) {
          onToast({ msg: "Second warning: One more and the test will be submitted!", type: "warning" });
        } else if (switchCount >= 3) {
          onToast({ msg: "Test submitted due to tab switching!", type: "error" });
          onTestEnd(true);
        }
      }
    };
  
    document.addEventListener("visibilitychange", handleVisibilityChange);
  
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [onToast]);
  

  return (
    <>
      {isloading && <Loading />}
      <div className="testPage">
        <button className={`toggle-sidebar-btn ${sidebarOpen ? " colouring": ""}`} onClick={toggleSidebar}>
          {sidebarOpen ? '\u2715' : '\u2630'}
        </button>
        <div className={`test-sidebar2 ${sidebarOpen ? " test-open" : ""}`}>
          <h2 className="selected-subject">{subject}</h2>
          <div className={`test-sidebar ${sidebarOpen ? "test-sidebartoopen" : ""}`}>
            {[...Array(25)].map((_, index) => {
              const isAnswered = data.sections[subIndex].questions[index].selectedOption !== "";
              const isActive = questionIndex === index; // Check if this button represents the currently selected question

              return (
                <button
                  className={`herobutton ${isAnswered ? " answered-btn2" : "not-hero-btn"} ${isActive ? "active-btn2" : ""}`}
                  id="test-nav-btn1"
                  key={index}
                  onClick={() => {dispatch(setQuestionindex({questionIndex: index})); reloadfunc()}}
                >
                  {index + 1}
                </button>
              );
            })}

          </div>
        </div>
        <div className = "tag" id="time-tag">
        {formatTime(time)}
        </div>
        <div className="test-container">
          <div className="test-header">
            <h1>Mock Test</h1>
          </div>
          <div className="test-header2">
            <button className={"herobutton" + (subIndex !== 2 ? " test-disabled" : "")} id="test-nav-btn" onClick={(e) => {dispatch(setSubindex({subIndex: 2})); dispatch(setQuestionindex({questionIndex: 0})); reloadfunc()}}>Maths</button>
            <button className={"herobutton" + (subIndex !== 0 ? " test-disabled" : "")} id="test-nav-btn" onClick={(e) => {dispatch(setSubindex({subIndex:0})); dispatch(setQuestionindex({questionIndex: 0})); reloadfunc();}}>Physics</button>
            <button className={"herobutton" + (subIndex !== 1 ? " test-disabled" : "")} id="test-nav-btn" onClick={(e) => {dispatch(setSubindex({subIndex:1})); dispatch(setQuestionindex({questionIndex: 0})); reloadfunc();}}>Chemistry</button>
          </div>
          
              
            <div className="test-body">
            <h1>Question {questionIndex+1}.</h1>
            <h2>{data.sections[subIndex].questions[questionIndex].question}</h2>
            {data.sections[subIndex].questions[questionIndex].question_image !== "" && <img src={data.sections[subIndex].questions[questionIndex].question_image} className="test-question-image"/>}
            <div className="test-options">
              <div className={"test-option" + (ghost === true ? (selectedoption === "a" ? " test-opt-enabled" : "") : ("a" === data.sections[subIndex].questions[questionIndex].selectedOption ? " test-opt-enabled" : ""))} onClick={(e) => {dispatch(selectOption({subIndex, questionIndex, option: "a"})); setGhost(true); setSelectedoption("a")}}>
                <p>A</p>
                <p>{data.sections[subIndex].questions[questionIndex].options.a}</p>
                {data.sections[subIndex].questions[questionIndex].options.a_image_link !== "" && <img src={data.sections[subIndex].questions[questionIndex].options.a_image_link}/>}
              </div>
              <div className={"test-option" + (ghost === true ? (selectedoption === "b" ? " test-opt-enabled" : "") : ("b" === data.sections[subIndex].questions[questionIndex].selectedOption ? " test-opt-enabled" : ""))} onClick={(e) => {dispatch(selectOption({subIndex, questionIndex, option: "b"})); setGhost(true); setSelectedoption("b")}}>
                <p>B</p>
                <p>{data.sections[subIndex].questions[questionIndex].options.b}</p>
                {data.sections[subIndex].questions[questionIndex].options.b_image_link !== "" && <img src={data.sections[subIndex].questions[questionIndex].options.b_image_link}/>}
              </div>
              <div className={"test-option" + (ghost === true ? (selectedoption === "c" ? " test-opt-enabled" : "") : ("c" === data.sections[subIndex].questions[questionIndex].selectedOption ? " test-opt-enabled" : ""))} onClick={(e) => {dispatch(selectOption({subIndex, questionIndex, option: "c"})); setGhost(true); setSelectedoption("c")}}>
                <p>C</p>
                <p>{data.sections[subIndex].questions[questionIndex].options.c}</p>
                {data.sections[subIndex].questions[questionIndex].options.c_image_link !== "" && <img src={data.sections[subIndex].questions[questionIndex].options.c_image_link}/>}
              </div>
              <div className={"test-option" + (ghost === true ? (selectedoption === "d" ? " test-opt-enabled" : "") : ("d" === data.sections[subIndex].questions[questionIndex].selectedOption ? " test-opt-enabled" : ""))} onClick={(e) => {dispatch(selectOption({subIndex, questionIndex, option: "d"})); setGhost(true); setSelectedoption("d")}}>
                <p>D</p>
                <p>{data.sections[subIndex].questions[questionIndex].options.d}</p>
                {data.sections[subIndex].questions[questionIndex].options.d_image_link !== "" && <img src={data.sections[subIndex].questions[questionIndex].options.d_image_link}/>}
              </div>
            </div>
            <div className="test-header" id="test-buttons">
              <button className="herobutton" id="test-nav-btn" onClick={(e) => {dispatch(clearOption({subIndex, questionIndex})); setSelectedoption("")}}>Clear</button>
              <button className="herobutton" id="test-nav-btn" onClick={() => {onPrevious()}}>Previous</button>
              <button className="herobutton" id="test-nav-btn" onClick={() => {onNext()}}>Next</button>
              <button className="herobutton" id="test-nav-btn" onClick={fetchData}>Pause test</button>
            </div>
            <div className="submit-container">
            <button className="herobutton" id="submit-nav-btn" onClick={() => {onTestEnd(false)}}>Submit</button>
            </div>
          </div>
              
        </div>
      </div>
    </>
  )
}

export default Test
