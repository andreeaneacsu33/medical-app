import React, {Component} from "react";
import {Box, Button, Layer} from "grommet";
import {connect} from "react-redux";
import {Close, Filter} from "grommet-icons";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {withStyles} from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import {
    clearFilters,
    getCities,
    getHospitals, removeCityFilter,
    removeHospitalFilter,
    setCityFilter,
    setHospitalFilter
} from "../actions/patientActions";

const useStyles = theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
});

const PurpleCheckbox = withStyles({
    root: {
        color: 'rgb(134, 150, 255)',
        '&$checked': {
            color: 'rgb(134, 150, 255)',
        },
    },
    checked: {},
})(props => <Checkbox color="default" {...props} />);

class FilterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
    }

    componentDidMount() {
        this.props.getCities();
        this.props.getHospitals();
    }

    setVisibility = (value) => {
        this.setState({visible: value});
    };

    handleChange(field, value) {
        const fieldValue = this.props[field];
        if (!fieldValue.includes(value)) {
            if (field === 'cityFilters') {
                this.props.setCityFilter({cityFilter: value});
            } else {
                this.props.setHospitalFilter({hospitalFilter: value});
            }
        } else {
            if (field === 'cityFilters') {
                this.props.removeCityFilter({cityFilter: value});
            } else {
                this.props.removeHospitalFilter({hospitalFilter: value});
            }
        }
    }

    render() {
        const classes = this.props;
        const {visible} = this.state;
        const {cityFilters, hospitalFilters} = this.props;
        let optionsCity = this.props.cities;
        let optionsHospital = this.props.hospitals;
        if (!optionsCity)
            return <div/>;
        if (!optionsHospital)
            return <div/>;
        return (
            <Box style={{paddingTop: '5px'}}>
                <Box>
                    <Box id='filter'
                         style={{border: "1px solid #dadce0", borderRadius: "5px", width: "28px", height: '28px'}}
                         direction='row' onClick={() => this.setVisibility(!visible)}>
                        <Filter/>
                    </Box>
                    <Box className="wrapperFilter"/>
                    {visible && (
                        <Layer position="center"
                               onClickOutside={() => this.setVisibility(!visible)} style={{height: '400px'}}>
                            <Box className="affiliation" height="medium" width="420px" overflow="auto"
                                 align="center">
                                <Box direction="row" width="100%">
                                    <Box align="center" pad="small" width="90%"><h4
                                        style={{fontSize: "20px"}}>Filters</h4></Box>
                                    <Box pad="small"
                                         onClick={() => this.setVisibility(!visible)}><Close
                                        style={{width: "20px", height: "20px"}}/></Box>
                                </Box>
                                <div className={classes.root}>
                                    <Box width='80px' style={{
                                        borderRadius: '8px',
                                        border: '1px solid #dadce0',
                                        alignItems: 'center'
                                    }}>
                                        <FormLabel style={{paddingTop: '5px', paddingBottom: '5px'}}
                                                   component="legend">City</FormLabel></Box>
                                    <Box pad='small' height="100px" overflow="auto" width="210px">
                                        <FormControl component="fieldset" className={classes.formControl}>
                                            <FormGroup>
                                                {optionsCity.map((item) => {
                                                    if (cityFilters.includes(item)) {
                                                        return (<FormControlLabel
                                                            control={<PurpleCheckbox checked={true} onChange={() => {
                                                                this.handleChange('cityFilters', item)
                                                            }} value={item}/>}
                                                            label={item}
                                                        />)
                                                    } else {
                                                        return (<FormControlLabel
                                                            control={<PurpleCheckbox checked={false} onChange={() => {
                                                                this.handleChange('cityFilters', item)
                                                            }} value={item}/>}
                                                            label={item}
                                                        />)
                                                    }
                                                })}
                                            </FormGroup>
                                        </FormControl>
                                    </Box>
                                </div>
                                <div className={classes.root}>
                                    <Box width='80px' style={{
                                        borderRadius: '8px',
                                        border: '1px solid #dadce0',
                                        alignItems: 'center'
                                    }}>
                                        <FormLabel style={{paddingTop: '5px', paddingBottom: '5px'}}
                                                   component="legend">Hospital</FormLabel></Box>
                                    <Box pad='small' height="100px" overflow="auto" width="210px">
                                        <FormControl component="fieldset" className={classes.formControl}>
                                            <FormGroup>
                                                {optionsHospital.map((item) => {
                                                    if (hospitalFilters.includes(item)) {
                                                        return (<FormControlLabel
                                                            control={<PurpleCheckbox checked={true} onChange={() => {
                                                                this.handleChange('hospitalFilters', item)
                                                            }} value={item}/>}
                                                            label={item}
                                                        />)
                                                    } else {
                                                        return (<FormControlLabel
                                                            control={<PurpleCheckbox checked={false} onChange={() => {
                                                                this.handleChange('hospitalFilters', item)
                                                            }} value={item}/>}
                                                            label={item}
                                                        />)
                                                    }
                                                })}
                                            </FormGroup>
                                        </FormControl>
                                    </Box>
                                </div>
                                <Box style={{alignItems: "center", marginTop: "23px"}} className='logout'
                                     direction='row'>
                                    <Box style={{paddingRight: '5px'}}>
                                        <Button onClick={() => {
                                            console.log(cityFilters)
                                        }}>Apply</Button>
                                    </Box>
                                    <Box style={{paddingLeft: '5px'}}>
                                        <Button onClick={() => {
                                            this.props.clearFilters()
                                        }}>Clear</Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Layer>
                    )}
                </Box>
            </Box>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    cities: state.patient.cities,
    hospitals: state.patient.hospitals,
    cityFilters: state.patient.cityFilters,
    hospitalFilters: state.patient.hospitalFilters
});

export default connect(
    mapStateToProps,
    {getCities, getHospitals, setCityFilter, setHospitalFilter, clearFilters, removeCityFilter, removeHospitalFilter}
)(withStyles(useStyles)(FilterComponent));

