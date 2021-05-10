import {loginAPI, vacancyAPI} from "../api/api";
import {setCount, setCurrentPage, setVacancy} from "./employee-reducer";

const SET_USER_DATA = 'SET_USER_DATA';
const SIGN_IN = 'SIGN_IN';
const LOG_OUT = 'LOG_OUT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const EMPLOYER_SIGN_IN = "EMPLOYER_SIGN_IN";
const TOGGLE_IS_LOGIN_PROGRESS = 'TOGGLE_IS_LOGIN_PROGRESS';
const SET_MESSAGE = 'SET_MESSAGE';


let initialState = {

    userId: null,
    email: null,
    login: null,
    password: null,
    isAuth: false,
    token: null,
    isFetching: false,
    loginInProgress: false,
    type: null,
    message: null
}

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            };
        case SET_MESSAGE:
            return {
                ...state,
                message: action.data
            };

        case SIGN_IN:
            return {
                ...state,
                userId: action.data.userId,
                login: action.data.login,
                email: action.data.email,
                token: action.data.token,
                type: action.data.type,
                isAuth: true
            };
        case LOG_OUT:
            return {
                ...state,
                userId: null,
                login: null,
                email: null,
                token: null,
                type: null,
                isAuth: false
            };
        case EMPLOYER_SIGN_IN:
            return {
                ...state,
                userId: action.data.userId,
                login: action.data.login,
                email: action.data.email,
                token: action.data.token,
                type: "employer",
                isAuth: true
            };
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_IS_LOGIN_PROGRESS:
            return {
                ...state,
                loginInProgress: action.isFetching
            }
        default:
            return state;
    }
}

export const SetAuthUserData = (userId, email, login, token) => {
    return {
        type: SET_USER_DATA,
        data: {
            userId,
            email,
            login,
            token
        }
    }
}
export const setMessage = (data) => {
    return {
        type: SET_MESSAGE,
        data
    }
}

export const loginForm = (type, userId, email, login, token) => {
    return {
        type: SIGN_IN,
        data: {
            type,
            userId,
            email,
            login,
            token
        }
    }
}

export const toggleIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    }
}
export const toggleIsLoginProgress = (isFetching) => {
    return {
        type: TOGGLE_IS_LOGIN_PROGRESS,
        isFetching
    }
}
export const logOut = () => {
    return {
        type: LOG_OUT
    }
}

export const signIn = (type, login, password) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(toggleIsLoginProgress(true));
    loginAPI.singIn(type, login, password)
        .then(data => {
            switch (data) {
                case 401:
                    dispatch(setMessage("Аккаунт с таким логином не найден"))
                    break

                case 402:
                    dispatch(setMessage("Пароль не верный"))
                    break

                default:
                    let {userId, email, login, token} = data.values;
                    dispatch(setMessage(null))
                    dispatch(loginForm(type, userId, email, login, token));
                    break

            }
            dispatch(toggleIsFetching(false));
            dispatch(toggleIsLoginProgress(false))
        })
        /*.catch(err => {
            debugger
            dispatch(setMessage(err))
            dispatch(toggleIsFetching(false));
            dispatch(toggleIsLoginProgress(false))
        })*/
}

export const signUp = (type, data) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(toggleIsLoginProgress(true));
    loginAPI.singUp(type, data)
        .then(data => {
            dispatch(toggleIsFetching(false));
            dispatch(toggleIsLoginProgress(false))
        })
}

export const me = (token) => (dispatch) => {
    loginAPI.me(token)
        .then(data => {
            if (data.values.code === 0) {
                let {userId, login, email, token} = data.values;
                dispatch(SetAuthUserData(userId, email, login, token));
            }
        })
}


export default authReducer;