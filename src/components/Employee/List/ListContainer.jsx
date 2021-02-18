import React from 'react';
import {connect} from 'react-redux';
import {
    follow, getFilterVacancy, getVacancy,
    setCurrentPage, setOneVacancy,
    toggleIsFetching,
    unFollow
} from '../../../redux/employee-reducer';
import List from './List';
import Preloader from "../../common/preloader";
import {compose} from "redux";


class ListContainer extends React.Component {

    componentDidMount() {
        this.props.filterMode ? this.props.getFilterVacancy(this.props.filter,this.props.currentPage, this.props.pageSize) : this.props.getVacancy(this.props.currentPage, this.props.pageSize)

    }

    onPageChanged = (pageNumber) => {
        this.props.filterMode ? this.props.getFilterVacancy(this.props.filter,pageNumber, this.props.pageSize) : this.props.getVacancy(pageNumber, this.props.pageSize);
    }


    render() {

        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <List count={this.props.count}
                  pageSize={this.props.pageSize}
                  vacancyData={this.props.vacancyData}
                  currentPage={this.props.currentPage}
                  onPageChanged={this.onPageChanged}
                  unFollow={this.props.unFollow}
                  follow={this.props.follow}

            />
        </>

    }
}

let mapStateToProps = (state) => {
    return {
        vacancyData: state.employeePage.vacancyData,
        oneVacancy: state.employeePage.oneVacancy,
        count: state.employeePage.count,
        pageSize: state.employeePage.pageSize,
        currentPage: state.employeePage.currentPage,
        isFetching: state.employeePage.isFetching,
        filterMode: state.employeePage.filterMode,
        filter: state.employeePage.filter

    }
}

export default compose(
    connect(mapStateToProps,
        {follow, unFollow, setCurrentPage, toggleIsFetching, setOneVacancy, getVacancy,getFilterVacancy})
)(ListContainer);






