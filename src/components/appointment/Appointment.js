import React, {Component} from "react";
import {connect} from "react-redux";
import {Box, Button, Calendar, Grommet, Layer, Select, Text, TextInput} from "grommet";
import {getAffiliation, getQualification} from "../../actions/doctorActions";
import {Add, CircleInformation, Close, LinkPrevious} from "grommet-icons/es6";
import {addAppointment, getDoctorAppointments} from "../../actions/appointmentActions";
import {Lock, StatusGood, StatusWarning} from "grommet-icons";
import {customTheme} from "../../utils/helpers";
import Notification from "../Notification";
import DoctorDetails from "../doctor/DoctorDetails";
import Toolbar from "../menu/Toolbar";
import {history} from "../../utils/history";

class Appointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibilityHours: false,
            visibilityAdd: false,
            date: Date.now(),
            hours: [],
            booked: [],
            message: '',
            renderNotification: false,
            renderSaveMessage: false,
            valid: true,
            startHour: null,
            title: '',
            notes: '',
            hospital: '',
        }
    }

    setRenderAdd(value) {
        this.setState({startHour: value});
        if (value !== null) {
            this.setState({visibilityAdd: true});
        } else {
            this.setState({visibilityAdd: false});
        }
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    generateHours() {
        let times = []; // time array
        for (let i = 10; i < 18; i++) {
            times.push(`${i}:00`);
            times.push(`${i}:30`);
        }
        times.push("18:00");
        return times;
    }

    formatDate(date) {
        const month = date.substr(5, 2);
        const day = date.substr(8, 2);
        const year = date.substr(0, 4);
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return `${monthNames[month - 1]} ${day}, ${year}`;
    }

    handleDateClick(date) {
        const dayOfWeek = new Date(date).getDay();
        this.setState({date: date});
        const dateNow = Date.now();
        const dateCalendar = new Date(date);
        if (dateNow > dateCalendar) {
            this.setState({message: 'Cannot book any appointments on this date because it has passed.'});
            this.setState({renderNotification: true});
            setTimeout(function () { //Start the timer
                this.setState({renderNotification: false}) //After 1 second, set render to true
            }.bind(this), 3000)
        } else if (dayOfWeek === 6 || dayOfWeek === 0) {
            this.setState({message: 'Cannot book any appointments on Saturday or Sunday.'});
            this.setState({renderNotification: true});
            setTimeout(function () { //Start the timer
                this.setState({renderNotification: false}) //After 1 second, set render to true
            }.bind(this), 3000)
        } else {
            this.setState({message: ''});
            this.setState({visibilityHours: true});
            this.formatAppointments(date);
        }
    }

    formatAppointments(date) {
        let booked = [];
        let formDate = date.substr(0, 10);
        const {doctor} = this.props.location.state;
        this.props.getDoctorAppointments({idDoctor: doctor.id});
        const {appointments} = this.props;
        for (let i = 0; i < appointments.length; i++) {
            let str = appointments[i].startDate.split(' ');
            if (str[0] === formDate) {
                booked.push(str[1]);
            }
        }
        console.log(`booked` + booked);
        this.setState({booked: booked});
    }

    setVisibility(value) {
        this.setState({visibilityHours: value});
        if (value === false) {
            this.setRenderAdd({startHour: null});
            this.setState({booked: []});
            this.setState({visibilityAdd: false});
        }
    }

    componentDidMount() {
        const {doctor} = this.props.location.state;
        this.props.getAffiliation(doctor.id);
        this.props.getQualification(doctor.id);
        this.props.getDoctorAppointments({idDoctor: doctor.id});
        const hours = this.generateHours();
        this.setState({hours: hours});
    }

    getAffiliationOptions() {
        const {affiliation} = this.props;
        let options = [];
        for (let i = 0; i < affiliation.length; i++) {
            options.push(`${affiliation[i].hospitalName} - ${affiliation[i].city}`);
        }
        return options;
    }

    findAffiliationId(affiliationName) {
        const {affiliation} = this.props;
        const attr = affiliationName.split(' - ');
        console.log(attr);
        for (let i = 0; i < affiliation.length; i++) {
            if (affiliation[i].hospitalName === attr[0] && affiliation[i].city === attr[1]) {
                console.log(`aff` + affiliation[i].id);
                return affiliation[i].id;
            }
        }
        return -1;
    }

    onAppointmentSave = e => {
        e.preventDefault();
        const {doctor} = this.props.location.state;
        const {patient} = this.props;
        const {title, notes, date, startHour, hospital} = this.state;
        const idAffiliation = this.findAffiliationId(hospital);
        if (idAffiliation === -1 || title === '' || hospital === '') {
            this.setState({message: 'Please complete the required fields accordingly.'});
            this.setState({valid: false});
        } else {
            const hourComponents = startHour.split(':');
            let endHour;
            if (hourComponents[1] === '00')
                endHour = hourComponents[0] + ':30';
            else {
                const intValue = parseInt(hourComponents[0], 10) + 1;
                endHour = intValue + ':00';
            }
            const startDate = date.slice(0, 10) + 'T' + startHour + ':00.000Z';
            const endDate = date.slice(0, 10) + 'T' + endHour + ':00.000Z';
            const appointmentDTO = {
                idDoctor: doctor.id,
                idPatient: patient.id,
                idAffiliation: idAffiliation,
                startDate: startDate,
                endDate: endDate,
                title: title,
                notes: notes
            };
            this.props.addAppointment(appointmentDTO);
            this.setState({valid: true});
            this.setState({hospital: ''});
            this.setState({title: ''});
            this.setState({notes: ''});
            this.setState({visibilityAdd: false});
            this.setState({visibilityHours: false});
            this.setState({message: 'Your appointment was successfully booked.'});
            this.setState({renderSaveMessage: true});
            setTimeout(function () { //Start the timer
                this.setState({renderSaveMessage: false})
            }.bind(this), 3000)
        }
    };

    render() {
        const {doctor} = this.props.location.state;
        const {affiliation, appointments, qualification} = this.props;
        const {visibilityHours, visibilityAdd, date, hours, booked, message, renderNotification, startHour, renderSaveMessage,valid} = this.state;
        const optionsAffiliation = this.getAffiliationOptions();
        console.log(affiliation);
        console.log(booked);
        if (!affiliation && !appointments && !qualification)
            return <div/>;
        return (
            <Grommet theme={customTheme}>
                <Toolbar/>
                <Box height='20%' direction='row'>
                    <Box width='40%'>
                        <Button style={{paddingTop: '20px', paddingLeft: '20px'}} alignSelf='start' className="backButton" onClick={()=>history.push(`/home`)}><LinkPrevious/></Button>
                    </Box>
                    <Box style={{paddingTop: '20px'}}>
                        <Box direction='row' style={{padding: '10px',borderRadius: '10px'}}>
                            <Text style={{fontSize: '24px',fontStyle: '\'Google Sans\',Roboto,RobotoDraft,Helvetica,Arial,sans-serif', fontWeight: 350, color: '#8b8b8b'}}>Appointment booking</Text>
                        </Box>
                    </Box>
                </Box>
                <Box className="appointmentCalendar" style={{alignItems: "center"}}>
                    <Box direction='row'>
                        <Box style={{marginRight: '50px', height: '430px'}} overflow='auto'>
                            <DoctorDetails doctor={doctor} affiliation={affiliation} qualification={qualification}/>
                        </Box>
                        <Calendar date={date} daysOfWeek={true} onSelect={(date) => this.handleDateClick(date)}/>
                    </Box>
                    {renderNotification && message && (
                        <Notification icon={<StatusWarning style={{
                            width: "20px",
                            height: "20px",
                            fill: "#d50000",
                            stroke: "#d50000"
                        }}/>} backgroundColor="#ffe6e6" textColor="#d50000" message={message}/>
                    )}
                    {renderSaveMessage && message && (
                        <Notification icon={<StatusGood style={{
                            width: "20px",
                            height: "20px",
                            fill: "#009933",
                            stroke: "#009933"
                        }}/>} backgroundColor="#c3ffbf" textColor="#009933" message={message}/>
                    )}
                    {visibilityHours && (<Box>
                        <Layer position="right" onClickOutside={() => this.setVisibility(!visibilityHours)}
                               style={{width: "420px", height: "100%"}}>
                            <Box style={{paddingTop: "10px", maxHeight: "90%"}}>
                                <Box direction="row" width="100%">
                                    {visibilityAdd && <Box style={{paddingLeft: '30px', paddingTop: '14px'}}><Button
                                        className="backButton"
                                        onClick={() => {this.setState({visibilityAdd: !visibilityAdd}); this.setState({message: ''})}}><LinkPrevious/></Button></Box>}
                                    <Box align="center" pad="small" width="90%"><h4
                                        style={{fontSize: "20px"}}>{this.formatDate(date)}</h4></Box>
                                    <Box pad="small"
                                         onClick={() => this.setVisibility(!visibilityHours)}><Close
                                        style={{width: "20px", height: "20px"}}/></Box>
                                </Box>
                                {visibilityAdd ? (
                                    <Box flex overflow="auto" direction='column'
                                         style={{paddingLeft: "30px", paddingRight: '30px', alignItems: 'center'}}
                                         className='addAppointment'>
                                        <Box style={{paddingTop: "2px", paddingBottom: "10px", alignItems: 'center'}}>
                                            {startHour}
                                        </Box>
                                        <Box
                                            className='inputBox'
                                            direction="row"
                                            margin="small"
                                            round="xsmall"
                                            border
                                            style={{paddingLeft: "11px"}}
                                        >
                                            <TextInput
                                                className='input'
                                                name='title'
                                                id='title'
                                                plain
                                                placeholder='Title'
                                                type='text'
                                                onChange={this.onChange}
                                            />
                                        </Box>
                                        <Box
                                            className='inputBox'
                                            direction="row"
                                            margin="small"
                                            round="xsmall"
                                            border
                                            style={{paddingLeft: "11px"}}
                                        >
                                            <TextInput
                                                className='input'
                                                name='notes'
                                                id='notes'
                                                plain
                                                placeholder='Notes'
                                                type='text'
                                                onChange={this.onChange}
                                            />
                                        </Box>
                                        <Box
                                            style={{paddingTop: '12px', height: '64px'}}
                                            className='inputBox'
                                            direction="row"
                                        >
                                            <Select
                                                className='select'
                                                id="role"
                                                name="role"
                                                placeholder="Hospital"
                                                options={optionsAffiliation}
                                                value={this.state.hospital}
                                                onChange={({option}) => this.setState({hospital: option})}
                                            />
                                        </Box>
                                        {!valid && message && (
                                            <Box style={{paddingLeft: '12px',flexDirection: 'row', display: 'flex'}}>
                                                <CircleInformation className='infoIcon'/>
                                                <span style={{color: '#d50000',fontSize: '13px'}}>{message}</span>
                                            </Box>
                                        )}
                                        <Box className='saveButton' direction="row" width="100%"
                                             style={{paddingTop: "20px"}}>
                                            <Box width="65%"/>
                                            <Button type='submit'
                                                    onClick={this.onAppointmentSave}><span>Save</span></Button>
                                        </Box>
                                    </Box>
                                ) : (
                                    <Box flex overflow="auto" direction='column' style={{paddingLeft: "30px"}}>
                                        {!message && hours.length !== 0 && hours.map((hour) => (
                                            <Box pad='small' style={{
                                                minHeight: "70px",
                                                maxWidth: "90%"
                                            }}>
                                                {booked.includes(hour) ? (
                                                    <Box style={{
                                                        borderRadius: "8px",
                                                        minHeight: "50px",
                                                        border: "1px solid #ccc"
                                                    }} direction='row'>
                                                        <Box pad='small' width='97%'>
                                                            {hour}
                                                        </Box>
                                                        <Box pad='small' align="end" className="icon">
                                                            <Lock style={{
                                                                width: "20px",
                                                                height: "20px",
                                                                fill: "#d50000",
                                                                stroke: "#d50000"
                                                            }}/>
                                                        </Box>
                                                    </Box>
                                                ) : (
                                                    <Box style={{
                                                        borderRadius: "8px",
                                                        minHeight: "50px",
                                                        border: "1px solid #ccc"
                                                    }} direction='row'>
                                                        <Box pad='small' width='97%'>
                                                            {hour}
                                                        </Box>
                                                        <Box pad='small' align="end" className="icon"
                                                             onClick={() => {
                                                                 this.setRenderAdd(hour)
                                                             }}>
                                                            <Add style={{
                                                                width: "20px",
                                                                height: "20px",
                                                                fill: "#516cfb",
                                                                stroke: "#516cfb"
                                                            }}/>
                                                        </Box>
                                                    </Box>
                                                )}
                                            </Box>
                                        ))}
                                    </Box>
                                )}
                            </Box>
                        </Layer>
                    </Box>)}
                </Box>
            </Grommet>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    user: state.auth.user,
    patient: state.auth.patient,
    affiliation: state.doctor.affiliation,
    qualification: state.doctor.qualification,
    appointments: state.appointment.appointments,
});

export default connect(
    mapStateToProps,
    {getAffiliation, getDoctorAppointments, addAppointment, getQualification}
)(Appointment);
