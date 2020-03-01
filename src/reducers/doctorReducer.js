import {
    GET_AFFILIATION, GET_DOCTORS_FROM_PAGE,
    GET_QUALIFICATION,
    GET_SPECIALTIES, GET_TOTAL_PAGES, SET_AFFILIATION, SET_CURRENT_PAGE, SET_QUALIFICATION,
} from '../actions/actions';

const initialState = {
    token: localStorage.getItem('token'),
    doctor: null,
    doctors: [],
    page: 1,
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
        case SET_QUALIFICATION:
            return{
                ...state,
                qualification: action.payload
            };
        case GET_TOTAL_PAGES:
            return{
                ...state,
                total: action.payload
            };
        case GET_DOCTORS_FROM_PAGE:
            return {
                ...state,
                doctors: action.payload,
            };
        case SET_CURRENT_PAGE:
            return{
                ...state,
                page: action.payload
            };
        default:
            return state;
    }
}
