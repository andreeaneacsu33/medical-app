import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Menu from "./menu/Menu";
import {
    Box,
    Button,
    Calendar,
    DropButton,
    FormField,
    Grommet,
    Layer,
    List,
    Text,
    TextInput
} from "grommet";
import Toolbar from "./menu/Toolbar";
import {customTheme} from "../utils/helpers";
import {getLogger} from "../utils/logger";
import {getAffiliation, getQualification, setAffiliation, setQualification} from "../actions/doctorActions";
import {Add, CircleInformation, Close, FormDown} from "grommet-icons";

const log = getLogger();

class Profile extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        user: PropTypes.object,
    };

    state = {
        revealActivity: false,
        revealQualification: false,
        hospitalName: '',
        city: '',
        country: '',
        startDate: '',
        error: '',
        title: '',
        institute: '',
        graduationYear: ''
    };

    getPerson(user) {
        if (user.role.toUpperCase() === 'DOCTOR') {
            const {doctor} = this.props;
            log('doc' + JSON.stringify(doctor));
            return doctor;
        } else {
            const {patient} = this.props;
            log('pat' + JSON.stringify(patient));
            return patient;
        }
    }

    componentDidMount() {
        const {user} = this.props;
        if (user.role.toUpperCase() === 'DOCTOR') {
            const {doctor} = this.props;
            this.props.getQualification(doctor.id);
            this.props.getAffiliation(doctor.id);
        }
    }

    formatDoctorPersonalInformation(person) {
        let data = [];
        data.push({key: "NAME", value: `${person.firstName} ${person.lastName}`});
        data.push({key: "EMAIL", value: `${person.email}`});
        data.push({key: "SPECIALTY", value: `${person.specialty.name}`});
        return data;
    }

    formatPatientPersonalInformation(person) {
        let data = [];
        data.push({key: "NAME", value: `${person.firstName} ${person.lastName}`});
        data.push({key: "EMAIL", value: `${person.email}`});
        return data;
    }

    formatWorkInformation() {
        let data = [];
        const {affiliation} = this.props;
        let allAffiliations=[];
        log(JSON.stringify(affiliation));
        if (affiliation) {
            for(let i=0;i<affiliation.length;i++){
                data.push({key: "HOSPITAL", value: `${affiliation[i].hospitalName}`});
                data.push({key: "CITY", value: `${affiliation[i].city}`});
                data.push({key: "COUNTRY", value: `${affiliation[i].country}`});
                data.push({key: "FROM", value: `${affiliation[i].startDate}`});
                allAffiliations.push(data);
                data=[];
            }
            return allAffiliations;
        } else {
            data.push('You have no activity tracked.');
        }
        return data;
    }

    formatStudyInformation() {
        let data = [];
        const {qualification} = this.props;
        log(JSON.stringify(qualification));
        if (qualification) {
            data.push({key: "TITLE", value: `${qualification.title}`});
            data.push({key: "INSTITUTE", value: `${qualification.institute}`});
            data.push({key: "GRADUATION YEAR", value: `${qualification.graduationYear}`});
        } else {
            data.push('You have no qualification tracked.')
        }
        return data;
    }

    setRevealActivity(value) {
        this.setState({...this.state, startDate: '', revealActivity: value, error: ''});
    }

    setRevealQualification(value) {
        this.setState({...this.state, startDate: '', revealQualification: value, error: ''});
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    onSelect = selectedDate => {
        this.setState({startDate: selectedDate});
        this.setState({open: false});
    };

    setOpen(value) {
        this.setState({open: value})
    }

    onActivitySave = e => {
        e.preventDefault();
        const {hospitalName, city, country, startDate} = this.state;
        const {email} = this.props.user;
        if (hospitalName === '' || city === '' || country === '' || startDate === '') {
            this.setState({error: 'Please complete the required fields accordingly.'})
        } else {
            this.setState({error: ''});
            const affiliationDTO = {email, hospitalName, city, country, startDate};
            this.props.setAffiliation(affiliationDTO);
            this.setRevealActivity(false);
        }
    };

    onQualificationSave = e => {
        e.preventDefault();
        const {title, institute, graduationYear} = this.state;
        const {email} = this.props.user;
        if (title === '' || institute === '' || graduationYear === '') {
            this.setState({error: 'Please complete the required fields accordingly.'})
        } else {
            this.setState({error: ''});
            const qualificationDTO = {email, title, institute, graduationYear};
            this.props.setQualification(qualificationDTO);
            this.setRevealQualification(false);
        }
    };

    renderPatientProfile(user) {
        const person = this.getPerson(user);
        const personalInformation = this.formatPatientPersonalInformation(person);
        return (
            <Box flex overflow="auto" direction="column">
                <Box style={{paddingTop: "24px"}}>
                    <h4>Personal Information</h4>
                    <article className="profile">
                        <Box align="start" pad="small">
                            <Box direction="row" width="100%">
                                <Box width="97%">
                                    <h4 style={{fontSize: "1.25rem", textAlign: "start"}}>Profile</h4>
                                </Box>
                            </Box>
                        </Box>
                        <List
                            data={personalInformation}
                            primaryKey={item => (
                                <span className="key">
                                                    {item.key}
                                                </span>
                            )}
                            secondaryKey={item => (
                                <span className="value">
                                                    {item.value}
                                                </span>
                            )}
                        />
                    </article>
                </Box>
            </Box>
        )
    }

    renderDoctorProfile(user) {
        const {revealActivity, revealQualification, open, startDate, error} = this.state;
        const person = this.getPerson(user);
        const personalInformation = this.formatDoctorPersonalInformation(person);
        const workInformation = this.formatWorkInformation();
        const studyInformation = this.formatStudyInformation();
        return (
            <Box flex overflow="auto" direction="column">
                <Box style={{paddingTop: "24px"}}>
                    <h4>Personal Information</h4>
                    <article className="profile">
                        <Box align="start" pad="small">
                            <Box direction="row" width="100%">
                                <Box width="97%">
                                    <h4 style={{fontSize: "1.25rem", textAlign: "start"}}>Profile</h4>
                                </Box>
                            </Box>
                        </Box>
                        <List
                            data={personalInformation}
                            primaryKey={item => (
                                <span className="key">
                                                    {item.key}
                                                </span>
                            )}
                            secondaryKey={item => (
                                <span className="value">
                                                    {item.value}
                                                </span>
                            )}
                        />
                    </article>
                    <article className="profile" style={{marginTop: "15px"}}>
                        <Box align="start" pad="small">
                            <Box direction="row" width="100%">
                                <Box width="97%">
                                    <h4 style={{fontSize: "1.25rem", textAlign: "start"}}>Activity</h4>
                                </Box>
                                <Box align="end" className="icon"
                                     styele={{outlineColor: "white", borderColor: "white"}}
                                     onClick={() => this.setRevealActivity(!revealActivity)}>
                                    <Add style={{
                                        width: "20px",
                                        height: "20px",
                                        fill: "#516cfb",
                                        stroke: "#516cfb"
                                    }}/>
                                </Box>
                            </Box>
                        </Box>
                        {workInformation.length === 1 ? (
                            <List style={{fontSize: "1rem"}} data={workInformation}/>) : workInformation.map((affiliation)=>(<List style={{paddingTop: '5px'}}
                            data={affiliation}
                            primaryKey={item => (
                                <span className="key">
                                                    {item.key}
                                                </span>
                            )}
                            secondaryKey={item => (
                                <span className="value">
                                                    {item.value}
                                                </span>
                            )}
                        />)) }
                    </article>
                    <article className="profile" style={{marginTop: "15px", marginBottom: "24px"}}>
                        <Box align="start" pad="small">
                            <Box direction="row" width="100%">
                                <Box width="97%">
                                    <h4 style={{
                                        fontSize: "1.25rem",
                                        textAlign: "start"
                                    }}>Qualification</h4>
                                </Box>
                                {studyInformation.length === 1 && (
                                    <Box align="end" className="icon"
                                         onClick={() => this.setRevealQualification(!revealQualification)}>
                                        <Add style={{
                                            width: "20px",
                                            height: "20px",
                                            fill: "#516cfb",
                                            stroke: "#516cfb"
                                        }}/>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                        {studyInformation.length === 1 ? (
                            <List style={{fontSize: "1rem"}} data={studyInformation}/>) : (<List
                            data={studyInformation}
                            primaryKey={item => (
                                <span className="key">
                                                    {item.key}
                                                </span>
                            )}
                            secondaryKey={item => (
                                <span className="value">
                                                    {item.value}
                                                </span>
                            )}
                        />)}
                    </article>
                    {revealActivity && (
                        <Layer position="center"
                               onClickOutside={() => this.setRevealActivity(!revealActivity)}>
                            <Box className="affiliation" height="medium" width="420px" overflow="auto"
                                 align="center">
                                <Box direction="row" width="100%">
                                    <Box align="center" pad="small" width="90%"><h4
                                        style={{fontSize: "20px"}}>Activity</h4></Box>
                                    <Box pad="small"
                                         onClick={() => this.setRevealActivity(!revealActivity)}><Close
                                        style={{width: "20px", height: "20px"}}/></Box>
                                </Box>
                                <Box align="center" width="75%">
                                    <FormField htmlFor="text-input">
                                        <TextInput
                                            placeholder="Hospital"
                                            name="hospitalName"
                                            plain
                                            onChange={this.onChange}
                                        />
                                    </FormField>
                                </Box>
                                <Box align="center" width="75%">
                                    <FormField htmlFor="text-input">
                                        <TextInput
                                            placeholder="City"
                                            name="city"
                                            onChange={this.onChange}
                                        />
                                    </FormField>
                                </Box>
                                <Box align="center" width="75%">
                                    <FormField htmlFor="text-input">
                                        <TextInput
                                            placeholder="Country"
                                            name="country"
                                            onChange={this.onChange}
                                        />
                                    </FormField>
                                </Box>
                                <Box align="start">
                                    <DropButton
                                        open={open}
                                        onClose={() => this.setOpen(false)}
                                        onOpen={() => this.setOpen(true)}
                                        dropContent={<Calendar style={{width: "380px"}} date={startDate}
                                                               onSelect={this.onSelect}/>}
                                    >
                                        <Box direction="row" gap="small" align="start" pad="small">
                                            <Text>
                                                {startDate ? new Date(startDate).toLocaleDateString() : "Starting from"}
                                            </Text>
                                            <FormDown color="brand"/>
                                        </Box>
                                    </DropButton>
                                </Box>
                                {error && (
                                    <Box style={{
                                        alignSelf: 'center',
                                        flexDirection: 'row',
                                        display: 'flex'
                                    }}>
                                        <CircleInformation className='infoIcon'/>
                                        <span
                                            style={{color: '#d50000', fontSize: '13px'}}>{error}</span>
                                    </Box>
                                )}
                                <Box className='saveButton' direction="row" width="100%" style={{paddingTop: "20px"}}>
                                    <Box width="65%"/>
                                    <Button type='submit'
                                            onClick={this.onActivitySave}><span>Save</span></Button>
                                </Box>
                            </Box>
                        </Layer>
                    )}
                    {revealQualification && (
                        <Layer position="center"
                               onClickOutside={() => this.setRevealQualification(!revealQualification)}>
                            <Box className="affiliation" height="medium" width="420px" overflow="auto"
                                 align="center">
                                <Box direction="row" width="100%">
                                    <Box align="center" pad="small" width="90%"><h4
                                        style={{fontSize: "20px"}}>Qualification</h4></Box>
                                    <Box pad="small"
                                         onClick={() => this.setRevealQualification(!revealQualification)}><Close
                                        style={{width: "20px", height: "20px"}}/></Box>
                                </Box>
                                <Box align="center" width="75%">
                                    <FormField htmlFor="text-input">
                                        <TextInput
                                            placeholder="Title"
                                            name="title"
                                            plain
                                            onChange={this.onChange}
                                        />
                                    </FormField>
                                </Box>
                                <Box align="center" width="75%">
                                    <FormField htmlFor="text-input">
                                        <TextInput
                                            placeholder="Institute"
                                            name="institute"
                                            onChange={this.onChange}
                                        />
                                    </FormField>
                                </Box>
                                <Box align="center" width="75%">
                                    <FormField htmlFor="text-input">
                                        <TextInput
                                            placeholder="Graduation Year"
                                            name="graduationYear"
                                            onChange={this.onChange}
                                        />
                                    </FormField>
                                </Box>
                                {error && (
                                    <Box style={{
                                        alignSelf: 'center',
                                        flexDirection: 'row',
                                        display: 'flex'
                                    }}>
                                        <CircleInformation className='infoIcon'/>
                                        <span
                                            style={{color: '#d50000', fontSize: '13px'}}>{error}</span>
                                    </Box>
                                )}
                                <Box className='saveButton' direction="row" width="100%" style={{paddingTop: "20px"}}>
                                    <Box width="65%"/>
                                    <Button type='submit'
                                            onClick={this.onQualificationSave}><span>Save</span></Button>
                                </Box>
                            </Box>
                        </Layer>
                    )}
                </Box>
            </Box>
        )
    }

    render() {
        log(JSON.stringify(this.props));
        const {visited} = this.props;
        log(JSON.stringify(visited));
        const {user} = this.props;
        if (!user) {
            return <div/>
        }
        log(JSON.stringify(user));
        log(JSON.stringify(visited));
        return (
            <Grommet theme={customTheme}>
                <Box style={{height: "100%"}}>
                    <Box>
                        <Toolbar/>
                        <Box direction="row">
                            <Menu lastUrl={visited}/>
                            {user.role.toUpperCase() === 'DOCTOR' ? this.renderDoctorProfile(user) : this.renderPatientProfile(user)}
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
    user: state.auth.user,
    doctor: state.auth.doctor,
    patient: state.auth.patient,
    specialty: state.doctor.specialty,
    affiliation: state.doctor.affiliation,
    qualification: state.doctor.qualification,
});

export default connect(
    mapStateToProps,
    {getQualification, getAffiliation, setAffiliation, setQualification}
)(Profile);
