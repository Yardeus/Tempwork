import React, {useState} from "react";
import {Field, reduxForm} from "redux-form";
import {Button, Input, renderTextField} from "../../common/formsControl";

import s from "./Reports.module.css";
import {addJobs} from "../../../redux/admin-reducer";

import {DataGrid} from '@material-ui/data-grid';
import moment from "moment";
import makeStyles from "@material-ui/core/styles/makeStyles";


let Reports = (props) => {

    let [reportSelected, setReportSelected] = useState(false)

    const onSubmit = (formData) => {
        let data = {
            profession: formData.profession,
            specialisation: formData.specialisation
        };
        props.addJobs(data, props.token)

    }

    const columns = [
        {field: 'id', headerName: 'ID', width: 90},
        {field: 'code', headerName: 'Код', width: 130},
        {field: 'description', headerName: 'Описание кода', width: 130},
        {field: 'message', headerName: 'Сообщение', width: 430},
        {field: 'idSender', headerName: 'ID отправителя', width: 180},
        {field: 'typeSender', headerName: 'Тип отправителя', width: 180},
        {field: 'idIntruder', headerName: 'ID нарушителя', width: 180},
        {field: 'typeIntruder', headerName: 'Тип нарушителя', width: 180},
        {field: 'datetime', headerName: 'Дата и время', width: 230},
        {field: 'status', headerName: 'Статус', width: 130},
    ];

    const rows = [];

    props.reportList.map(r => {
        rows.push({
            id: r.id,
            code: r.code,
            description: r.description,
            message: r.message,
            idSender: r.idSender,
            typeSender: r.typeSender === 1 ? "Работодатель" : "Соискатель",
            idIntruder: r.idIntruder,
            typeIntruder: r.typeIntruder === 1 ? "Работодатель" : "Соискатель",
            datetime: moment(r.datetime).format('LLL'),
            status: r.status
        })
    })


    return <div className={s.text}>
        <div>
            <Button onClick={() => {
                props.SetActionType(null)
            }}>
                Назад
            </Button>
        </div>

        <div style={{height: 400, width: '100%'}}>
            <DataGrid rows={rows} columns={columns} pageSize={5} onRowSelected={(e) => {
                setReportSelected(e.data.id)
            }}/>
        </div>
        <div>
            <Button onClick={()=>{
                let data={id:reportSelected}
                props.confirmReport(data,props.token)
            }}>
                Обработано
            </Button>
        </div>
        <div>
            <Button onClick={()=>{
                let data={id:reportSelected}
                props.rejectReport(data,props.token)
            }}>
                Отказано
            </Button>

        </div>


    </div>


}

export default Reports;


