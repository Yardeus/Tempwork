import {feedbackAPI, vacancyAPI} from "../api/api";

const ADD_VACANCY_E = 'ADD-VACANCY-EMPLOYEE';
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_VACANCY_DATA = 'SET_VACANCY_DATA';
const SET_COUNT_DATA = 'SET_COUNT_DATA';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const FILTER_EDIT = 'FILTER_EDIT';
const UPDATE_FILTER = 'UPDATE_FILTER';
const SET_ONE_VACANCY = 'SET_ONE_VACANCY';
const SET_FEEDBACK_MODE = 'SET_FEEDBACK_MODE';
const SET_FEEDBACK_SEND_MODE = 'SET_FEEDBACK_SEND_MODE';

let initialState = {
    vacancyData: [],
    oneVacancy: [],
    count: 0,
    pageSize: 3,
    feedbackMode: null,
    feedbackSendMode: false,
    currentPage: 1,
    isFetching: false,
    filterMode: false,
    filter: {
        startDate: null,
        endDate: null,
        city: null,
        price: null,
        idJobs: null,
        startTime: null,
        endTime: null,
    }
}


const employeeReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_VACANCY_E:
            return {
                ...state,
                vacancyData: [...state.vacancyData, {
                    id: action.updateId,
                    company: action.updateCompany,
                    date: action.updateDate,
                    description: action.updateDescription,
                    price: action.updatePrice
                }]
            };
        case FOLLOW:
            return {
                ...state,
                vacancyData: state.vacancyData.map(v => {
                    if (v.id === action.vacancyId) {
                        return {...v, followed: true};
                    }
                    return v;
                })
            };
        case SET_FEEDBACK_MODE:
            return {
                ...state,
                feedbackMode: action.data

            };
        case SET_FEEDBACK_SEND_MODE:
            return {
                ...state,
                feedbackSendMode: action.data

            };
        case UNFOLLOW:
            return {
                ...state,
                vacancyData: state.vacancyData.map(v => {
                    if (v.id === action.vacancyId) {
                        return {...v, followed: false};
                    }
                    return v;
                })
            };
        case SET_VACANCY_DATA:
            return {
                ...state,
                vacancyData: action.vacancyData
            }
        case SET_COUNT_DATA:
            return {
                ...state,
                count: action.count.map(c => c.Count)

                //action.count.Count[0]
            }
        case UPDATE_FILTER:
            return {
                ...state,
                filter: action.data


            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case FILTER_EDIT:
            return {
                ...state,
                filterMode: action.isFetching
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_ONE_VACANCY:
            debugger
            return {
                ...state,
                oneVacancy: action.vacancyData
            }
        default:
            return state;
    }
}

export const follow = (vacancyId) => {
    return {
        type: FOLLOW,
        vacancyId
    }
}
export const setFeedbackMode = (data) => {
    return {
        type: SET_FEEDBACK_MODE,
        data
    }
}
export const setFeedbackSendMode = (data) => {
    return {
        type: SET_FEEDBACK_SEND_MODE,
        data
    }
}
export const unFollow = (vacancyId) => {
    return {
        type: UNFOLLOW,
        vacancyId
    }
}
export const setVacancy = (vacancyData) => {
    return {
        type: SET_VACANCY_DATA,
        vacancyData
    }
}
export const setCount = (count) => {
    return {
        type: SET_COUNT_DATA,
        count
    }
}
export const setCurrentPage = (currentPage) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    }
}
export const toggleIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    }
}
export const filterModeIsFetching = (isFetching) => {
    return {
        type: FILTER_EDIT,
        isFetching
    }
}
export const updateFilter = (data) => {
    return {
        type: UPDATE_FILTER,
        data
    }
}
export const setOneVacancy = (vacancyData) => {
    return {
        type: SET_ONE_VACANCY,
        vacancyData
    }
}

export const getVacancy = (currentPage, pageSize) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(currentPage));
    vacancyAPI.getVacancy(currentPage, pageSize)
        .then(data => {
            dispatch(setVacancy(data.values));
            dispatch(setCount(data.count));
            dispatch(toggleIsFetching(false));
        })
}
export const sendFeedbackEmployee = (data) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    feedbackAPI.sendFeedbackEmployee(data)
        .then(data => {
            dispatch(toggleIsFetching(false));
        })
}
export const sendFeedbackEmployer = (data) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    feedbackAPI.sendFeedbackEmployer(data)
        .then(data => {
            dispatch(toggleIsFetching(false));
        })
}
export const getFilterVacancy = (data, currentPage, pageSize) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(currentPage));
    vacancyAPI.getFilterVacancy(data, currentPage, pageSize)
        .then(data => {
            debugger
            dispatch(setVacancy(data.values));
            dispatch(setCount(data.count));
            dispatch(toggleIsFetching(false));
        })
}

export const respondVacancy = (idVacancy, userId) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    vacancyAPI.respondVacancy(idVacancy, userId)
        .then(data => {
            dispatch(toggleIsFetching(false));
        })
}


export default employeeReducer;