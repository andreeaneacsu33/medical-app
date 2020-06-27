import React, {Component} from "react";
import {connect} from "react-redux";
import {Box, Button, Calendar, DropButton, Layer, Select, Text} from "grommet";
import PropTypes from 'prop-types';
import {Close, Edit, Schedule, StatusGood, StatusWarning, Trash} from "grommet-icons";
import {
    getDoctorAppointments,
    getDoctorAppointmentsFromDate,
    removeAppointment,
    updateAppointment
} from "../../actions/appointmentActions";
import Notification from "../Notification";

class PatientAppointmentTile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkVisibleRemove: false,
            checkVisibleUpdate: false,
            notificationVisible: false,
            dropButtonVisibility: false,
            notificationMessage: '',
            errorMessage: '',
            message: '',
            hour: this.props.appointment.startDate.slice(11),
            date: this.props.appointment.startDate.slice(0, 10),
            renderUpdateMessage: false,
            booked: [],
        }
    }

    static propTypes = {
        appointment: PropTypes.object.isRequired,
    };

    onRemoveAppointment(id) {
        this.props.removeAppointment({idAppointment: id});
        this.setRemoveVisibility(false);
        const {error} = this.props;
        if (Object.entries(error.message).length !== 0) {
            this.setState({errorMessage: 'Appointment could not be deleted!'});
            this.setState({notificationMessage: ''});
            this.setState({notificationVisible: true});
            setTimeout(function () { //Start the timer
                this.setState({notificationVisible: false})
            }.bind(this), 3000)
        }
    }

    setOpen(values) {
        this.setState({dropButtonVisibility: values});
    }

    onCheckRemove() {
        this.setState({checkVisibleRemove: true});
    }

    onCheckUpdate() {
        this.setState({checkVisibleUpdate: true});
    }

    setRemoveVisibility(value) {
        this.setState({checkVisibleRemove: value})
    }

    setUpdateVisibility(value) {
        this.setState({checkVisibleUpdate: value})
    }

    getHours(date) {
        const {appointment} = this.props;
        let formattedDate = new Date(date).toISOString().slice(0, 10) + "T00:00:00.000Z";
        this.props.getDoctorAppointmentsFromDate({idDoctor: appointment.doctor.id, date: formattedDate});
    }

    checkDate(date) {
        const dayOfWeek = new Date(date).getDay();
        const dateNow = Date.now();
        const dateCalendar = new Date(date);
        if (dateNow > dateCalendar) {
            return false;
        } else return !(dayOfWeek === 6 || dayOfWeek === 0);
    }

    setDate(date) {
        let formattedDate;
        if (this.checkDate(date)) {
            this.formatAppointments(date);
            const currentDate = new Date().setHours(0, 0, 0, 0);
            const userDate = new Date(date).setHours(0, 0, 0, 0);
            if (userDate === currentDate) {
                formattedDate = new Date(date).toISOString();
            } else {
                formattedDate = new Date(date).toISOString().slice(0, 10) + "T00:00:00.000Z";
            }
            this.setState({date: formattedDate});
            this.setState({dropButtonVisibility: false});
        }
    }

    generateHours() {
        let times = []; // time array
        for (let i = 10; i < 18; i++) {
            times.push(`${i}:00`);
            times.push(`${i}:30`);
        }
        times.push("18:00");
        return times;
    }

    onUpdateAppointment = e => {
        e.preventDefault();
        let {appointment} = this.props;
        const {date, hour} = this.state;
        const hourComponents = hour.split(':');
        let endHour;
        if (hourComponents[1] === '00')
            endHour = hourComponents[0] + ':30';
        else {
            const intValue = parseInt(hourComponents[0], 10) + 1;
            endHour = intValue + ':00';
        }
        const startDate = date.slice(0, 10) + 'T' + hour + ':00.000Z';
        const endDate = date.slice(0, 10) + 'T' + endHour + ':00.000Z';
        appointment = {
            ...appointment,
            startDate: startDate,
            endDate: endDate,
            idDoctor: appointment.doctor.id,
            idPatient: appointment.patient.id,
            idAffiliation: appointment.affiliation.id
        };
        this.props.updateAppointment(appointment);
        this.setState({valid: true});
        this.setState({checkVisibleUpdate: false});
        this.setState({message: 'Your appointment was successfully booked.'});
        this.setState({renderUpdateMessage: true});
        setTimeout(function () { //Start the timer
            this.setState({renderUpdateMessage: false})
        }.bind(this), 3000)
    };

    render() {
        const {appointments} = this.props;
        let {appointment} = this.props;
        appointment = appointments.find(app => app.id === appointment.id);
        const {checkVisibleRemove, checkVisibleUpdate, notificationVisible, errorMessage, dropButtonVisibility, date, message, renderUpdateMessage} = this.state;
        const optionsHour = this.generateHours();
        return (
            <Box width='40%' style={{paddingTop: '20px'}} height="auto">
                <Box pad='small' style={{borderRadius: "8px", border: "1px solid #ccc"}} background="#fafafa">
                    <Box width='auto' style={{borderRadius: "8px", backgroundColor: 'rgba(197,199,255,0.62)'}}>
                        <Text alignSelf='center'>{appointment.title}</Text>
                    </Box>
                    <Box direction='row' style={{fontSize: '17px', paddingLeft: '5px', paddingTop: '5px'}}>
                        <span style={{color: '#676767'}}>Doctor: </span><span
                        style={{paddingLeft: '5px'}}>{appointment.doctor.firstName} {appointment.doctor.lastName}</span>
                    </Box>
                    <Box direction='row' style={{fontSize: '17px', paddingLeft: '5px', paddingTop: '5px'}}>
                        <span style={{color: '#676767'}}>Location: </span><span
                        style={{paddingLeft: '5px'}}>{appointment.affiliation.hospitalName} {appointment.affiliation.city},{appointment.affiliation.country}</span>
                    </Box>
                    {appointment.notes !== '' && (
                        <Box direction='row' style={{fontSize: '17px', paddingLeft: '5px', paddingTop: '5px'}}>
                            <span style={{color: '#676767'}}>Notes: </span><span
                            style={{paddingLeft: '5px'}}>{appointment.notes}</span>
                        </Box>
                    )}
                    <Box direction='row' style={{fontSize: '17px', paddingLeft: '5px', paddingTop: '5px'}}>
                        <span style={{color: '#676767'}}>Date: </span><span
                        style={{paddingLeft: '5px'}}>{appointment.startDate.slice(0, 10)}</span>
                    </Box>
                    <Box direction='row' style={{fontSize: '17px', paddingLeft: '5px', paddingTop: '5px'}}>
                        <span style={{color: '#676767'}}>Hour: </span><span
                        style={{paddingLeft: '5px'}}>{appointment.startDate.slice(11)}</span>
                    </Box>
                    <Box direction='row' style={{fontSize: '17px', paddingLeft: '5px', paddingTop: '10px'}}
                         width="100%">
                        <Box width="85%"/>
                        <Box id='trashIcon'>
                            <Trash style={{width: '20px', height: '20px'}}
                                   onClick={() => this.onCheckRemove()}/>
                        </Box>
                        <Box id='trashIcon' style={{paddingLeft: '20px'}}>
                            <Edit style={{width: '20px', height: '20px'}}
                                  onClick={() => this.onCheckUpdate()}/>
                        </Box>
                    </Box>
                </Box>
                {checkVisibleRemove && (
                    <Layer position="center"
                           onClickOutside={() => this.setRemoveVisibility(!checkVisibleRemove)}
                           style={{height: '160px'}}>
                        <Box height="medium" width="500px" overflow="auto">
                            <Box direction='row'>
                                <Box width='90%'/>
                                <Box pad="small"
                                     onClick={() => this.setRemoveVisibility(!checkVisibleRemove)}><Close
                                    style={{width: "20px", height: "20px"}}/></Box>
                            </Box>
                            <Box direction='row' pad='small' alignSelf='center'>
                                <span
                                    style={{fontSize: '18px'}}>Are you sure you want to remove this appointment?</span></Box>
                            <Box direction='row' style={{paddingTop: '15px'}}>
                                <Box width='55%'/>
                                <Box style={{alignItems: "center"}} className='logout'
                                     direction='row'>
                                    <Box style={{paddingRight: '5px'}}>
                                        <Button onClick={() => {
                                            this.setRemoveVisibility(!checkVisibleRemove);
                                        }}>Cancel</Button>
                                    </Box>
                                    <Box style={{paddingLeft: '5px'}}>
                                        <Button onClick={() => {
                                            this.onRemoveAppointment(appointment.id);
                                        }}>Remove</Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Layer>
                )}
                {checkVisibleUpdate && (
                    <Layer position="center"
                           onClickOutside={() => this.setUpdateVisibility(!checkVisibleUpdate)}
                           style={{height: '250px'}}>
                        <Box width="400px" overflow="auto">
                            <Box direction="row" width="100%">
                                <Box align="center" pad="small" width="90%"><h4
                                    style={{fontSize: "18px"}}>Update Appointment</h4></Box>
                                <Box pad="small"
                                     onClick={() => this.setUpdateVisibility(!checkVisibleUpdate)}><Close
                                    style={{width: "20px", height: "20px"}}/></Box>
                            </Box>
                            <Box direction='row' style={{marginLeft: '15px'}}>
                                <Box style={{paddingTop: '5px'}}>
                                    <span style={{color: '#676767', paddingTop: '5px'}}>Date: </span>
                                </Box>
                                <Box direction='row' style={{fontSize: '17px', paddingLeft: '10px', paddingTop: '5px'}}>
                                    <Box className='dropDate' align="center" style={{
                                        width: '160px',
                                        height: '46px',
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
                                                    showAdjacentDays={true}
                                                />
                                            }
                                        >
                                            <Box direction="row" gap="medium" align="center" pad="small">
                                                <Text color={date ? undefined : "dark-5"}>
                                                    {appointment.startDate
                                                        ? `${new Date(date).toLocaleDateString()}`
                                                        : "Select date"}
                                                </Text>
                                                <Schedule/>
                                            </Box>
                                        </DropButton>
                                    </Box>
                                </Box>
                            </Box>
                            <Box direction='row' style={{marginLeft: '15px', paddingTop: '10px'}}>
                                <Box style={{paddingTop: '5px'}}>
                                    <span style={{color: '#676767'}}>Hour: </span>
                                </Box>
                                <Box
                                    style={{paddingTop: '2px', width: '170px', paddingLeft: '12px'}}
                                    className='hourInput'
                                    direction="row"
                                >
                                    <Select
                                        className='select'
                                        id="hour"
                                        name="hour"
                                        placeholder="Hour"
                                        options={optionsHour}
                                        value={this.state.hour}
                                        onChange={({option}) => this.setState({hour: option})}
                                    />
                                </Box>
                            </Box>
                            <Box style={{alignItems: "center"}} className='logout'
                                 direction='row'>
                                <Box width='70%'/>
                                <Box style={{paddingRight: '5px'}}>
                                    <Button onClick={
                                        this.onUpdateAppointment
                                    }>Update</Button>
                                </Box>
                            </Box>
                        </Box>
                    </Layer>
                )}
                {renderUpdateMessage && message && (
                    <Notification icon={<StatusGood style={{
                        width: "20px",
                        height: "20px",
                        fill: "#009933",
                        stroke: "#009933"
                    }}/>} backgroundColor="#c3ffbf" textColor="#009933" message={message}/>
                )}
                {
                    notificationVisible && errorMessage && (
                        <Notification icon={<StatusWarning style={{
                            width: "20px",
                            height: "20px",
                            fill: "#d50000",
                            stroke: "#d50000"
                        }}/>} backgroundColor="#ffe6e6" textColor="#d50000" message={this.state.notificationMessage}/>
                    )
                }
            </Box>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    appointments: state.appointment.appointments,
});

export default connect(
    mapStateToProps,
    {removeAppointment, updateAppointment, getDoctorAppointmentsFromDate, getDoctorAppointments}
)(PatientAppointmentTile);
