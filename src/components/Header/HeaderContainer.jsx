import React from "react";
import Header from "./Header";
import * as axios from "axios";
import {connect} from "react-redux";
import {me, SetAuthUserData} from "../../redux/auth-reducer";
import {loginAPI} from "../../api/api";
import {compose} from "redux";
import {setOneVacancy} from "../../redux/employee-reducer";

class HeaderContainer extends React.Component {
    componentDidMount() {
        me(this.props.token)
    }

    render() {
        return (
            <Header {...this.props} />
        )
    }


}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    token: state.auth.token,
    type: state.auth.type
})

export default compose(
    connect(mapStateToProps, {SetAuthUserData, me})
)(HeaderContainer);
