import React from 'react';
import {connect} from 'react-redux';
import {compose} from "redux";
import Profile from "./Profile";
import {
    getData,
    getMyChats,
    saveAvatar,
    setEditProfileMode,
    setProfileMode,
    updateData
} from "../../redux/profile-reducer";
import Preloader from "../common/preloader";
import {logOut} from "../../redux/auth-reducer";
import {getDate} from "../common/getDate";
import {getCodesReport} from "../../redux/admin-reducer";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";


class ProfileContainer extends React.Component {

    componentDidMount() {
        this.props.getData(this.props.type, this.props.userId,this.props.token)
        let type
        if (this.props.type === "employee") {
            type = 1
        } else if (this.props.type === "employer") {
            type = 2
        }
        this.props.getMyChats(this.props.userId, type,this.props.token)
        this.props.getCodesReport()

    }


    render() {

        return <>
            {this.props.isFetching ? <Preloader/> : <Profile {...this.props} logOut={this.props.logOut}
                                                             setEditProfileMode={this.props.setEditProfileMode}
                                                             updateData={this.props.updateData}
                                                             getDate={this.props.getDate}
                                                             saveAvatar={this.props.saveAvatar}
                                                             setProfileMode={this.props.setProfileMode}/>}

        </>

    }
}

let mapStateToProps = (state) => {
    return {
        profileData: state.profilePage.profileData,
        userId: state.auth.userId,
        type: state.auth.type,
        isFetching: state.auth.isFetching,
        myVacancy: state.profilePage.myVacancy,
        editProfileMode: state.profilePage.editProfileMode,
        chats: state.profilePage.chats,
        profileMode: state.profilePage.profileMode,
        token: state.auth.token

    }
}

export default compose(WithAuthRedirect,
    connect(mapStateToProps,
        {getData, logOut, setEditProfileMode, updateData, getDate, saveAvatar,getMyChats, setProfileMode,getCodesReport})
)(ProfileContainer);






