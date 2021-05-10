import {adminAPI, feedbackAPI, jobsAPI, vacancyAPI} from "../api/api";
import {getVacancy, setOneVacancy, toggleIsFetching} from "./employee-reducer";

const SET_ACTION_TYPE = "SET_ACTION_TYPE"
const SET_EMPLOYEE_COUNT = "SET_EMPLOYEE_COUNT"
const SET_EMPLOYER_COUNT = "SET_EMPLOYER_COUNT"
const SET_EMPLOYEE_LIST = "SET_EMPLOYEE_LIST"
const SET_EMPLOYER_LIST = "SET_EMPLOYER_LIST"
const SET_EMPLOYER_CURRENT_PAGE = "SET_EMPLOYER_CURRENT_PAGE"
const SET_EMPLOYEE_CURRENT_PAGE = "SET_EMPLOYEE_CURRENT_PAGE"
const SET_JOBS_LIST = "SET_JOBS_LIST"
const ADD_JOBS_MODE = "ADD_JOBS_MODE"
const SEND_JOBS_MODE = "SEND_JOBS_MODE"
const SET_FEEDBACK_LIST = "SET_FEEDBACK_LIST"
const IS_VACANCY_CLOSED = "IS_VACANCY_CLOSED"

let initialState = {
    employerList: [],
    employeeList: [],
    actionType: null,
    employerCurrentPage: 1,
    employeeCurrentPage: 1,
    pageSize: 5,
    count: 0,
    banUserId: null,
    jobs: [],
    addJobsMode: false,
    sendJobsMode: false,
    feedbackList: [],
    isVacancyClosed: false


}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_ACTION_TYPE:
            return {
                ...state,
                actionType: action.data
            };
        case SET_EMPLOYER_COUNT:
            return {
                ...state,
                employerCount: action.count.map(c => c.Count)
            }
        case SET_EMPLOYEE_COUNT:
            return {
                ...state,
                employeeCount: action.count.map(c => c.Count)
            }

        case ADD_JOBS_MODE:
            return {
                ...state,
                addJobsMode: action.data
            }
        case SEND_JOBS_MODE:
            return {
                ...state,
                sendJobsMode: action.data
            }
        case SET_EMPLOYEE_LIST:
            return {
                ...state,
                employeeList: action.data
            }
        case SET_EMPLOYER_LIST:
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
        case SET_JOBS_LIST:
            return {
                ...state,
                jobs: action.data
            }
        case SET_FEEDBACK_LIST:
            return {
                ...state,
                feedbackList: action.data
            }
        case IS_VACANCY_CLOSED:
            return {
                ...state,
                isVacancyClosed: action.data
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
export const setJobsList = (data) => {
    return {
        type: SET_JOBS_LIST,
        data
    }
}
export const setAddJobsMode = (data) => {
    return {
        type: ADD_JOBS_MODE,
        data
    }
}
export const setSendJobsMode = (data) => {
    return {
        type: SEND_JOBS_MODE,
        data
    }
}
export const setFeedbackList = (data) => {
    return {
        type: SET_FEEDBACK_LIST,
        data
    }
}
export const setIsVacancyClosed = (data) => {
    return {
        type: IS_VACANCY_CLOSED,
        data
    }
}

export const getEmployerList = (currentPage, pageSize) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setEmployerCurrentPage(currentPage));
    adminAPI.getEmployerList(currentPage, pageSize)
        .then(data => {
            dispatch(setEmployerList(data.values));
            dispatch(setEmployerCount(data.count));
            dispatch(toggleIsFetching(false));
        })
}
export const getAllJobs = () => (dispatch) => {
    dispatch(toggleIsFetching(true));
    jobsAPI.getAllJobs()
        .then(data => {
            dispatch(setJobsList(data.values));
            dispatch(toggleIsFetching(false));
        })
}
export const getEmployeeList = (currentPage, pageSize) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setEmployeeCurrentPage(currentPage));
    adminAPI.getEmployeeList(currentPage, pageSize)
        .then(data => {
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
            dispatch(setEmployerList(data.values));
            dispatch(toggleIsFetching(false));
        })
}
export const banEmployee = (idUser, currentPage, pageSize) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setEmployerCurrentPage(currentPage));
    adminAPI.banEmployee(idUser, currentPage, pageSize)
        .then(data => {
            dispatch(setEmployeeList(data.values));
            dispatch(toggleIsFetching(false));
        })
}
export const addJobs = (data) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    jobsAPI.addJobs(data)
        .then(data => {
            dispatch(setJobsList(data.values));
            dispatch(setAddJobsMode(false));
            dispatch(setSendJobsMode(true));
            dispatch(toggleIsFetching(false));
        })
}
export const deleteJobs = (data) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    jobsAPI.deleteJobs(data)
        .then(data => {
            dispatch(setJobsList(data.values));
            dispatch(toggleIsFetching(false));
        })
}
export const getFeedbacks = (type) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    feedbackAPI.getFeedbacks(type)
        .then(data => {
            dispatch(setFeedbackList(data.values));
            dispatch(toggleIsFetching(false));
        })
}
export const deleteFeedback = (type,id) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    feedbackAPI.deleteFeedback(type,id)
        .then(data => {
            dispatch(setFeedbackList(data.values));
            dispatch(toggleIsFetching(false));
        })
}
export const closeVacancyAdmin = (id) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    adminAPI.closeVacancy(id)
        .then(data => {
            dispatch(setOneVacancy(data.values))
            dispatch(toggleIsFetching(false))
        })
}

export default adminReducer;