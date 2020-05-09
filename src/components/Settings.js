import React, {Component} from "react";
import {connect} from "react-redux";
import {Box, Button, Grommet, Text, TextInput} from "grommet/es6";
import {customTheme} from "../utils/helpers";
import Toolbar from "./menu/Toolbar";
import {history} from "../utils/history";
import {LinkPrevious, StatusGood, StatusWarning} from "grommet-icons/es6";
import {changePassword} from "../actions/authActions";
import Notification from "./Notification";
import {clearErrors} from "../actions/errorActions";

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPass: '',
            newPass: '',
            confirmPass: '',
            message: '',
            type: null,
            renderMessage: false,
        }
    }

    componentDidUpdate(prevProps) {
        const {error} = this.props;
        if (error !== prevProps.error) {
            if (error.id === 'CHANGE_PASSWORD_FAIL') {
                this.setState({message: error.message});
                this.setState({type: 'error'});
                this.setState({render: true});
                this.props.clearErrors();
            }
        }
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    onPasswordChange = e => {
        e.preventDefault();
        const {oldPass, newPass, confirmPass} = this.state;
        const {user, error} = this.props;
        console.log(oldPass);
        console.log(newPass);
        console.log(confirmPass);
        console.log(error);
        if (newPass === confirmPass) {
            this.props.changePassword({email: user.email, oldPassword: oldPass, newPassword: newPass});
            console.log(error);
            this.setState({message: 'Password changed.'});
            this.setState({type: 'success'});
            if(Object.entries(error.message).length===0){
                this.setState({render: true})
            }
        } else {
            this.setState({message: 'New Password and confirm password don\'t match'});
            this.setState({type: 'error'});
            this.setState({render: true})
        }
        setTimeout(function () { //Start the timer
            this.setState({render: false});
            this.props.clearErrors();
        }.bind(this), 3000)
    };

    render() {
        const {from} = this.props.location.state;
        const {type, message, render} = this.state;
        return (
            <Grommet theme={customTheme}>
                <Box>
                    <Toolbar/>
                    <Box direction="row">
                        <Box width='40%'>
                            <Button style={{paddingTop: '20px', paddingLeft: '20px'}} alignSelf='start'
                                    className="backButton"
                                    onClick={() => history.push(from?from : '/home')}><LinkPrevious/></Button>
                        </Box>
                        <Box style={{paddingTop: '20px'}}>
                            <Box direction='row' style={{padding: '15px', borderRadius: '10px'}}>
                                <Text style={{
                                    fontSize: '24px',
                                    fontStyle: '\'Google Sans\',Roboto,RobotoDraft,Helvetica,Arial,sans-serif',
                                    fontWeight: 350,
                                    color: '#8b8b8b'
                                }}>Change password</Text>
                            </Box>
                        </Box>
                    </Box>
                    <Box flex overflow="auto" direction='column'
                         style={{paddingLeft: "30px", paddingRight: '30px', alignItems: 'center'}}
                         className='addAppointment'>
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
                                name='oldPass'
                                id='oldPass'
                                plain
                                placeholder='Old password'
                                type='password'
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
                                name='newPass'
                                id='newPass'
                                plain
                                placeholder='New password'
                                type='password'
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
                                name='confirmPass'
                                id='confirmPass'
                                plain
                                placeholder='Confirm password'
                                type='password'
                                onChange={this.onChange}
                            />
                        </Box>
                        <Box className='saveButton' direction="row" width="280px"
                             style={{paddingTop: "20px"}}>
                            <Box width="40%"/>
                            <Button type='submit'
                                    onClick={this.onPasswordChange}><span>Save</span></Button>
                        </Box>
                    </Box>
                </Box>
                <Box style={{alignItems: "center"}}>
                    {
                        render && message && type === 'error' && (
                            <Notification icon={<StatusWarning style={{
                                width: "20px",
                                height: "20px",
                                fill: "#d50000",
                                stroke: "#d50000"
                            }}/>} backgroundColor="#ffe6e6" textColor="#d50000" message={this.state.message}/>
                        )
                    }
                    {
                        render && message && type === 'success' && (
                            <Notification icon={<StatusGood style={{
                                width: "20px",
                                height: "20px",
                                fill: "#009933",
                                stroke: "#009933"
                            }}/>} backgroundColor="#c3ffbf" textColor="#009933" message={this.state.message}/>
                        )
                    }
                </Box>
            </Grommet>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    user: state.auth.user,
    doctor: state.auth.doctor,
    patient: state.auth.patient,
});

export default connect(
    mapStateToProps,
    {changePassword, clearErrors}
)(Settings);
