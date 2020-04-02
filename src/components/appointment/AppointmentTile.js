import React, {Component} from "react";
import {connect} from "react-redux";
import {Box, Button, Layer, Text} from "grommet";
import PropTypes from 'prop-types';
import {Close, Trash} from "grommet-icons";

class AppointmentTile extends Component {
    constructor(props){
        super(props);
        this.state = {
            notificationVisible: false,
        }
    }
    static propTypes = {
        appointment: PropTypes.object.isRequired,
    };

    onRemoveAppointment(id){
        this.props.removeAppointment({idAppointment: id});
    }

    onCheckRemove(){
        this.setState({notificationVisible: true});
    }


    setVisibility(value){
        this.setState({notificationVisible: value})
    }

    render() {
        const {appointment} = this.props;
        const {notificationVisible} = this.state;
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
                            <span style={{color: '#676767'}}>Notes: </span><span style={{paddingLeft: '5px'}}>{appointment.notes}</span>
                        </Box>
                    )}
                    <Box direction='row' style={{fontSize: '17px', paddingLeft: '5px', paddingTop: '5px'}}>
                        <span style={{color: '#676767'}}>Date: </span><span style={{paddingLeft: '5px'}}>{appointment.startDate.slice(0,10)}</span>
                    </Box>
                    <Box direction='row' style={{fontSize: '17px', paddingLeft: '5px', paddingTop: '5px'}}>
                        <span style={{color: '#676767'}}>Hour: </span><span style={{paddingLeft: '5px'}}>{appointment.startDate.slice(11)}</span>
                    </Box>
                    <Box direction='row' style={{fontSize: '17px', paddingLeft: '5px', paddingTop: '10px'}} width="100%">
                            <Box width="90%"/>
                            <Trash style={{width: '20px', height: '20px'}}
                                    onClick={()=>this.onCheckRemove()}/>
                    </Box>
                </Box>
                {notificationVisible && (
                    <Layer position="center"
                           onClickOutside={() => this.setVisibility(!notificationVisible)} style={{height: '160px'}}>
                        <Box height="medium" width="500px" overflow="auto">
                            <Box direction='row'>
                                <Box width='90%'/>
                                <Box pad="small"
                                     onClick={() => this.setVisibility(!notificationVisible)}><Close
                                    style={{width: "20px", height: "20px"}}/></Box>
                            </Box>
                            <Box direction='row' pad='small' alignSelf='center'>
                                <span style={{fontSize: '18px'}}>Are you sure you want to remove this appointment?</span></Box>
                            <Box direction='row' style={{paddingTop: '15px'}}>
                                <Box width='55%'/>
                                <Box style={{alignItems: "center"}} className='logout'
                                     direction='row'>
                                    <Box style={{paddingRight: '5px'}}>
                                        <Button onClick={() => {
                                            this.setVisibility(!notificationVisible);
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
    null
)(AppointmentTile);
