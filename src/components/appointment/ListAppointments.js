import React,{Component} from "react";
import {connect} from "react-redux";
import {Box} from "grommet";
import {getPatientAppointments} from "../../actions/appointmentActions";
import AppointmentTile from "./AppointmentTile";

class ListAppointments extends Component{

    componentDidMount() {
        const {patient} = this.props;
        const currentDate=new Date().toISOString();
        console.log(currentDate);
        this.props.getPatientAppointments({idPatient: patient.id, date: currentDate});
    }

    render() {
        const {appointments} = this.props;
        console.log(appointments);
        if(!appointments)
            return <div/>;
        return(
            <Box pad='medium' style={{ alignItems: "center"}} flex overflow="auto" direction='column'>
                {appointments.map((appointment) => (
                    <AppointmentTile appointment={appointment} />
                ))}
            </Box>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    user: state.auth.user,
    patient: state.auth.patient,
    appointments: state.appointment.appointments,
});

export default connect(
    mapStateToProps,
    {getPatientAppointments}
)(ListAppointments);
