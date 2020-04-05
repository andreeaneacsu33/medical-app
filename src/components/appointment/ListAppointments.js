import React,{Component} from "react";
import {connect} from "react-redux";
import {Box} from "grommet";
import {getPatientAppointments} from "../../actions/appointmentActions";
import AppointmentTile from "./AppointmentTile";
import {ScheduleNew} from "grommet-icons";

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
                {appointments.length!==0?appointments.map((appointment) => (
                    <AppointmentTile appointment={appointment} />
                )):(
                    <Box direction='row' alignItems='center' style={{paddingTop: '100px', paddingLeft: '100px'}}>
                        <Box width='10%' height='100px' style={{verticalAlign: 'middle'}}>
                            <ScheduleNew
                                style={{
                                    width: "30px",
                                    height: "30px",
                                }}
                            />
                        </Box>
                        <Box width='60%'>
                            You have no appointments booked. If you wish to make an appointment, go the the Home page...
                        </Box>
                    </Box>
                )}
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
