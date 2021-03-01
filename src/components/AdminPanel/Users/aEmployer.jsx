import React from "react";
import s from "./Users.module.css";
import {Button} from "../../common/formsControl";
import moment from "moment";

let AEmployer = (props) => {
    debugger
    let pagesCount = Math.ceil(props.employerCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }


    return <div  className={s.text}>
        {props.employerList.map(l => <div className={s.user}>
            <div>
                id - {l.idEmployer}
            </div>
            <div>
                Статус - {l.Status}
            </div>
            <div>
                ФИО - {l.Surname} {l.Firstname} {l.Middle_Name}
            </div>
            <div>
                Дата регистрации - {moment(l.Date_Registration).format('L')}
            </div>
            <div>
                Город - {l.City}
            </div>
            <div>
                Описание - {l.Description}
            </div>

            <div>
                Профессия - {l.Profession}
            </div>
            <div>
                {l.Status === "Активен" ?
                    <div>
                        <Button onClick={() => {
                            props.banEmployer(l.idEmployer,props.employerCurrentPage, props.pageSize)
                        }}>
                            Заблокировать
                        </Button>
                    </div> : null}
            </div>
        </div>)}
        <div>
            {pages.map(p => {
                return <span className={props.employerCurrentPage === p && s.number_select}
                             onClick={() => {
                                 props.onPageChanged(p)
                             }}>{p}</span>
            })}
        </div>
        <div>
            <Button onClick={() => {
                props.SetActionType(null)
            }}>
                Назад
            </Button>
        </div>

    </div>


}

export default AEmployer;


