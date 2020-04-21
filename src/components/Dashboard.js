import React, {Component} from "react";
import {Box, Meter, Stack, Text} from "grommet";
import {connect} from "react-redux";
import {Star} from "grommet-icons/es6";
import {getOverallRating, getOverallRatingStatistics} from "../actions/doctorActions";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            label: undefined,
        }
    }

    componentDidMount() {
        const {doctor} = this.props;
        this.props.getOverallRating({idDoctor: doctor.id});
        this.props.getOverallRatingStatistics({idDoctor: doctor.id});
    }

    setActive(value){
        this.setState({active: value});
    }

    setLabel(value){
        this.setState({label: value});
    }

    render() {
        let total=5;
        const {active,label} = this.state;
        const {rating, statistics} = this.props;
        console.log('Dashboard');
        console.log(rating);
        console.log(statistics);
        console.log('--------------');
        let statValues = [];
        let sum = 0;
        for (let [key, value] of Object.entries(statistics)) {
            statValues.push({key,value});
            sum+=value;
        }
        if(sum!==0)
            total = sum;
        console.log(statValues);
        if(!rating)
            return <div/>;
        return (
            <Box align="center" pad="small">
                <Stack anchor="center">
                    <Meter
                        type="circle"
                        background="light-2"
                        values={statValues.map((entry)=>({
                            value: entry.value,
                            onHover: over => {
                                this.setActive(over ? entry.key : 0);
                                this.setLabel(over ? `rated by ${entry.value} person(s)`  : undefined);
                            }
                        }))}
                        max={total}
                        size="small"
                        thickness="medium"
                    />
                    <Box align="center">
                        <Box direction="row" align="center" pad={{bottom: "xsmall"}}>
                            <Text size="xlarge" weight="bold">
                                {active || rating}
                            </Text>
                            <Star style={{width: '30px',height: '30px',fill: "rgb(255,201,94)"}}/>
                        </Box>
                        <Text>{label || 'score'}</Text>
                    </Box>
                </Stack>
            </Box>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    doctor: state.auth.doctor,
    rating: state.doctor.rating,
    statistics: state.doctor.statistics,
});

export default connect(
    mapStateToProps,
    {getOverallRating, getOverallRatingStatistics}
)(Dashboard);
