import axios from 'axios';
import {returnErrors} from '../actions/errorActions';
import {
    GET_DOCTOR
} from "../actions/constants";
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


export const getDoctor = ({email}) => (dispatch, getState) =>{
    axios
        .get(`${url}/doctor/${email}`, {
            headers: tokenConfig(getState)
        })
        .then(res=>{
            console.log(res.data);
            dispatch({
                type: GET_DOCTOR,
                payload: res.data
            })})
        .catch(err=>{
            dispatch(returnErrors(err.response.data,err.response.status));
        });
};
