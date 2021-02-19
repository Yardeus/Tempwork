import React from "react";
import AEmployerContainer from "./Users/aEmployerContainer";
import AEmployeeContainer from "./Users/aEmployeeContainer";


let AdminPanel = (props) => {

    switch (props.actionType) {
        case "employer":
            return <AEmployerContainer/>
        case "employee":
            return <AEmployeeContainer/>
        default:
            return <div>
                <div>
                    <button onClick={() => {
                        props.SetActionType("employer")
                    }}>
                        Список всех соискателей
                    </button>
                </div>
                <div>
                    <button onClick={() => {
                        props.SetActionType("employee")
                    }}>
                        Список всех работодателей
                    </button>
                </div>
                <div>
                    <button onClick={() => {
                        props.SetActionType("jobs")
                    }}>
                        Список профессий и специализаций
                    </button>
                </div>
                <div>
                    <button onClick={() => {
                        props.SetActionType("agreements")
                    }}>
                        Список соглашений
                    </button>
                </div>
                <div>
                    <button onClick={() => {
                        props.SetActionType("vacancy")
                    }}>
                        Список всех вакансий
                    </button>
                </div>
            </div>
    }


}

export default AdminPanel;


