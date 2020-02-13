import React,{Component} from 'react';
import {Box, Grommet} from 'grommet';
import {connect} from 'react-redux';
import {clearErrors} from '../actions/errorActions';
import PropTypes from 'prop-types';
import {getLogger} from '../utils/logger';
import {USERNAME} from '../actions/constants';
import Menu from "./menu/Menu";
import Toolbar from "./menu/Toolbar";
import {customTheme} from "../utils/helpers";

const log=getLogger('Home ');

class Home extends Component{
    state={
        email: localStorage.getItem(USERNAME),
    };
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        user: PropTypes.object,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidMount() {
        const {email}=this.state;
        log('email: '+email);
    }

    render() {
        const {user}=this.props;
        return(
            <Grommet theme={customTheme}>
            <Box className='mainContainer'>
                <Box>
                <Toolbar/>
                <Box direction="row">
                    <Menu/>
                    <span>Hello from Home!</span>
                </Box>
            </Box>
            </Box>
            </Grommet>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    user: state.auth.user
});

export default connect(
    mapStateToProps,
    {clearErrors}
)(Home);

