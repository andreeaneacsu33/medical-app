import {
    AUTH_ERROR, CHANGE_PASSWORD, CHECK_OLD_PASSWORD, LOAD_DOCTOR, LOAD_PATIENT,
    LOGIN_FAIL, LOGIN_STARTED,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS, REGISTER_SUCCESS,
    TOKEN_KEY,
    USER_LOADED,
    USER_LOADING, USERNAME,
} from '../actions/actions';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    inProgress: false,
    user: null,
    isEqual: false,
};

export default function (state=initialState,action) {
    switch (action.type) {
        case USER_LOADING:
            return{
                ...state,
                isLoading:true
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            };
        case LOAD_DOCTOR:
            return{
                ...state,
                doctor: action.payload
            };
        case LOAD_PATIENT:
            return{
                ...state,
                patient: action.payload
            };
        case LOGIN_SUCCESS:
            localStorage.setItem(TOKEN_KEY,action.payload.token);
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                token:action.payload.token
            };
        case LOGIN_STARTED:
            return {
              ...state,
              isLoading: true,
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USERNAME);
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
            };
        case REGISTER_SUCCESS:
            localStorage.setItem(TOKEN_KEY,action.payload.token);
            return{
                ...state,
                isAuthenticated: true,
                isLoading: false,
                token:action.payload.token
            };
        case CHECK_OLD_PASSWORD:
            return {
                ...state,
                isEqual: action.payload,
            };
        case CHANGE_PASSWORD:
            return{
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
}
