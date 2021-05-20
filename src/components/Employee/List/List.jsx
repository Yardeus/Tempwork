import React, {useState} from "react";
import s from './List.module.css'
import {NavLink} from "react-router-dom";
import moment from "moment";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Pagination from "@material-ui/lab/Pagination";
import SendReportContainer from "../../common/SendReport/SendReportContainer";
import {Button} from "../../common/formsControl";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
}));

let List = (props) => {
    const classes = useStyles();
    let pagesCount = Math.ceil(props.count / props.pageSize);
    let pagesFavoriteCount = Math.ceil(props.countFavoriteVacancy / props.pageSize);
    let [viewFavorite, setViewFavorite] = useState(false)

    return <div className={s.list}>
        {/*<div className={s.text}>
            Все вакансии
        </div>*/}
        <Button onClick={() => {
            setViewFavorite(false)
        }}>Все вакансии</Button>
        {props.isAuth && props.type==="employer"?<Button onClick={() => {
            setViewFavorite(true)
        }}>Избранные вакансии</Button> : null }

        <div className={s.line}>

        </div>

        {viewFavorite ? <div>{props.favoriteVacancy ? <div> {props.favoriteVacancy.map(v => <div className={s.vacancy}>

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
                            <NavLink to={"/vacancy/" + v.idVacancy}>
                                <button>Подробнее</button>
                            </NavLink>
                        </div>
                    </div>)}
                        <div className={classes.root}>
                            <Pagination count={pagesFavoriteCount} showFirstButton showLastButton onChange={(event, page) => {
                                props.onPageChanged(page)
                            }}/>
                        </div>
                    </div> : <div>Избранных вакансий нет</div>
                }</div>
            :
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
                        <div className={classes.root}>
                            <Pagination count={pagesCount} showFirstButton showLastButton onChange={(event, page) => {
                                props.onPageChanged(page)
                            }}/>
                        </div>
                    </div> : <div>По заданному фильтру вакансии не найдены</div>
                }

            </div>
        }

    </div>
}

export default List;


