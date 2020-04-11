import React, {Component} from 'react';
import {connect} from "react-redux";
import {Box} from "grommet";

class DoctorDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {doctor, affiliation, qualification} = this.props;
        if(!qualification && !affiliation)
            return 'loading';
        return (
            <Box width='380px' style={{borderRadius: '8px', border: "1px solid #ccc", maxHeight: '430px'}} overflow='auto'>
                <Box alignSelf='center' style={{margin: '13px', fontSize: '20px'}}>
                    Dr. {doctor.firstName} {doctor.lastName}
                </Box>
                <Box style={{margin: '15px', maxHeight: '430px'}}>
                    <Box direction='row'>
                        <span style={{margin: '5px', fontWeight: 375}}>Contact </span> <span
                        style={{marginLeft: '20px', marginTop: '5px', fontSize: '17px'}}>{doctor.email}</span>
                    </Box>
                    <Box direction='row'>
                        <span style={{margin: '5px', fontWeight: 375}}>Qualification </span>
                    </Box>
                    {
                        qualification ? (
                            <Box>
                                <Box direction='row'>
                                    <span
                                        style={{marginTop: '5px', marginLeft: '15px', fontWeight: 350}}>Title </span>
                                    <span style={{
                                        marginLeft: '20px',
                                        marginTop: '5px',
                                        fontSize: '17px'
                                    }}>{qualification.title}</span>
                                </Box>
                                <Box direction='row'>
                                    <span style={{
                                        marginTop: '5px',
                                        marginLeft: '15px',
                                        fontWeight: 350
                                    }}>Institute </span> <span style={{
                                    marginLeft: '20px',
                                    marginTop: '5px',
                                    fontSize: '17px'
                                }}>{qualification.institute}</span>
                                </Box>
                                <Box direction='row'>
                                    <span style={{marginTop: '5px', marginLeft: '15px', fontWeight: 350}}>Graduation Year </span>
                                    <span style={{
                                        marginLeft: '20px',
                                        marginTop: '5px',
                                        fontSize: '17px'
                                    }}>{qualification.graduationYear}</span>
                                </Box>
                            </Box>
                        ) : (
                            <Box>
                                <span style={{
                                    marginLeft: '20px',
                                    marginTop: '5px',
                                    fontSize: '17px'
                                }}>No qualification provided</span>
                            </Box>
                        )
                    }
                    {
                        Object.entries(affiliation).length!==0 ? (
                                <Box style={{marginTop: '5px'}}>
                                    <span style={{
                                        marginTop: '10px',
                                        marginLeft: '5px',
                                        marginRight: '5px',
                                        marginBottom: '5px',
                                        fontWeight: 375
                                    }}>Affiliation </span>
                                    {affiliation.map((aff)=>(
                                        <Box style={{marginTop: '10px', marginBottom: '10px'}}>
                                            <Box direction='row'>
                                                <span style={{marginTop: '5px', marginLeft: '15px', fontWeight: 350}}>Hospital </span>
                                                <span style={{
                                                    marginLeft: '20px',
                                                    marginTop: '5px',
                                                    fontSize: '17px'
                                                }}>{aff.hospitalName}</span>
                                            </Box>
                                            <Box direction='row'>
                                                <span style={{marginTop: '5px', marginLeft: '15px', fontWeight: 350}}>City </span>
                                                <span style={{
                                                    marginLeft: '52px',
                                                    marginTop: '5px',
                                                    fontSize: '17px'
                                                }}>{aff.city}</span>
                                            </Box>
                                            <Box direction='row'>
                                                <span style={{marginTop: '5px', marginLeft: '15px', fontWeight: 350}}>Country </span>
                                                <span style={{
                                                    marginLeft: '20px',
                                                    marginTop: '5px',
                                                    fontSize: '17px'
                                                }}>{aff.country}</span>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                        ) : (
                            <Box>
                                <span style={{margin: '5px', fontWeight: 375}}>Affiliation </span>
                                <span style={{
                                    marginLeft: '20px',
                                    marginTop: '5px',
                                    fontSize: '17px'
                                }}>No affiliation provided</span>
                            </Box>
                        )
                    }
                    <Box direction='row'>

                    </Box>
                </Box>
            </Box>
        )
    }

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
});

export default connect(
    mapStateToProps,
    null
)(DoctorDetails);
