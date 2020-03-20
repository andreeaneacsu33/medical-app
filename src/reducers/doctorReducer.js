import {
    GET_AFFILIATION,
    GET_DOCTORS_FROM_PAGE,
    GET_DOCTORS_FROM_PAGE_FOR_CITIES_AND_HOSPITALS_FILTER,
    GET_DOCTORS_FROM_PAGE_FOR_CITIES_FILTER,
    GET_DOCTORS_FROM_PAGE_FOR_HOSPITALS_FILTER,
    GET_OVERALL_RATING,
    GET_OVERALL_WAITING_TIME,
    GET_QUALIFICATION,
    GET_SPECIALTIES,
    GET_TOTAL_PAGES,
    GET_TOTAL_PAGES_FOR_CITIES_AND_HOSPITALS_FILTER,
    GET_TOTAL_PAGES_FOR_CITIES_FILTER,
    GET_TOTAL_PAGES_FOR_HOSPITALS_FILTER,
    SET_AFFILIATION,
    SET_CURRENT_PAGE,
    SET_LOADING,
    SET_QUALIFICATION,
} from '../actions/actions';

const initialState = {
    token: localStorage.getItem('token'),
    doctor: null,
    doctors: [],
    page: 1,
    loading: false,
    affiliation: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_SPECIALTIES:
            return {
                ...state,
                specialties: action.payload
            };
        case GET_QUALIFICATION:
            return {
                ...state,
                qualification: action.payload
            };
        case GET_AFFILIATION:
            return {
                ...state,
                affiliation: action.payload
            };
        case SET_AFFILIATION:
            return {
                ...state,
                affiliation: [...state.affiliation, action.payload]
            };
        case SET_QUALIFICATION:
            return {
                ...state,
                qualification: action.payload
            };
        case GET_TOTAL_PAGES:
            return {
                ...state,
                total: action.payload
            };
        case GET_TOTAL_PAGES_FOR_CITIES_FILTER:
            return {
                ...state,
                total: action.payload
            };
        case GET_TOTAL_PAGES_FOR_HOSPITALS_FILTER:
            return {
                ...state,
                total: action.payload
            };
        case GET_TOTAL_PAGES_FOR_CITIES_AND_HOSPITALS_FILTER:
            return {
                ...state,
                total: action.payload
            };
        case GET_DOCTORS_FROM_PAGE:
            return {
                ...state,
                doctors: action.payload,
            };
        case GET_DOCTORS_FROM_PAGE_FOR_CITIES_FILTER:
            return {
                ...state,
                doctors: action.payload,
            };
        case GET_DOCTORS_FROM_PAGE_FOR_HOSPITALS_FILTER:
            return {
                ...state,
                doctors: action.payload
            };
        case GET_DOCTORS_FROM_PAGE_FOR_CITIES_AND_HOSPITALS_FILTER:
            return {
                ...state,
                doctors: action.payload
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                page: action.payload
            };
        case GET_OVERALL_RATING:
            return {
                ...state,
                doctors: state.doctors.map(doc => doc.id === action.id ?
                    {...doc, rating: action.payload} :
                    doc
                )
            };
        case GET_OVERALL_WAITING_TIME:
            return {
                ...state,
                doctors: state.doctors.map(doc => doc.id === action.id ?
                    {...doc, waitingTime: action.payload} :
                    doc
                )
            };
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        default:
            return state;
    }
}
