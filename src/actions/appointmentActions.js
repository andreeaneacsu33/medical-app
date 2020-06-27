import axios from "axios";
import {url} from "../utils/helpers";
import {
    ADD_APPOINTMENT,
    CLEAR_ERRORS,
    GET_DOCTOR_APPOINTMENTS, GET_DOCTOR_APPOINTMENTS_FROM_DATE,
    GET_PATIENT_APPOINTMENTS,
    REMOVE_APPOINTMENT, UPDATE_APPOINTMENT
} from "./actions";
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

export const addAppointment = ({idDoctor, idPatient, idAffiliation, startDate, endDate, title, notes}) => (dispatch, getState) => {
    const body = JSON.stringify({idDoctor, idPatient, idAffiliation, startDate, endDate, title, notes});
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

export const getDoctorAppointments = ({idDoctor}) => (dispatch,getState) => {
    axios
        .get(`${url}/appointments/doctor/${idDoctor}`, {
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

export const getDoctorAppointmentsFromDate = ({idDoctor,date}) => (dispatch,getState) => {
    axios
        .get(`${url}/appointments/doctor/${idDoctor}/date/${date}`, {
            headers: tokenConfig(getState)
        })
        .then(res => {
            console.log(res.data);
            dispatch({
                type: GET_DOCTOR_APPOINTMENTS_FROM_DATE,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const getPatientAppointments = ({idPatient,date}) => (dispatch,getState) => {
    axios
        .get(`${url}/appointments/patient/${idPatient}/date/${date}`, {
            headers: tokenConfig(getState)
        })
        .then(res => {
            console.log(res.data);
            dispatch({
                type: GET_PATIENT_APPOINTMENTS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const removeAppointment = ({idAppointment}) => (dispatch,getState) => {
    axios
        .delete(`${url}/appointment/${idAppointment}`, {
            headers: tokenConfig(getState)
        })
        .then(res => {
            console.log(res.data);
            dispatch({
                type: REMOVE_APPOINTMENT,
                payload: idAppointment
            });
            dispatch({
                type: CLEAR_ERRORS
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const updateAppointment = ({id, idDoctor, idPatient, idAffiliation, startDate, endDate, title, notes}) => (dispatch,getState) => {
    const body = JSON.stringify({id, idDoctor, idPatient, idAffiliation, startDate, endDate, title, notes});
    axios
        .put(`${url}/appointment`, body, {headers: tokenConfig(getState)})
        .then(res => {
            console.log(res.data);
            dispatch({
                type: UPDATE_APPOINTMENT,
                payload: res.data,
            });
            dispatch({
                type: CLEAR_ERRORS
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};
