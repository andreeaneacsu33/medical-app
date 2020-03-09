import {ADD_APPOINTMENT,GET_DOCTOR_APPOINTMENTS} from "../actions/actions";

const initialState={
    appointments: [],
    appointment: {}
};

export default function (state=initialState,action) {
    switch (action.type) {
        case ADD_APPOINTMENT:
            return {
                ...state,
                appointment: action.payload,
                appointments: [...state.appointments,action.payload],
            };
        case GET_DOCTOR_APPOINTMENTS:
            return {
                ...state,
                appointments: action.payload
            };
        default:
            return state;
    }
}
