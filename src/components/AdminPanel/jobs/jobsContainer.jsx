import React from 'react';
import {connect} from 'react-redux';
import {compose} from "redux";
import Preloader from "../../common/preloader";
import Jobs from "./jobs";
import {addJobs, deleteJobs, SetActionType, setAddJobsMode, setSendJobsMode} from "../../../redux/admin-reducer";


class JobsContainer extends React.Component {

    componentDidMount() {


    }




    render() {

        return <>
            {this.props.isFetching ? <Preloader/> : <Jobs {...this.props} SetActionType={this.props.SetActionType}
                                                          setAddJobsMode={this.props.setAddJobsMode}
                                                          setSendJobsMode={this.props.setSendJobsMode}
                                                          addJobs={this.props.addJobs}
                                                          deleteJobs={this.props.deleteJobs}/>}

        </>

    }
}

let mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        type: state.auth.type,
        isFetching: state.auth.isFetching,
        actionType: state.admin.actionType,
        jobs: state.admin.jobs,
        addJobsMode: state.admin.addJobsMode,
        sendJobsMode: state.admin.sendJobsMode,
        token: state.auth.token


    }
}

export default compose(
    connect(mapStateToProps,
        {SetActionType,setAddJobsMode,setSendJobsMode,addJobs,deleteJobs})
)(JobsContainer);






