import React from "react";
import {connect} from "react-redux";
import {signIn} from "../../../redux/auth-reducer";
import Login from "./../Login";
import Preloader from "../../common/preloader";
import {compose} from "redux";
import AdmLogin from "./AdmLogin";

class AdmLoginContainer extends React.Component {


    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader/> :  <AdmLogin {...this.props} signIn={this.props.signIn}/>}

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
    connect(mapStateToProps, {signIn})
)(AdmLoginContainer);