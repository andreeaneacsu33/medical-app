import axios from 'axios';
import {returnErrors} from '../actions/errorActions';
import {url} from "../utils/helpers";
import {
    CLEAR_FILTERS,
    GET_CITIES,
    GET_HOSPITALS,
    REMOVE_CITY_FILTER, REMOVE_HOSPITAL_FILTER,
    SET_CITY_FILTER,
    SET_HOSPITAL_FILTER
} from "./actions";

const defaultHeaders={
    'Accept':'application/json',
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin': '*'
};

export const tokenConfig = getState => {
    const token = getState().auth.token;
    const headers ={ ...defaultHeaders};
    if(token){
        headers.Authorization = `Bearer ${token}`;
    }
    return headers;
};

export const getCities = () => (dispatch,getState) => {
    axios
        .get(`${url}/affiliation/cities`, {
            headers: tokenConfig(getState)
        })
        .then(res => {
            dispatch({
                type: GET_CITIES,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const getHospitals = () => (dispatch,getState) => {
    axios
        .get(`${url}/affiliation/hospitals`, {
            headers: tokenConfig(getState)
        })
        .then(res => {
            dispatch({
                type: GET_HOSPITALS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const setCityFilter = ({cityFilter}) => (dispatch) => {
    dispatch({
        type: SET_CITY_FILTER,
        payload: cityFilter
    })
};

export const setHospitalFilter = ({hospitalFilter}) => (dispatch) => {
    dispatch({
        type: SET_HOSPITAL_FILTER,
        payload: hospitalFilter
    })
};

export const clearFilters = () => (dispatch) => {
    dispatch({
        type: CLEAR_FILTERS
    })
};

export const removeCityFilter = ({cityFilter}) => (dispatch) => {
    dispatch({
        type: REMOVE_CITY_FILTER,
        payload: cityFilter
    })
};

export const removeHospitalFilter = ({hospitalFilter}) => (dispatch) => {
    dispatch({
        type: REMOVE_HOSPITAL_FILTER,
        payload: hospitalFilter
    })
};




