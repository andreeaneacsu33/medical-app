import {GET_ERRORS, CLEAR_ERRORS} from "../actions/actions";

const initialState = {
    message: {},
    status: null,
    id: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            if (action.payload.status === 401 && action.payload.id === 'LOGIN_FAIL') {
                return {
                    message: 'Invalid credentials',
                    status: action.payload.status,
                    id: action.payload.id
                };
            } else if (action.payload.status === 400 && action.payload.id === 'LOGIN_FAIL') {
                return {
                    message: 'Email address already in use',
                    status: action.payload.status,
                    id: action.payload.id
                };
            } else {
                console.log('aici');
                console.log(action.payload);
                return {
                    message: action.payload.message,
                    status: action.payload.status,
                    id: action.payload.id
                }
            }
        case CLEAR_ERRORS:
            return {
                message: {},
                status: null,
                id: null
            };
        default:
            return state;
    }
}
