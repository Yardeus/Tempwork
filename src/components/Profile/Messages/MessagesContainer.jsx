import React from 'react';
import {connect} from 'react-redux';
import {compose} from "redux";
import {getFeedback, getMyChats, getMyMessages} from "../../../redux/profile-reducer";
import Preloader from "../../common/preloader";
import Messages from "./Messages";


const MessagesContainer = (props) => {



    return <div>
        {props.isFetching ? <Preloader/> : <Messages {...props}  />}

    </div>

}

let mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        type: state.auth.type,
        isFetching: state.auth.isFetching,
        chats: state.profilePage.chats,
        messages: state.profilePage.messages,

    }
}

export default compose(
    connect(mapStateToProps,
        {getFeedback, getMyChats, getMyMessages})
)(MessagesContainer);






