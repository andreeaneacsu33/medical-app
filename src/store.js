import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {getLogger} from "./utils/logger";
import {STATE} from './actions/constants';

const log=getLogger('store ');
const initialState={};
const middleWare=[thunk];

function saveToLocalStorage(state) {
    try{
        const serializedState=JSON.stringify(state);
        localStorage.setItem(STATE,serializedState);
    }catch (e) {
        log(e);
    }
}

function loadFromLocalStorage() {
    try{
        const serializedState=localStorage.getItem(STATE);
        if(serializedState==null) return initialState;
        return JSON.parse(serializedState);
    }catch (e) {
        log(e);
        return initialState;
    }
}

const persistedState=loadFromLocalStorage();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
    persistedState,
    composeEnhancers(applyMiddleware(...middleWare))
);

store.subscribe(()=>saveToLocalStorage(store.getState()));
export default store;