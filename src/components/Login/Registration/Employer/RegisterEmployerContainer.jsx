import React from "react";
import {connect} from "react-redux";
import Preloader from "../../../common/preloader";
import {compose} from "redux";
import RegisterEmployer from "./RegisterEmployer";
import {signUp} from "../../../../redux/auth-reducer";

class RegisterEmployerContainer extends React.Component {

    SignUp = (type, data) => {
        this.props.signUp(type, data)
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader/> : <RegisterEmployer {...this.props} SignUp={this.SignUp}/>}

            </>
        )
    }


}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    token: state.auth.token,
    isFetching: state.auth.isFetching,
    loginInProgress: state.auth.loginInProgress
})

export default compose(
    connect(mapStateToProps,{signUp})
)(RegisterEmployerContainer);