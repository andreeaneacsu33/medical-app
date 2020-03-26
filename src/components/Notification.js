import React,{Component} from "react";
import {Box, Text} from "grommet/es6";
import {connect} from "react-redux";
import PropTypes from "prop-types";

class Notification extends Component{

    static propTypes = {
        icon: PropTypes.object.isRequired,
        textColor: PropTypes.string.isRequired,
        backgroundColor: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
    };

    render() {
        const {backgroundColor,message,icon,textColor} = this.props;
        return (
            <Box
                align="center"
                direction="row"
                gap="small"
                justify="between"
                round="small"
                elevation="medium"
                pad={{vertical: "small", horizontal: "small"}}
                background={backgroundColor}
            >
                <Box align="center" direction="row" gap="xsmall">
                    {icon}
                    <Text color={textColor}>{message}</Text>
                </Box>
            </Box>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
    mapStateToProps,
    null
)(Notification);
