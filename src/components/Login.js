import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Box, Button, Form, grommet, Grommet, Image, TextInput} from 'grommet';
import {CircleInformation, Hide, View} from 'grommet-icons';
import {connect} from 'react-redux';
import {login,loadUser} from '../actions/authActions';
import {clearErrors} from '../actions/errorActions';
import {deepMerge} from "grommet/utils";
import '../index.css';
import {getLogger} from '../utils/logger';
import {USERNAME} from '../actions/constants';

const log=getLogger('Login ');

class Login extends Component {
    state = {
        email: '',
        password: '',
        message: null,
        reveal: false,
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        loadUser: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps) {
        const {error} = this.props;
        if (error !== prevProps.error) {
            if (error.id === 'LOGIN_FAIL') {
                this.setState({message: error.message});
            } else {
                this.setState({message: null})
            }
        }
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    onSubmit = e => {
        e.preventDefault();
        const {email, password} = this.state;
        log(`Submit ${email} ${password}`);
        const user = {
            email,
            password
        };
        localStorage.setItem(USERNAME,email);
        this.props.login(user);
    };

    setReveal = (value) => {
        this.setState({reveal: value});
    };

    render() {
        const {reveal} = this.state;
        return (
            <Grommet theme={deepMerge(grommet, customFormFieldTheme)}>
                <Box className='loginForm'>
                    <Image className='logo' src={require('../utils/logo.png')}/>
                    <Form onSubmit={this.onSubmit}>
                        <Box align='center'>
                            <h1>Connect</h1>
                            <span>Access my account</span>
                        </Box>
                        <Box align='center' margin='medium'>
                            <Box
                                className='neutral'
                                width="medium"
                                direction="row"
                                margin="small"
                                align="center"
                                round="xsmall"
                                border
                            >
                                <TextInput
                                    name='email'
                                    id='email'
                                    plain
                                    placeholder='Email'
                                    type='text'
                                    onChange={this.onChange}
                                />
                            </Box>
                            <Box
                                className='neutral'
                                style={{ overflow: 'hidden' }}
                                width="medium"
                                direction="row"
                                margin="small"
                                align="center"
                                round="xsmall"
                                border
                            >
                                <TextInput
                                    name='password'
                                    id='password'
                                    plain
                                    type={reveal ? 'text' : 'password'}
                                    placeholder='Password'
                                    onChange={this.onChange}
                                />
                                <Button
                                    icon={reveal ? <View size="medium"/> : <Hide size="medium"/>}
                                    onClick={() => this.setReveal(!reveal)}
                                />
                            </Box>
                            {this.state.message && (
                            <Box style={{alignSelf:'start',flexDirection: 'row', display: 'flex'}}>
                                <CircleInformation className='infoIcon'/>
                                <span style={{color: '#d50000',fontSize: '13px'}}>{this.state.message}</span>
                            </Box>
                            )}
                            <Box style={{flexDirection: 'row', display: 'flex'}}>
                                <Box style={{paddingRight: '92px', marginTop: '5px'}}><Button className='createButton' href='/register'>Create account</Button></Box>
                                <Box style={{paddingLeft: '92px', marginTop: '5px'}}><Button className='submitButton' type='submit'>Login</Button></Box>
                            </Box>
                            <Box alignSelf='center' margin='30px'><Button className='createButton'>Forgot password?</Button></Box>
                        </Box>
                    </Form>
                </Box>
            </Grommet>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(
    mapStateToProps,
    {login,loadUser, clearErrors}
)(Login)

const customFormFieldTheme = {
    global: {
        font: {
            size: "16px"
        }
    },
    box: {
        alignItems: 'center'
    },
    formField: {
        label: {
            size: "xsmall",
            margin: {vertical: "0", bottom: "small", horizontal: "0"},
            weight: 600
        },
        border: false,
        margin: 0,
        width: 400
    }
};
