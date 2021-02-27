import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <div className={s.header}>
            <div className={s.item}>
                Логотип
            </div>
            <div className={`${s.item} ${s.text}`}>
                TEMPWORK.RU
            </div>
            <div className={s.item}>
                <NavLink to="/employee" activeClassName={s.activeLink}>Вакансии</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to="/employer" activeClassName={s.activeLink}>Работодателям</NavLink>
            </div>
            <div className={s.item}>
                {props.isAuth  ? (props.type === "employer" || props.type === "employee") ? <NavLink to="/profile" activeClassName={s.activeLink}>Профиль</NavLink>: <NavLink to="/admin-panel" activeClassName={s.activeLink}>Панель администратора</NavLink> : <NavLink to="/login" activeClassName={s.activeLink}>Войти</NavLink>}

            </div>
        </div>
    )
}
export default Header;