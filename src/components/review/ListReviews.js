import React, {Component} from "react";
import {connect} from "react-redux";
import {Box, Button, Grommet, Text} from "grommet/es6";
import Review from "./Review";
import {customTheme} from "../../utils/helpers";
import {getReview, getReviews} from "../../actions/reviewActions";
import ReviewTile from "./ReviewTile";
import Toolbar from "../menu/Toolbar";
import {history} from "../../utils/history";
import {LinkPrevious} from "grommet-icons/es6";

class ListReviews extends Component {
    constructor(props) {
        super(props);
        this.rerender = this.rerender.bind(this);
    }

    rerender(){
        const {doctor} = this.props.location.state;
        this.props.getReviews({idDoctor: doctor.id});
    }

    componentDidMount() {
        const {doctor} = this.props.location.state;
        const {patient} = this.props;
        this.props.getReview({idPatient: patient.id, idDoctor: doctor.id});
        this.props.getReviews({idDoctor: doctor.id});
    }

    render() {
        const {review} = this.props;
        const {reviews}=this.props;
        const {doctor} = this.props.location.state;
        if(!doctor)
            return <div/>;
        console.log(JSON.stringify(doctor));
        return (
            <Grommet theme={customTheme} style={{height: "100%", backgroundColor: "#fafafa"}}>
                <Toolbar/>
                <Box height='10%' direction='row'>
                    <Box width='42%'>
                        <Button style={{paddingTop: '20px', paddingLeft: '20px'}} alignSelf='start' className="backButton" onClick={()=>history.push(`/home`)}><LinkPrevious/></Button>
                    </Box>
                    <Box style={{paddingTop: '20px'}}>
                        <Box direction='row' style={{padding: '10px',borderRadius: '10px'}}>
                            <Text style={{fontSize: '24px',fontStyle: '\'Google Sans\',Roboto,RobotoDraft,Helvetica,Arial,sans-serif', fontWeight: 350, color: '#8b8b8b'}}>Review your doctor</Text>
                        </Box>
                    </Box>
                </Box>
                <Box width="100%" style={{paddingTop: "20px"}} background="#fafafa">
                    <Box width="40%" alignSelf="center" style={{marginBottom: "10px"}}>
                        <span className="reviewHeader" style={{marginBottom: "10px"}}>Reviews</span>
                        {!review && (<Review doctor={doctor} rerender={this.rerender}/>)}
                        {reviews.length === 0 ? (<Box alignSelf="center" style={{marginTop: "20px"}}>
                            <span
                                style={{fontWeight: 350}}>There are no reviews. Be the first one to give a review!</span>
                        </Box>) : reviews.map((item) => {
                            return (
                                <Box style={{paddingTop: "15px", paddingBottom: "15px"}}>
                                    <ReviewTile review={item}/>
                                </Box>
                            )
                        })}
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
    review: state.review.review,
    reviews: state.review.reviews
});

export default connect(
    mapStateToProps,
    {getReview, getReviews}
)(ListReviews);
