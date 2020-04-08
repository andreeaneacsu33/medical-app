import React,{Component} from "react";
import {connect} from "react-redux";
import {Box} from "grommet";

class ListDoctorAppointments extends Component{

    componentDidMount() {

    }

    render() {
        return(
            <Box/>
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
)(ListDoctorAppointments);
