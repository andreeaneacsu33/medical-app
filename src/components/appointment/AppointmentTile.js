import React, {Component} from "react";
import {connect} from "react-redux";
import {Box, Button, Layer, Text} from "grommet";
import PropTypes from 'prop-types';
import {Close, StatusWarning, Trash} from "grommet-icons";
import {removeAppointment} from "../../actions/appointmentActions";
import Notification from "../Notification";

class AppointmentTile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkVisible: false,
            notificationVisible: false,
            notificationMessage: '',
            errorMessage: '',
        }
    }

    static propTypes = {
        appointment: PropTypes.object.isRequired,
    };

    onRemoveAppointment(id) {
        this.props.removeAppointment({idAppointment: id});
        this.setVisibility(false);
        const {error} = this.props;
        console.log(error.message);
        if (Object.entries(error.message).length !== 0) {
            this.setState({errorMessage: 'Appointment could not be deleted!'});
            this.setState({notificationMessage: ''});
            this.setState({notificationVisible: true});
            setTimeout(function () { //Start the timer
                this.setState({notificationVisible: false})
            }.bind(this), 3000)
        }
    }

    onCheckRemove() {
        this.setState({checkVisible: true});
    }

    setVisibility(value) {
        this.setState({checkVisible: value})
    }

    render() {
        const {appointment} = this.props;
        const {checkVisible, notificationVisible, errorMessage} = this.state;
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
                        <Box width="90%"/>
                        <Box id='trashIcon'>
                            <Trash style={{width: '20px', height: '20px'}}
                                   onClick={() => this.onCheckRemove()}/></Box>
                    </Box>
                </Box>
                {checkVisible && (
                    <Layer position="center"
                           onClickOutside={() => this.setVisibility(!checkVisible)} style={{height: '160px'}}>
                        <Box height="medium" width="500px" overflow="auto">
                            <Box direction='row'>
                                <Box width='90%'/>
                                <Box pad="small"
                                     onClick={() => this.setVisibility(!checkVisible)}><Close
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
                                            this.setVisibility(!checkVisible);
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
    user: state.auth.user,
});

export default connect(
    mapStateToProps,
    {removeAppointment}
)(AppointmentTile);
