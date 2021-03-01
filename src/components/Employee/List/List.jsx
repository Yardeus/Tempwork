import React from "react";
import s from './List.module.css'
import {NavLink} from "react-router-dom";
import moment from "moment";

let List = (props) => {

    let pagesCount = Math.ceil(props.count / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div className={s.list}>
        <div className={s.text}>
            Все вакансии
        </div>
        <div className={s.line}>

        </div>
        <div>
            {
                props.vacancyData ? <div> {props.vacancyData.map(v => <div className={s.vacancy}>

                    <div className={s.specialisation}>
                        {v.Specialisation}
                    </div>
                    <div className={s.paid}>
                        {v.Price} руб.
                    </div>
                    <div className={s.date}>
                        {moment(v.Start_Date).format('L')} - {moment(v.End_Date).format('L')}
                    </div>

                    <div className={s.adress}>
                        {v.City}, {v.Adress}
                    </div>
                    <div className={s.company}>
                        {v.Organization_name}
                    </div>
                    <div className={s.btn}>
                        <NavLink to={"/vacancy/" + v.idFind_Employer}>
                            <button>Подробнее</button>
                        </NavLink>
                    </div>
                </div>)}
                    <div className={s.numbers}>
                        {pages.map(p => {
                            return <span className={props.currentPage === p && s.number_select}
                                         onClick={() => {
                                             props.onPageChanged(p)
                                         }}>{p}</span>
                        })}

                    </div>
                </div> : <div>По заданному фильтру вакансии не найдены</div>
            }

        </div>

    </div>
}

export default List;


