import React, {Component} from "react";
import {Box, Meter, Stack, Text} from "grommet";
import {connect} from "react-redux";
import {Star} from "grommet-icons/es6";
import {
    getOverallRating,
    getOverallRatingStatistics,
    getOverallWaitingTime,
    getOverallWaitingTimeStatistics
} from "../actions/doctorActions";
import {Contract, Expand} from "grommet-icons";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRating: false,
            activeWaitingTime: false,
            labelRating: undefined,
            labelWaitingTime: undefined,
            dashboardVisible: true,
        }
    }

    componentDidMount() {
        const {doctor} = this.props;
        this.props.getOverallRating({idDoctor: doctor.id});
        this.props.getOverallWaitingTime({idDoctor: doctor.id});
        this.props.getOverallRatingStatistics({idDoctor: doctor.id});
        this.props.getOverallWaitingTimeStatistics({idDoctor: doctor.id});
    }

    setActive(value, type) {
        if (type === 'rating')
            this.setState({activeRating: value});
        else
            this.setState({activeWaitingTime: value});
    }

    setLabel(value, type) {
        if (type === 'rating')
            this.setState({labelRating: value});
        else
            this.setState({labelWaitingTime: value});
    }

    setVisible(value){
        this.setState({dashboardVisible: value});
    }

    render() {
        let totalRating = 5, totalWaiting = 0;
        const {activeRating, activeWaitingTime, labelRating, labelWaitingTime, dashboardVisible} = this.state;
        const {rating, ratingStatistics, waiting, waitingTimeStatistics} = this.props;
        let ratingValues = [];
        let waitingTimeValues = [];
        let sumRating = 0, sumWaiting = 0;
        for (let [key, value] of Object.entries(ratingStatistics)) {
            ratingValues.push({key, value});
            sumRating += value;
        }
        for (let [key, value] of Object.entries(waitingTimeStatistics)) {
            waitingTimeValues.push({key, value});
            sumWaiting += value;
        }
        if (sumRating !== 0)
            totalRating = sumRating;
        if (sumWaiting !== 0)
            totalWaiting = sumWaiting;
        if (!rating || !waiting)
            return <div/>;
        return (
            <Box align="center" pad="small">
                {dashboardVisible? (<Box width='100%' style={{borderRadius: "8px", border: "1px solid #ccc"}}>
                    <Box pad='small' direction='row'>
                        <Box width='95%' alignContent='center'>
                            <Text style={{
                                fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
                                fontSize: '20px'
                            }} alignSelf='center'>Dashboard</Text>
                        </Box>
                        <Box align='end' onClick={()=>{this.setVisible(!dashboardVisible)}}>
                            <Contract style={{
                                width: "20px",
                                height: "20px",
                            }}/>
                        </Box>
                    </Box>
                    <Box pad='medium' direction='row'>
                        <Stack anchor="center">
                            <Meter
                                type="circle"
                                background="light-2"
                                values={ratingValues.map((entry) => ({
                                    value: entry.value,
                                    onHover: over => {
                                        this.setActive(over ? entry.key : 0, 'rating');
                                        this.setLabel(over ? `rated by ${entry.value} person(s)` : undefined, 'rating');
                                    }
                                }))}
                                max={totalRating}
                                size="small"
                                thickness="medium"
                            />
                            <Box align="center">
                                <Box direction="row" align="center" pad={{bottom: "xsmall"}}>
                                    <Text size="xlarge" weight="bold">
                                        {activeRating || rating}
                                    </Text>
                                    <Star style={{width: '30px', height: '30px', fill: "rgb(255,201,94)"}}/>
                                </Box>
                                <Text textAlign='center'>{labelRating || 'score'}</Text>
                            </Box>
                        </Stack>
                        <Box pad='small'/>
                        <Stack anchor="center">
                            <Meter
                                type="circle"
                                background="light-2"
                                values={waitingTimeValues.map((entry) => ({
                                    value: entry.value,
                                    onHover: over => {
                                        this.setActive(over ? entry.key : 0, 'waiting');
                                        this.setLabel(over ? `waiting time of ${entry.value} person(s)` : undefined, 'waiting');
                                    }
                                }))}
                                max={totalWaiting}
                                size="small"
                                thickness="medium"
                            />
                            <Box align="center">
                                <Box direction="row" align="center" pad={{bottom: "xsmall"}}>
                                    <Text size="xlarge" weight="bold">
                                        {activeWaitingTime || waiting}
                                    </Text>
                                    <Text pad='small' size="medium" weight="bold">
                                        min
                                    </Text>
                                </Box>
                                <Text textAlign='center'>{labelWaitingTime || 'waiting time'}</Text>
                            </Box>
                        </Stack>
                    </Box>
                </Box>) :
                    (<Box width='100%' style={{borderRadius: "8px", border: "1px solid #ccc"}}>
                            <Box pad='small' direction='row'>
                                <Box width='95%' alignContent='center'>
                                    <Text style={{
                                        fontFamily: "'Google Sans', Roboto, Arial, sans-serif",
                                        fontSize: '20px'
                                    }} alignSelf='center'>Dashboard</Text>
                                </Box>
                                <Box align='end' onClick={()=>{this.setVisible(!dashboardVisible)}}>
                                    <Expand style={{
                                        width: "20px",
                                        height: "20px",
                                    }}/>
                                </Box>
                            </Box>
                        </Box>
                    )}
            </Box>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    doctor: state.auth.doctor,
    rating: state.doctor.rating,
    waiting: state.doctor.waiting,
    ratingStatistics: state.doctor.ratingStatistics,
    waitingTimeStatistics: state.doctor.waitingTimeStatistics,
});

export default connect(
    mapStateToProps,
    {getOverallRating, getOverallWaitingTime, getOverallRatingStatistics, getOverallWaitingTimeStatistics}
)(Dashboard);
