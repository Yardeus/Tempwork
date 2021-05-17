import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import {Field, reduxForm} from "redux-form";
import {length, required} from "redux-form-validators";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import s from "./SendReport.module.css";
import {Button} from "../formsControl";
import SendReportContainer from "./SendReportContainer";

let RadioButtonsGroup = (props) => {
    const [value, setValue] = React.useState('0');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Выберите подходящий пункт</FormLabel>
            <RadioGroup aria-label="report" name="report1" value={`${value}`} onChange={handleChange}>
                {props.codesReports.map(code => <FormControlLabel value={`${code.id}`} control={<Radio/>}
                                                                  label={code.description}/>)}
            </RadioGroup>
        </FormControl>
    );
}


class SendReportForm extends React.Component {


    value = 1;
    setValue = (value1) => {
        this.value = value1
    }

    handleChange = (event) => {
        debugger
        this.value = event.target.value;
        console.log(event.target.value)
    };


    renderTextField = ({input, label, type, meta: {touched, error, warning}}) => (
        <div>
            <div>
                <TextField {...input} placeholder={label} type={type} fullWidth/>
                {/* ошибка для поля*/}
                {touched && ((error && <div>{error}</div>))}
            </div>
        </div>
    );

    renderRadio = ({input, label, type, meta: {touched, error, warning}}) => (
        <div className={s.main}>
            <FormControl component="fieldset">
                <FormLabel component="legend">Выберите пункт для подачи жалобы</FormLabel>
                <RadioGroup aria-label="code" name="code1" value={this.value} onChange={this.handleChange}>
                    {this.props.codesReports.map(code => <FormControlLabel value={code.id} control={<Radio/>}
                                                                           label={code.description}/>)}
                    {/*<FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
                <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />*/}
                </RadioGroup>
            </FormControl>
        </div>

        /*<div>
            <span>Выберите пункт для подачи жалобы</span>
            {this.props.codesReports && <RadioGroup type={type} {...input} >
                <div align={"center"}>
                    {this.props.codesReports.map(code=><FormControlLabel value={code.id} control={<Radio/>} label={code.description}/>)}
                    {touched && ((error && <div>{error}</div>))}
                </div>

            </RadioGroup>
            }
        </div>*/
    );

    render() {
        const {handleSubmit} = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <div>
                    {/*<div>
                        <Field name={"code"} component={this.renderRadio}/>
                        <RadioButtonsGroup {...this.props}/>
                    </div>*/}
                    <div>
                        <label>Описание вашей ситуации</label>
                        <Field placeholder={"Описание вашей жалобы"} name={"message"} component={this.renderTextField}
                               validate={length({max: 500, msg: "Максимум 500 символов"})}/>
                    </div>
                    <div>
                        <Button type="submit">Отправить жалобу</Button>
                    </div>
                </div>
            </form>
        )
    }


}

const SendReportReduxForm = reduxForm({form: 'sendReport'})(SendReportForm)


let SendReport = (props) => {

    const [value, setValue] = React.useState('0');
    let [sendReport, setSendReport] = useState(false)
    const handleChange = (event) => {
        setValue(event.target.value);
    };


    let onSubmit = (formData) => {
        console.log(formData, value)

        let typeSender
        if (props.type === "employee") {
            typeSender = 1
        } else if (props.type === "employer") {
            typeSender = 2
        }

        let data = {
            code: value,
            message: formData.message,
            idSender: props.userId,
            typeSender,
            idIntruder: props.idIntruder,
            typeIntruder: props.typeIntruder,
        }
        console.log(data)
        props.sendReport(data)
    }

    return (
        <div>
            {props.isAuth ? !sendReport ? <div>
                <Button onClick={() => {
                    setSendReport(true)
                }}>Пожаловаться</Button>
            </div> : <div>{props.codesReports && <div>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Выберите подходящий пункт</FormLabel>
                    <RadioGroup aria-label="report" name="report1" value={`${value}`} onChange={handleChange}>
                        {props.codesReports.map(code => <FormControlLabel value={`${code.id}`} control={<Radio/>}
                                                                          label={code.description}/>)}
                    </RadioGroup>
                </FormControl>
                <SendReportReduxForm onSubmit={onSubmit}/>
            </div>}
                <Button onClick={() => {
                    setSendReport(false)
                }}>Отменить жалобу</Button>
            </div> : null}


        </div>
    )
}

export default SendReport;


