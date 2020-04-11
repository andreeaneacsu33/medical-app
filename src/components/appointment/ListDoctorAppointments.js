import React, {Component} from "react";
import {connect} from "react-redux";
import {Box, Calendar, DropButton, Grid, Text} from "grommet";
import {getDoctorAppointmentsFromDate} from "../../actions/appointmentActions";
import {Schedule, ScheduleNew} from "grommet-icons";
import DoctorAppointmentTile from "./DoctorAppointmentTile";

class ListDoctorAppointments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropButtonVisibility: false,
            date: Date.now(),
        }
    }


    componentDidMount() {
        const {doctor} = this.props;
        const currentDate = new Date().toISOString();
        this.props.getDoctorAppointmentsFromDate({idDoctor: doctor.id, date: currentDate});
    }

    setDate(date) {
        const {doctor} = this.props;
        this.setState({date: date});
        let formattedDate;
        const currentDate = new Date().setHours(0, 0, 0, 0);
        const userDate = new Date(date).setHours(0, 0, 0, 0);
        if (userDate === currentDate) {
            formattedDate = new Date(date).toISOString();
        } else {
            formattedDate = new Date(date).toISOString().slice(0, 10) + "T00:00:00.000Z";
        }
        this.props.getDoctorAppointmentsFromDate({idDoctor: doctor.id, date: formattedDate});
        this.setState({dropButtonVisibility: false});
    }

    setOpen(values) {
        this.setState({dropButtonVisibility: values});
    }

    render() {
        const {dropButtonVisibility, date} = this.state;
        const {appointments} = this.props;
        if (!appointments)
            return <div/>;
        return (
            <Box width='100%'>
                <Box style={{padding: '20px'}}>
                    <Box className='dropDate' align="center" style={{
                        width: '160px',
                        height: '48px',
                        borderRadius: '8px',
                        border: "1px solid #ccc",
                        overflow: 'hidden'
                    }}>
                        <DropButton
                            open={dropButtonVisibility}
                            onClose={() => this.setOpen(false)}
                            onOpen={() => this.setOpen(true)}
                            dropContent={
                                <Calendar
                                    size='small'
                                    animate={false}
                                    date={date}
                                    onSelect={(date) => this.setDate(date)}
                                    showAdjacentDays={false}
                                />
                            }
                        >
                            <Box direction="row" gap="medium" align="center" pad="small">
                                <Text color={date ? undefined : "dark-5"}>
                                    {date
                                        ? `${new Date(date).toLocaleDateString()}`
                                        : "Select date"}
                                </Text>
                                <Schedule/>
                            </Box>
                        </DropButton>
                    </Box>
                </Box>
                <Box pad='medium' style={{alignItems: "center"}} flex overflow="auto" direction='column'>
                    <Grid style={{marginLeft: "30px", maxWidth: "74%"}}
                          columns={{
                              count: 2,
                              size: "auto"
                          }}
                          gap="large"
                          align="center"
                          fill="horizontal">
                        {
                            appointments.length !== 0 && appointments.map((appointment) => (
                                <DoctorAppointmentTile appointment={appointment}/>
                            ))
                        }
                    </Grid>
                </Box>
                <Box pad='small' style={{alignItems: "center"}} >
                    {
                        appointments.length === 0 &&(
                            <Box direction='row'
                                 style={{verticalAlign: 'middle', paddingTop: '100px', paddingLeft: '200px'}}>
                                <Box width='8%' height='100px'>
                                    <ScheduleNew
                                        style={{
                                            width: "30px",
                                            height: "30px",
                                        }}
                                    />
                                </Box>
                                <Box width='60%'>
                                    You have no appointments booked on this date...
                                </Box>
                            </Box>
                        )
                    }
                </Box>
            </Box>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    doctor: state.auth.doctor,
    appointments: state.appointment.appointments,
});

export default connect(
    mapStateToProps,
    {getDoctorAppointmentsFromDate}
)(ListDoctorAppointments);
