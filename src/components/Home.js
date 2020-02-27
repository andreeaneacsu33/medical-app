import React, {Component} from 'react';
import {Box, Grommet} from 'grommet';
import {connect} from 'react-redux';
import {clearErrors} from '../actions/errorActions';
import PropTypes from 'prop-types';
import {getLogger} from '../utils/logger';
import {USERNAME} from '../actions/constants';
import Menu from "./menu/Menu";
import Toolbar from "./menu/Toolbar";
import {customTheme} from "../utils/helpers";
import {loadUser} from "../actions/authActions";
import ListDoctors from "./ListDoctors";
import ListReviews from "./ListReviews";

const log = getLogger('Home ');

class Home extends Component {
    state = {
        email: localStorage.getItem(USERNAME),
    };
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        user: PropTypes.object,
        clearErrors: PropTypes.func.isRequired
    };

    componentWillMount() {
        const {email} = this.state;
        this.props.loadUser({email});
        log(JSON.stringify(this.props.user));
    }

    render() {
        log(JSON.stringify(this.props));
        const {visited} = this.props;
        log(JSON.stringify(visited));
        const {user} = this.props;
        log(JSON.stringify(user));
        if (!user) {
            return <div/>
        }
        return (
            <Grommet theme={customTheme}>
                <Box>
                    <Box>
                        <Toolbar/>
                        <Box direction="row">
                            <Menu lastUrl={visited}/>
                            {user.role.toUpperCase()==='PATIENT' ? <ListDoctors/> : <ListReviews/>}
                        </Box>
                    </Box>
                </Box>
            </Grommet>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    user: state.auth.user,
    doctor: state.auth.doctor,
    patient: state.auth.patient
});

export default connect(
    mapStateToProps,
    {clearErrors, loadUser}
)(Home);

