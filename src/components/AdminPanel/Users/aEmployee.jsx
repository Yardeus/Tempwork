import React from "react";
import s from "../../Employee/List/List.module.css";

let AEmployee = (props) => {
    debugger
    let pagesCount = Math.ceil(props.employeeCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }


    return <div>
        {props.employeeList.map(l => <div>
            <div>
                id - {l.idEmployee}
            </div>
            <div>
                ФИО - {l.Surname} {l.Firstname} {l.Middle_Name}
            </div>
            <div>
                Дата регистрации - {l.Date_Registration}
            </div>
            <div>
                Город - {l.City}
            </div>
            <div>
                Статус - {l.Status}
            </div>
            <div>
                Название организации - {l.Organization_name}
            </div>
            <div>
                {l.Status === "Активен" ?
                    <div>
                        <button onClick={() => {
                            props.banEmployee(l.idEmployee,props.employeeCurrentPage, props.pageSize)
                        }}>
                            Заблокировать
                        </button>
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
            <button onClick={() => {
                props.SetActionType(null)
            }}>
                Назад
            </button>
        </div>

    </div>


}

export default AEmployee;


