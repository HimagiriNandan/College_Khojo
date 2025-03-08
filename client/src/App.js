import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import FeedBack from './Presentation/Pages/FeedBack';
import Home from './Presentation/Pages/Home';
import MockTestPage from './Presentation/Pages/MockTestPage';
import Navbar from './Presentation/Components/Navbar';
import InstructionPage from './Presentation/Pages/InstructionPage';
import SignIn from './Presentation/Pages/signIn';
import SignUp from './Presentation/Pages/signUp';
import Test from './Presentation/Pages/Test';
import Profile from './Presentation/Pages/Profile';
import Materials from './Presentation/Components/Materials';
import {Provider} from 'react-redux';
import store from './Application/StateManagement/store';
import {persistor} from './Application/StateManagement/store';
import {PersistGate} from 'redux-persist/integration/react';
import ExamExplanation from './Presentation/Pages/ExamExplanation';
import {useDispatch} from 'react-redux';
import {setUserData} from './Application/StateManagement/slices/UserSlice';
import { setUserId } from './Application/StateManagement/slices/UserSlice';
import { useEffect } from 'react';
import axios from 'axios';
import Analysis from './Presentation/Pages/AnalysisPags';
import PrivateUniversity from './Presentation/Pages/PrivateUniversity';
import ForgetPassword from './Presentation/Pages/ForgetPassword';
import Loading from './Presentation/Pages/Loading';
import { useSelector } from 'react-redux';



const AuthRoute = ({children}) => {
  const {data} = useSelector((state) => state.user);
  console.log(data);
  const s = [];
  const isAuthenticated = Array.isArray(data) && data.length === 0 ? false : true;
  console.log(isAuthenticated);
  return isAuthenticated ? children : <SignIn />;
}


function App() {
  const {data} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();


  const shownavbar = location.pathname !== "/signup" && location.pathname !== "/signin" && location.pathname !== "/test" && location.pathname.indexOf("/analysis", 0) && location.pathname !== "/loading" && location.pathname !== "/forgetpassword";
  const fetUserDetails = async () => {
    try{
      const response = await axios.get("https://khojo-college-server.vercel.app/auth/profile", { withCredentials: true });
      console.log(response.data.data);
      if(!response.data.data){
        navigate("/signin");
      }
      dispatch(setUserData(response.data.data));
      dispatch(setUserId(response.data.data._id));
    }
    catch(err){
      console.log(err);
    }
  };
  useEffect(() => {
    console.log('hi');
    fetUserDetails();
    const isAuthenticated = Array.isArray(data) && data.length === 0 ? false : true;

    if(!isAuthenticated && !window.location.pathname.includes("/signup")){
      navigate("/signin");
    }

  }, []);

  return (
    <div style={{boxSizing:'border-box'}}>
      {shownavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<AuthRoute><Home /></AuthRoute>} />
        <Route path="/home" element={<Home />} />
        <Route path="/helpandfeedback" element={<FeedBack />} />
        <Route path="/tests" element={<MockTestPage />}/>
        <Route path="/instructionpage" element={<InstructionPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgetpassword" element={<ForgetPassword/>} />
        <Route path="/test" element={<Test />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/materials" element={<Materials />} />
        <Route path="/exam/:id" element={<ExamExplanation/>} />
        <Route path="/analysis/:index" element={<Analysis />} />
        <Route path="/entrancexams" element={<PrivateUniversity/>} />
        <Route path="/loading" element={<Loading />} />
      </Routes>
    </div>
  );
}
function AppWrapper(){
  return(
    <Provider store = {store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default AppWrapper;
