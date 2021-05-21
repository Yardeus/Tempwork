import React from 'react';
import {connect} from 'react-redux';
import {compose} from "redux";
import Preloader from "../common/preloader";
import AdminPanel from "./AdminPanel";
import {
    getAllJobs,
    getEmployeeList,
    getEmployerList,
    getFeedbacks,
    getReportList,
    SetActionType
} from "../../redux/admin-reducer";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";


class AdminPanelContainer extends React.Component {

    componentDidMount() {
        this.props.SetActionType(null)
        this.props.getEmployerList(this.props.employerCurrentPage,this.props.pageSize,this.props.token)
        this.props.getEmployeeList(this.props.employeeCurrentPage,this.props.pageSize,this.props.token)
        this.props.getAllJobs()
        this.props.getReportList(this.props.token)
    }




    render() {

        return <>
            {this.props.isFetching ? <Preloader/> : <AdminPanel {...this.props} SetActionType={this.props.SetActionType}
                                                                getFeedbacks={this.props.getFeedbacks}/>}

        </>

    }
}

let mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        type: state.auth.type,
        isFetching: state.auth.isFetching,
        actionType: state.admin.actionType,
        pageSize: state.admin.pageSize,
        employerCurrentPage: state.admin.employerCurrentPage,
        employeeCurrentPage: state.admin.employeeCurrentPage,
        reportList: state.admin.reportList,
        token: state.auth.token


    }
}

export default compose(WithAuthRedirect,
    connect(mapStateToProps,
        {SetActionType,getEmployerList,getEmployeeList,getAllJobs,getFeedbacks,getReportList})
)(AdminPanelContainer);






