import { combineReducers } from '@reduxjs/toolkit';
import timerSlice from '../slices/TimerSlice';
import mocktestslice from '../slices/MocktestSlice';
import bookReducer from '../slices/BookSlice';
import userSlice from '../slices/UserSlice';
import privateCollegesSlice from '../slices/PrivateColleges';
import { configureStore } from '@reduxjs/toolkit';

// Combine reducers
const rootReducer = combineReducers({
  timer: timerSlice,
  mocktest: mocktestslice,
  books: bookReducer,
  user: userSlice,
  privateColleges: privateCollegesSlice
});

// Create the Redux store
const store = configureStore({
  reducer: rootReducer,
});

export default store;
