import axios from 'axios';
import {returnErrors} from '../actions/errorActions';
import {GET_AFFILIATION, GET_QUALIFICATION, GET_SPECIALTIES} from "../actions/constants";
import {url} from "../utils/helpers";
import {SET_AFFILIATION} from "./constants";

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

export const getSpecialties = () => (dispatch) => {
    axios
        .get(`${url}/specialties`, {
            headers: {...defaultHeaders}
        })
        .then(res=>{
            console.log(res.data);
            dispatch({
                type: GET_SPECIALTIES,
                payload: res.data
            })})
        .catch(err=>{
            dispatch(returnErrors(err.response.data,err.response.status));
        });
};

export const getQualification = (id) => (dispatch,getState) => {
    axios
        .get(`${url}/qualification/${id}`,{
            headers: tokenConfig(getState)
        })
        .then(res=>{
            console.log(res.data);
            dispatch({
                type: GET_QUALIFICATION,
                payload: res.data
            })})
        .catch(err=>{
            dispatch(returnErrors(err.response.data,err.response.status));
        });
};

export const getAffiliation = (id) => (dispatch,getState) => {
    axios
        .get(`${url}/affiliation/${id}`,{
            headers: tokenConfig(getState)
        })
        .then(res=>{
            console.log(res.data);
            dispatch({
                type: GET_AFFILIATION,
                payload: res.data
            })})
        .catch(err=>{
            dispatch(returnErrors(err.response.data,err.response.status));
        });
};

export const setAffiliation = ({email,hospitalName,city,country,startDate}) => (dispatch,getState) => {
    const body=JSON.stringify({email,hospitalName,city,country,startDate});
    axios
        .post(`${url}/affiliation`,body,{
            headers: tokenConfig(getState)
        })
        .then(res=>{
            console.log(res.data);
            dispatch({
                type: SET_AFFILIATION,
                payload: res.data
            })})
        .catch(err=>{
            dispatch(returnErrors(err.response.data,err.response.status));
        });
};
