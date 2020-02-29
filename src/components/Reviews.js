import React, {Component} from "react";
import {Box, Button, Grommet, RadioButtonGroup, TextArea, TextInput} from "grommet";
import {connect} from "react-redux";
import {clearErrors} from "../actions/errorActions";
import Rating from "@material-ui/lab/Rating";
import {customTheme} from "../utils/helpers";

class Reviews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            recommend: 'Yes'
        }
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    render() {
        const {user, patient} = this.props;
        const {description, recommend} = this.state;
        const fl = user.email && user.email[0].toUpperCase();
        return (
            <Grommet theme={customTheme}>
                <Box width="100%" height="100%" style={{paddingTop: "20px"}} background="#fafafa">
                    <Box width="50%" alignSelf="center" style={{paddingBottom: "10px"}}>
                        <span className="reviewHeader">Reviews</span>
                    </Box>
                    <Box width="50%" alignSelf="center" background="white"
                         style={{borderRadius: "8px", border: "1px solid #ccc"}}>
                        <Box width="100%" height="270px" style={{paddingLeft: "10px"}}>
                            <Box direction="row" pad="small">
                                <Box id="container">
                                    <Box id="name">
                                        {fl}
                                    </Box>
                                </Box>
                                <Box style={{paddingLeft: "10px", lineHeight: "38px", alignContent: "center"}}>
                                    <span
                                        style={{verticalAlign: "middle"}}>{patient.firstName} {patient.lastName}</span>
                                </Box>
                            </Box>
                            <TextArea name="description" className="reviewHeader"
                                      style={{fontSize: "17px", fontWeight: "400"}} plain
                                      placeholder="Write a review..." resize={false} onChange={this.onChange}/>
                            <Box direction="row">
                                <Box pad="small">
                                    <span style={{fontSize: "17px"}}>Waiting time </span></Box>
                                <Box pad="small" direction="row">
                                    <TextInput type="number" min={0} max={240} style={{width: "80px", height:"30px", fontSize: "14px"}}/><span style={{fontSize: "17px", paddingLeft: "10px"}}> minutes</span></Box>
                        </Box>
                            <Box direction="row">
                                <Box pad="small" style={{verticalAlign: "middle"}}>
                                    <span style={{fontSize: "17px"}}>Would you recommend to a friend? </span></Box>
                                <Box pad="small">
                                    <RadioButtonGroup
                                        direction="row"
                                        name="recommend"
                                        options={[
                                            {label: "Yes", value: "Yes"},
                                            {label: "No", value: "No"},
                                        ]}
                                        value={recommend}
                                        onChange={this.onChange}
                                    />
                                </Box>
                            </Box>
                            <Box direction="row">
                                <Box width="85%" direction="row">
                                    <Box pad="small" style={{verticalAlign: "middle"}}>
                                        <span style={{fontSize: "17px"}}>Rate your experience </span></Box>
                                    <Rating style={{paddingLeft: "7px", paddingTop: "12px"}} name="half-rating" defaultValue={5}
                                            precision={0.5}/>
                                </Box>
                                <Box className="save" pad="small">
                                    <Button>Publish</Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Grommet>)
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    user: state.auth.user,
    patient: state.auth.patient,
});

export default connect(
    mapStateToProps,
    {clearErrors}
)(Reviews);
