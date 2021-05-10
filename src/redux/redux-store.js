import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import employeeReducer from "./employee-reducer";
import employerReducer from "./employer-reducer";
import authReducer from "./auth-reducer";
import {reducer as formReducer} from 'redux-form'
import thunkMiddleware from 'redux-thunk'
import profileReducer from "./profile-reducer";
import adminReducer from "./admin-reducer";

let reducers = combineReducers({
    employeePage: employeeReducer,
    employerPage: employerReducer,
    auth: authReducer,
    form: formReducer,
    profilePage: profileReducer,
    admin: adminReducer
    });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunkMiddleware)
));

/*
let store = createStore(reducers, applyMiddleware(thunkMiddleware));*/

window.__store__ = store;


export default store;


