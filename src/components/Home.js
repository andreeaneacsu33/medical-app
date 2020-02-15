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
import {getDoctor} from "../actions/doctorActions";
import {getPatient} from "../actions/patientActions";

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
        if (this.props.user) {
            if (this.props.user.role.toUpperCase() === 'DOCTOR') {
                this.props.getDoctor({email});
            } else {
                this.props.getPatient({email});
            }
        }
    }

    render() {
        const {visited}=this.props;
        log(JSON.stringify(visited));
        const {user, doctor, patient} = this.props;
        if (!user) {
            return <div/>
        }
        if(!doctor && !patient){
            return <div/>
        }
        return (
            <Grommet theme={customTheme}>
                <Box className='mainContainer'>
                    <Box>
                        <Toolbar/>
                        <Box direction="row">
                            <Menu lastUrl={visited}/>
                            <span>Hello from Home!</span>
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
    doctor: state.doctor.doctor,
    patient: state.patient.patient
});

export default connect(
    mapStateToProps,
    {clearErrors, loadUser, getDoctor, getPatient}
)(Home);

