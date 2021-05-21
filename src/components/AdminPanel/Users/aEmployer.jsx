import React from "react";
import s from "./Users.module.css";
import {Button} from "../../common/formsControl";
import moment from "moment";
import Pagination from "@material-ui/lab/Pagination";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
}));

let AEmployer = (props) => {
    let pagesCount = Math.ceil(props.employerCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    const classes = useStyles();

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
                            props.banEmployer(l.idEmployer,props.employerCurrentPage, props.pageSize,props.token)
                        }}>
                            Заблокировать
                        </Button>
                    </div> : null}
            </div>
        </div>)}
        {/*<div>
            {pages.map(p => {
                return <span className={props.employerCurrentPage === p && s.number_select}
                             onClick={() => {
                                 props.onPageChanged(p)
                             }}>{p}</span>
            })}
        </div>*/}
        <div>
            <div className={classes.root}>
                <Pagination count={pagesCount} showFirstButton showLastButton onChange={(event, page) => {
                    debugger
                    props.onPageChanged(page)
                }}/>
            </div>
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


