import React,{Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Menu from "./menu/Menu";
import {Box, Grommet} from "grommet";
import Toolbar from "./menu/Toolbar";
import {customTheme} from "../utils/helpers";
import {getLogger} from "../utils/logger";
import ListAppointments from "./appointment/ListAppointments";

const log=getLogger();

class UpcomingAppointments extends Component{
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        user: PropTypes.object,
    };

    render() {
        const {visited}=this.props;
        log(JSON.stringify(visited));
        return(
            <Grommet theme={customTheme}>
                <Box>
                    <Box>
                        <Toolbar/>
                        <Box direction="row">
                            <Menu/>
                            <ListAppointments/>
                        </Box>
                    </Box>
                </Box>
            </Grommet>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    user: state.auth.user
});

export default connect(
    mapStateToProps,
    null
)(UpcomingAppointments);
