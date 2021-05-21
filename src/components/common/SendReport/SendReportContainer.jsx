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
import {getCodesReport, sendReport} from "../../../redux/admin-reducer";


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
        isAuth: state.auth.isAuth,
        codesReports: state.admin.codesReports,
        token: state.auth.token



    }
}

export default compose(
    connect(mapStateToProps,
        {getMyChats, getMyMessages, setSelectedDialog, setProfileMode, sendMessage,getCodesReport,sendReport})
)(SendReportContainer);






