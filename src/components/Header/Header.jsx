import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <div className={s.header}>

            <div className={s.vacancy}>
                <NavLink to="/employee" activeClassName={s.activeLink}>
                    <button>Вакансии</button>
                </NavLink>
            </div>
            <div className={s.create}>{props.type === "employee" ?
                <NavLink to="/employer" activeClassName={s.activeLink}>
                    <button>Создание вакансии</button>
                </NavLink>
                : null}</div>

            <div className={s.login}>
                {props.isAuth ? (props.type === "employer" || props.type === "employee") ?
                    <NavLink to="/profile" activeClassName={s.activeLink}>
                        <button>Профиль</button>
                    </NavLink> : <NavLink to="/admin-panel" activeClassName={s.activeLink}>
                        <button>Панель администратора</button>
                    </NavLink> : <NavLink to="/login" activeClassName={s.activeLink}>
                    <button>Войти</button>
                </NavLink>}

            </div>
        </div>
    )
}
export default Header;