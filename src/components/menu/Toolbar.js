import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Box, Header, Image} from "grommet";
import {connect} from "react-redux";
import Tooltip from 'react-tooltip-lite';
import Logout from "../Logout";
import {SettingsOption, User} from "grommet-icons";
import {history} from "../../utils/history";

class Toolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    static propTypes = {
        user: PropTypes.object
    };

    onClick() {
        this.setState({visible: !this.state.visible});
    }

    render() {
        const {visible} = this.state;
        const {user, doctor, patient} = this.props;
        const fl = user.email && user.email[0].toUpperCase();
        return (
            <Box elevation="small" className="toolbarWrapper">
                <Header className="toolbar">
                    <Box width="100%" style={{padding: "12px"}} direction="row" align="center" gap="small">
                        <Box width="90%">
                            <Image className='logo' src={require('../../utils/images/logo.png')}/>
                        </Box>
                        <Box className="wrapperModal"/>
                        <Box>
                            <Tooltip arrow={false} place="bottom" color="white" background="#ababab" direction="down"
                                     content={(
                                         <div>
                                             <span style={{
                                                 font: "13px Roboto,RobotoDraft,Arial,sans-serif",
                                                 lineHeight: "13px"
                                             }}>Settings</span>
                                         </div>
                                     )}>
                            <Box id='settings' style={{paddingRight: '20px'}} onClick={()=>history.push("/settings",{from: window.location.pathname})}>
                                <SettingsOption style={{
                                    width: "28px",
                                    height: "28px",
                                    fill: "#979cb5",
                                    stroke: "#979cb5"
                                }}/>
                            </Box>
                            </Tooltip>
                        </Box>
                        <Box>
                            <Tooltip arrow={false} place="bottom" color="white" background="#ababab" direction="down"
                                     content={(
                                         <div>
                                             <span style={{
                                                 font: "13px Roboto,RobotoDraft,Arial,sans-serif",
                                                 lineHeight: "15px"
                                             }}>{user.email}</span>
                                         </div>
                                     )}>
                                <Box onClick={() => this.onClick()} id="container">
                                    <Box id="name">
                                        {fl}
                                    </Box>
                                </Box>
                            </Tooltip>
                            {visible && (
                                <Box className="modal">
                                    <Box className="userInfo">
                                        <User className="icon"/>
                                        <span className="name">
                                            {user && user.role.toUpperCase() === 'DOCTOR' && (`${doctor.firstName} ${doctor.lastName}`)}
                                            {user && user.role.toUpperCase() === 'PATIENT' && (`${patient.firstName} ${patient.lastName}`)}
                                        </span>
                                        <span className="email">
                                            {user.email}
                                        </span>
                                        <span className="role">
                                            {user.role}
                                        </span>
                                    </Box>
                                    <Logout/>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Header>
            </Box>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    user: state.auth.user,
    doctor: state.auth.doctor,
    patient: state.auth.patient
});

export default connect(
    mapStateToProps,
    null
)(Toolbar);
