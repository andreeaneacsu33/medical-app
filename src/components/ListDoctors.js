import React,{Component} from "react";
import {connect} from "react-redux";
import {Box, TextInput} from "grommet";
import {Search} from "grommet-icons";

class ListDoctors extends Component{

    render() {
        return(
            <Box>
                <Box
                    width="medium"
                    direction="row"
                    align="center"
                    pad={{ horizontal: "small", vertical: "xsmall" }}
                    round="small"
                    border={{
                        side: "all",
                        color: "border"
                    }}
                >
                    <Search color="brand" />
                    <TextInput
                        type="search"
                        plain
                    />
                </Box>
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
)(ListDoctors);
