// React Imports
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

// Components Imports
import AvailableMocktests from '../Components/AvailableMocktests'
import PerformanceChart from '../Components/AnalysisGraph'
import AttemptedMocktests from '../Components/AttemptedMocktest'
import ResumeTests from '../Components/ResumeTests'

// Main Component
const MockTestPage = () => {
  // States and Variables
  const { data } = useSelector((state) => state.user);

  const navigate = useNavigate();

  // UseEffects
  useEffect(() => {

    const isAuthenticated = Array.isArray(data) && data.length === 0 ? false : true;
    if (!isAuthenticated) {
      console.log("Not authenticated");
      navigate("/signin");
    }

  }, []);
  
  // Rendered Component
  return (
    <div>
      <AvailableMocktests />
      <ResumeTests/>
      <PerformanceChart />
      <AttemptedMocktests />
    </div>
  )
}

export default MockTestPage
