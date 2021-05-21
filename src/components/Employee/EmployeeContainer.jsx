import React from "react";
import {connect} from "react-redux";
import Employee from "./Employee";
import {setOneVacancy} from "../../redux/employee-reducer";
import {compose} from "redux";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import Employer from "../Employer/Employer";


class EmployeeContainer extends React.Component {
    componentDidMount() {

    }

    render() {
        return (
            <Employee {...this.props}/>
        )
    }

}



let mapStateToProps = (state) => {
    return {
        employeePage: state.employeePage,
        token: state.auth.token
    }
}

export default compose(
    connect(mapStateToProps, {setOneVacancy})
)(EmployeeContainer);



