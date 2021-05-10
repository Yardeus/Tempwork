import React, {Component} from "react";
import {Field, reduxForm} from "redux-form";
import {date, format, length, numericality, required} from "redux-form-validators";

import s from './Find.module.css'

import {Button} from '@material-ui/core';
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";


class FindForm extends Component {

    renderTextField = ({input, label, type, meta: {touched, error, warning}}) => (
        <div>
            <label>{label}</label>
            <div>
                <TextField {...input} placeholder={label} type={type}/>
                {/* ошибка для поля*/}
                {touched && ((error && <div>{error}</div>))}
            </div>
        </div>
    );
    renderSelectProfession = ({input, label, type, meta: {touched, error, warning}}) => {

        return <div>
            <label>{label}</label>
            <div>
                <Select {...input} placeholder={label} type={type}>
                    {this.props.professions && this.props.professions.map(p => <option
                        value={p.Profession}>{p.Profession}</option>)}
                </Select>
                {/* ошибка для поля*/}
                {touched && ((error && <div>{error}</div>))}
            </div>
        </div>

    };
    renderSelectSpecialisation = ({input, label, type, meta: {touched, error, warning}}) => {

        return <div>
            <label>{label}</label>
            <div>
                <Select {...input} placeholder={label} type={type}>
                    {this.props.specialisations && this.props.specialisations.map(p => <option
                        value={p.idJobs}>{p.Specialisation}</option>)}
                </Select>
                {/* ошибка для поля*/}
                {touched && ((error && <div>{error}</div>))}
            </div>
        </div>

    };

    render() {


        const {handleSubmit, pristine, reset, submitting, classes} = this.props;
        return (
            <form onSubmit={handleSubmit} className={s.form}>

                <div className={s.profession}>
                    <span>Выберите профессию</span>
                    <div className={s.professionSelect}>
                        {this.props.professions ?
                            <Field name="profession" component={this.renderSelectProfession} onChange={(event) => {
                                this.props.getSpecialisations(event.target.value)
                            }}>

                                {/*{this.props.professions && this.props.professions.map(p => <option
                                    value={p.Profession}>{p.Profession}</option>)}*/}

                            </Field> : null}
                    </div>

                </div>
                <div className={s.specialisation}>
                    <span>Выберите специализацию</span>
                    <div className={s.specialisationSelect}>
                        <Field name="idJobs" component={this.renderSelectSpecialisation}>

                        </Field>
                    </div>

                </div>

                <div className={s.dateStart}>
                    <span>Дата начала работы</span>
                    <Field className={s.textField} type={"date"} placeholder={"Начальная дата"} name={"Start_Date"}
                           component={this.renderTextField}
                           validate={date({
                               format: 'yyyy-mm-dd',
                               msg: 'Введите в таком формате: гггг-мм-дд',
                               allowBlank: true
                           })}/>
                </div>

                <div className={s.dateEnd}>
                    <span>Дата конца работы</span>
                    <Field className={s.textField} type={"date"} placeholder={"Конечная дата"} name={"End_Date"}
                           component={this.renderTextField}
                           validate={date({
                               format: 'yyyy-mm-dd',
                               msg: 'Введите в таком формате: гггг-мм-дд',
                               allowBlank: true
                           })}/>
                </div>
                <div className={s.paid}>
                    <span>Оплата в рублях от </span>
                    <Field className={s.textField} component={this.renderTextField}
                           name={"Price"}
                           validate={numericality({'>': 0, msg: "Введите число больше 0", allowBlank: true})}/>
                </div>
                <div className={s.city}>
                    <span>Город  </span>
                    <Field name={"City"} component={this.renderTextField} validate={[format({
                        with: /^[а-я- ]+$/i,
                        msg: "Используйте только буквы русского алфавита", allowBlank: true
                    })]}/>

                </div>
                <div className={s.timeStart}>
                    <span>Время начала рабочего дня  </span>
                    <Field className={s.textField} type={"time"} placeholder={"Время начала рабочего дня"}
                           name={"Start_Time"} component={this.renderTextField} defaultValue="17:30"
                           validate={[length({is: 5, msg: "Формат записи ЧЧ:ММ", allowBlank: true})]}/>
                </div>
                <div className={s.timeEnd}>
                    <span>Время конца рабочего дня  </span>
                    <Field className={s.textField} type={"time"} placeholder={"Время конца рабочего дня"}
                           name={"End_Time"} component={this.renderTextField} defaultValue="07:30"
                           validate={[length({is: 5, msg: "Формат записи ЧЧ:ММ", allowBlank: true})]}/>
                </div>
                <div className={s.btn1}>
                    <Button type="submit" onClick={(e) => {

                        this.props.filterModeIsFetching(true)

                    }}>Применить фильтр
                    </Button>
                </div>
                <div className={s.btn2}>
                    <Button onClick={() => {
                        this.props.updateFilter(null)
                        this.props.filterModeIsFetching(false)
                        this.props.getVacancy(this.props.currentPage, this.props.pageSize)
                    }}>Убрать фильтр
                    </Button>
                </div>
            </form>


        )
    }
}

const FindReduxForm = reduxForm({form: 'findVacancy'})(FindForm)

const Find = (props) => {
    const onSubmit = (formData, dispatch, props) => {

        if (props.filterMode) {
            props.updateFilter(formData)
            props.getFilterVacancy(formData, props.currentPage, props.pageSize)
        } else {
            dispatch(props.reset())
        }

    }

    return (
        <div className={s.find}>
            <h1>Фильтр поиска работы</h1>
            <FindReduxForm onSubmit={onSubmit} getSpecialisations={props.getSpecialisations}
                           filterModeIsFetching={props.filterModeIsFetching}
                           updateFilter={props.updateFilter}
                           getVacancy={props.getVacancy}
                           {...props} />

        </div>
    )
}
export default Find;