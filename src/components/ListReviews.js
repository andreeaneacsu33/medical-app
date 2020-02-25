import React,{Component} from "react";
import {connect} from "react-redux";
import {Box} from "grommet/es6";

class ListReviews extends Component{

    render() {
        return(
            <Box>List Reviews</Box>
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
    null
)(ListReviews);
