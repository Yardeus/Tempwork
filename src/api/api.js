import * as axios from "axios";
import {Redirect} from "react-router-dom";
import React from "react";


const instance = axios.create({
//настройки
    baseURL: 'http://localhost:8080/api/',

});

const setHeaderAuth = (token) => {
    return {headers: {Authorization: `${token}`}}
}
const handleErrors = (err) => {
    if (err.response) {
        console.log("Problem with response", err.response.status)
        let data = {message: "not found"}
        return (err.response.status)
    } else if (err.request) {
        console.log("Problem with request")
        return (err.response.status)
    } else {
        console.log("Error", err.message)
        return (err.response.status)
    }
}

export const vacancyAPI = {
    getVacancy(currentPage = 1, pageSize = 3, type) {
        return instance.get(`vacancy?page=${currentPage}&size=${pageSize}&type=${type}`)
            .then(response => response.data)
    },
    getFilterVacancy(data, currentPage = 1, pageSize = 3, type) {
        return instance.post(`vacancy/filter`, {...data, currentPage, pageSize, type})
            .then(response => response.data)
            .catch(error => error.response.status)
    },

    respondVacancy(idVacancy, userId) {
        return instance.post(`employer-list`, {
            id_find_employer: idVacancy,
            id_employer: userId
        })
            .then(response => response.data)
    },
    newVacancy(userId, data) {

        debugger
        return instance.post(`vacancy`, {
            id_jobs: data.specialisations,
            id_employee: userId,
            start_work: data.startDate,
            end_work: data.endDate,
            start_time: data.startTime,
            end_time: data.endTime,
            price: data.price,
            quantity: data.count,
            description: data.description,
            city: data.city,
            adress: data.adress
        })
            .then(response => response.data)
    },
    closeVacancy(idFind_Employer, idEmployee) {
        return instance.put(`vacancy`, {
            idFind_Employer: idFind_Employer,
            idEmployee: idEmployee
        })
            .then(response => response.data)
    },
    updateVacancy(data) {
        return instance.put(`vacancy/data`, {
            idFind_Employer: data.idFind_Employer,
            Price: data.Price,
            Quantity: data.Quantity,
            Description: data.Description,
            Start_Time: data.Start_Time,
            End_Time: data.End_Time
        })
            .then(response => response.data)
    },

    getEmployerListFromVacancyId(idFind_Employer) {
        return instance.get(`employer-list/find?idFind_Employer=${idFind_Employer}`)
            .then(response => response.data)
    },
    getWorkersListFromVacancyId(idFind_Employer) {
        return instance.get(`employer-list/workers?idFind_Employer=${idFind_Employer}`)
            .then(response => response.data)
    },
    getFavoriteVacancy(idEmployer) {
        return instance.get(`vacancy/favorite?idEmployer=${idEmployer}`)
            .then(response => response.data)
            .catch(error => error.response.status)
    },
    addFavoriteVacancy(data) {
        return instance.post(`vacancy/favorite`,{...data})
            .then(response => response.data)
            .catch(error => error.response.status)
    },
    deleteFavoriteVacancy(data) {
        return instance.delete(`vacancy/favorite?idVacancy=${data.idVacancy}&idEmployer=${data.idEmployer}`)
            .then(response => response.data)
            .catch(error => error.response.status)
    }
}

export const loginAPI = {
    singIn(type, login, password) {
        if (type === "employee") {
            return instance.post(`auth/employee/signin`, {
                login: login,
                password: password
            }).then(response => response.data)
                .catch(error => error.response.status)
        } else if (type === "employer") {
            return instance.post(`auth/employer/signin`, {
                login: login,
                password: password
            }).then(response => response.data)
                .catch(error => error.response.status)
        } else if (type === "admin") {
            return instance.post(`auth/admin/signin`, {
                login: login,
                password: password
            }).then(response => response.data)
                .catch(handleErrors)
        }
    },
    singUp(type, data) {
        if (type === "employee") {
            return instance.post(`auth/employee/signup`, {
                organization_name: data.organization_name,
                first_name: data.first_name,
                surname: data.surname,
                middle_name: data.middle_name,
                city: data.city,
                phone_number: data.phone_number,
                e_mail: data.e_mail,
                login: data.login,
                password: data.password
            }).then(response => response.data)
                .catch(error => error.response.status)
        } else if (type === "employer") {
            return instance.post(`auth/employer/signup`, {
                first_name: data.first_name,
                surname: data.surname,
                middle_name: data.middle_name,
                birthday: data.birthday,
                city: data.city,
                profession: data.profession,
                description: data.description,
                sex: data.sex,
                phone_number: data.phone_number,
                e_mail: data.e_mail,
                login: data.login,
                password: data.password
            }).then(response => response.data)
                .catch(error => error.response.status)
        }
    },
    me(token) {
        return instance.get(`auth/employee/me`, {
            headers: {
                "Authorization": token
            }
        })
            .then(response => response.data)
    }
}

export const profileAPI = {
    getProfile(type, id_user) {
        if (type === "employee") {
            return instance.get(`employee/one?id=${id_user}`).then(response => response.data)
        } else if (type === "employer") {
            return instance.get(`employer/one?id=${id_user}`).then(response => response.data)
        }
    },
    myVacancy(id_user, type) {
        if (type === "employer") {
            return instance.get(`employer-list/employer?id_employer=${id_user}`).then(response => response.data)
        } else if (type === "employee") {
            return instance.get(`vacancy/employee?id=${id_user}`).then(response => response.data)
        }

    },
    updateData(type, data) {
        if (type === "employer") {
            return instance.put(`employer`, {...data}).then(response => response.data)
        } else if (type === "employee") {
            return instance.put(`employee`, {...data}).then(response => response.data)
        }

    },

    myOneVacancy(vacancyId) {
        return instance.get(`vacancy/one?id=${vacancyId}`).then(response => response.data)
    },

    deleteVacancy(idVacancy, userId, type) {
        if (type === "employer") {
            return instance.delete(`employer-list?id=${idVacancy}&idEmployer=${userId}`).then(response => response.data)
        }
    },
    myWorks(idEmployer) {
        return instance.get(`employer-list/works?idEmployer=${idEmployer}`).then(response => response.data)

    },
    saveAvatar(type, avatar, id) {
        const formData = new FormData();
        formData.append("image", avatar)
        formData.append("id", id)
        if (type === "employer") {
            return instance.put(`employer/image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => response.data)
        } else if (type === "employee") {
            return instance.put(`employee/image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => response.data)
        }

    }
}

export const jobsAPI = {
    getAllJobs() {
        return instance.get(`jobs`).then(response => response.data)
    },
    getProfessions() {
        return instance.get(`jobs/professions`).then(response => response.data)
    },
    getSpecialisations(profession) {
        return instance.get(`jobs/specialisations?profession=${profession}`).then(response => response.data)
    },
    addJobs(data) {
        return instance.post(`jobs`, {...data}).then(response => response.data)
    },
    deleteJobs(id) {
        return instance.delete(`jobs?id=${id}`).then(response => response.data)
    }
}
export const agreementAPI = {
    createAgreement(data) {
        return instance.post(`agreement`, {...data}).then(response => response.data)
    },
    getData(idFind_Employer) {
        return instance.get(`agreement/find?idFind_Employer=${idFind_Employer}`).then(response => response.data)
    },
    getStatus(idFind_Employer, idEmployer) {
        return instance.get(`agreement/status?idFind_Employer=${idFind_Employer}&idEmployer=${idEmployer}`).then(response => response.data)
    },
}


export const cityAPI = {
    getCities(token) {
        return instance.get(`city`,setHeaderAuth(token)).then(response => response.data)
    }
}
export const sheduleAPI = {
    getShedules() {
        return instance.get(`shedule`).then(response => response.data)
    }
}
export const experienceAPI = {
    getExperiences() {
        return instance.get(`experience`).then(response => response.data)
    }
}
export const typeVacancyAPI = {
    getTypesVacancy() {
        return instance.get(`typeVacancy`).then(response => response.data)
    }
}
export const reportsAPI = {
    getReports() {
        return instance.get(`reports`).then(response => response.data)
            .catch(error => error.response.status)
    },
    getCodesReport() {
        return instance.get(`reports/codes`).then(response => response.data)
            .catch(error => error.response.status)
    },
    sendReport(data) {
        return instance.post(`reports`,{...data}).then(response => response.data)
            .catch(error => error.response.status)
    }
}

export const messagesAPI = {
    getChatsUser(data) {
        return instance.get(`chat?idUser=${data.idUser}&typeUser=${data.typeUser}`).then(response => response.data)
    },
    getMessages(idChat) {
        return instance.get(`messages?idChat=${idChat}`)
            .then(response => response.data)
            .catch(error => error.response.status)
    },
    sendMessage(data) {
        return instance.post(`messages`, {...data}).then(response => response.data)
    },
    createChat(data) {
        return instance.post(`chat`, {...data}).then(response => response.data)
            .catch(error => error.response.status)
    }
}
export const feedbackAPI = {
    getFeedbackEmployee(id) {
        return instance.get(`feedback/employee?id=${id}`).then(response => response.data)
            .catch(error => error.response.status)
    },
    sendFeedbackEmployee(data) {
        return instance.post(`feedback/employee`, {...data}).then(response => response.data)
            .catch(error => error.response.status)
    },
    getFeedbackEmployer(id) {
        return instance.get(`feedback/employer?id=${id}`).then(response => response.data)
            .catch(error => error.response.status)
    },
    sendFeedbackEmployer(data) {
        return instance.post(`feedback/employer`, {...data}).then(response => response.data)
            .catch(error => error.response.status)
    },
    getFeedbacks(type) {
        return instance.get(`feedback?type=${type}`).then(response => response.data)
            .catch(error => error.response.status)
    },
    deleteFeedback(type, id) {
        return instance.delete(`feedback?type=${type}&id=${id}`).then(response => response.data)
            .catch(error => error.response.status)
    }
}

export const adminAPI = {
    getEmployerList(currentPage = 1, pageSize = 5) {
        return instance.get(`employer?page=${currentPage}&size=${pageSize}`)
            .then(response => response.data)
    },
    getEmployeeList(currentPage = 1, pageSize = 5) {
        return instance.get(`employee?page=${currentPage}&size=${pageSize}`)
            .then(response => response.data)
    },
    banEmployer(idUser, currentPage = 1, pageSize = 5) {
        return instance.put(`employer/ban`, {
            idUser: idUser,
            page: currentPage,
            size: pageSize
        })
            .then(response => response.data)
    },
    banEmployee(idUser, currentPage = 1, pageSize = 5) {
        return instance.put(`employee/ban`, {
            idUser: idUser,
            page: currentPage,
            size: pageSize
        })
            .then(response => response.data)
    },
    closeVacancy(id) {
        return instance.put(`vacancy/admin`, {
            idFind_Employer: id

        })
            .then(response => response.data)
    },

}

