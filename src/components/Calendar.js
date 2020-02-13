import React,{Component} from "react";
import {Appointments, WeekView, Scheduler} from "@devexpress/dx-react-scheduler-material-ui";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {connect} from "react-redux";
import Paper from "@material-ui/core/Paper";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import {yellow} from "@material-ui/core/colors";
import {Box} from "grommet";

const theme = createMuiTheme({ palette: { type: "light", primary: yellow } });


class Calendar extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: []
        };
    }

    render() {
        const {data}=this.state;
        return (
            <Box className="calendar">
                <MuiThemeProvider theme={theme}>
                <Paper>
                    <Scheduler data={data}>
                        <ViewState currentDate="2020-02-10" />
                        <WeekView startDayHour={10} endDayHour={18} intervalCount={3} onClick={()=>{}}/>
                        <Appointments />
                    </Scheduler>
                </Paper>
            </MuiThemeProvider>
            </Box>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    user: state.auth.user
});

export default connect(
    mapStateToProps
)(Calendar);
