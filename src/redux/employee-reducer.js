import {cityAPI, experienceAPI, feedbackAPI, messagesAPI, sheduleAPI, typeVacancyAPI, vacancyAPI} from "../api/api";

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
const SET_IS_RESPONDED = 'SET_IS_RESPONDED';
const SET_IS_VIEW_FEEDBACK = 'SET_IS_VIEW_FEEDBACK';
const SET_FEEDBACKS = 'SET_FEEDBACKS';
const SET_CITIES = 'SET_CITIES';
const SET_SHEDULES = 'SET_SHEDULES';
const SET_EXPERIENCES = 'SET_EXPERIENCES';
const SET_TYPES_VACANCY = 'SET_TYPES_VACANCY';
const SET_FAVORITE_VACANCY = 'SET_FAVORITE_VACANCY';
const SET_COUNT_FAVORITE_VACANCY = 'SET_COUNT_FAVORITE_VACANCY';

let initialState = {
    vacancyData: [],
    oneVacancy: [],
    count: 0,
    pageSize: 5,
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
    },
    isResponded: false,
    isViewFeedback: false,
    feedbacks: [],
    cities: [],
    shedules: [],
    experiences: [],
    typesVacancy: [],
    favoriteVacancy: [],
    countFavoriteVacancy: 1,
    vacancyIsFavorite: false,
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
        case SET_IS_VIEW_FEEDBACK:
            return {
                ...state,
                isViewFeedback: action.data
            };
        case SET_FEEDBACK_MODE:
            return {
                ...state,
                feedbackMode: action.data

            };
        case SET_IS_RESPONDED:
            return {
                ...state,
                isResponded: action.data

            };
        case SET_FEEDBACK_SEND_MODE:
            return {
                ...state,
                feedbackSendMode: action.data

            };
        case SET_FEEDBACKS:
            return {
                ...state,
                feedbacks: action.data

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
            return {
                ...state,
                oneVacancy: action.vacancyData,
                vacancyIsFavorite: action.vacancyIsFavorite
            }
        case SET_CITIES:
            return {
                ...state,
                cities: action.data
            }
        case SET_SHEDULES:
            return {
                ...state,
                shedules: action.data
            }
        case SET_EXPERIENCES:
            return {
                ...state,
                experiences: action.data
            }
        case SET_TYPES_VACANCY:
            return {
                ...state,
                typesVacancy: action.data
            }
        case SET_FAVORITE_VACANCY:
            return {
                ...state,
                favoriteVacancy: action.data
            }
        case SET_COUNT_FAVORITE_VACANCY:
            return {
                ...state,
                countFavoriteVacancy: action.count.map(c => c.Count)
            }
        default:
            return state;
    }
}

export const setFeedbacks = (data) => {
    return {
        type: SET_FEEDBACKS,
        data
    }
}
export const setFeedbackMode = (data) => {
    return {
        type: SET_FEEDBACK_MODE,
        data
    }
}
export const setIsResponded = (data) => {
    return {
        type: SET_IS_RESPONDED,
        data
    }
}
export const setIsViewFeedback = (data) => {
    return {
        type: SET_IS_VIEW_FEEDBACK,
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
export const setCities = (data) => {
    return {
        type: SET_CITIES,
        data
    }
}
export const setExperience = (data) => {
    return {
        type: SET_EXPERIENCES,
        data
    }
}
export const setShedules = (data) => {
    return {
        type: SET_SHEDULES,
        data
    }
}
export const setTypesVacancy = (data) => {
    return {
        type: SET_TYPES_VACANCY,
        data
    }
}
export const setOneVacancy = (vacancyData,favoriteVacancy) => {
    let vacancyIsFavorite = false
    vacancyData.map(v=>{
        favoriteVacancy.map(fv=>{
            if (v.idFind_Employer === fv.idVacancy){
                vacancyIsFavorite = true
            }
        })
    })
    return {
        type: SET_ONE_VACANCY,
        vacancyData,
        vacancyIsFavorite
    }
}
export const setFavoriteVacancy = (data) => {
    return {
        type: SET_FAVORITE_VACANCY,
        data
    }
}
export const setCountFavoriteVacancy = (count) => {
    return {
        type: SET_COUNT_FAVORITE_VACANCY,
        count
    }
}

export const getVacancy = (currentPage, pageSize, type) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(currentPage));
    vacancyAPI.getVacancy(currentPage, pageSize, type)
        .then(data => {
            dispatch(setVacancy(data.values));
            dispatch(setCount(data.count));
            dispatch(toggleIsFetching(false));
        })
}
export const sendFeedbackEmployee = (data,token) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    feedbackAPI.sendFeedbackEmployee(data,token)
        .then(data => {
            dispatch(toggleIsFetching(false));
        })
}
export const sendFeedbackEmployer = (data,token) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    feedbackAPI.sendFeedbackEmployer(data,token)
        .then(data => {
            dispatch(toggleIsFetching(false));
        })
}
export const getFilterVacancy = (data, currentPage, pageSize, type) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(currentPage));
    vacancyAPI.getFilterVacancy(data, currentPage, pageSize, type)
        .then(data => {
            debugger
            if (data === 404) {
                let count = [
                    {Count: 1}
                ]
                dispatch(setVacancy(null));
                dispatch(setCount(count));
            } else {
                dispatch(setVacancy(data.values));
                dispatch(setCount(data.count));

            }
            dispatch(toggleIsFetching(false));

        })
        .catch(dispatch(toggleIsFetching(false)))
}

export const respondVacancy = (idVacancy, userId,token) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    vacancyAPI.respondVacancy(idVacancy, userId,token)
        .then(data => {
            dispatch(toggleIsFetching(false));
        })
        .catch(()=>{
            dispatch(toggleIsFetching(false));
        })
}

export const getFeedbackEmployee = (id) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    feedbackAPI.getFeedbackEmployee(id)
        .then(data => {
            debugger
            switch (data) {
                case 404:
                    dispatch(setFeedbacks(false))
                    break
                default:
                    dispatch(setFeedbacks(data.values))
            }

            dispatch(setIsViewFeedback(true))
            dispatch(toggleIsFetching(false));
        })
        .catch(data => {
            debugger
            dispatch(setFeedbacks(null))
            dispatch(setIsViewFeedback(true))
            dispatch(toggleIsFetching(false));
    })
}
export const getFeedbackEmployer = (id) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    feedbackAPI.getFeedbackEmployer(id)
        .then(data => {
            dispatch(setFeedbacks(data.values))
            dispatch(setIsViewFeedback(true))
            dispatch(toggleIsFetching(false));
        })
}
export const getCities = () => (dispatch) => {
    dispatch(toggleIsFetching(true));
    cityAPI.getCities()
        .then(data => {
            dispatch(setCities(data.values))
            dispatch(toggleIsFetching(false));
        })
}
export const getExperiences = () => (dispatch) => {
    dispatch(toggleIsFetching(true));
    experienceAPI.getExperiences()
        .then(data => {
            dispatch(setExperience(data.values))
            dispatch(toggleIsFetching(false));
        })
}
export const getShedules = () => (dispatch) => {
    dispatch(toggleIsFetching(true));
    sheduleAPI.getShedules()
        .then(data => {
            dispatch(setShedules(data.values))
            dispatch(toggleIsFetching(false));
        })
}
export const getTypesVacancy = () => (dispatch) => {
    dispatch(toggleIsFetching(true));
    typeVacancyAPI.getTypesVacancy()
        .then(data => {
            dispatch(setTypesVacancy(data.values))
            dispatch(toggleIsFetching(false));
        })
}
export const getFavoriteVacancy = (idEmployer,token) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    vacancyAPI.getFavoriteVacancy(idEmployer,token)
        .then(data => {
            dispatch(setFavoriteVacancy(data.values))
            dispatch(setCountFavoriteVacancy(data.count))

            dispatch(toggleIsFetching(false));
        })
}
export const addFavoriteVacancy = (idVacancy, idEmployer,token) => (dispatch) => {
    let data = {
        idVacancy,
        idEmployer
    }
    dispatch(toggleIsFetching(true));
    vacancyAPI.addFavoriteVacancy(data,token)
        .then(data => {
            let count = [
                {Count: 1}
            ]

            dispatch(setCountFavoriteVacancy(count))
            dispatch(setFavoriteVacancy(data.values))
            dispatch(toggleIsFetching(false));
        })
}
export const deleteFavoriteVacancy = (idVacancy, idEmployer,token) => (dispatch) => {
    let data = {
        idVacancy,
        idEmployer
    }
    debugger
    dispatch(toggleIsFetching(true));
    vacancyAPI.deleteFavoriteVacancy(data,token)
        .then(data => {
            dispatch(setFavoriteVacancy(data.values))
            dispatch(toggleIsFetching(false));
        })
}


export default employeeReducer;