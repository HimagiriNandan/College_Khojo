import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session"; // Import sessionStorage
import timerSlice from "../slices/TimerSlice";
import mocktestslice from "../slices/MocktestSlice";
import bookReducer from "../slices/BookSlice";
import userSlice from "../slices/UserSlice";
import privateCollegesSlice from "../slices/PrivateColleges";

const persistConfig = {
  key: "timer",
  storage: storageSession 
}

const persistedReducer = persistReducer(persistConfig, timerSlice);

const persistMocktestConfig = {
  key: "mocktest",
  storage: storageSession 
}
const persistedMocktestReducer = persistReducer(persistMocktestConfig, mocktestslice);

const persistUserConfig = {
  key: "user",
  storage: storageSession 
}
const persistedUserReducer = persistReducer(persistUserConfig, userSlice);

const persistPrivateCollegesConfig = {
  key: "privateColleges",
  storage: storageSession 
}
const persistedPrivateCollegesReducer = persistReducer(persistPrivateCollegesConfig, privateCollegesSlice);

const store = configureStore({
  reducer: {
    timer: persistedReducer,
    mocktest: persistedMocktestReducer,
    books: bookReducer,
    user: persistedUserReducer,
    privateColleges: persistedPrivateCollegesReducer
  }
});

export const persistor = persistStore(store);
export default store;