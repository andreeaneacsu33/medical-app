import React,{Component} from "react";
import {Box} from "grommet";
import {connect} from "react-redux";
import Dashboard from "../Dashboard";
import ListReviews from "../doctor/ListReviews";

class DoctorHomePage extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const {doctor} = this.props;
        if(!doctor)
            return <div/>;
        return(
            <Box width='100%'>
                <Box direction='row'>
                    <Box width='60%'/>
                    <Box width='40%'>
                        <Dashboard/>
                    </Box>
                </Box>
                <ListReviews/>
            </Box>
        )
    }

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    doctor: state.auth.doctor,
});

export default connect(
    mapStateToProps,
    null
)(DoctorHomePage);
