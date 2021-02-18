import {applyMiddleware, combineReducers, createStore} from "redux";
import employeeReducer from "./employee-reducer";
import employerReducer from "./employer-reducer";
import authReducer from "./auth-reducer";
import {reducer as formReducer} from 'redux-form'
import thunkMiddleware from 'redux-thunk'
import profileReducer from "./profile-reducer";

let reducers = combineReducers({
    employeePage: employeeReducer,
    employerPage: employerReducer,
    auth: authReducer,
    form: formReducer,
    profilePage: profileReducer
    });

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;


export default store;


