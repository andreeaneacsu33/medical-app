import React,{Component} from 'react';
import {connect} from "react-redux";
import {Box} from "grommet";

class DoctorDetails extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const {doctor, affiliation, qualification} = this.props;
        return(
            <Box width='380px' height='430px' style={{borderRadius: '8px',border: "1px solid #ccc"}} flex overflow='auto'>
                <Box alignSelf='center' style={{padding: '13px', fontSize: '20px'}}>
                    Dr. {doctor.firstName} {doctor.lastName}
                </Box>
                <Box style={{padding: '15px'}}>
                    <Box direction='row'>
                        <span style={{padding: '5px',fontWeight: 375}}>Contact </span> <span style={{paddingLeft: '20px', paddingTop: '5px',fontSize: '17px'}}>{doctor.email}</span>
                    </Box>
                    <Box direction='row'>
                        <span style={{padding: '5px',fontWeight: 375}}>Qualification </span>
                    </Box>
                    <Box direction='row'>
                        <span style={{paddingTop: '5px', paddingLeft: '15px',fontWeight: 350}}>Title </span> <span style={{paddingLeft: '20px', paddingTop: '5px',fontSize: '17px'}}>{qualification.title}</span>
                    </Box>
                    <Box direction='row'>
                        <span style={{paddingTop: '5px', paddingLeft: '15px',fontWeight: 350}}>Institute </span> <span style={{paddingLeft: '20px', paddingTop: '5px',fontSize: '17px'}}>{qualification.institute}</span>
                    </Box>
                    <Box direction='row'>
                        <span style={{paddingTop: '5px', paddingLeft: '15px',fontWeight: 350}}>Graduation Year </span> <span style={{paddingLeft: '20px', paddingTop: '5px',fontSize: '17px'}}>{qualification.graduationYear}</span>
                    </Box>
                    <Box direction='row'>
                        <span style={{paddingTop:'10px',paddingLeft: '5px', paddingRight: '5px', paddingBottom: '5px',fontWeight: 375}}>Affiliation </span>
                    </Box>
                    <Box direction='row'>
                        <span style={{paddingTop:'10px',paddingLeft: '5px', paddingRight: '5px', paddingBottom: '5px',fontWeight: 375}}>Affiliation </span>
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
