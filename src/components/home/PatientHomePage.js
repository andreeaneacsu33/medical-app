import React, {Component} from "react";
import {connect} from "react-redux";
import {Box, Grid, Grommet, Image,} from "grommet";
import {grommet} from "grommet/themes";
import {Pagination} from '@material-ui/lab';
import {
    getDoctorsFromPage,
    getDoctorsFromPageForCitiesAndHospitalsFilter,
    getDoctorsFromPageForCitiesFilter,
    getDoctorsFromPageForHospitalsFilter,
    getOverallRating,
    getOverallWaitingTime,
    getPagesForCitiesAndHospitalsFilter,
    getPagesForCitiesFilter,
    getPagesForHospitalsFilter,
    getTotalPages,
    setCurrentPage
} from "../../actions/doctorActions";
import {ScheduleNew, Star} from "grommet-icons";
import {history} from "../../utils/history";
import {clearReview, clearReviews} from "../../actions/reviewActions";
import FilterComponent from "../FilterComponent";
import {filters} from "../../utils/helpers";


class PatientHomePage extends Component {
    constructor(props){
        super(props);
        this.rerender = this.rerender.bind(this);
    }

    renderFilteredList(filterType){
        const {cityFilters,hospitalFilters}=this.props;
        if(filterType===filters.NONE){
            this.props.getTotalPages();
            this.props.getDoctorsFromPage({page: this.props.page});
        }else if(filterType===filters.CITY){
            this.props.getPagesForCitiesFilter({cities: cityFilters});
            this.props.getDoctorsFromPageForCitiesFilter({cities: cityFilters,page: this.props.page});
        }else if(filterType===filters.HOSPITAL){
            this.props.getPagesForHospitalsFilter({hospitals: hospitalFilters});
            this.props.getDoctorsFromPageForHospitalsFilter({hospitals: hospitalFilters,page: this.props.page});

        }else if(filterType===filters.CITY_HOSPITAL){
            this.props.getPagesForCitiesAndHospitalsFilter({cities: cityFilters,hospitals: hospitalFilters});
            this.props.getDoctorsFromPageForCitiesAndHospitalsFilter({cities: cityFilters,hospitals: hospitalFilters,page: this.props.page});
        }
        this.props.clearReview();
        this.props.clearReviews();
    }

    rerender(filter){
        this.renderFilteredList(filter);
    }

    componentDidMount() {
        const {filterType}=this.props;
        this.renderFilteredList(filterType);
    }


    handlePageChange = (event, value) => {
        const {filterType,cityFilters,hospitalFilters} = this.props;
        this.props.setCurrentPage({page: value});
        if(filterType===filters.NONE){
            this.props.getDoctorsFromPage({page: value});
        }else if(filterType===filters.CITY){
            this.props.getDoctorsFromPageForCitiesFilter({page: value,cities: cityFilters});
        }else if(filterType===filters.HOSPITAL){
            this.props.getDoctorsFromPageForHospitalsFilter({page: value, hospitals: hospitalFilters});
        }else if(filterType===filters.CITY_HOSPITAL){
            this.props.getDoctorsFromPageForCitiesAndHospitalsFilter({page: value, cities: cityFilters, hospitals: hospitalFilters});
        }
    };

    render() {
        const {page, total} = this.props;
        let {doctors, loading} = this.props;
        if (loading)
            return <div/>;
        if (!doctors)
            return <div/>;
        return (
            <Grommet theme={grommet} full>
                <Box width="100%">
                    <Box direction="row">
                        <Box width="80%" style={{paddingLeft:"5px"}} direction='row'>
                            <FilterComponent rerender={this.rerender}/>
                        </Box>
                        <Box style={{padding: "10px"}}>
                            <Pagination count={total} page={page} onChange={this.handlePageChange}/>
                        </Box>
                    </Box>
                    <Grid
                        style={{marginLeft: "100px", maxWidth: "74%"}}
                        columns={{
                            count: 3,
                            size: "auto"
                        }}
                        gap="large"
                        align="center"
                        fill="horizontal"
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
                                            <Image src={require('../../utils/images/doctor_man.png')}/>) :
                                        (<Image src={require('../../utils/images/doctor_woman.png')}/>)}
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
                                                history.push("/appointment", {doctor: item})
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
    filterType: state.patient.filterType,
    cityFilters: state.patient.cityFilters,
    hospitalFilters: state.patient.hospitalFilters
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
        getPagesForCitiesFilter,
        getPagesForHospitalsFilter,
        getPagesForCitiesAndHospitalsFilter,
        getDoctorsFromPageForCitiesFilter,
        getDoctorsFromPageForHospitalsFilter,
        getDoctorsFromPageForCitiesAndHospitalsFilter
    }
)(PatientHomePage);
