import {combineReducers} from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import doctorReducer from "./doctorReducer";
import patientReducer from "./patientReducer";

export default combineReducers({
    error: errorReducer,
    auth: authReducer,
    doctor: doctorReducer,
    patient: patientReducer
});
