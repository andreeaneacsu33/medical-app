import React, {Component} from "react";
import {Box, Text} from "grommet";
import {connect} from "react-redux";
import {removeAppointment} from "../../actions/appointmentActions";

class DoctorAppointmentTile extends Component {

    render() {
        const {appointment} = this.props;
        console.log(appointment);
        return (
            <Box width='80%' style={{paddingTop: '20px'}} height="auto">
                <Box pad='small' style={{borderRadius: "8px", border: "1px solid #ccc"}} background="#fafafa">
                    <Box width='auto' style={{borderRadius: "8px", backgroundColor: 'rgba(197,199,255,0.62)'}}>
                        <Text alignSelf='center'>{appointment.title}</Text>
                    </Box>
                    <Box direction='row' style={{fontSize: '17px', paddingLeft: '5px', paddingTop: '5px'}}>
                        <span style={{color: '#676767'}}>Patient: </span><span
                        style={{paddingLeft: '5px'}}>{appointment.patient.firstName} {appointment.patient.lastName}</span>
                    </Box>
                    <Box direction='row' style={{fontSize: '17px', paddingLeft: '5px', paddingTop: '5px'}}>
                        <span style={{color: '#676767'}}>Contact: </span><span
                        style={{paddingLeft: '5px'}}>{appointment.patient.email}</span>
                    </Box>
                    <Box direction='row' style={{fontSize: '17px', paddingLeft: '5px', paddingTop: '5px'}}>
                        <span style={{color: '#676767'}}>Notes: </span><span
                        style={{paddingLeft: '5px'}}>{appointment.notes}</span>
                    </Box>
                    <Box direction='row' style={{fontSize: '17px', paddingLeft: '5px', paddingTop: '5px'}}>
                        <span style={{color: '#676767'}}>Date: </span><span
                        style={{paddingLeft: '5px'}}>{appointment.startDate.slice(0, 10)}</span>
                    </Box>
                    <Box direction='row' style={{fontSize: '17px', paddingLeft: '5px', paddingTop: '5px'}}>
                        <span style={{color: '#676767'}}>Hour: </span><span
                        style={{paddingLeft: '5px'}}>{appointment.startDate.slice(11)}</span>
                    </Box>
                </Box>
            </Box>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
});

export default connect(
    mapStateToProps,
    {removeAppointment}
)(DoctorAppointmentTile);
