import React from 'react';
import {connect} from 'react-redux';
import {compose} from "redux";
import Preloader from "../../common/preloader";
import Jobs from "./Reports";
import {
    addJobs, confirmReport,
    deleteJobs,
    rejectReport,
    SetActionType,
    setAddJobsMode,
    setSendJobsMode
} from "../../../redux/admin-reducer";
import Reports from "./Reports";


class ReportsContainer extends React.Component {

    componentDidMount() {


    }




    render() {

        return <>
            {this.props.isFetching ? <Preloader/> : <Reports {...this.props}
                                                         />}

        </>

    }
}

let mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        type: state.auth.type,
        isFetching: state.auth.isFetching,
        actionType: state.admin.actionType,
        token: state.auth.token,
        reportList: state.admin.reportList,


    }
}

export default compose(
    connect(mapStateToProps,
        {SetActionType,rejectReport,confirmReport})
)(ReportsContainer);






