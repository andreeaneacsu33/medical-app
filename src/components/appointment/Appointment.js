import React, {Component} from "react";
import {connect} from "react-redux";
import {Box} from "grommet";
import Calendar from "./Calendar";

class Appointment extends Component {

    render() {
        const {doctor} = this.props.location.state;
        console.log(JSON.stringify(doctor));
        return (
            <Box>
                <Calendar doctor={doctor}/>
            </Box>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    user: state.auth.user
});

export default connect(
    mapStateToProps,
    null
)(Appointment);
