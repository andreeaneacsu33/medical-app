import React,{Component} from "react";
import {Box, Header, Image} from "grommet";
import {connect} from "react-redux";

class Toolbar extends Component{
    render() {
        const {user}=this.props;
        const fl=user.email && user.email[0].toUpperCase();
        return(
            <Box className="toolbarWrapper">
            <Header className="toolbar">
                <Box style={{padding: "12px"}} direction="row" align="center" gap="small">
                    <Image className='logo' src={require('../../utils/logo.png')}/>
                    <Box id="container">
                        <Box id="name">
                            {fl}
                        </Box>
                    </Box>
                </Box>
            </Header>
            </Box>
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
    null
)(Toolbar);
