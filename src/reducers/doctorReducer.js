import {
    GET_DOCTOR, GET_SPECIALTIES,
} from '../actions/constants';

const initialState = {
    token: localStorage.getItem('token'),
    doctor: null,
};

export default function (state=initialState,action) {
    switch (action.type) {
        case GET_DOCTOR:
            return {
                ...state,
                doctor: action.payload
            };
        case GET_SPECIALTIES:
            return{
                ...state,
                specialties: action.payload
            };
        default:
            return state;
    }
}
