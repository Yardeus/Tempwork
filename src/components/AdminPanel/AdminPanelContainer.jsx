import React from 'react';
import {connect} from 'react-redux';
import {compose} from "redux";
import Preloader from "../common/preloader";
import AdminPanel from "./AdminPanel";
import {getEmployeeList, getEmployerList, SetActionType} from "../../redux/admin-reducer";


class AdminPanelContainer extends React.Component {

    componentDidMount() {
        this.props.SetActionType(null)
        this.props.getEmployerList(this.props.employerCurrentPage,this.props.pageSize)
        this.props.getEmployeeList(this.props.employeeCurrentPage,this.props.pageSize)
    }




    render() {

        return <>
            {this.props.isFetching ? <Preloader/> : <AdminPanel {...this.props} SetActionType={this.props.SetActionType}/>}

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
        employeeCurrentPage: state.admin.employeeCurrentPage


    }
}

export default compose(
    connect(mapStateToProps,
        {SetActionType,getEmployerList,getEmployeeList})
)(AdminPanelContainer);






