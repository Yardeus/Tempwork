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
import SendReport from "./SendReport";
import {getCodesReport} from "../../../redux/admin-reducer";


const SendReportContainer = (props) => {





    return <div>
        {props.isFetching ? <Preloader/> : <SendReport {...props} />}

    </div>

}

let mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        type: state.auth.type,
        isFetching: state.auth.isFetching,
        codesReports: state.admin.codesReports



    }
}

export default compose(
    connect(mapStateToProps,
        {getMyChats, getMyMessages, setSelectedDialog, setProfileMode, sendMessage,getCodesReport})
)(SendReportContainer);






