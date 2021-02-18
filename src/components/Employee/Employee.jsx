import React from "react";
import s from './Employee.module.css'
import Find from "./Find/Find";
import ListContainer from "./List/ListContainer";
import FindContainer from "./Find/FindContainer";


const Employee = (props) => {



    return (
        <div className={s.employee}>
            <FindContainer/>
            <ListContainer/>


        </div>
    )
}
export default Employee;