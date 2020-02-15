import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {history} from "../../utils/history";
import Login from "../Login";
import {PrivateRoute} from "./PrivateRoute";
import {Router, Route, Redirect} from 'react-router-dom';
import Home from '../Home';
import Register from '../Register';
import Profile from "../Profile";
import Settings from "../Settings";

class Navigation extends Component{
    static propTypes = {
        isAuthenticated: PropTypes.bool
    };

    render() {
        const {isAuthenticated}=this.props;
        return(
            <Router history={history}>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
                <PrivateRoute path='/home' component={Home} isAuth={isAuthenticated}/>
                <PrivateRoute path='/profile' component={Profile} isAuth={isAuthenticated}/>
                <PrivateRoute path='/settings' component={Settings} isAuth={isAuthenticated}/>
                <Route exact path='/' render={() => (
                    <Redirect to='/login'/>
                )}/>
            </Router>
        )
    }
}

const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    null
)(Navigation);