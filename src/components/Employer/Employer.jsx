import React from "react";
import s from './Employer.module.css'
import {Field, reduxForm} from "redux-form";
import {Button, Input, renderTextField, renderTextFieldMultiLine} from "../common/formsControl";
import {date, format, length, numericality, required} from "redux-form-validators";
import Select from "@material-ui/core/Select";

class EmployerForm extends React.Component {
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


        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit}>

                <div>
                    <div>
                        Выберите профессию
                    </div>
                    <Field name="profession" component={this.renderSelectProfession} onChange={(event) => {
                        this.props.getSpecialisations(event.target.value)
                    }}>

                    </Field>
                </div>
                <div>
                    <div>
                        Выберите специализацию
                    </div>
                    <Field name="specialisations" component={this.renderSelectSpecialisation}>

                    </Field>
                </div>

                <div>
                    <div>
                        Введите начальную дату работы
                    </div>
                    <Field placeholder={"Начальная дата"} type={"date"} name={"startDate"} component={renderTextField}
                           validate={date({format: 'yyyy-mm-dd', msg: 'Введите в таком формате: гггг-мм-дд'})}/>
                </div>

                <div>
                    <div>
                        Введите конечную дату работы
                    </div>
                    <Field placeholder={"Конечная дата"} type={"date"} name={"endDate"} component={renderTextField}
                           validate={date({format: 'yyyy-mm-dd', msg: 'Введите в таком формате: гггг-мм-дд'})}/>
                </div>
                <div>
                    <div>
                        Введите оплату
                    </div>
                    <Field placeholder={"Оплата"} name={"price"} component={renderTextField}
                           validate={numericality({'>': 0, msg: "Введите число больше 0"})}/>
                </div>
                <div>
                    <div>
                        Введите описание работы
                    </div>
                    <Field placeholder={"Описание"} name={"description"} component={renderTextFieldMultiLine}
                           validate={[required({msg: "Введите краткое описание работы"}), length({max: 500})]}/>
                </div>
                <div>
                    <div>
                        Введите город
                    </div>
                    <Field placeholder={"Город"} name={"city"} component={renderTextField}
                           validate={[required({msg: "Введите ваш город"}), format({
                               with: /^[а-я- ]+$/i,
                               msg: "Используйте только буквы русского алфавита"
                           })]}/>
                </div>
                <div>
                    <div>
                        Введите адрес
                    </div>
                    <Field placeholder={"Адрес"} name={"adress"} component={renderTextField}
                           validate={[required({msg: "Введите ваш адрес"}), format({
                               with: /^[а-я0-9- ,]+$/i,
                               msg: "Используйте только буквы русского алфавита и цифры"
                           })]}/>
                </div>
                <div>
                    <div>
                        Введите количество требуемых человек
                    </div>
                    <Field placeholder={"Количество человек"} name={"count"} component={renderTextField}
                           validate={[required({msg: "Введите количество требуемых человек"}), numericality({
                               ">": 0,
                               "<": 10,
                               msg: "Цифра должна быть больше 0 и меньше 10"
                           })]}/>
                </div>
                <div>
                    <div>
                        Введите время начала рабочего дня
                    </div>
                    <Field placeholder={"Время начала рабочего дня"} type={"time"} name={"startTime"} component={renderTextField}
                           validate={[format({
                               with: /^[0-9: ]+$/i,
                               msg: "Используйте только  цифры и :. Формат записи ЧЧ:ММ"
                           }), length({is: 5, msg: "Формат записи ЧЧ:ММ"})]}/>
                </div>
                <div>
                    <div>
                        Введите время конца рабочего дня
                    </div>
                    <Field placeholder={"Время конца рабочего дня"} type={"time"} name={"endTime"} component={renderTextField}
                           validate={[length({is: 5, msg: "Формат записи ЧЧ:ММ"})]}/>
                </div>
                <div>
                    <Button type="submit" disabled={this.props.loginInProgress}>Создать</Button>
                </div>
            </form>
        )
    }

}

const EmployerReduxForm = reduxForm({form: 'createVacancy'})(EmployerForm)

const Employer = (props) => {
    const onSubmit = (formData) => {
        props.createNewVacancy(props.userId, formData,props.token)
        props.setIsVacancyCreated(true)
    }


    return (
        <div className={s.login}>
            <h1>Создание вакансии</h1>
            <EmployerReduxForm onSubmit={onSubmit} userId={props.userId} loginInProgress={props.loginInProgress}
                               professions={props.professions}
                               oneProfession={props.oneProfession} getSpecialisations={props.getSpecialisations}
                               specialisations={props.specialisations} createNewVacancy={props.createNewVacancy}/>

        </div>
    )
}
export default Employer;