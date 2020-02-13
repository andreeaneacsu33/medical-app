import {
    GET_PATIENT,
} from '../actions/constants';

const initialState = {
    token: localStorage.getItem('token'),
    doctor: null,
};

export default function (state=initialState,action) {
    switch (action.type) {
        case GET_PATIENT:
            return {
                ...state,
                doctor: action.payload
            };
        default:
            return state;
    }
}
