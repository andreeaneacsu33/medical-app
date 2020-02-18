import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Menu from "./menu/Menu";
import {Box, Grommet, List} from "grommet";
import Toolbar from "./menu/Toolbar";
import {customTheme} from "../utils/helpers";
import {getLogger} from "../utils/logger";

const log = getLogger();

class Profile extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        user: PropTypes.object,
    };

    getPerson(user){
        if(user.role.toUpperCase()==='DOCTOR'){
            const {doctor}=this.props;
            log('doc'+JSON.stringify(doctor));
            return doctor;
        }else{
            const {patient}=this.props;
            log('pat'+JSON.stringify(patient));
            return patient;
        }
    }

    formatData(person){
        let data=[];
        data.push({key: "NAME",value: `${person.firstName} ${person.lastName}`});
        data.push({key: "EMAIL",value: `${person.email}`});
        return data;
    }

    render() {
        log(JSON.stringify(this.props));
        const {visited} = this.props;
        log(JSON.stringify(visited));
        const {user} = this.props;
        if (!user) {
            return <div/>
        }
        const person = this.getPerson(user);
        log(JSON.stringify(user));
        log(JSON.stringify(visited));
        const data=this.formatData(person);
        return (
            <Grommet theme={customTheme}>
                <Box className='mainContainer'>
                    <Box>
                        <Toolbar/>
                        <Box direction="row">
                            <Menu lastUrl={visited}/>
                            <Box flex overflow="auto" direction="column">
                                <Box style={{paddingTop: "24px"}}>
                                    <h4>Personal Information</h4>
                                    <article className="profile">
                                        <Box align="start" pad="small">
                                            <h4 style={{fontSize: "1.25rem"}}>Profile</h4>
                                        </Box>
                                        <List
                                            data={data}
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
});

export default connect(
    mapStateToProps,
    null
)(Profile);
