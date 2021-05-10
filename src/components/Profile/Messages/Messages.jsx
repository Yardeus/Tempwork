import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import s from "./Messages.module.css";
import {Button} from "../../common/formsControl";

let Messages = (props) => {

    let [selectedDialog, setSelectedDialog] = useState(0);
    let [messages, setMessages] = useState(0);
    if (selectedDialog>0){
        props.getMyMessages(selectedDialog)
    }



    return (
        <div className={s.text + ' ' + s.container}>
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
                                setSelectedDialog(c.id)
                            }}>
                                {c.Organization_name}
                            </button>

                        </div>
                    </div>
                )}

                </div> : null
                }


            </div>
            <div className={s.messages}>
                {props.messages ? props.messages.map(m => <div>

                        <div>
                            {m.id}
                        </div>
                        <div>
                            {m.Date}
                        </div>
                    </div>
                ) : <div>Выберите контакт для просмотра сообщений</div>}

            </div>
        </div>
    )
}

export default Messages;


