import React from "react";
import s from "./Users.module.css";
import {Button} from "../../common/formsControl";
import moment from "moment";

let AEmployee = (props) => {
    debugger
    let pagesCount = Math.ceil(props.employeeCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }


    return <div className={s.text}>
        {props.employeeList.map(l => <div className={s.user}>
            <div>
                id - {l.idEmployee}
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
                Название организации - {l.Organization_name}
            </div>
            <div>
                {l.Status === "Активен" ?
                    <div>
                        <Button onClick={() => {
                            props.banEmployee(l.idEmployee, props.employeeCurrentPage, props.pageSize)
                        }}>
                            Заблокировать
                        </Button>
                    </div> : null}
            </div>
        </div>)}
        <div>
            {pages.map(p => {
                return <span className={props.employeeCurrentPage === p && s.number_select}
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

export default AEmployee;


