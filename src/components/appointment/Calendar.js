import React, {Component} from "react";
import {
    Appointments,
    WeekView,
    Scheduler,
    DateNavigator,
    Toolbar,
    TodayButton, AppointmentTooltip, AppointmentForm, ConfirmationDialog
} from "@devexpress/dx-react-scheduler-material-ui";
import {EditingState, ViewState} from "@devexpress/dx-react-scheduler";
import {connect} from "react-redux";
import Paper from "@material-ui/core/Paper";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import {lightBlue} from "@material-ui/core/colors";
import {Box} from "grommet";
import {addAppointment, getAppointments} from "../../actions/appointmentActions";

const theme = createMuiTheme({palette: {type: "light", primary: lightBlue}});

const messages = {
    moreInformationLabel: '',
};

const Appointment = ({children, style, ...restProps}) => (
    <Appointments.Appointment
        {...restProps}
        style={{
            ...style,
            backgroundColor: 'rgb(134, 150, 255)',
        }}
    >
        {children}
    </Appointments.Appointment>
);

const TextEditor = (props) => {
    // eslint-disable-next-line react/destructuring-assignment
    if (props.type === 'multilineTextEditor') {
        return null;
    } return <AppointmentForm.TextEditor {...props} />;
};

const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
    const onCustomFieldChange = (nextValue) => {
        onFieldChange({ customField: nextValue });
    };

    return (
        <AppointmentForm.BasicLayout
            appointmentData={appointmentData}
            onFieldChange={onFieldChange}
            {...restProps}
        >
            <AppointmentForm.Label
                text="Notes"
                type="title"
            />
            <AppointmentForm.TextEditor
                value={appointmentData.customField}
                onValueChange={onCustomFieldChange}
                placeholder="Notes"
            />
        </AppointmentForm.BasicLayout>
    );
};


class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: Date.now(),
            addedAppointment: {},
            appointmentChanges: {},
            editingAppointmentId:undefined,
        };
        this.commitChanges = this.commitChanges.bind(this);
        this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
        this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
        this.changeEditingAppointmentId = this.changeEditingAppointmentId.bind(this);
    }

    componentDidMount() {
        const {doctor} = this.props;
        console.log(doctor);
        this.props.getAppointments({idDoctor:doctor.id});
        const {appointments}=this.props;
        this.setState({data:appointments})
    }

    changeAddedAppointment(addedAppointment) {
        console.log(`Added ${addedAppointment}`);
        this.setState({ addedAppointment });
    }

    changeAppointmentChanges(appointmentChanges) {
        console.log(appointmentChanges);
        this.setState({ appointmentChanges });
    }

    changeEditingAppointmentId(editingAppointmentId) {
        console.log(editingAppointmentId);
        this.setState({ editingAppointmentId });
    }

    commitChanges({added, changed, deleted}) {
        this.setState((state) => {
            if (added) {
                console.log(added);
                const {doctor,patient}=this.props;
                if(added.title && added.startDate<added.endDate){
                    let start=new Date(added.startDate);
                    let end=new Date(added.endDate);
                    start=new Date(Date.UTC(start.getFullYear(),start.getMonth(),start.getDate(),start.getUTCHours(),start.getUTCMinutes()));
                    end=new Date(Date.UTC(end.getFullYear(),end.getMonth(),end.getDate(),end.getUTCHours(),end.getUTCMinutes()));
                    console.log(start);
                    const appointmentDTO={idDoctor: doctor.id,idPatient: patient.id, startDate: start, endDate: end, title: added.title, notes: added.notes};
                    this.props.addAppointment(appointmentDTO);
                }else{
                    console.log('empty title');
                }
            }
        });
    }


    render() {
        const {addedAppointment, appointmentChanges, editingAppointmentId} = this.state;
        const {appointments} = this.props;
        const exDays=[6,0];
        if(!appointments){
            return <div/>
        }
        return (
            <Box className="calendar">
                <MuiThemeProvider theme={theme}>
                    <Paper>
                        <Scheduler data={appointments} height={600}>
                            <ViewState defaultCurrentDate={Date.now()}/>
                            <EditingState
                                onCommitChanges={this.commitChanges}
                                addedAppointment={addedAppointment}
                                onAddedAppointmentChange={this.changeAddedAppointment}

                                appointmentChanges={appointmentChanges}
                                onAppointmentChangesChange={this.changeAppointmentChanges}

                                editingAppointmentId={editingAppointmentId}
                                onEditingAppointmentIdChange={this.changeEditingAppointmentId}
                            />
                            <WeekView startDayHour={10} endDayHour={18} cellDuration={30} excludedDays={exDays} onClick={() => {
                            }}/>
                            <Toolbar/>
                            <DateNavigator/>
                            <TodayButton/>
                            <Appointments appointmentComponent={Appointment}/>
                            <AppointmentTooltip
                            />
                            <ConfirmationDialog/>
                            <AppointmentForm
                                basicLayoutComponent={BasicLayout}
                                textEditorComponent={TextEditor}
                                messages={messages}
                            />
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
    user: state.auth.user,
    patient: state.auth.patient,
    appointments: state.appointment.appointments
});

export default connect(
    mapStateToProps,
    {getAppointments,addAppointment}
)(Calendar);
