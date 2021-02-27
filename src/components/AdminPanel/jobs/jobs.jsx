import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../common/formsControl";
import {addJobs} from "../../../redux/admin-reducer";

let AddJobsForm = (props) => {
    const {handleSubmit} = props;
    debugger
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div>
                    <Field placeholder={"Введите профессию"} name={"profession"} component={Input}/>
                </div>
                <div>
                    <Field placeholder={"Введите специализацию"} name={"specialisation"} component={Input}/>
                </div>
                <div>
                    <button type="submit">Создать связку</button>
                </div>
                <div>
                    <button onClick={() => {
                        props.setAddJobsMode(false)
                    }}>Отменить
                    </button>
                </div>

            </div>
        </form>
    )
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

    return <div>
        <div>
            <button onClick={() => {
                props.SetActionType(null)
            }}>
                Назад
            </button>
        </div>
        {props.sendJobsMode ? <div>
                <div>
                    Профессия и специализация добавлены
                </div>
                <div>
                    <button onClick={() => {
                        props.setAddJobsMode(true)
                        props.setSendJobsMode(false)
                    }}>
                        Добавить еще профессию и специализацию
                    </button>
                </div>

            </div> :
            <div>{props.addJobsMode ? <div>
                    <AddJobsReduxForm onSubmit={onSubmit} setAddJobsMode={props.setAddJobsMode}/>
                </div>
                :
                <div>
                    <button onClick={() => {
                        props.setAddJobsMode(true)
                    }}>
                        Добавить профессию и специализацию
                    </button>
                </div>}</div>}

        <div>
            {props.jobs.map(j => <div>
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
                    <button onClick={() => {
                        props.deleteJobs(j.idJobs)
                    }}>Удалить
                    </button>
                </div>
            </div>)}
        </div>


    </div>


}

export default Jobs;


