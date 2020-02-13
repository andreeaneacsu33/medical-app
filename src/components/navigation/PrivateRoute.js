import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {getLogger} from "../../utils/logger";

const log=getLogger('PrivateRoute ');

export const PrivateRoute = ({ component: Component, isAuth, ...rest }) => {
    log(`${isAuth}`);
    return(
        <Route {...rest} render={props => (
            isAuth
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
        )}/>
    )
};
