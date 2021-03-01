import {jobsAPI, loginAPI, vacancyAPI} from "../api/api";
import {toggleIsFetching, toggleIsLoginProgress} from "./auth-reducer";
import {Redirect} from "react-router-dom";
import React from "react";

const ADD_VACANCY = 'ADD-VACANCY';
const ADD_VACANCY_E = 'ADD-VACANCY-EMPLOYEE';
const UPDATE_NEW_COMPANY_TEXT = 'UPDATE-NEW-COMPANY-TEXT';
const GET_TEXT = "GET-TEXT";
const GET_PROFESSIONS = "GET_PROFESSIONS";
const GET_SPECIALISATIONS = "GET_SPECIALISATIONS";
const CHANGE_PROFESSION = "CHANGE_PROFESSION";
const IS_VACANCY_CREATED = "IS_VACANCY_CREATED";


let initialState = {

    oneProfession: null,
    professions: [],
    specialisations: [],
    isVacancyCreated: false
}

const employerReducer = (state = initialState, action) => {

    switch (action.type) {

        case GET_PROFESSIONS:
            return {
                ...state,
                professions: [
                    ...action.data.values
                ],
            };
        case GET_SPECIALISATIONS:
            return {
                ...state,
                specialisations: [
                    ...action.data.values
                ],
            };
        case IS_VACANCY_CREATED:
            return {
                ...state,
                isVacancyCreated: action.data
                ,
            };
        case CHANGE_PROFESSION:
            return {
                ...state,
                oneProfession: action.data
            };
        default:
            return state;
    }
}

export const changeOneProfession = (data) => {
    return {
        type: CHANGE_PROFESSION,
        data
    }
}
export const setIsVacancyCreated = (data) => {
    return {
        type: IS_VACANCY_CREATED,
        data
    }
}

export const jobsFormSpecialisation = (data) => {
    return {
        type: GET_SPECIALISATIONS,
        data
    }
}
export const jobsFormProfessions = (data) => {
    return {
        type: GET_PROFESSIONS,
        data
    }
}

export const getJobs = (type, profession) => (dispatch) => {
    debugger
    dispatch(toggleIsFetching(true));
    if (type === "professions") {
        jobsAPI.getProfessions()
            .then(data => {
                dispatch(jobsFormProfessions(data))
                dispatch(toggleIsFetching(false));
            })
    } else {
        if (profession){
            jobsAPI.getSpecialisations(profession)
                .then(data => {
                    dispatch(jobsFormSpecialisation(data))
                    dispatch(toggleIsFetching(false));
                })
        } else {
            dispatch(toggleIsFetching(false));
        }
        debugger

    }

}

export const createNewVacancy = (userId,data) => (dispatch) => {
    debugger
    dispatch(toggleIsFetching(true));

    vacancyAPI.newVacancy(userId,data)
        .then(data => {
            dispatch(toggleIsFetching(false));
        })
}



export default employerReducer;