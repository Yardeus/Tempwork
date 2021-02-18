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
        <div>
            {
                props.vacancyData.map(v => <div className={s.vacancy}>

                    <div>
                        Компания - {v.Organization_name}
                    </div>
                    <div>
                        Дата начала работы - {moment(v.Start_Date).format('L')}
                    </div>
                    <div>
                        Дата конца работы - {moment(v.End_Date).format('L')}
                    </div>
                    <div>
                        Описание - {v.Description}
                    </div>
                    <div>
                        Оплата - {v.Price}
                    </div>
                    <div>
                        Город - {v.City}
                    </div>
                    <div>
                        Адрес - {v.Adress}
                    </div>

                    <div>
                        График работы
                        <div>Начало дня - {moment(v.Start_Time,'hh:mm:ss').format('LT')}</div>
                        <div>Конец дня - {moment(v.End_Time,'hh:mm:ss').format('LT')}</div>
                    </div>
                    <div className={s.btn}>
                        <NavLink to={"/vacancy/" + v.idFind_Employer}>Подробнее</NavLink>
                    </div>
                </div>)
            }
        </div>
        <div>
            {pages.map(p => {
                return <span className={props.currentPage === p && s.number_select}
                             onClick={() => {
                                 props.onPageChanged(p)
                             }}>{p}</span>
            })}

        </div>
    </div>
}

export default List;


