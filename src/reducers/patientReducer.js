

const initialState = {
    token: localStorage.getItem('token'),
    patient: null,
};

export default function (state=initialState,action) {
    switch (action.type) {
        default:
            return state;
    }
}
