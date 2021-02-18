import employeeReducer from "./employee-reducer";
import employerReducer from "./employer-reducer";



let store = {
    _state : {
        employeePage: {
            vacancyData: [
                {id: 0, company: 'HQD', date: '29.11.2020', description: 'Good job', price: '55.000'},
                {id: 1, company: 'Apple', date: '30.11.2020', description: 'Perfect job', price: '29.000'},
                {id: 2, company: 'Samsung', date: '31.11.2020', description: 'Welcome', price: '25.000'},
                {id: 3, company: 'Huawei', date: '04.11.2020', description: 'Common', price: '23.000'},
                {id: 4, company: 'Samsung', date: '29.11.2020', description: 'Welcome', price: '75.000'},
                {id: 5, company: 'HQD', date: '30.11.2020', description: 'Good job', price: '35.000'},
                {id: 6, company: 'Apple', date: '30.11.2020', description: 'Perfect job', price: '60.000'}
            ]
        },

        employerPage: {
            newText: {
                id: 0,
                company: 'Компания',
                date: '10.12.2020',
                description: 'your text',
                price: 'price'
            }

        }

    },
    _callSubscriber() {
        console.log('state changed')
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer; //observer pattern (наблюдатель)
    },

    dispatch(action){


        this._state = employerReducer(this._state, action);
        this._state = employeeReducer(this._state, action);

        this._callSubscriber(this._state);


    }
}


export default store;
window.store = store;