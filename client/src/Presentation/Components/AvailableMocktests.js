//React file imports
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

//component imports
import StartTestModal from "./Modals";
import Loading from "../Pages/Loading";

// slice imports
import { startTime, } from "../../Application/StateManagement/slices/TimerSlice";

// css import
import "../Styles/AvailableMocktests.css";

// api imports
import { fetchMockTests } from "../../Application/Services/api";

const AvailableMocktests = () => {

  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [id, setId] = useState("");
  const [isloading, setIsloading] = useState(true);
  const [tests, setTests] = useState([]);

  function confirmationModal(work){
    if(work === "start"){
      setConfirmation(true);
      return;
    }
    setConfirmation(false);
  }
  
  const startTest = () => {
    dispatch(startTime(id));
    setShowModal(true);
  };

  const closeModal = () => {
    dispatch(startTime(""));
    setShowModal(false);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchMockTests();
        const data = await response.data;
        setTests(data.data || []); 
        setIsloading(false);
      } catch (error) {
        console.error("Error fetching mock tests:", error);
      }
    }
    fetchData();
  }, []);                         

  return (
    <>
    {showModal && <StartTestModal showModal={closeModal} confirmation={confirmationModal} id={id}/>}
    <div className="mocktestmaincontainer">
      {isloading && <Loading />}
      
      <h1 className="mocktestheader">Available Mocktests</h1>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div className="showtests">
          {
            (tests===undefined) ? <h2>No tests available</h2>

            :
            tests.map((test, index) => {
              return (
                <div key={index} className="testContainer">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                    <h2 className="testName">{test.title}</h2>
                    <div className="test-tag-cont">
                      <p id="test-tag" className="tag">3 hours</p>
                      <p id="test-tag" className="tag">300 Marks</p>
                      <p id="test-tag2" className="startbtn">
                        <a
                          style={{ color: "white", textDecoration: "none" }}
                          onClick={() => {
                            setId(test._id);
                            startTest();
                          }}
                        >
                          Start Test
                        </a>
                      </p>
                    </div>
                  </div>
                  <p className="noofques">
                    No of Questions: 75 | Maths: 25 | Physics: 25 | Chemistry: 25
                  </p>
                </div>
              );
            })
          }
          
        </div>
      </div>
    </div>
    </>
    
  );
};

export default AvailableMocktests;
