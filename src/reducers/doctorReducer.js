import {
    GET_AFFILIATION,
    GET_QUALIFICATION,
    GET_SPECIALTIES, SET_AFFILIATION,
} from '../actions/constants';

const initialState = {
    token: localStorage.getItem('token'),
    doctor: null,
};

export default function (state=initialState,action) {
    switch (action.type) {
        case GET_SPECIALTIES:
            return{
                ...state,
                specialties: action.payload
            };
        case GET_QUALIFICATION:
            return{
                ...state,
                qualification: action.payload
            };
        case GET_AFFILIATION:
            return{
                ...state,
                affiliation: action.payload
            };
        case SET_AFFILIATION:
            return{
                ...state,
                affiliation: action.payload
            };
        default:
            return state;
    }
}
