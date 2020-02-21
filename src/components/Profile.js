import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Menu from "./menu/Menu";
import {Box, Grommet, Layer, List} from "grommet";
import Toolbar from "./menu/Toolbar";
import {customTheme} from "../utils/helpers";
import {getLogger} from "../utils/logger";
import {getAffiliation, getQualification} from "../actions/doctorActions";
import {Add} from "grommet-icons";

const log = getLogger();

class Profile extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        user: PropTypes.object,
    };

    state={
        revealActivity: false,
        revealQualification: false
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

    formatPersonalInformation(person) {
        let data = [];
        data.push({key: "NAME", value: `${person.firstName} ${person.lastName}`});
        data.push({key: "EMAIL", value: `${person.email}`});
        data.push({key: "SPECIALTY", value: `${person.specialty.name}`});
        return data;
    }

    formatWorkInformation() {
        let data = [];
        const {affiliation} = this.props;
        log(JSON.stringify(affiliation));
        if (affiliation) {
            data.push({key: "HOSPITAL", value: `${affiliation.hospitalName}`});
            data.push({key: "CITY", value: `${affiliation.city}`});
            data.push({key: "COUNTRY", value: `${affiliation.country}`});
            data.push({key: "FROM", value: `${affiliation.startDate}`});
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

    setRevealActivity(value){
        this.setState({revealActivity: value});
    }

    setRevealQualification(value){
        this.setState({revealQualification: value});
    }

    render() {
        log(JSON.stringify(this.props));
        const {visited} = this.props;
        log(JSON.stringify(visited));
        const {user} = this.props;
        const {revealActivity,revealQualification}=this.state;
        log(`reveal activity: ${revealActivity}`);
        log(`reveal qualif: ${revealQualification}`);
        if (!user) {
            return <div/>
        }
        const person = this.getPerson(user);
        log(JSON.stringify(user));
        log(JSON.stringify(visited));
        const personalInformation = this.formatPersonalInformation(person);
        const workInformation = this.formatWorkInformation();
        const studyInformation = this.formatStudyInformation();
        return (
            <Grommet theme={customTheme}>
                <Box style={{height: "100%"}}>
                    <Box style={{height: "inherit"}}>
                        <Toolbar/>
                        <Box direction="row">
                            <Menu lastUrl={visited}/>
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
                                                {workInformation.length === 1 && (
                                                <Box align="end" className="icon" styele={{outlineColor: "white", borderColor: "white"}}onClick={()=>this.setRevealActivity(!revealActivity)}>
                                                    <Add style={{width:"20px", height:"20px", fill: "#516cfb", stroke: "#516cfb"}}/>
                                                </Box>
                                                )}
                                            </Box>
                                        </Box>
                                        {workInformation.length === 1 ? (<List style={{fontSize: "1rem"}} data={workInformation}/>) : (<List
                                            data={workInformation}
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
                                    <article className="profile" style={{marginTop: "15px", marginBottom: "24px"}}>
                                        <Box align="start" pad="small">
                                            <Box direction="row" width="100%">
                                                <Box width="97%">
                                                    <h4 style={{fontSize: "1.25rem", textAlign: "start"}}>Qualification</h4>
                                                </Box>
                                                {workInformation.length === 1 && (
                                                    <Box align="end" className="icon" onClick={()=>this.setRevealQualification(!revealQualification)}>
                                                        <Add style={{width:"20px", height:"20px", fill: "#516cfb", stroke: "#516cfb"}}/>
                                                    </Box>
                                                )}
                                            </Box>
                                        </Box>
                                        {studyInformation.length === 1 ? (<List style={{fontSize: "1rem"}} data={studyInformation}/>) : (<List
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
                                        <Layer position="right" onClickOutside={()=>this.setRevealActivity(!revealActivity)}>
                                            <Box height="xlarge" width="420px" overflow="auto">
                                                <Box>Add Activity Information</Box>
                                            </Box>
                                        </Layer>
                                    )}
                                    {revealQualification && (
                                        <Layer position="right" onClickOutside={()=>this.setRevealQualification(!revealQualification)}>
                                            <Box height="xlarge" width="420px" overflow="auto">
                                                <Box>Add Qualification Information</Box>
                                            </Box>
                                        </Layer>
                                    )}
                                </Box>
                            </Box>
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
    {getQualification, getAffiliation}
)(Profile);
