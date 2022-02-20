import { combineReducers } from "redux";
import HomeReducer from "./home";
import LoginReducer from "./login";
import ResumeReducer from "./resume";

const RootReducer = combineReducers({
    HomeReducer,
    LoginReducer,
    ResumeReducer,
});

export default RootReducer;
