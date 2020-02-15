import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Box, Header, Image} from "grommet";
import {connect} from "react-redux";
import Tooltip from 'react-tooltip-lite';
import Logout from "../Logout";
import {getLogger} from "../../utils/logger";
import {User} from "grommet-icons";

const log = getLogger();

class Toolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            person: ''
        };

    }

    static propTypes = {
        user: PropTypes.object
    };

    componentWillMount() {
        if (this.props.user.role.toUpperCase() === 'DOCTOR') {
            this.setState({person: this.props.doctor});
            log('doc2');
        } else {
            this.setState({person: this.props.patient});
            log('pat2');
        }
    }

    onClick() {
        this.setState({visible: !this.state.visible});
    }

    render() {
        const {visible} = this.state;
        const {user} = this.props;
        const fl = user.email && user.email[0].toUpperCase();
        const {person} = this.state;
        if (!person)
            return <div/>;
        return (
            <Box className="toolbarWrapper">
                <Header className="toolbar">
                    <Box style={{padding: "12px"}} direction="row" align="center" gap="small">
                        <Image className='logo' src={require('../../utils/logo.png')}/>
                        <Box className="wrapperModal"/>
                        <Box style={{paddingLeft: "850px"}}>
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
                                            {`${person.firstName} ${person.lastName}`}
                                        </span>
                                        <span className="email">
                                            {person.email}
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
    doctor: state.doctor.doctor,
    patient: state.patient.patient
});

export default connect(
    mapStateToProps,
    null
)(Toolbar);
