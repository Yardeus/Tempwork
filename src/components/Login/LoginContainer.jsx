import React from "react";
import {connect} from "react-redux";
import {signIn} from "../../redux/auth-reducer";
import Login from "./Login";
import Preloader from "../common/preloader";
import {compose} from "redux";

class LoginContainer extends React.Component {

    EmployeeSignIn = (login, password, type) => {
        this.props.signIn(type, login, password)


    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader/> :  <Login {...this.props} EmployeeSignIn={this.EmployeeSignIn}/>}

            </>
        )
    }


}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    token: state.auth.token,
    isFetching: state.auth.isFetching,
    loginInProgress: state.auth.loginInProgress,
    message: state.auth.message
})

export default compose(
    connect(mapStateToProps, {signIn})
)(LoginContainer);