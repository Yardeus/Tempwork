import React from 'react';
import {connect} from 'react-redux';
import {compose} from "redux";
import {
    getMyChats,
    getMyMessages,
    sendMessage,
    setProfileMode,
    setSelectedDialog
} from "../../../redux/profile-reducer";
import Preloader from "../../common/preloader";
import Messages from "./Messages";
import {WithAuthRedirect} from "../../../hoc/WithAuthRedirect";


const MessagesContainer = (props) => {





    return <div>
        {props.isFetching ? <Preloader/> : <Messages {...props} />}

    </div>

}

let mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        type: state.auth.type,
        isFetching: state.auth.isFetching,
        chats: state.profilePage.chats,
        messages: state.profilePage.messages,
        selectedDialog: state.profilePage.selectedDialog,
        profileMode: state.profilePage.profileMode,
        token: state.auth.token


    }
}

export default compose(WithAuthRedirect,
    connect(mapStateToProps,
        {getMyChats, getMyMessages, setSelectedDialog, setProfileMode, sendMessage})
)(MessagesContainer);






