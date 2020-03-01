import React, {Component} from "react";
import {connect} from "react-redux";
import {Box, Grid, Grommet, Image,} from "grommet";
import {grommet} from "grommet/themes";
import {Pagination} from '@material-ui/lab';
import {
    getDoctorsFromPage,
    getOverallRating,
    getOverallWaitingTime,
    getTotalPages,
    setCurrentPage
} from "../actions/doctorActions";
import {ScheduleNew, Star} from "grommet-icons";
import {history} from "../utils/history";
import {clearReview, clearReviews} from "../actions/reviewActions";


class ListDoctors extends Component {

    componentDidMount() {
        this.props.getTotalPages();
        this.props.getDoctorsFromPage({page: this.props.page});
        this.props.clearReview();
        this.props.clearReviews();
    }


    handlePageChange = (event, value) => {
        this.props.setCurrentPage({page: value});
        this.props.getDoctorsFromPage({page: value});
    };

    render() {
        const {page} = this.props;
        const {total} = this.props;
        let {doctors, loading} = this.props;
        if (loading)
            return <div/>;
        if (!doctors)
            return <div/>;
        return (
            <Grommet theme={grommet} full>
                <Box width="100%">
                    <Box direction="row">
                        <Box width="80%"/>
                        <Box style={{padding: "10px"}}>
                            <Pagination count={total} page={page} onChange={this.handlePageChange}/>
                        </Box>
                    </Box>
                    <Grid
                        style={{marginLeft: "100px"}}
                        columns={{
                            count: 3,
                            size: "auto"
                        }}
                        gap="large"
                    >
                        {doctors.map((item) => {
                            return (
                                <Box style={{
                                    border: "1px solid #ccc",
                                    borderRadius: "8px",
                                    width: "300px",
                                    height: "300px"
                                }} pad="small"
                                     className="tile">
                                    {item.gender === 'male' ? (
                                            <Image src={require('../utils/doctor_man.png')}/>) :
                                        (<Image src={require('../utils/doctor_woman.png')}/>)}
                                    <Box style={{
                                        borderBottom: "1px solid #ccc", padding: "5px", height: "40px"
                                    }}>
                                        <span style={{
                                            alignSelf: "center",
                                            paddingBottom: "5px",
                                        }}>Dr. {item.firstName} {item.lastName}</span>
                                    </Box>
                                    <span style={{
                                        padding: "5px",
                                        fontSize: ".975rem",
                                        lineHeight: "1.25rem"
                                    }}>{item.specialty.name}</span>
                                    <span style={{
                                        padding: "5px",
                                        fontSize: "14px",
                                        lineHeight: "1rem"
                                    }}>Overall score: {item.rating}</span>
                                    <span style={{
                                        padding: "5px",
                                        fontSize: "14px",
                                        lineHeight: "1rem"
                                    }}>Average waiting time: {item.waitingTime} min</span>
                                    <Box direction="row" style={{alignSelf: "center", alignItems: "center"}}
                                         pad="medium" width="60%">
                                        <Box width="50%" style={{alignItems: "center"}}>
                                            <Box style={{
                                                border: "1px solid #ccc",
                                                backgroundColor: "white",
                                                width: "43px",
                                                height: "43px"
                                            }} onClick={() => {
                                            }} id="container">
                                                <Box id="name">
                                                    <ScheduleNew style={{
                                                        width: "25px",
                                                        height: "25px",
                                                        alignSelf: "center",
                                                        paddingTop: "6px",
                                                        fill: "#ababab"
                                                    }}/>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box width="50%" style={{alignItems: "center"}}>
                                            <Box style={{
                                                border: "1px solid #ccc",
                                                backgroundColor: "white",
                                                width: "43px",
                                                height: "43px"
                                            }} onClick={() => {
                                                history.push("/reviews", {doctor: item})
                                            }} id="container">
                                                <Box id="name">
                                                    <Star style={{
                                                        width: "25px",
                                                        height: "25px",
                                                        alignSelf: "center",
                                                        paddingTop: "6px",
                                                        fill: "rgb(255,201,94)"
                                                    }}/>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>)
                        })}
                    </Grid>
                </Box>
            </Grommet>
        )
    }
}

const mapStateToProps = state => ({
    error: state.error,
    total: state.doctor.total,
    doctors: state.doctor.doctors,
    page: state.doctor.page,
    loading: state.doctor.loading,
});

export default connect(
    mapStateToProps,
    {
        getTotalPages,
        getDoctorsFromPage,
        clearReview,
        clearReviews,
        setCurrentPage,
        getOverallRating,
        getOverallWaitingTime,
    }
)(ListDoctors);
