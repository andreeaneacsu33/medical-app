import React, {Component} from "react";
import {connect} from "react-redux";
import {Box, Button, Calendar, Layer, Text, TextInput} from "grommet";
import {getAffiliation} from "../../actions/doctorActions";
import {Add, Close, LinkPrevious} from "grommet-icons/es6";
import {getAppointments} from "../../actions/appointmentActions";
import {Lock, StatusWarning} from "grommet-icons";

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
            renderToAdd: null,
            title: '',
            notes: '',
        }
    }

    setRenderAdd(value) {
        this.setState({renderToAdd: value});
        if(value!==null){
            this.setState({visibilityAdd: true});
        }else{
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
        this.setState({date: date});
        const dateNow = Date.now();
        const dateCalendar = new Date(date);
        if (dateNow > dateCalendar) {
            this.setState({message: 'Can not book any appointments on this date because it has passed.'});
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
        const {appointments} = this.props;
        for (let i = 0; i < appointments.length; i++) {
            let str = appointments[i].startDate.split(' ');
            if (str[0] === formDate) {
                booked.push(str[1]);
            }
        }
        this.setState({booked: booked});
    }

    setVisibility(value) {
        this.setState({visibilityHours: value});
        if (value === false) {
            this.setRenderAdd({renderToAdd: null});
            this.setState({booked: []});
            this.setState({visibilityAdd: false});
        }
    }

    componentDidMount() {
        const {doctor} = this.props.location.state;
        this.props.getAffiliation(doctor.id);
        this.props.getAppointments({idDoctor: doctor.id});
        const hours = this.generateHours();
        this.setState({hours: hours});
    }

    render() {
        const {doctor} = this.props.location.state;
        const {affiliation, appointments} = this.props;
        const {visibilityHours, visibilityAdd, date, hours, booked, message, renderNotification} = this.state;
        console.log(JSON.stringify(doctor));
        console.log(booked);
        if (!affiliation && !appointments)
            return <div/>;
        return (
            <Box className="appointmentCalendar" style={{alignItems: "center"}}>
                <Calendar date={date} onSelect={(date) => this.handleDateClick(date)}/>
                {renderNotification && message && (
                    <Box
                        align="center"
                        direction="row"
                        gap="small"
                        justify="between"
                        round="small"
                        elevation="medium"
                        pad={{vertical: "small", horizontal: "small"}}
                        background="#ffe6e6"
                    >
                        <Box align="center" direction="row" gap="xsmall">
                            <StatusWarning style={{
                                width: "20px",
                                height: "20px",
                                fill: "#d50000",
                                stroke: "#d50000"
                            }}/>
                            <Text style={{color: "#d50000"}}>{message}</Text>
                        </Box>
                    </Box>
                )}
                {visibilityHours && (<Box>
                    <Layer position="right" onClickOutside={() => this.setVisibility(!visibilityHours)}
                           style={{width: "420px", height: "100%"}}>
                        <Box style={{paddingTop: "10px", maxHeight: "90%"}}>
                            <Box direction="row" width="100%">
                                {visibilityAdd && <Box style={{paddingLeft: '12px', paddingTop:'14px'}}><Button className="backButton" onClick={()=>this.setState({visibilityAdd:!visibilityAdd})}><LinkPrevious/></Button></Box>}
                                <Box align="center" pad="small" width="90%"><h4
                                    style={{fontSize: "20px"}}>{this.formatDate(date)}</h4></Box>
                                <Box pad="small"
                                     onClick={() => this.setVisibility(!visibilityHours)}><Close
                                    style={{width: "20px", height: "20px"}}/></Box>
                            </Box>
                            {visibilityAdd ? (
                                <Box>
                                    <Box
                                        className='inputBox'
                                        direction="row"
                                        margin="small"
                                        round="xsmall"
                                        border
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
                                        ) :  (
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
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    user: state.auth.user,
    affiliation: state.doctor.affiliation,
    appointments: state.appointment.appointments,
});

export default connect(
    mapStateToProps,
    {getAffiliation, getAppointments}
)(Appointment);
