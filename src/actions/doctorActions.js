import axios from 'axios';
import {returnErrors} from '../actions/errorActions';
import {
    GET_AFFILIATION,
    GET_DOCTORS_FROM_PAGE_FOR_CITIES_AND_HOSPITALS_FILTER,
    GET_DOCTORS_FROM_PAGE_FOR_CITIES_FILTER,
    GET_DOCTORS_FROM_PAGE_FOR_HOSPITALS_FILTER,
    GET_OVERALL_RATING, GET_OVERALL_RATING_STATISTICS,
    GET_OVERALL_WAITING_TIME,
    GET_QUALIFICATION,
    GET_SPECIALTIES,
    GET_TOTAL_PAGES_FOR_CITIES_AND_HOSPITALS_FILTER,
    GET_TOTAL_PAGES_FOR_CITIES_FILTER,
    GET_TOTAL_PAGES_FOR_HOSPITALS_FILTER,
    SET_CURRENT_PAGE,
    SET_LOADING,
    SET_QUALIFICATION
} from "./actions";
import {url} from "../utils/helpers";
import {GET_DOCTORS_FROM_PAGE, GET_TOTAL_PAGES, SET_AFFILIATION} from "./actions";

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

export const getSpecialties = () => (dispatch) => {
    axios
        .get(`${url}/specialties`, {
            headers: {...defaultHeaders}
        })
        .then(res => {
            dispatch({
                type: GET_SPECIALTIES,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const getQualification = (id) => (dispatch, getState) => {
    axios
        .get(`${url}/qualification/${id}`, {
            headers: tokenConfig(getState)
        })
        .then(res => {
            dispatch({
                type: GET_QUALIFICATION,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const getAffiliation = (id) => (dispatch, getState) => {
    axios
        .get(`${url}/affiliation/${id}`, {
            headers: tokenConfig(getState)
        })
        .then(res => {
            dispatch({
                type: GET_AFFILIATION,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const setAffiliation = ({email, hospitalName, city, country, startDate}) => (dispatch, getState) => {
    const body = JSON.stringify({email, hospitalName, city, country, startDate});
    axios
        .post(`${url}/affiliation`, body, {
            headers: tokenConfig(getState)
        })
        .then(res => {
            dispatch({
                type: SET_AFFILIATION,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const setQualification = ({email, title, institute, graduationYear}) => (dispatch, getState) => {
    const body = JSON.stringify({email, title, institute, graduationYear});
    axios
        .post(`${url}/qualification`, body, {
            headers: tokenConfig(getState)
        })
        .then(res => {
            dispatch({
                type: SET_QUALIFICATION,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const getTotalPages = () => (dispatch, getState) => {
    axios.get(`${url}/doctors/total`, {
        headers: tokenConfig(getState)
    })
        .then(res => {
            dispatch({
                type: GET_TOTAL_PAGES,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const getDoctorsFromPage = ({page}) => (dispatch, getState) => {
    axios.get(`${url}/doctors/page/${page}`, {
        headers: tokenConfig(getState)
    })
        .then(res => {
            dispatch({
                type: GET_DOCTORS_FROM_PAGE,
                payload: res.data
            });
            dispatch(setLoading({value: true}));
            const {doctors}=getState().doctor;
            for(let i=0;i<doctors.length;i++){
                dispatch(getOverallRating({idDoctor: doctors[i].id}));
                dispatch(getOverallWaitingTime({idDoctor: doctors[i].id}));
            }
            dispatch(setLoading({value: false}));
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const setCurrentPage = ({page}) => dispatch => {
    dispatch({
        type: SET_CURRENT_PAGE,
        payload: page,
    })
};

export const getOverallRating = ({idDoctor}) => (dispatch, getState) => {
    axios.get(`${url}/doctor/${idDoctor}/rating`, {
        headers: tokenConfig(getState)
    })
        .then(res => {
            dispatch({
                type: GET_OVERALL_RATING,
                payload: res.data,
                id: idDoctor
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const getOverallRatingStatistics = ({idDoctor}) => (dispatch, getState) => {
    axios.get(`${url}/doctor/${idDoctor}/statistics`, {
        headers: tokenConfig(getState)
    })
        .then(res => {
            dispatch({
                type: GET_OVERALL_RATING_STATISTICS,
                payload: res.data,
                id: idDoctor
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const getOverallWaitingTime = ({idDoctor}) => (dispatch, getState) => {
    axios.get(`${url}/doctor/${idDoctor}/waiting-time`, {
        headers: tokenConfig(getState)
    })
        .then(res => {
            dispatch({
                type: GET_OVERALL_WAITING_TIME,
                payload: res.data,
                id: idDoctor
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const setLoading = ({value}) => dispatch => {
    dispatch({
        type: SET_LOADING,
        loading: value,
    })
};

export const getPagesForCitiesFilter = ({cities}) => (dispatch, getState) => {
    axios.get(`${url}/doctors/filter/cities/${cities}/total`, {
        headers: tokenConfig(getState)
    })
        .then(res => {
            dispatch({
                type: GET_TOTAL_PAGES_FOR_CITIES_FILTER,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const getPagesForHospitalsFilter = ({hospitals}) => (dispatch, getState) => {
    axios.get(`${url}/doctors/filter/hospitals/${hospitals}/total`, {
        headers: tokenConfig(getState)
    })
        .then(res => {
            dispatch({
                type: GET_TOTAL_PAGES_FOR_HOSPITALS_FILTER,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const getPagesForCitiesAndHospitalsFilter = ({cities,hospitals}) => (dispatch, getState) => {
    axios.get(`${url}/doctors/filter/cities/${cities}/hospitals/${hospitals}/total`, {
        headers: tokenConfig(getState)
    })
        .then(res => {
            dispatch({
                type: GET_TOTAL_PAGES_FOR_CITIES_AND_HOSPITALS_FILTER,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const getDoctorsFromPageForCitiesFilter = ({cities,page}) => (dispatch, getState) => {
    axios.get(`${url}/doctors/filter/cities/${cities}/page/${page}`, {
        headers: tokenConfig(getState)
    })
        .then(res => {
            dispatch({
                type: GET_DOCTORS_FROM_PAGE_FOR_CITIES_FILTER,
                payload: res.data
            });
            dispatch(setLoading({value: true}));
            const {doctors}=getState().doctor;
            for(let i=0;i<doctors.length;i++){
                dispatch(getOverallRating({idDoctor: doctors[i].id}));
                dispatch(getOverallWaitingTime({idDoctor: doctors[i].id}));
            }
            dispatch(setLoading({value: false}));
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const getDoctorsFromPageForHospitalsFilter = ({hospitals,page}) => (dispatch, getState) => {
    axios.get(`${url}/doctors/filter/hospitals/${hospitals}/page/${page}`, {
        headers: tokenConfig(getState)
    })
        .then(res => {
            dispatch({
                type: GET_DOCTORS_FROM_PAGE_FOR_HOSPITALS_FILTER,
                payload: res.data
            });
            dispatch(setLoading({value: true}));
            const {doctors}=getState().doctor;
            for(let i=0;i<doctors.length;i++){
                dispatch(getOverallRating({idDoctor: doctors[i].id}));
                dispatch(getOverallWaitingTime({idDoctor: doctors[i].id}));
            }
            dispatch(setLoading({value: false}));
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const getDoctorsFromPageForCitiesAndHospitalsFilter = ({cities,hospitals,page}) => (dispatch, getState) => {
    axios.get(`${url}/doctors/filter/cities/${cities}/hospitals/${hospitals}/page/${page}`, {
        headers: tokenConfig(getState)
    })
        .then(res => {
            dispatch({
                type: GET_DOCTORS_FROM_PAGE_FOR_CITIES_AND_HOSPITALS_FILTER,
                payload: res.data
            });
            dispatch(setLoading({value: true}));
            const {doctors}=getState().doctor;
            for(let i=0;i<doctors.length;i++){
                dispatch(getOverallRating({idDoctor: doctors[i].id}));
                dispatch(getOverallWaitingTime({idDoctor: doctors[i].id}));
            }
            dispatch(setLoading({value: false}));
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};
