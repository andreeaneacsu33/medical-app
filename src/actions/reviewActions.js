import {getLogger} from "../utils/logger";
import axios from "axios";
import {url} from "../utils/helpers";
import {
    ADD_REVIEW,
    GET_REVIEW_BY_PATIENT_TO_DOCTOR,
    GET_REVIEWS_FOR_DOCTOR,
} from "./actions";
import {returnErrors} from "./errorActions";

const defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
};

export const tokenConfig = getState => {
    const token = getState().auth.token;
    const headers = {...defaultHeaders};
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    return headers;
};

export const getReview = ({idPatient,idDoctor}) => (dispatch, getState) => {
    axios
        .get(`${url}/review/patient/${idPatient}/doctor/${idDoctor}`, {
            headers: tokenConfig(getState)
        })
        .then(res => {
            console.log(res.data);
            dispatch({
                type: GET_REVIEW_BY_PATIENT_TO_DOCTOR,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const getReviews = ({idDoctor}) => (dispatch, getState) => {
    axios
        .get(`${url}/reviews/${idDoctor}`, {
            headers: tokenConfig(getState)
        })
        .then(res => {
            console.log(res.data);
            dispatch({
                type: GET_REVIEWS_FOR_DOCTOR,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const addReview = ({patientEmail, doctorEmail, description, rating, reviewDate, waitingTime, recommend}) => (dispatch, getState) => {
    const body = JSON.stringify({patientEmail, doctorEmail, description, rating, reviewDate, waitingTime, recommend});
    axios
        .post(`${url}/review`, body, {headers: tokenConfig(getState)})
        .then(res => {
            dispatch({
                type: ADD_REVIEW,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data,err.response.status));
        })
};
