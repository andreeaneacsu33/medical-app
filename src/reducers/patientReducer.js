import {
    GET_PATIENT,
} from '../actions/constants';

const initialState = {
    token: localStorage.getItem('token'),
    patient: null,
};

export default function (state=initialState,action) {
    switch (action.type) {
        case GET_PATIENT:
            return {
                ...state,
                patient: action.payload
            };
        default:
            return state;
    }
}
