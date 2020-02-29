import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Box, Button, Form, Grommet, grommet, Image, Select, TextInput} from 'grommet';
import PropTypes from 'prop-types';
import {deepMerge} from 'grommet/utils';
import {CircleInformation, LinkPrevious} from 'grommet-icons';
import {history} from "../utils/history";
import {USERNAME} from "../actions/actions";
import {register} from "../actions/authActions";
import {clearErrors} from "../actions/errorActions";
import {getLogger} from "../utils/logger";
import {getSpecialties} from "../actions/doctorActions";

const log=getLogger('Register ');

class Register extends Component{
    state = {
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        role: '',
        specialty: '',
        password: '',
        confirm: '',
        message: {}
    };

    static propTypes = {
        error: PropTypes.object.isRequired,
        clearErrors: PropTypes.func.isRequired,
        register: PropTypes.func.isRequired,
    };

    componentWillMount() {
        this.props.getSpecialties();
    }

    getSpecialtyNames(){
        const {specialties}=this.props;
        let array=[];
        for(let i=0;i<specialties.length;i++){
            array.push(specialties[i].name)
        }
        return array;
    }

    componentDidMount() {
        this.props.clearErrors();
        log('cleared');
    }

    validateFields =() =>{
        const {firstName,lastName,email,role,specialty,password,confirm,gender} = this.state;
        let message={};
        if(firstName===''){
            message['firstName']='Insert your first name';
        }
        if(lastName===''){
            message['lastName']='Insert your last name';
        }
        if(role===''){
            message['role']='Select a role';
        }
        if(role.toUpperCase()==='DOCTOR' && specialty===''){
            message['specialty']='Select a specialty';
        }
        if(password===''){
            message['password']='Insert a password';
        }
        if(confirm===''){
            message['confirm']='Confirm your password';
        }
        if(gender===''){
            message['gender']='Select a gender';
        }
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(email===''){
            message['email']='Insert an email address';
        }else if(!re.test(String(email).toLowerCase())){
            message['email']=`${email} is not a valid email address.`;
        }
        if(password!==confirm){
            message['confirm']='Password and Confirm Password should match.';
        }
        return message;
    };

    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    onSave = e => {
        e.preventDefault();
        const message=this.validateFields();
        if(Object.entries(message).length === 0 && message.constructor === Object){
            this.setState({message:this.state.message});
            const  {firstName,lastName,email,gender,specialty,role, password}=this.state;
            const userDTO={email, gender, password, firstName, lastName, role, specialty};
            localStorage.setItem(USERNAME,email);
            this.props.register(userDTO);
        }else{
            log(JSON.stringify(message));
            this.setState({message});
        }
    };

    render() {
        const {specialties}=this.props;
        const {error}=this.props;
        log(JSON.stringify(error));
        if(!specialties)
            return <div/>;
        const optionsRole=['Doctor','Patient'];
        const optionsSpecialty=this.getSpecialtyNames();
        const optionsGender=['Male','Female'];
        return(
            <Grommet theme={customTheme}>
            <Box className='registerForm'>
                <Box style={{flexDirection: 'row', display: 'flex'}}>
                    <Box className='contentLeft'>
                        <Box style={{flexDirection: 'row', display: 'flex', paddingLeft: '14px'}}>
                            <Button className="backButton" onClick={()=>history.push("/login")}><LinkPrevious/></Button>
                            <Image className='logo' src={require('../utils/logo.png')}/>
                        </Box>
                        <Form>
                            <h1>Create your MyDOC account</h1>
                            <span style={{paddingLeft: '14px',fontSize: '18px'}}>Access MyDOC</span>
                            <Box style={{flexDirection: 'row', display: 'flex', paddingTop: '15px'}}>
                                <Box
                                    className='inputBox'
                                    direction="row"
                                    margin="small"
                                    round="xsmall"
                                    border
                                >
                                    <TextInput
                                        className='input'
                                        name='firstName'
                                        id='firstName'
                                        plain
                                        placeholder='First Name'
                                        type='text'
                                        onChange={this.onChange}
                                    />
                                </Box>
                                <Box
                                    className='inputBox'
                                    direction="row"
                                    margin="small"
                                    round="xsmall"
                                    border
                                >
                                    <TextInput
                                        className='input'
                                        name='lastName'
                                        id='lastName'
                                        plain
                                        placeholder='Last Name'
                                        type='text'
                                        onChange={this.onChange}
                                    />
                                </Box>
                            </Box>
                            <Box style={{paddingTop: '2px'}}>
                                <Box
                                    className='emailBox'
                                    direction="row"
                                    margin="small"
                                    round="xsmall"
                                    border
                                >
                                    <TextInput
                                        className='input'
                                        name='email'
                                        id='email'
                                        plain
                                        placeholder='Email'
                                        type='text'
                                        onChange={this.onChange}
                                    />
                                </Box>
                            </Box>
                            <Box
                                style={{paddingTop: '2px', height: '64px', paddingLeft: '12px'}}
                                className='inputBox'
                                direction="row"
                            >
                                <Select
                                    className='select'
                                    id="specialty"
                                    name="gender"
                                    placeholder="Gender"
                                    options={optionsGender}
                                    value={this.state.gender}
                                    onChange={({option})=>this.setState({gender: option})}
                                />
                            </Box>
                            <Box>
                                <Box
                                    style={{paddingTop: '2px', height: '64px', paddingLeft: '12px'}}
                                    className='inputBox'
                                    direction="row"
                                >
                                    <Select
                                        className='select'
                                        id="role"
                                        name="role"
                                        placeholder="Role"
                                        options={optionsRole}
                                        value={this.state.role}
                                        onChange={({option})=>this.setState({role: option})}
                                    />
                                </Box>
                            </Box>
                            {this.state.role==='Doctor' && (<Box style={{paddingTop: '15px', height: '64px',marginBottom: '9px'}}>
                                    <Box
                                        style={{paddingTop: '2px', height: '64px', paddingLeft: '12px'}}
                                        className='inputBox'
                                        direction="row"
                                    >
                                        <Select
                                            className='select'
                                            id="specialty"
                                            name="specialty"
                                            placeholder="Specialty"
                                            options={optionsSpecialty}
                                            value={this.state.specialty}
                                            onChange={({option})=>this.setState({specialty: option})}
                                        />
                                    </Box>
                            </Box>
                            )}
                            <Box style={{flexDirection: 'row', display: 'flex', paddingTop: '7px'}}>
                                <Box
                                    className='inputBox'
                                    direction="row"
                                    margin="small"
                                    round="xsmall"
                                    border
                                >
                                    <TextInput
                                        className='input'
                                        name='password'
                                        id='password'
                                        plain
                                        placeholder='Password'
                                        type='password'
                                        onChange={this.onChange}
                                    />
                                </Box>
                                <Box
                                    className='inputBox'
                                    direction="row"
                                    margin="small"
                                    round="xsmall"
                                    border
                                >
                                    <TextInput
                                        className='input'
                                        name='confirm'
                                        id='confirm'
                                        plain
                                        placeholder='Confirm'
                                        type='password'
                                        onChange={this.onChange}
                                    />
                                </Box>
                            </Box>
                            {!(Object.entries(this.state.message).length===0) && (
                                <Box style={{alignSelf:'start',flexDirection: 'row', display: 'flex'}}>
                                    <CircleInformation className='infoIcon'/>
                                    <span style={{color: '#d50000',fontSize: '13px'}}>Please complete the required fields accordingly.</span>
                                </Box>
                            )}
                            {!(Object.entries(error.message).length===0) && (
                                <Box style={{alignSelf:'start',flexDirection: 'row', display: 'flex'}}>
                                    <CircleInformation className='infoIcon'/>
                                    <span style={{color: '#d50000',fontSize: '13px'}}>{error.message}</span>
                                </Box>
                            )}
                            <Box className='save'>
                                <Button style={{alignSelf: 'flex-end'}} onClick={this.onSave}>Save</Button>
                            </Box>
                        </Form>
                    </Box>
                    <Box className='contentRight'>
                        <Box style={{paddingRight: '14px'}}>
                            <Image className='registerIcon' src={require('../utils/user-register.png')} />
                            <Box className='text'>One account. All the medical services you need.</Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Grommet>
        )
    }
}


const mapStateToProps = state => ({
    error: state.error,
    specialties: state.doctor.specialties
});

export default connect(
    mapStateToProps,
    {register,clearErrors,getSpecialties}
)(Register)

const colors = {
    selected: "#c5cfff"
};

const customTheme = deepMerge(grommet, {
    global:{
        colors,
    },
});
