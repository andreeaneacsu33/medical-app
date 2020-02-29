import {combineReducers} from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import doctorReducer from "./doctorReducer";
import patientReducer from "./patientReducer";
import {DESTROY_SESSION} from "../actions/actions";
import reviewReducer from "./reviewReducer";

const appReducer = combineReducers({
    error: errorReducer,
    auth: authReducer,
    doctor: doctorReducer,
    patient: patientReducer,
    review: reviewReducer
});

const rootReducer = (state, action) => {
    if (action.type === DESTROY_SESSION)
        state = undefined;

    return appReducer(state, action);
};

export default rootReducer;
