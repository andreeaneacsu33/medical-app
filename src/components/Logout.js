import React, {Component} from 'react';
import {connect} from 'react-redux';
import {logout} from '../actions/authActions';
import PropTypes from 'prop-types';
import {Box, Button, Grommet, grommet} from 'grommet';
import '../index.css';

class Logout extends Component{
    static propTypes={
      logout: PropTypes.func.isRequired
    };

    render() {
        return(
            <Grommet full theme={grommet}>
                <Box className='logout' style={{paddingLeft: '92px', marginTop: '5px'}}>
                    <Button onClick={this.props.logout}>Logout</Button>
                </Box>
            </Grommet>
        )
    }
}

export default connect(
    null,
    {logout}
)(Logout);
