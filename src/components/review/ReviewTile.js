import React, {Component} from "react";
import {connect} from "react-redux";
import {getReview, getReviews} from "../../actions/reviewActions";
import {Box} from "grommet";
import {getHexColor} from "../../utils/helpers";
import {getLogger} from "../../utils/logger";
import {Star, StarHalf} from "grommet-icons";

const log = getLogger('ReviewTile ');

class ReviewTile extends Component {
    formatDate(date) {
        const month = date.substr(1, 1);
        const day = date.substr(3, 2);
        const year = date.substr(6);
        log(`${month} ${day} ${year}`);
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return `${monthNames[month-1]} ${day}, ${year}`;
    }

    render() {
        const {review} = this.props;
        if(!review)
            return <div/>;
        console.log(JSON.stringify(review));
        const patient = review.idPatient;
        const fl = patient.email[0].toUpperCase();
        const color = getHexColor();
        const date = this.formatDate(review.reviewDate);
        return (
            <Box width="100%" alignSelf="center" background="white"
                 style={{borderRadius: "8px", border: "1px solid #ccc"}} height="auto">
                <Box direction="row" pad="small">
                    <Box id="container" style={{backgroundColor: `${color}`}}>
                        <Box id="name">
                            {fl}
                        </Box>
                    </Box>
                    <Box>
                        <Box style={{paddingLeft: "10px", alignContent: "center"}}>
                                    <span
                                        style={{verticalAlign: "middle"}}>{patient.firstName} {patient.lastName}</span>
                            <span style={{fontSize: "13px"}}>{date}</span>
                        </Box>
                    </Box>
                </Box>
                <Box style={{paddingLeft: "12px",paddingBottom: "3px"}}>
                    <span style={{fontSize: "16px"}}>{review.description}</span>
                </Box>
                <Box style={{paddingLeft: "12px",paddingBottom: "3px"}}>
                    <span style={{fontSize: "16px"}}>Time spent waiting: {review.waitingTime} min.</span>
                </Box>
                <Box style={{paddingLeft: "12px",paddingBottom: "5px"}}>
                    <span style={{fontSize: "16px"}}>{review.recommend? 'I would recommend to a friend.':'I would not recommend to a friend.'}</span>
                </Box>
                <Box style={{paddingRight: "12px",paddingBottom: "12px", alignSelf: "flex-end"}}>
                    <span style={{fontSize: "16px"}}>Rated {review.rating} out of 5 {review.rating === 5 ? (<Star style={{fill: "rgb(255,201,94)"}}/>) : (<StarHalf style={{fill: "rgb(255,201,94)"}}/>)}</span>
                </Box>
            </Box>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
});

export default connect(
    mapStateToProps,
    {getReview, getReviews}
)(ReviewTile);
