import axios from 'axios';
import {returnErrors} from '../actions/errorActions';
import {
    AUTH_ERROR,
    CLEAR_ERRORS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS,
    USER_LOADED,
    USER_LOADING
} from "../actions/constants";
import {history} from '../utils/history';
import {getLogger} from "../utils/logger";
import {url} from "../utils/helpers";

const log=getLogger();

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

export const login = ({email,password})=>dispatch=>{
    log(`Login user: ${email}`);
    const headers={...defaultHeaders};
    const config={headers};
    const body=JSON.stringify({email:email,password:password});
    axios
        .post(`${url}/login`,body,config)
        .then(res=>{
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            dispatch({
                type: CLEAR_ERRORS
            });
            history.push('/home');
    })
        .catch(err=>{
            log(err.status);
            if(err.message==='Network Error'){
                dispatch(returnErrors(err.message,0,'LOGIN_FAIL'))
            }else{
                dispatch(returnErrors(err.response.data,err.response.status,'LOGIN_FAIL'));
            }
            dispatch({
                type: LOGIN_FAIL
            });
        });
};

export const register = ({firstName,lastName,email,specialization,role,password}) => dispatch => {
    log(`Register ${email}`);
    const headers={...defaultHeaders};
    const config={headers};
    const body=JSON.stringify({email,password,firstName,lastName,role,specialization});
    axios
        .post(`${url}/signup`,body,config)
        .then(res=>{
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        })
        .catch(err=>{
            log(err);
            dispatch(
                returnErrors(err.response.data,err.response.status,'REGISTER_FAIL')
            );
            dispatch({
                type: REGISTER_FAIL
            })
        })
};

export const loadUser = ({email}) => (dispatch, getState) =>{
    dispatch({type: USER_LOADING});
    axios
        .get(`${url}/user/${email}`, {
            headers: tokenConfig(getState)
        })
        .then(res=>{
            console.log(res.data);
            dispatch({
            type: USER_LOADED,
            payload: res.data
        })})
        .catch(err=>{
            dispatch(returnErrors(err.response.data,err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
};

export const logout = () =>{
    return {
        type: LOGOUT_SUCCESS
    }
};
