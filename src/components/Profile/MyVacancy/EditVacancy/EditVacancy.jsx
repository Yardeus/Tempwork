import React from "react";

import {Field, reduxForm} from "redux-form";
import {Button, Input, renderTextField} from "../../../common/formsControl";
import moment from "moment";
import {format, length, numericality} from "redux-form-validators";
import {NavLink} from "react-router-dom";


class EditVacancyForm extends React.Component {

    render() {


        const {handleSubmit} = this.props;
        return <>
            {
                this.props.editVacancy.map(v =>
                    <form onSubmit={handleSubmit}>

                        <div>
                            <span>Оплата</span>
                            <Field placeholder={v.Price} name={"price"} component={Input}
                                   validate={[numericality({
                                       ">": 0,
                                       msg: "Цифра должна быть больше 0",
                                       allowBlank: true
                                   })]}/>
                        </div>
                        <div>
                            <span>Описание</span>
                            <Field placeholder={v.Description} name={"description"} component={Input}
                                   validate={[length({max: 500})]}/>
                        </div>
                        <div>
                            <span>Количество требуемых сотрудников</span>
                            <Field placeholder={v.Quantity} name={"count"} component={Input}
                                   validate={[numericality({
                                       ">": 0,
                                       "<": 10,
                                       msg: "Цифра должна быть больше 0 и меньше 10",
                                       allowBlank: true
                                   })]}/>
                        </div>
                        <div>
                            <span>Время начала рабочего дня</span>
                            <Field placeholder={moment(v.Start_Time, 'hh:mm:ss').format('LT')} name={"startTime"}
                                   component={Input}
                                   validate={[length({is: 5, msg: "Формат записи ЧЧ:ММ", allowBlank: true})]}/>
                        </div>
                        <div>
                            <span>Время окончания рабочего дня</span>
                            <Field placeholder={moment(v.End_Time, 'hh:mm:ss').format('LT')} name={"endTime"}
                                   component={Input}
                                   validate={[length({is: 5, msg: "Формат записи ЧЧ:ММ", allowBlank: true})]}/>
                        </div>
                        <div>
                            <Button type="submit">Сохранить</Button>
                        </div>
                        <div>
                            <NavLink to={"/my-vacancy"}>
                                <Button>Отменить</Button>
                            </NavLink>

                        </div>

                    </form>
                )
            }
        </>
    }
}

const EmployerReduxForm = reduxForm({form: 'editVacancy'})(EditVacancyForm)

const EditVacancy = (props) => {
    const onSubmit = (formData) => {
        let data = {}
        props.editVacancy.map(v => {
            data.idFind_Employer = v.idFind_Employer
            if (!formData.price) {
                data.Price = v.Price
            } else {
                data.Price = formData.price
            }
            if (!formData.description) {
                data.Description = v.Description
            } else {
                data.Description = formData.description
            }
            if (!formData.count) {
                data.Quantity = v.Quantity
            } else {
                data.Quantity = formData.count
            }
            if (!formData.startTime) {
                data.Start_Time = v.Start_Time
            } else {
                data.Start_Time = formData.startTime
            }
            if (!formData.endTime) {
                data.End_Time = v.End_Time
            } else {
                data.End_Time = formData.endTime
            }
        })
        props.updateDataMyVacancy(data,props.token)
    }

    return (
        <div>
            <h1>Редактирование вакансии</h1>
            <EmployerReduxForm onSubmit={onSubmit} {...props} getSpecialisations={props.getSpecialisations}/>

        </div>
    )
}
export default EditVacancy;