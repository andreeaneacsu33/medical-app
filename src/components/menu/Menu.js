import React, {Component} from "react";
import {Box} from "grommet";
import {ContactInfo, Local, SettingsOption} from "grommet-icons";
import {Router} from 'react-router-dom';
import {history} from "../../utils/history";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class Menu extends Component {
    state = {
        active: window.location.pathname,
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool
    };

    handleClick = (value) => {
        this.setState({active: value}, () => {
            history.push(`${value}`);
        });
    };

    render() {
        const {active} = this.state;
        return (
            <Router history={history}>
                <Box style={{minWidth: "280px"}}>
                    <Box
                        className="menu"
                    >
                        <Box round="small" className={active === '/home' ? "activeStyle" : ""}
                             onClick={() => this.handleClick('/home')}><Box className="menuItem" direction="row"
                                                                            round="small"><ContactInfo
                            className="menuIcon"/><span className="menuText">Home Page</span></Box></Box>
                        <Box round="small" className={active === '/profile' ? "activeStyle" : ""}
                             onClick={() => this.handleClick('/profile')}><Box className="menuItem" direction="row"
                                                                               round="small"><Local
                            className="menuIcon"/><span className="menuText">Personal Information</span></Box></Box>
                        <Box round="small" className={active === '/settings' ? "activeStyle" : ""}
                             onClick={() => this.handleClick('/settings')}><Box className="menuItem" direction="row"
                                                                                round="small"><SettingsOption
                            className="menuIcon"/><span className="menuText">Settings</span></Box></Box>
                    </Box>
                </Box>
            </Router>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
});

export default connect(
    mapStateToProps,
    null
)(Menu);
