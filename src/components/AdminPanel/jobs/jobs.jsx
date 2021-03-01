import React from "react";
import {Field, reduxForm} from "redux-form";
import {Button, Input, renderTextField} from "../../common/formsControl";

import s from "./jobs.module.css";
import {addJobs} from "../../../redux/admin-reducer";

class AddJobsForm extends React.Component {
    render() {


        const {handleSubmit} = this.props;
        debugger
        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <span>Введите профессию</span>
                        <Field name={"profession"} component={renderTextField}/>
                    </div>
                    <div>
                        <span>Введите специализацию</span>
                        <Field name={"specialisation"} component={renderTextField}/>
                    </div>
                    <div>
                        <Button type="submit">Создать связку</Button>
                    </div>
                    <div>
                        <Button onClick={() => {
                            this.props.setAddJobsMode(false)
                        }}>Отменить
                        </Button>
                    </div>

                </div>
            </form>
        )
    }

}

const AddJobsReduxForm = reduxForm({form: 'addJobs'})(AddJobsForm)


let Jobs = (props) => {

    const onSubmit = (formData) => {
        debugger

        let data = {
            profession: formData.profession,
            specialisation: formData.specialisation
        };

        console.log(formData)
        props.addJobs(data)


    }

    return <div className={s.text}>
        <div>
            <Button onClick={() => {
                props.SetActionType(null)
            }}>
                Назад
            </Button>
        </div>
        {props.sendJobsMode ? <div>
                <div>
                    Профессия и специализация добавлены
                </div>
                <div>
                    <Button onClick={() => {
                        props.setAddJobsMode(true)
                        props.setSendJobsMode(false)
                    }}>
                        Добавить еще профессию и специализацию
                    </Button>
                </div>

            </div> :
            <div>{props.addJobsMode ? <div>
                    <AddJobsReduxForm onSubmit={onSubmit} setAddJobsMode={props.setAddJobsMode}/>
                </div>
                :
                <div>
                    <Button onClick={() => {
                        props.setAddJobsMode(true)
                    }}>
                        Добавить профессию и специализацию
                    </Button>
                </div>}</div>}

        <div>
            {props.jobs.map(j => <div className={s.job}>
                <div>
                    id - {j.idJobs}
                </div>

                <div>
                    Профессия - {j.Profession}
                </div>
                <div>
                    Специализация - {j.Specialisation}
                </div>
                <div>
                    <Button onClick={() => {
                        props.deleteJobs(j.idJobs)
                    }}>Удалить
                    </Button>
                </div>
            </div>)}
        </div>


    </div>


}

export default Jobs;


