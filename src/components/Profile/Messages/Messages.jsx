import React, {useEffect} from "react";
import s from "./Messages.module.css";
import {Button} from "../../common/formsControl";
import moment from "moment";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import makeStyles from "@material-ui/core/styles/makeStyles";
import List from "@material-ui/core/List";
import TextField from "@material-ui/core/TextField";
import {Field, reduxForm} from "redux-form";
import {length} from "redux-form-validators";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 700,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        height: 500,
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
    subheader: {
        color: "green",
        disableGutters: false,
        backgroundColor: "white",
        inset: true
    },
    time: {
        fontSize: 60
    }

}));


class MessageForm extends React.Component {

    renderTextField = ({input, label, type, meta: {touched, error, warning}}) => (
        <div>
            <div>
                <TextField {...input} placeholder={label} type={type} fullWidth/>
                {/* ошибка для поля*/}
                {touched && ((error && <div>{error}</div>))}
            </div>
        </div>
    );

    render() {
        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <div className={s.sender}>
                        <Field name={"Message"} label={"Введите сообщение"} component={this.renderTextField}
                               validate={length({max: 500, msg: "Максимум 500 символов"})}/>
                    </div>
                    <div className={s.btnSend}>
                        <Button type="submit">Отправить</Button>
                    </div>


                </div>
            </form>
        )
    }


}

const MessageReduxForm = reduxForm({form: 'message'})(MessageForm)


let Messages = (props) => {

    let index = 0;
    let setIndex = (id) => {
        index = id
    }
    let messagesEnd
    const classes = useStyles();


    const onSubmit = (formData) => {
        let typeSender = 0
        let typeReceiver = 0
        if (props.type === "employee") {
            typeSender = 1
            typeReceiver = 2
        } else if (props.type === "employer") {
            typeSender = 2
            typeReceiver = 1
        }
        let idReceiver
        props.chats.forEach(function (item, i, arr) {
            if (item.id === props.selectedDialog) {
                if (props.type === "employee") {
                    idReceiver = item.idEmployer
                } else if (props.type === "employer") {
                    idReceiver = item.idEmployee
                }

            }
        });
        let data = {
            Message: formData.Message,
            idSender: props.userId,
            TypeSender: typeSender,
            idReceiver: idReceiver,
            TypeReceiver: typeReceiver,
            idChat: props.selectedDialog
        }
        props.sendMessage(props.selectedDialog, data,props.token)

    }
    let lastMessage = React.createRef();

    useEffect(() => {
        if (lastMessage.current) {
            lastMessage.current.scrollIntoView({behaviour: "smooth"});
        }
    }, [props.messages]);

    return (
        <div className={s.text + ' ' + s.container}>
            <div>
                <button className={s.btn} onClick={() => {
                    /* */
                    props.setProfileMode("default")
                }}>
                    Назад
                </button>

            </div>
            <div className={s.titleContact}>
                Контакты
            </div>
            <div className={s.titleMessages}>
                Сообщения
            </div>

            <div className={s.contact}>
                {props.chats ? <div> {props.chats.map(c => <div>

                        <div>
                            <button className={s.btn} onClick={() => {
                                /* */
                                props.setSelectedDialog(c.id)
                                props.getMyMessages(c.id,props.token)
                                /*props.setProfileMode("messages")*/
                            }}>
                                {props.type === "employer" ? c.Organization_name : `${c.Surname} ${c.Firstname} ${c.Middle_Name}`}
                            </button>

                        </div>
                    </div>
                )}

                </div> : null
                }


            </div>
            <div className={s.messages}>
                {!props.selectedDialog ? <div>Выберите контакт для просмотра сообщений</div> : <div>
                    {props.messages ? <div>
                        <List key={"list"} className={classes.root} subheader={<li/>}>
                            {props.messages.map((m, i, arr) => <div>

                                    <li key={m.id} className={classes.listSection}>
                                        <ul className={classes.ul}>
                                            <ListSubheader inset={true}
                                                className={classes.subheader}>{index === m.idSender ? null :
                                                `${props.type === "employer" ? props.userId === m.idSender ? m.Firstname : m.Organization_name :
                                                    props.userId === m.idSender ? m.Organization_name : m.Firstname}`}</ListSubheader>
                                            {setIndex(m.idSender)}
                                            <ListItem>
                                                <ListItemText primary={`${m.message}`}/>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText className={classes.time}
                                                              secondary={`${moment(m.Date).format('LT')}`}/>
                                            </ListItem>
                                        </ul>
                                    </li>

                                </div>
                            )}
                            <li ref={lastMessage}/>
                        </List>

                        <MessageReduxForm {...props} onSubmit={onSubmit}/>
                    </div> : <div>
                        <List key={"list"} className={classes.root} subheader={<li/>}>
                            <li ref={lastMessage}/>
                        </List>

                        <MessageReduxForm {...props} onSubmit={onSubmit}/>
                    </div>}
                </div>

                }
            </div>
        </div>
    )
}

export default Messages;


