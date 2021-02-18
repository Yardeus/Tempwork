import * as axios from "axios";

const instance = axios.create({
//настройки
    baseURL: 'http://localhost:8080/api/'
});

export const vacancyAPI = {
    getVacancy(currentPage = 1, pageSize = 3) {
        return instance.get(`vacancy?page=${currentPage}&size=${pageSize}`)
            .then(response => response.data)
    },
    getFilterVacancy(data,currentPage = 1, pageSize = 3) {
        return instance.post(`vacancy/filter`,{...data,currentPage, pageSize})
            .then(response => response.data)
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
    }
}

export const loginAPI = {
    singIn(type, login, password) {
        if (type === "employee") {
            return instance.post(`auth/employee/signin`, {
                login: login,
                password: password
            }).then(response => response.data)
        } else if (type === "employer") {
            return instance.post(`auth/employer/signin`, {
                login: login,
                password: password
            }).then(response => response.data)
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
    updateData(type,data) {
        if (type === "employer") {
            return instance.put(`employer`,{...data}).then(response => response.data)
        } else if (type === "employee") {
            return instance.put(`employee`,{...data}).then(response => response.data)
        }

    },

    myOneVacancy(vacancyId) {
        return instance.get(`vacancy/one?id=${vacancyId}`).then(response => response.data)
    },

    deleteVacancy(idVacancy, userId, type) {
        debugger
        if (type === "employer") {
            return instance.delete(`employer-list?id=${idVacancy}&idEmployer=${userId}`).then(response => response.data)
        }
    },
    updateStatus(status, idVacancy) {
        debugger

        return instance.put(`vacancy`, {
            status: status,
            idVacancy: idVacancy
        }).then(response => response.data)

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
}
export const agreementAPI = {
    createAgreement(data) {
        return instance.post(`agreement`,{...data}).then(response => response.data)
    },
    getData(idFind_Employer) {
        return instance.get(`employer-list/find?idFind_Employer=${idFind_Employer}`).then(response => response.data)
    },
    getStatus(idFind_Employer,idEmployer) {
        return instance.get(`agreement/status?idFind_Employer=${idFind_Employer}&idEmployer=${idEmployer}`).then(response => response.data)
    },
}
export const feedbackAPI = {
    getFeedbackEmployee(id) {
        return instance.get(`feedback/employee?id=${id}`).then(response => response.data)
    },
    sendFeedbackEmployee(data) {
        return instance.post(`feedback/employee`,{...data}).then(response => response.data)
    },
    getFeedbackEmployer(id) {
        return instance.get(`feedback/employer?id=${id}`).then(response => response.data)
    },
    sendFeedbackEmployer(data) {
        return instance.post(`feedback/employer`,{...data}).then(response => response.data)
    },
}

