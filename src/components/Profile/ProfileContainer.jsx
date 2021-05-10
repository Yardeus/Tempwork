import React from 'react';
import {connect} from 'react-redux';
import {compose} from "redux";
import Profile from "./Profile";
import {getData, getMyChats, saveAvatar, setEditProfileMode, updateData} from "../../redux/profile-reducer";
import Preloader from "../common/preloader";
import {logOut} from "../../redux/auth-reducer";
import {getDate} from "../common/getDate";


class ProfileContainer extends React.Component {

    componentDidMount() {
        this.props.getData(this.props.type, this.props.userId)
        let type
        if (this.props.type === "employee") {
            type = 1
        } else if (this.props.type === "employer") {
            type = 2
        }
        this.props.getMyChats(this.props.userId, type)
    }


    render() {

        return <>
            {this.props.isFetching ? <Preloader/> : <Profile {...this.props} logOut={this.props.logOut}
                                                             setEditProfileMode={this.props.setEditProfileMode}
                                                             updateData={this.props.updateData}
                                                             getDate={this.props.getDate}
                                                             saveAvatar={this.props.saveAvatar}/>}

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
        chats: state.profilePage.chats

    }
}

export default compose(
    connect(mapStateToProps,
        {getData, logOut, setEditProfileMode, updateData, getDate, saveAvatar,getMyChats})
)(ProfileContainer);






