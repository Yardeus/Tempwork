import React from 'react';
import {connect} from 'react-redux';
import {compose} from "redux";
import Profile from "./Profile";
import {getData, setEditProfileMode, updateData} from "../../redux/profile-reducer";
import Preloader from "../common/preloader";
import {logOut} from "../../redux/auth-reducer";
import {getDate} from "../common/getDate";


class ProfileContainer extends React.Component {

    componentDidMount() {
        this.props.getData(this.props.type, this.props.userId)
    }




    render() {

        return <>
            {this.props.isFetching ? <Preloader/> : <Profile {...this.props}  logOut={this.props.logOut}
                                                             setEditProfileMode={this.props.setEditProfileMode}
                                                             updateData={this.props.updateData}
                                                             getDate={this.props.getDate}/>}

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
        editProfileMode: state.profilePage.editProfileMode

    }
}

export default compose(
    connect(mapStateToProps,
        {getData, logOut, setEditProfileMode,updateData,getDate})
)(ProfileContainer);






