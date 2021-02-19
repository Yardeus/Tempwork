import React from "react";
import s from "../../Employee/List/List.module.css";

let AEmployer = (props) => {
    debugger
    let pagesCount = Math.ceil(props.employerCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }


    return <div>
        {props.employerList.map(l => <div>
            <div>
                id - {l.idEmployer}
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
                Описание - {l.Description}
            </div>
            <div>
                Статус - {l.Status}
            </div>
            <div>
                Профессия - {l.Profession}
            </div>
            <div>
                {l.Status === "Активен" ?
                    <div>
                        <button onClick={() => {
                            props.banEmployer(l.idEmployer,props.employerCurrentPage, props.pageSize)
                        }}>
                            Заблокировать
                        </button>
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
            <button onClick={() => {
                props.SetActionType(null)
            }}>
                Назад
            </button>
        </div>

    </div>


}

export default AEmployer;


