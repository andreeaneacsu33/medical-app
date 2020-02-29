import { GET_REVIEW_BY_PATIENT_TO_DOCTOR, GET_REVIEWS_FOR_DOCTOR} from "../actions/actions";

const initialState = {
    token: localStorage.getItem('token'),
    review: null,
    reviews: [],
};

export default function (state=initialState,action) {
    switch (action.type) {
        case GET_REVIEW_BY_PATIENT_TO_DOCTOR:
            return {
                ...state,
                review: action.payload
            };
        case GET_REVIEWS_FOR_DOCTOR:
            return {
                ...state,
                reviews: action.payload
            };
        default:
            return state;
    }
}
