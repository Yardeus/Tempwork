import React, {useEffect} from "react";
import TextField from "@material-ui/core/TextField";
import {Field, reduxForm} from "redux-form";
import {length, required} from "redux-form-validators";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import s from "./SendReport.module.css";

class SendReportForm extends React.Component {



    value = 1;
    setValue= (value1) => {
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
                    {this.props.codesReports.map(code=><FormControlLabel value={code.id} control={<Radio />} label={code.description}/>)}
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
        debugger
        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <Field name={"code"} component={this.renderRadio}/>
                    </div>
                </div>
            </form>
        )
    }


}

const SendReportReduxForm = reduxForm({form: 'sendReport'})(SendReportForm)


let SendReport = (props) => {

    let onSubmit = () => {

    }

    return (
        <div>

            {props.codesReports && <SendReportReduxForm {...props} onSubmit={onSubmit}/>}


        </div>
    )
}

export default SendReport;


