import {adminAPI, vacancyAPI} from "../api/api";
import {toggleIsFetching} from "./employee-reducer";

const SET_ACTION_TYPE = "SET_ACTION_TYPE"
const SET_EMPLOYEE_COUNT = "SET_EMPLOYEE_COUNT"
const SET_EMPLOYER_COUNT = "SET_EMPLOYER_COUNT"
const SET_EMPLOYEE_LIST = "SET_EMPLOYEE_LIST"
const SET_EMPLOYER_LIST = "SET_EMPLOYER_LIST"
const SET_EMPLOYER_CURRENT_PAGE = "SET_EMPLOYER_CURRENT_PAGE"
const SET_EMPLOYEE_CURRENT_PAGE = "SET_EMPLOYEE_CURRENT_PAGE"

let initialState = {
    employerList: [],
    employeeList: [],
    actionType: null,
    employerCurrentPage: 1,
    employeeCurrentPage: 1,
    pageSize: 5,
    count: 0,
    banUserId: null,


}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_ACTION_TYPE:
            return {
                ...state,
                actionType: action.data
            };
        case SET_EMPLOYER_COUNT:
            debugger
            return {
                ...state,
                employerCount: action.count.map(c => c.Count)
            }
        case SET_EMPLOYEE_COUNT:
            debugger
            return {
                ...state,
                employeeCount: action.count.map(c => c.Count)
            }
        case SET_EMPLOYEE_LIST:
            debugger
            return {
                ...state,
                employeeList: action.data
            }
        case SET_EMPLOYER_LIST:
            debugger
            return {
                ...state,
                employerList: action.data
            }
        case SET_EMPLOYER_CURRENT_PAGE:
            return {
                ...state,
                employerCurrentPage: action.currentPage
            }
        case SET_EMPLOYEE_CURRENT_PAGE:
            return {
                ...state,
                employeeCurrentPage: action.currentPage
            }

        default:
            return state;
    }
}

export const SetActionType = (data) => {
    return {
        type: SET_ACTION_TYPE,
        data
    }
}
export const setEmployerCount = (count) => {
    return {
        type: SET_EMPLOYER_COUNT,
        count
    }
}
export const setEmployeeCount = (count) => {
    return {
        type: SET_EMPLOYEE_COUNT,
        count
    }
}

export const setEmployerList = (data) => {
    return {
        type: SET_EMPLOYER_LIST,
        data
    }
}
export const setEmployeeList = (data) => {
    return {
        type: SET_EMPLOYEE_LIST,
        data
    }
}
export const setEmployeeCurrentPage = (currentPage) => {
    return {
        type: SET_EMPLOYEE_CURRENT_PAGE,
        currentPage
    }
}
export const setEmployerCurrentPage = (currentPage) => {
    return {
        type: SET_EMPLOYER_CURRENT_PAGE,
        currentPage
    }
}

export const getEmployerList = (currentPage, pageSize) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setEmployerCurrentPage(currentPage));
    adminAPI.getEmployerList(currentPage, pageSize)
        .then(data => {
            debugger
            dispatch(setEmployerList(data.values));
            dispatch(setEmployerCount(data.count));
            dispatch(toggleIsFetching(false));
        })
}
export const getEmployeeList = (currentPage, pageSize) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setEmployeeCurrentPage(currentPage));
    adminAPI.getEmployeeList(currentPage, pageSize)
        .then(data => {
            debugger
            dispatch(setEmployeeList(data.values));
            dispatch(setEmployeeCount(data.count));
            dispatch(toggleIsFetching(false));
        })
}

export const banEmployer = (idUser, currentPage, pageSize) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setEmployerCurrentPage(currentPage));
    adminAPI.banEmployer(idUser, currentPage, pageSize)
        .then(data => {
            debugger
            dispatch(setEmployerList(data.values));
            dispatch(toggleIsFetching(false));
        })
}
export const banEmployee = (idUser, currentPage, pageSize) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setEmployerCurrentPage(currentPage));
    adminAPI.banEmployee(idUser, currentPage, pageSize)
        .then(data => {
            debugger
            dispatch(setEmployeeList(data.values));
            dispatch(toggleIsFetching(false));
        })
}

export default adminReducer;