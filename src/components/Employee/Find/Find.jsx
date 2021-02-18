import React from "react";
import {Field, reduxForm} from "redux-form";
import {maxLength, required} from "../../../utils/validators/validators";
import {Input} from "../../common/formsControl";
import {getVacancy, updateFilter} from "../../../redux/employee-reducer";


const maxLength10 = maxLength(10);


const FindForm = (props) => {
    debugger
    const {handleSubmit} = props;
    return (
        <form onSubmit={handleSubmit}>

            <div>
                <Field name="profession" component="select" onChange={(event) => {
                    props.getSpecialisations(event.target.value)
                }}>
                    <option value={null}></option>
                    {props.professions && props.professions.map(p => <option
                        value={p.Profession}>{p.Profession}</option>)}

                </Field>
            </div>
            <div>
                <Field name="idJobs" component="select">
                    {props.specialisations && props.specialisations.map(p => <option
                        value={p.idJobs}>{p.Specialisation}</option>)}
                </Field>
            </div>

            <div>
                <Field placeholder={"Начальная дата"} name={"Start_Date"} component={Input}/>
            </div>

            <div>
                <Field placeholder={"Конечная дата"} name={"End_Date"} component={Input}/>
            </div>
            <div>
                <Field placeholder={"Оплата от"} name={"Price"} component={Input}/>
            </div>
            <div>
                <Field placeholder={"Город"} name={"City"} component={Input} />
            </div>
            <div>
                <Field placeholder={"Время начала рабочего дня"} name={"Start_Time"} component={Input}/>
            </div>
            <div>
                <Field placeholder={"Время конца рабочего дня"} name={"End_Time"} component={Input}/>
            </div>
            <div>
                <button type="submit" onClick={() => {
                    debugger
                    props.filterModeIsFetching(true)

                }}>Применить фильтр</button>
            </div>
            <div>
                <button onClick={() => {
                    debugger
                    props.updateFilter(null)
                    props.filterModeIsFetching(false)
                    props.getVacancy(props.currentPage,props.pageSize)
                }}>Убрать фильтр
                </button>
            </div>
        </form>


    )
}

const FindReduxForm = reduxForm({form: 'findVacancy'})(FindForm)

const Find = (props) => {
    const onSubmit = (formData,dispatch,props) => {
        console.log(formData)
        debugger
        if (props.filterMode) {props.updateFilter(formData)
        props.getFilterVacancy(formData,props.currentPage,props.pageSize)
        } else {dispatch(props.reset())}

    }

    return (
        <div>
            <h1>Фильтр поиска вакансий</h1>
            <FindReduxForm onSubmit={onSubmit} getSpecialisations={props.getSpecialisations}
                           filterModeIsFetching={props.filterModeIsFetching}
                           updateFilter={props.updateFilter}
                           getVacancy={props.getVacancy}
                           {...props} />

        </div>
    )
}
export default Find;