import {
    GET_DOCTOR,
} from '../actions/constants';

const initialState = {
    token: localStorage.getItem('token'),
    doctor: null,
};

export default function (state=initialState,action) {
    switch (action.type) {
        case GET_DOCTOR:
            return {
                ...state,
                doctor: action.payload
            };
        default:
            return state;
    }
}
