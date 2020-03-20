import React, {Component} from "react";
import {Box, Button, Grommet, RadioButtonGroup, TextArea, TextInput} from "grommet";
import {connect} from "react-redux";
import {clearErrors} from "../../actions/errorActions";
import Rating from "@material-ui/lab/Rating";
import {customTheme} from "../../utils/helpers";
import {getLogger} from "../../utils/logger";
import {addReview, getReview} from "../../actions/reviewActions";
import {CircleInformation} from "grommet-icons/es6";

const log = getLogger('Reviews');

class Review extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: '',
            description: '',
            recommend: 'Yes',
            rating: 5,
            message: false,
        }
    };

    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    validateFields = () => {
        const {time, description, rating} = this.state;
        return time === '' || description === '' || rating === '';

    };

    getDate() {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        const yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        today = mm + '-' + dd + '-' + yyyy;
        return today;
    }

    onSave = e => {
        e.preventDefault();
        const message=this.validateFields();
        if (message === false) {
            const {time, description, rating, recommend} = this.state;
            const {patient} = this.props;
            const {doctor} = this.props;
            const rec = recommend === 'Yes';
            const date = this.getDate();
            const reviewDTO = {
                patientEmail: patient.email,
                doctorEmail: doctor.email,
                description: description,
                rating: rating,
                reviewDate: date,
                waitingTime: time,
                recommend: rec
            };
            log(JSON.stringify(reviewDTO));
            this.setState({message:message});
            this.props.addReview(reviewDTO);
            this.props.rerender();
        }else{
            this.setState({message:message});
        }
    };

    render() {
        const {user, patient} = this.props;
        const {recommend, message, rating} = this.state;
        const fl = user.email && user.email[0].toUpperCase();
        return (
            <Grommet theme={customTheme}>
                <Box width="100%" alignSelf="center" background="white"
                     style={{borderRadius: "8px", border: "1px solid #ccc"}}>
                    <Box width="100%" height="100%" className="review">
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
                                  style={{fontSize: "16px", fontWeight: "400"}} plain
                                  placeholder="Write a review..." resize={false} onChange={this.onChange}/>
                        <Box direction="row">
                            <Box pad="small">
                                <span style={{fontSize: "16px"}}>Waiting time </span></Box>
                            <Box pad="small" direction="row">
                                <TextInput name="time" type="number" min={0} max={240}
                                           style={{width: "80px", height: "30px", fontSize: "14px"}}
                                           onChange={this.onChange}/><span
                                style={{fontSize: "16px", paddingLeft: "10px"}}> minutes</span></Box>
                        </Box>
                        <Box direction="row">
                            <Box pad="small" style={{verticalAlign: "middle"}}>
                                <span style={{fontSize: "16px"}}>Would you recommend to a friend? </span></Box>
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
                                    <span style={{fontSize: "16px"}}>Rate your experience </span></Box>
                                <Rating style={{paddingLeft: "7px", paddingTop: "12px"}} name="rating"
                                        defaultValue={rating}
                                        precision={0.5} onChange={this.onChange}/>
                            </Box>
                        </Box>
                        {message && (
                            <Box style={{alignSelf: 'start', flexDirection: 'row', display: 'flex', marginTop: "5px"}}>
                                <CircleInformation className='infoIcon'/>
                                <span style={{color: '#d50000', fontSize: '15px'}}>Please complete the required fields accordingly.</span>
                            </Box>
                        )}
                        <Box className="save" pad="small" style={{alignSelf: 'flex-end'}}>
                            <Button onClick={this.onSave}>Publish</Button>
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
    {clearErrors, addReview, getReview}
)(Review);
