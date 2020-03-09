import axios from "axios";
import {url} from "../utils/helpers";
import {ADD_APPOINTMENT, GET_DOCTOR_APPOINTMENTS} from "./actions";
import {returnErrors} from "./errorActions";
import {getLogger} from "../utils/logger";

const log = getLogger();

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

export const addAppointment = ({idDoctor, idPatient, startDate, endDate, title, notes}) => (dispatch, getState) => {
    const body = JSON.stringify({idDoctor, idPatient, startDate, endDate, title, notes});
    axios
        .post(`${url}/appointment`, body, {headers: tokenConfig(getState)})
        .then(res => {
            dispatch({
                type: ADD_APPOINTMENT,
                payload: res.data
            });
        })
        .catch(err => {
            log(err);
            dispatch(returnErrors(err.response.data, err.response.status))
        })
};

export const getAppointments = ({idDoctor}) => (dispatch,getState) => {
    axios
        .get(`${url}/appointments/${idDoctor}`, {
            headers: tokenConfig(getState)
        })
        .then(res => {
            console.log(res.data);
            dispatch({
                type: GET_DOCTOR_APPOINTMENTS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};
