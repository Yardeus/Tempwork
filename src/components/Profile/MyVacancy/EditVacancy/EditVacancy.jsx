import React from "react";

import {Field, reduxForm} from "redux-form";
import {maxLength, required} from "../../../../utils/validators/validators";
import {Input} from "../../../common/formsControl";
import moment from "moment";


const maxLength10 = maxLength(10);


const EditVacancyForm = (props) => {

    const {handleSubmit} = props;
    return <>
        {
            props.editVacancy.map(v =>
                <form onSubmit={handleSubmit}>

                    <div>
                        <Field placeholder={v.Price} name={"price"} component={Input}
                               validate={[maxLength10]}/>
                    </div>
                    <div>
                        <Field placeholder={v.Description} name={"description"} component={Input}
                               validate={[ maxLength10]}/>
                    </div>
                    <div>
                        <Field placeholder={v.Quantity} name={"count"} component={Input}
                               validate={[ maxLength10]}/>
                    </div>
                    <div>
                        <Field placeholder={moment(v.Start_Time,'hh:mm:ss').format('LT')} name={"startTime"} component={Input}
                               validate={[ maxLength10]}/>
                    </div>
                    <div>
                        <Field placeholder={moment(v.End_Time,'hh:mm:ss').format('LT')} name={"endTime"} component={Input}
                               validate={[ maxLength10]}/>
                    </div>
                    <div>
                        <button type="submit">Сохранить</button>
                    </div>

                </form>
            )
        }
    </>
}

const EmployerReduxForm = reduxForm({form: 'editVacancy'})(EditVacancyForm)

const EditVacancy = (props) => {
    const onSubmit = (formData) => {
        let data = {}
        props.editVacancy.map(v => {
            data.idFind_Employer = v.idFind_Employer
            if (!formData.price) {data.Price = v.Price} else {data.Price = formData.price}
            if (!formData.description) {data.Description = v.Description} else {data.Description = formData.description}
            if (!formData.count) {data.Quantity = v.Quantity} else {data.Quantity = formData.count}
            if (!formData.startTime) {data.Start_Time = v.Start_Time} else {data.Start_Time = formData.startTime}
            if (!formData.endTime) {data.End_Time = v.End_Time} else {data.End_Time = formData.endTime}
        })
        props.updateDataMyVacancy(data)
        console.log(data)
    }

    return (
        <div>
            <h1>Редактирование вакансии</h1>
            <EmployerReduxForm onSubmit={onSubmit} {...props} getSpecialisations={props.getSpecialisations}/>

        </div>
    )
}
export default EditVacancy;