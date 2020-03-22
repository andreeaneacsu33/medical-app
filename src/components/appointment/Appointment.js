import React, {Component} from "react";
import {connect} from "react-redux";
import {Box, Calendar, Layer} from "grommet";
import {getAffiliation} from "../../actions/doctorActions";
import {Add, Close} from "grommet-icons/es6";
import {getAppointments} from "../../actions/appointmentActions";
import {Lock} from "grommet-icons";

class Appointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            date: Date.now(),
            hours: [],
            booked: [],
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
        this.setState({visible: true});
        this.formatAppointments(date);
    }

    formatAppointments(date){
        console.log(date);
        let booked=[];
        let formDate=date.substr(0,10);
        const {appointments}=this.props;
        for(let i=0;i<appointments.length;i++){
            let str=appointments[i].startDate.split(' ');
            if(str[0]===formDate){
                booked.push(str[1]);
            }
        }
        console.log('--------');
        console.log(booked);
        this.setState({booked: booked});
    }

    setVisibility(value) {
        this.setState({visible: value});
        if(value===false){
            this.setState({booked: []})
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
        const {visible, date, hours, booked} = this.state;
        console.log(JSON.stringify(doctor));
        console.log(booked);
        if (!affiliation && !appointments)
            return <div/>;
        return (
            <Box className="appointmentCalendar" style={{alignItems: "center"}}>
                <Calendar date={date} onSelect={(date) => this.handleDateClick(date)}/>
                {visible && <Box>
                    <Layer position="right" onClickOutside={() => this.setVisibility(!visible)}
                           style={{width: "420px", height: "100%"}}>
                        <Box style={{paddingTop: "10px", maxHeight: "90%"}}>
                            <Box direction="row" width="100%">
                                <Box align="center" pad="small" width="90%"><h4
                                    style={{fontSize: "20px"}}>{this.formatDate(date)}</h4></Box>
                                <Box pad="small"
                                     onClick={() => this.setVisibility(!visible)}><Close
                                    style={{width: "20px", height: "20px"}}/></Box>
                            </Box>
                            <Box flex overflow="auto" direction='column' style={{paddingLeft: "30px"}}>
                                {hours.length !== 0 && hours.map((hour) => (
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
                                            ): (
                                                <Box style={{
                                                    borderRadius: "8px",
                                                    minHeight: "50px",
                                                    border: "1px solid #ccc"
                                                }} direction='row'>
                                                    <Box pad='small' width='97%'>
                                                        {hour}
                                                    </Box>
                                                    <Box pad='small' align="end" className="icon"
                                                         onClick={() => {}}>
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
                        </Box>
                    </Layer>
                </Box>}
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
    {getAffiliation,getAppointments}
)(Appointment);
