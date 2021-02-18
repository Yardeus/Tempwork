import React from "react";
import s from './Employer.module.css'
import {Field, reduxForm} from "redux-form";
import { maxLength, required} from "../../utils/validators/validators";
import {Input} from "../common/formsControl";
import {NavLink} from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem'
import Select from "@material-ui/core/Select";
import {changeOneProfession, getJobs} from "../../redux/employer-reducer";


const maxLength10 = maxLength(10);



const EmployerForm = (props) => {

    const  { handleSubmit} = props;
    return (
        <form onSubmit={handleSubmit}>

            <div>
                <Field name="profession" component="select" onChange={(event) => {
                    props.getSpecialisations(event.target.value)
                }}>

                    {props.professions && props.professions.map(p => <option value={p.Profession}>{p.Profession}</option>)}

                </Field>
            </div>
            <div>
                <Field name="specialisations" component="select">
                    {props.specialisations && props.specialisations.map(p => <option value={p.idJobs}>{p.Specialisation}</option>)}
                </Field>
            </div>

            <div>
                <Field placeholder={"Начальная дата"} name={"startDate"} component={Input} validate={[required,maxLength10]}/>
            </div>

            <div>
                <Field placeholder={"Конечная дата"} name={"endDate"} component={Input} validate={[required,maxLength10]}/>
            </div>
            <div>
                <Field placeholder={"Оплата"} name={"price"} component={Input} validate={[required,maxLength10]}/>
            </div>
            <div>
                <Field placeholder={"Описание"} name={"description"} component={Input} validate={[required,maxLength10]}/>
            </div>
            <div>
                <Field placeholder={"Город"} name={"city"} component={Input} validate={[required,maxLength10]}/>
            </div>
            <div>
                <Field placeholder={"Адрес"} name={"adress"} component={Input} validate={[required,maxLength10]}/>
            </div>
            <div>
                <Field placeholder={"Количество человек"} name={"count"} component={Input} validate={[required,maxLength10]}/>
            </div>
            <div>
                <Field placeholder={"Время начала рабочего дня"} name={"startTime"} component={Input} validate={[required,maxLength10]}/>
            </div>
            <div>
                <Field placeholder={"Время конца рабочего дня"} name={"endTime"} component={Input} validate={[required,maxLength10]}/>
            </div>
            <div>
                <button type="submit" disabled={props.loginInProgress}>Создать</button>
            </div>
        </form>
    )
}

const EmployerReduxForm = reduxForm({form: 'createVacancy'})(EmployerForm)

const Employer = (props) => {
    const onSubmit = (formData) => {
        //disabled = {props.loginInProgress}
        console.log(props.userId)
        console.log(formData)
        props.createNewVacancy(props.userId,formData)
            //props.EmployeeSignIn(formData.login, formData.password, formData.type)
    }

    return (
        <div className={s.login}>
            <h1>Создание вакансии</h1>
            <EmployerReduxForm onSubmit={onSubmit} userId={props.userId} loginInProgress={props.loginInProgress} professions={props.professions}
                               oneProfession={props.oneProfession} getSpecialisations={props.getSpecialisations}
                               specialisations={props.specialisations} createNewVacancy={props.createNewVacancy}/>

        </div>
    )
}
export default Employer;