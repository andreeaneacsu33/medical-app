import React, {Component} from 'react';
import {connect} from 'react-redux';
import {logout} from '../actions/authActions';
import PropTypes from 'prop-types';
import {Box, Button} from 'grommet';
import '../index.css';

class Logout extends Component{
    static propTypes={
      logout: PropTypes.func.isRequired
    };

    render() {
        return(
                <Box style={{alignItems:"center", marginTop: "23px"}} className='logout'>
                    <Button onClick={this.props.logout}>Logout</Button>
                </Box>
        )
    }
}

export default connect(
    null,
    {logout}
)(Logout);
