// React Imports
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Slices Imports
import { setPrivateColleges } from '../../Application/StateManagement/slices/PrivateColleges';

// Components Imports
import Loading from "./Loading";

// Styles Imports
import "../Styles/PrivateUniversity.css";

// Api Routes Imports
import { fetchPrivateUniversities } from '../../Application/Services/api';


// Main Component
const PrivateUniversity = () => {
  // States and Variables
  const [isloading, setIsloading] = useState(false);
  const data = useSelector(state => state.privateColleges.data);
  const dispatch = useDispatch();

  // UseEffects
  useEffect(() => {
    async function fetchData() {
      setIsloading(true);
      const response = await fetchPrivateUniversities();
      const collegedata = response.data;
      if (!data) {
        console.log("Data not found");
      }
      dispatch(setPrivateColleges(collegedata));
      setIsloading(false);
    }
    fetchData();
  }, []);


  // Rendered Component
  return (
    <>
      {isloading && <Loading />}

      <div className='private-university-main-container'>

        <div className='private-university-container'>

          <div className='private-university-header'>
            <h1>Entrance Exams after 12th (MPC students)</h1>
          </div>

          <div className="private-university-content">
            <table>
              <thead>
                <tr>
                  <th>University</th>
                  <th>Location</th>
                  <th>Tier</th>
                  <th>Course</th>
                  <th>NIRF Ranking</th>
                  <th>Entrance Exam</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.university}</td>
                    <td>{item.location}</td>
                    <td>{item.tier}</td>
                    <td>{item.course}</td>
                    <td>{item.nirf_ranking}</td>
                    <td>{item.entrance_exam}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </>
  );
};

export default PrivateUniversity;
