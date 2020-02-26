import React, {Component} from "react";
import {connect} from "react-redux";
import {Box, Grid, Grommet, Image,} from "grommet";
import {grommet} from "grommet/themes";
import {Pagination} from '@material-ui/lab';
import {getDoctorsFromPage, getTotalPages} from "../actions/doctorActions";
import {ScheduleNew, Star} from "grommet-icons";


class ListDoctors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
        }
    }

    componentDidMount() {
        this.props.getTotalPages();
        this.props.getDoctorsFromPage({page: this.state.page});
    }

    handlePageChange = (event, value) => {
        this.setState({page: value});
        this.props.getDoctorsFromPage({page: value});
    };


    render() {
        const {page} = this.state;
        const {total, doctors} = this.props;
        if (!doctors)
            return <div/>;
        return (
            <Grommet theme={grommet} full>
                <Box width="100%">
                    <Box direction="row">
                        <Box width="80%"/>
                        <Box>
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
                                <Box style={{border: "1px solid #ccc", borderRadius: "8px", width: "300px"}} pad="small"
                                     className="tile">
                                    {item.gender === 'male' ? (
                                            <Image src={require('../utils/doctor_man.png')}/>) :
                                        (<Image src={require('../utils/doctor_woman.png')}/>)}
                                    <Box style={{borderBottom: "1px solid #ccc"}}>
                                        <span style={{alignSelf: "center"}}>Dr. {item.firstName} {item.lastName}</span>
                                    </Box>
                                    <span style={{
                                        padding: "5px",
                                        fontSize: ".975rem",
                                        lineHeight: "1.25rem"
                                    }}>{item.specialty.name}</span>
                                    <Box direction="row" style={{alignItems: "center"}} pad="medium" width="100%">
                                        <Box width="50%" style={{alignItems:"center"}}>
                                            <Box style={{
                                                border: "1px solid #ccc",
                                                backgroundColor: "white",
                                                width: "43px",
                                                height: "43px"
                                            }} onClick={() => {
                                            }} id="container">
                                                <Box id="name">
                                                    <ScheduleNew style={{
                                                        width: "30px",
                                                        height: "30px",
                                                        alignSelf: "center",
                                                        paddingTop: "5px",
                                                        stroke: "grey"
                                                    }}/>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box width="50%" style={{alignItems:"center"}}>
                                            <Box style={{
                                                border: "1px solid #ccc",
                                                backgroundColor: "white",
                                                width: "43px",
                                                height: "43px"
                                            }} onClick={() => {
                                            }} id="container">
                                                <Box id="name">
                                                    <Star style={{
                                                        width: "30px",
                                                        height: "30px",
                                                        alignSelf: "center",
                                                        paddingTop: "5px",
                                                        stroke: "grey"
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
});

export default connect(
    mapStateToProps,
    {getTotalPages, getDoctorsFromPage}
)(ListDoctors);
