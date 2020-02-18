import axios from 'axios';
import {returnErrors} from '../actions/errorActions';
import {GET_SPECIALTIES} from "../actions/constants";
import {url} from "../utils/helpers";

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

export const getSpecialties = () => (dispatch, getState) => {
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
