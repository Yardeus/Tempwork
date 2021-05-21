import React from "react";
import {NavLink} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {Button, Input} from "../../../common/formsControl";
import s from "../MyWorks/MyWorks.module.css";
import moment from "moment";
import SendReportContainer from "../../../common/SendReport/SendReportContainer";
import Avatar from "@material-ui/core/Avatar";
import baseAvatar from "../../../../server/avatars/base_avatar.jpg";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    }
}));
let FeedbackForm = (props) => {


    const {handleSubmit} = props;
    return (
        <form onSubmit={handleSubmit}>
            <div>


                <div>
                    <Field placeholder={"Введите отзыв"} name={"feedback"} component={Input}/>
                </div>
                <div>
                    <Button type="submit">Отправить отзыв</Button>
                </div>
                <div>
                    <Button onClick={() => {
                        props.setFeedbackMode(false)
                    }}>Отменить
                    </Button>
                </div>

            </div>
        </form>
    )
}

const VacancyReduxForm = reduxForm({form: 'feedback'})(FeedbackForm)

let WorkersList = (props) => {
    const [rank, setRank] = React.useState('like');

    const handleChange = (event) => {
        debugger
        setRank(event.target.value);
    };

    const onSubmit = (formData) => {
        if (props.feedbackMode) {
            let data = {};
            props.responded.map(v => {
                    if (v.idEmployer === props.feedbackMode)
                        return (
                            data = {

                                idEmployee: props.userId,
                                idEmployer: v.idEmployer,
                                rank: rank,
                                feedback: formData.feedback,
                            }
                        )

                }
            )

            props.sendFeedbackEmployer(data,props.token)
            props.setFeedbackMode(false)
            props.setFeedbackSendMode(true)

        }


    }
    const classes = useStyles();
    return (<>
            {props.type === "employer" ? null : <div>
                {
                    props.responded.map(v => <div className={s.vacancy + " " + s.text}>
                        {v.Avatar ? <Avatar className={classes.large} alt="avatar"
                                            src={`http://localhost:8080/avatars/${v.Avatar}`}/> :
                            <Avatar className={classes.large} alt="avatar" src={baseAvatar}/>}
                            <div>
                                {v.Firstname} {v.Surname} {v.Middle_Name}
                            </div>
                            <div>
                                {v.Sex}
                            </div>
                            <div>
                                День рождения - {moment(v.Birthday).format('L')}
                            </div>
                            <div>
                                Город - {v.City}
                            </div>
                            <div>
                                Профессия - {v.Profession}
                            </div>

                            <div>
                                Описание - {v.Description}
                            </div>
                            <div>
                                Номер телефона - {v.Phone_Number}
                            </div>
                            <div>
                                Электронная почта - {v.Email}
                            </div>
                            <div>
                                Дата регистрации на сайте - {moment(v.Date_Registration).format('L')}
                            </div>
                            <div>
                                {props.feedbackSendMode ? <div>Спасибо за оставленный отзыв</div> :
                                    <div>{props.feedbackMode === v.idEmployer ? <div>
                                            <div>
                                                <FormControl component="fieldset" name="rank">
                                                    <FormLabel component="legend">Выберите подходящий пункт</FormLabel>
                                                    <RadioGroup aria-label="rank" name="rank" value={`${rank}`} onChange={handleChange}>
                                                        <FormControlLabel value={`like`} control={<Radio/>} label="Положительно"/>
                                                        <FormControlLabel value={`dislike`} control={<Radio/>} label="Отрицательно"/>
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                            <VacancyReduxForm onSubmit={onSubmit} setFeedbackMode={props.setFeedbackMode}
                                                              setFeedbackSendMode={props.setFeedbackSendMode}
                                                              sendFeedbackEmployer={props.sendFeedbackEmployer}/>
                                        </div>
                                        :
                                        <div>
                                            <Button onClick={() => {
                                                props.setFeedbackMode(v.idEmployer)
                                            }}>
                                                Оставить отзыв
                                            </Button>
                                        </div>}</div>}
                            </div>
                            {props.type === "employee" ? <div>
                                <NavLink to="/profile">
                                    <Button onClick={() => {

                                        let data = {
                                            idEmployee: props.userId,
                                            idEmployer: v.idEmployer
                                        }
                                        props.createChat(data,props.token)

                                    }}>Написать сообщение</Button>
                                </NavLink>

                            </div> : null}
                        <SendReportContainer idIntruder={v.idEmployer} typeIntruder={2} />
                        </div>
                    )}

                <div>
                    <NavLink to={"/my-vacancy"}>
                        <Button onClick={() => {
                            props.SetCurrentRespondVacancyId(null)
                            props.FormRespondedMyVacancy([])
                        }}>
                            Назад
                        </Button>
                    </NavLink>

                </div>
            </div>}
        </>
    )
}

export default WorkersList;


