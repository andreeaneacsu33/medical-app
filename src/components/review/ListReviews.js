import React, {Component} from "react";
import {connect} from "react-redux";
import {Box, Grommet} from "grommet/es6";
import Review from "./Review";
import {customTheme} from "../../utils/helpers";
import {getReview, getReviews} from "../../actions/reviewActions";
import ReviewTile from "./ReviewTile";

class ListReviews extends Component {
    constructor(props) {
        super(props);
        this.state ={
            reviews: this.props.reviews
        };
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
        const {reviews}=this.state;
        const {doctor} = this.props.location.state;
        if(!doctor)
            return <div/>;
        console.log(JSON.stringify(reviews));
        return (
            <Grommet theme={customTheme} style={{height: "100%"}}>
                <Box width="100%" height="100%" style={{paddingTop: "20px"}} background="#fafafa">
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
