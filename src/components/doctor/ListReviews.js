import React, {Component} from "react";
import {connect} from "react-redux";
import {getReview, getReviews} from "../../actions/reviewActions";
import {Box} from "grommet";
import ReviewTile from "../review/ReviewTile";
import {Fireball} from "grommet-icons";

class ListReviews extends Component {

    componentDidMount() {
        const {doctor} = this.props;
        this.props.getReviews({idDoctor: doctor.id});
    }

    render() {
        const {reviews} = this.props;
        console.log(reviews);
        return (
            <Box overflow='auto' style={{alignItems: 'center'}}>
                {reviews.length === 0 ? (
                    <Box direction='row' alignItems='center' style={{paddingTop: '100px'}}>
                        <Box height='100px' style={{verticalAlign: 'middle'}}>
                            <Fireball
                                style={{
                                    width: "30px",
                                    height: "30px",
                                }}
                            />
                        </Box>
                        <Box style={{paddingLeft: '10px'}}>
                            You have no reviews.
                        </Box>
                    </Box>
                ) : reviews.map((item) => {
                    return (
                        <Box width='50%' style={{paddingTop: "15px", paddingBottom: "15px"}}>
                            <ReviewTile review={item}/>
                        </Box>
                    )
                })}
            </Box>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    doctor: state.auth.doctor,
    reviews: state.review.reviews
});

export default connect(
    mapStateToProps,
    {getReview, getReviews}
)(ListReviews);
