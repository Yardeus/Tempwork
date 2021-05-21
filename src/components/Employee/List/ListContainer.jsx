import React from 'react';
import {connect} from 'react-redux';
import {
    getFavoriteVacancy,
    getFilterVacancy, getVacancy,
    setCurrentPage, setOneVacancy,
    toggleIsFetching
} from '../../../redux/employee-reducer';
import List from './List';
import Preloader from "../../common/preloader";
import {compose} from "redux";


class ListContainer extends React.Component {

    componentDidMount() {
        this.props.filterMode ? this.props.getFilterVacancy(this.props.filter,this.props.currentPage, this.props.pageSize,this.props.type) : this.props.getVacancy(this.props.currentPage, this.props.pageSize,this.props.type)
        if (this.props.isAuth && this.props.type==="employer") {
            this.props.getFavoriteVacancy(this.props.userId,this.props.token)
        }
    }


    onPageChanged = (pageNumber) => {
        this.props.filterMode ? this.props.getFilterVacancy(this.props.filter,pageNumber, this.props.pageSize,this.props.type) : this.props.getVacancy(pageNumber, this.props.pageSize,this.props.type);
    }


    render() {

        return <>
            {this.props.isFetching ? <Preloader/> : null}
            {this.props.vacancyData ?
                <List {...this.props} onPageChanged={this.onPageChanged}

                />
                : <div>Не найдено вакансий по заданному фильтру</div>
            }
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
        filter: state.employeePage.filter,
        type: state.auth.type,
        userId: state.auth.userId,
        isAuth: state.auth.isAuth,
        favoriteVacancy: state.employeePage.favoriteVacancy,
        countFavoriteVacancy: state.employeePage.countFavoriteVacancy,
        token: state.auth.token

    }
}

export default compose(
    connect(mapStateToProps,
        {setCurrentPage, toggleIsFetching, setOneVacancy, getVacancy,getFilterVacancy,getFavoriteVacancy})
)(ListContainer);






