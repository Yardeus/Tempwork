import './App.css';
import React from "react";
import Footer from "./components/Footer/Footer";
import {Route} from "react-router-dom";
import EmployerContainer from "./components/Employer/EmployerContainer";
import EmployeeContainer from "./components/Employee/EmployeeContainer";
import VacancyContainer from "./components/Employee/List/Vacancy/vacancyContainer"
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/Login/LoginContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import MyVacancyContainer from "./components/Profile/MyVacancy/MyVacancyContainer";
import RegisterEmployeeContainer from "./components/Login/Registration/Employee/RegisterEmployeeContainer";
import RegisterEmployerContainer from "./components/Login/Registration/Employer/RegisterEmployerContainer";
import EditVacancyContainer from "./components/Profile/MyVacancy/EditVacancy/EditVacancyContainer";
import RespondedListContainer from "./components/Profile/MyVacancy/RespondedList/RespondedListContainer";
import AdmLoginContainer from "./components/Login/AdminLogin/AdmLoginContainer";
import FeedbackContainer from "./components/Profile/Feedback/FeedbackContainer";
import WorkersListContainer from "./components/Profile/MyVacancy/WorkersList/WorkersListContainer";
import AdminPanelContainer from "./components/AdminPanel/AdminPanelContainer";
import MyWorksContainer from "./components/Profile/MyVacancy/MyWorks/MyWorksContainer";


const App = (props) => {


    return (
        <div className="App">
            <HeaderContainer/>
            <div className='content'>
                <Route path='/employee' render={() => <EmployeeContainer />}/>
                <Route path='/vacancy/:vacancyId' render={() => <VacancyContainer />}/>
                <Route path='/employer' render={() => <EmployerContainer/>}/>
                <Route path='/login' render={() => <LoginContainer/>}/>
                <Route path='/admin' render={() => <AdmLoginContainer/>}/>
                <Route path='/profile' render={() => <ProfileContainer/>}/>
                <Route path='/my-vacancy/' render={() => <MyVacancyContainer/>}/>
                <Route path='/edit-vacancy/:vacancyId' render={() => <EditVacancyContainer/>}/>
                <Route path='/register-employer' render={() => <RegisterEmployerContainer/>}/>
                <Route path='/register-employee' render={() => <RegisterEmployeeContainer/>}/>
                <Route path='/responded-list' render={() => <RespondedListContainer/>}/>
                <Route path='/feedback' render={() => <FeedbackContainer/>}/>
                <Route path='/my-workers' render={() => <WorkersListContainer/>}/>
                <Route path='/admin-panel' render={() => <AdminPanelContainer/>}/>
                <Route path='/my-works' render={() => <MyWorksContainer/>}/>
            </div>
            <Footer/>


        </div>
    );
}

export default App;
