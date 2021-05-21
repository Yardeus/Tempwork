import React from 'react';
import {connect} from 'react-redux';
import {compose} from "redux";
import Preloader from "../../common/preloader";
import {banEmployee, getEmployeeList, SetActionType} from "../../../redux/admin-reducer";
import AEmployee from "./aEmployee";


class AEmployeeContainer extends React.Component {

    componentDidMount() {


    }




    render() {

        return <>
            {this.props.isFetching ? <Preloader/> : <AEmployee {...this.props} />}

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
        employeeCurrentPage: state.admin.employeeCurrentPage,
        employeeList: state.admin.employeeList,
        employeeCount: state.admin.employeeCount,
        banUserId: state.admin.banUserId,
        token: state.auth.token


    }
}

export default compose(
    connect(mapStateToProps,
        {SetActionType,getEmployeeList,banEmployee})
)(AEmployeeContainer);






