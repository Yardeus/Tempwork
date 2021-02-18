import {agreementAPI, feedbackAPI, loginAPI, profileAPI, vacancyAPI} from "../api/api";
import {setCount, setCurrentPage, setVacancy} from "./employee-reducer";
import {loginForm, toggleIsFetching, toggleIsLoginProgress} from "./auth-reducer";

const SET_USER_DATA = 'SET_USER_DATA';
const EMPLOYEE_PROFILE = 'EMPLOYEE_PROFILE';
const MY_VACANCY = 'MY_VACANCY';
const CHANGE_EDIT_MODE = "CHANGE_EDIT_MODE";
const ONE_VACANCY = 'ONE_VACANCY';
const UPDATE_MY_VACANCY = 'UPDATE_MY_VACANCY';
const GET_RESPONDED_FROM_MY_VACANCY = 'GET_RESPONDED_FROM_MY_VACANCY';
const CURRENT_RESPONDED_VACANCY = 'CURRENT_RESPONDED_VACANCY';
const PUSH_STATUS_RESPONDED_FROM_MY_VACANCY = 'PUSH_STATUS_RESPONDED_FROM_MY_VACANCY';
const SET_FEEDBACK = 'SET_FEEDBACK';
const SET_EDIT_PROFILE_MODE = 'SET_EDIT_PROFILE_MODE';


let initialState = {
    isFetching: false,
    profileData: [],
    myVacancy: [],
    editVacancy: null,
    responded: [],
    currentResponded: null,
    editProfileMode: false,
    feedback: []

}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case EMPLOYEE_PROFILE:
            debugger
            return {
                ...state,
                profileData: action.data.map(p => p)
                //profileData: [...action.data]
            }
        case MY_VACANCY:
            return {
                ...state,
                myVacancy: action.data
            }
        case SET_EDIT_PROFILE_MODE:
            return {
                ...state,
                editProfileMode: action.data
            }
        case UPDATE_MY_VACANCY:
            debugger
            return {
                ...state,
                editVacancy: [action.data]
            }
        case SET_FEEDBACK:
            debugger
            return {
                ...state,
                feedback: action.data
            }
        case ONE_VACANCY:
            return {
                ...state,
                editVacancy: [...action.data]
            }
        case CHANGE_EDIT_MODE:
            return {
                ...state,
                editVacancy: action.status,
                editIdVacancy: action.idVacancy
            }
        case GET_RESPONDED_FROM_MY_VACANCY:
            return {
                ...state,
                responded: action.data
            }
        case PUSH_STATUS_RESPONDED_FROM_MY_VACANCY:
            return {
                ...state,
                responded: [state.responded, ...action.data]
            }
        case CURRENT_RESPONDED_VACANCY:
            return {
                ...state,
                currentResponded: action.vacancyId
            }

        default:
            return state;
    }
}

export const profileFormForEmployee = (data) => {
    return {
        type: EMPLOYEE_PROFILE,
        data

    }
}

export const FormMyVacancy = (data) => {
    return {
        type: MY_VACANCY,
        data

    }
}
export const setEditProfileMode = (data) => {
    return {
        type: SET_EDIT_PROFILE_MODE,
        data

    }
}
export const SetFeedback = (data) => {
    return {
        type: SET_FEEDBACK,
        data

    }
}

export const FormOneVacancy = (data) => {
    return {
        type: ONE_VACANCY,
        data

    }
}
export const PushStatusResponded = (data) => {
    return {
        type: PUSH_STATUS_RESPONDED_FROM_MY_VACANCY,
        data

    }
}
export const SetCurrentRespondVacancyId = (vacancyId) => {
    return {
        type: CURRENT_RESPONDED_VACANCY,
        vacancyId

    }
}
export const FormRespondedMyVacancy = (data) => {
    return {
        type: GET_RESPONDED_FROM_MY_VACANCY,
        data

    }
}
export const UpdateOneVacancy = (data) => {

    debugger
    return {
        type: UPDATE_MY_VACANCY,
        data

    }
}

export const editModeChange = (status, idVacancy) => {
    return {
        type: CHANGE_EDIT_MODE,
        status,
        idVacancy

    }
}


export const getData = (type, id_user) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    profileAPI.getProfile(type, id_user)
        .then(data => {
            dispatch(profileFormForEmployee(data.values));
            dispatch(toggleIsFetching(false));
        })
}
export const updateData = (type, data) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    profileAPI.updateData(type, data)
        .then(data => {
            dispatch(profileFormForEmployee(data.values));
            dispatch(toggleIsFetching(false));

        })
}
export const getMyVacancy = (id_user, type) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    profileAPI.myVacancy(id_user, type)
        .then(data => {
            dispatch(FormMyVacancy(data.values));
            dispatch(toggleIsFetching(false));
        })
}

export const closeMyVacancy = (idFind_Employer, id_user) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    vacancyAPI.closeVacancy(idFind_Employer, id_user)
        .then(data => {
                dispatch(FormMyVacancy(data.values));
                dispatch(toggleIsFetching(false));
            }
        )
}
export const getRespondedFromMyVacancy = (idFind_Employer) => (dispatch) => {
    debugger
    dispatch(toggleIsFetching(true));
    vacancyAPI.getEmployerListFromVacancyId(idFind_Employer)
        .then(data => {
                dispatch(FormRespondedMyVacancy(data.values));
                agreementAPI.getStatus(idFind_Employer, data.values.idEmployer)
                    .then(data => {
                            dispatch(PushStatusResponded(data.values));
                            dispatch(toggleIsFetching(false));
                        }
                    )
            }
        )
}
export const getWorkersFromMyVacancy = (idFind_Employer) => (dispatch) => {
    debugger
    dispatch(toggleIsFetching(true));
    vacancyAPI.getWorkersListFromVacancyId(idFind_Employer)
        .then(data => {
                dispatch(FormRespondedMyVacancy(data.values));
                dispatch(toggleIsFetching(false));

            }
        )
}

export const deleteMyVacancy = (idVacancy, id_user, type) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    profileAPI.deleteVacancy(idVacancy, id_user, type)
        .then(data => {
                dispatch(FormMyVacancy(data.values));
                dispatch(toggleIsFetching(false));
            }
        )
}
export const createAgreement = (data) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    agreementAPI.createAgreement(data)
        .then(data => {
                dispatch(toggleIsFetching(false));
            }
        )
}

export const updateDataMyVacancy = (newData) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    vacancyAPI.updateVacancy(newData)
        .then(data => {
                dispatch(UpdateOneVacancy(newData));
                dispatch(toggleIsFetching(false));
            }
        )
}

export const getOneVacancy = (vacancyId) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    profileAPI.myOneVacancy(vacancyId)
        .then(data => {
                dispatch(FormOneVacancy(data.values));
                dispatch(toggleIsFetching(false));
            }
        )
}
export const getFeedback = (type, id) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    if (type === "employee") {
        feedbackAPI.getFeedbackEmployee(id)
            .then(data => {
                    dispatch(SetFeedback(data.values));
                    dispatch(toggleIsFetching(false));
                }
            )
    } else if (type === "employer") {
        feedbackAPI.getFeedbackEmployer(id)
            .then(data => {
                    dispatch(SetFeedback(data.values));
                    dispatch(toggleIsFetching(false));
                }
            )
    }


}


export default profileReducer;