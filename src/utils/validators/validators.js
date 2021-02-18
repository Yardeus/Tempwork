import {changeOneProfession, getJobs} from "../../redux/employer-reducer";

export const required = value => {
    if (value) {
        return undefined
    }
    return "Field is required!"
}

//export const maxLengthCreator

export const maxLength = (number) => value => {
    if (value && value.length > number) {
        return `Max length is ${number} symbols`
    }
    return undefined
}

