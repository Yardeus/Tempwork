import React from 'react';
import {connect} from 'react-redux';
import {compose} from "redux";
import Preloader from "../../common/preloader";
import AEmployer from "./aEmployer";
import {banEmployer, getEmployerList, SetActionType} from "../../../redux/admin-reducer";


class AEmployerContainer extends React.Component {

    componentDidMount() {


    }
    onPageChanged = (pageNumber) => {
        this.props.getEmployerList(pageNumber, this.props.pageSize,this.props.token);
    }



    render() {

        return <>
            {this.props.isFetching ? <Preloader/> : <AEmployer {...this.props} SetActionType={this.props.SetActionType} onPageChanged={this.onPageChanged}
                                                               banEmployer={this.props.banEmployer}/>}

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
        employerList: state.admin.employerList,
        employerCount: state.admin.employerCount,
        banUserId: state.admin.banUserId,
        token: state.auth.token


    }
}

export default compose(
    connect(mapStateToProps,
        {SetActionType,getEmployerList,banEmployer})
)(AEmployerContainer);






