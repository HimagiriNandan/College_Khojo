import axios from 'axios'

// const API = axios.create({ baseURL: "https://khojo-college-server.vercel.app"})
const API = axios.create({ 
    baseURL: "https://khojo-college-server.vercel.app",
    withCredentials: true,
});

// user routes
export const fetchUserData = ()=> API.get('/auth/profile');
export const userLogin = (formData) => API.post('/auth/login', formData,{headers: { 'Content-Type': 'application/json',}});
export const userSignup = (formData) => API.post('/auth/signup', formData,{headers: {'Content-Type': 'application/json'}});
export const updateUser = (formData) => API.post('/auth/updateprofile', formData);
export const updateUserProfile = (formData) => API.post('/auth/updateuserprofile', formData);
export const userLogout = ()=> API.post('/auth/logout')
export const verifyOTP = (formData) => API.post('/auth/verifyotp',formData);

// mock test
export const saveMockTest = (formData) => API.post('/mock/addMocktoUser', formData);
export const submitTest = (formData) => API.post('/mock/addAttemptedMocktoUser',formData);
export const fetchMockTest = (formData) => API.post('/mock/mocktestdata', formData);
export const fetchMockTests = () => API.post('/mock/mocktests');

// find colleges
export const filterColleges = (formData) => API.post('/auth/colleges', formData);

// private universities
export const fetchPrivateUniversities = ()=> API.get('/auth/privateuniversities'); 

// feedback
export const giveFeedback = (formData) => API.post('/auth/feedback', formData);

// contact us
export const contactUs = (formData) => API.post('/auth/contactus', formData);

// materials
export const fetchBooksData = () => API.get('/material');