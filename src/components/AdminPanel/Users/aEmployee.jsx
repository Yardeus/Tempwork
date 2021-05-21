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

let AEmployee = (props) => {
debugger
    const onPageChanged = (pageNumber) => {
       props.getEmployeeList(pageNumber, props.pageSize,props.token);
    }

    const classes = useStyles();
    let pagesCount = Math.ceil(props.employeeCount / props.pageSize);


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
                            props.banEmployee(l.idEmployee, props.employeeCurrentPage, props.pageSize,props.token)
                        }}>
                            Заблокировать
                        </Button>
                    </div> : null}
            </div>
        </div>)}
        <div>
            <div className={classes.root}>
                <Pagination count={pagesCount} showFirstButton showLastButton onChange={(event, page) => {
                    debugger
                    onPageChanged(page)
                }}/>
            </div>
        </div>

        {/*<div>

            {pages.map(p => {
                return <span className={props.employeeCurrentPage === p && s.number_select}
                             onClick={() => {
                                 props.onPageChanged(p)
                             }}>{p}</span>
            })}
        </div>*/}
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


