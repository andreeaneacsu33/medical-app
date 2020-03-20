import {
    CLEAR_FILTERS,
    GET_CITIES,
    GET_HOSPITALS,
    REMOVE_CITY_FILTER, REMOVE_HOSPITAL_FILTER,
    SET_CITY_FILTER, SET_FILTER_TYPE,
    SET_HOSPITAL_FILTER
} from "../actions/actions";
import {filters} from "../utils/helpers";

const initialState = {
    token: localStorage.getItem('token'),
    patient: null,
    cities: [],
    hospitals: [],
    cityFilters: [],
    hospitalFilters: [],
    filterType: filters.NONE,
    loading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CITIES:
            return {
                ...state,
                cities: action.payload,
            };
        case GET_HOSPITALS:
            return {
                ...state,
                hospitals: action.payload,
            };
        case SET_CITY_FILTER:
            return {
                ...state,
                cityFilters: [...state.cityFilters,action.payload],
            };
        case SET_HOSPITAL_FILTER:
            return {
                ...state,
                hospitalFilters: [...state.hospitalFilters,action.payload],
            };
        case REMOVE_CITY_FILTER:
            return {
                ...state,
                cityFilters: state.cityFilters.filter(element => element !== action.payload)
            };
        case REMOVE_HOSPITAL_FILTER:
            return{
                ...state,
                hospitalFilters: state.hospitalFilters.filter(element => element !== action.payload)
            };
        case CLEAR_FILTERS:
            return{
                ...state,
                cityFilters: [],
                hospitalFilters: []
            };
        case SET_FILTER_TYPE:
            return{
                ...state,
                filterType: action.payload,
            };
        default:
            return state;
    }
}
