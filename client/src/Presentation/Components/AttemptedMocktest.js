//React file imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// slice imports
import { setQuestionindex, setSubindex } from "../../Application/StateManagement/slices/MocktestSlice";

// css import
import "../Styles/AvailableMocktests.css";

const AttemptedMocktests = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [tests, setTests] = useState([]);
  const data  = useSelector((state) => state.user.data.attempted_mocks);

  async function showAnalysis(index) {
    dispatch(setQuestionindex({ questionIndex: 0 }));
    dispatch(setSubindex({ subIndex: 0 }));
    navigate(`/analysis/${index}`);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setTests(data);

    } catch (error) {
        console.error("Error fetching mock tests:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="mocktestmaincontainer">
      <div className="mocktestheader" id="attemptedMocktest-header">
        <h1>Attempted Mocktests</h1>
      </div>
      <h1 className="attemptedmocktesttext" style={{color: "#059BB9"}}>{ tests?.length === 0 ? "No Attempted tests" : ""}</h1>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div className="showtests">
          {tests?.map((test, index) => {
              return (
                <div key={index} className="testContainer">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                    <h2 className="testName">{test.title}</h2> 
                    <div className="test-tag-cont">
                      <p id="test-tag" className="tag">3 hours</p>
                      <p id="test-tag" className="tag">Score : {test.scoredMarks}</p>
                      <p id="test-tag2" className="startbtn">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          onClick={() => {
                           showAnalysis(index);
                          }}
                        >
                          Analysis
                        </a>
                      </p>
                    </div>
                  </div>
                  <p className="noofques">
                    No of Questions: 75 | Maths: 25 | Physics: 25 | Chemistry: 25
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default AttemptedMocktests;
