import {
    ADD_APPOINTMENT,
    GET_DOCTOR_APPOINTMENTS, GET_DOCTOR_APPOINTMENTS_FROM_DATE,
    GET_PATIENT_APPOINTMENTS,
    REMOVE_APPOINTMENT, UPDATE_APPOINTMENT
} from "../actions/actions";

const initialState = {
    appointments: [],
    appointment: {},
    updated: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_APPOINTMENT:
            return {
                ...state,
                appointment: action.payload,
                appointments: [...state.appointments, action.payload],
            };
        case GET_DOCTOR_APPOINTMENTS:
            return {
                ...state,
                appointments: action.payload
            };
        case GET_PATIENT_APPOINTMENTS:
            return {
                ...state,
                appointments: action.payload
            };
        case REMOVE_APPOINTMENT:
            return {
                ...state,
                appointments: state.appointments.filter(app => app.id !== action.payload)
            };
        case GET_DOCTOR_APPOINTMENTS_FROM_DATE:
            return {
                ...state,
                appointments: action.payload
            };
        case UPDATE_APPOINTMENT:
            return {
                ...state,
                appointments: state.appointments.map(app => app.id === action.payload.id ? action.payload : app)
            };
        default:
            return state;
    }
}
