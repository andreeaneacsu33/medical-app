import {combineReducers} from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import doctorReducer from "./doctorReducer";

export default combineReducers({
    error: errorReducer,
    auth: authReducer,
    doc: doctorReducer
});
