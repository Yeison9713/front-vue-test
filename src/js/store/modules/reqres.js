import axios from "axios"

export default {
    namespaced: true,
    state: {
        api: 'https://reqres.in/api/'
    },
    getters: {
        get_api: (state) => state.api,
        get_token: () => {
            let token = "{}"
            if (localStorage?.reto_tech) token = localStorage?.reto_tech;
            else if (sessionStorage?.reto_tech) token = sessionStorage?.reto_tech;

            return JSON.parse(token || {})?.token || ""
        }
    },
    actions: {
        get_users(state, page = 1) {
            return new Promise(async (resolve, reject) => {
                let url = state.state.api + 'users?page=' + page
                let token = state.getters.get_token

                axios({ method: 'GET', url, headers: { Authorization: token } })
                    .then(response => {
                        resolve({ success: true, data: response.data })
                    })
                    .catch(error => {
                        console.log("Get users: ", error)
                        reject({ success: false, data: null })
                    })
            })
        },
        create_user(state, data) {
            return new Promise((resolve, reject) => {
                let url = state.state.api + "users"
                let token = state.getters.get_token

                axios({ method: 'POST', url, data: { ...data }, headers: { Authorization: token } })
                    .then(res => {
                        resolve({ success: true, data: res.data })
                    }).catch(error => {
                        console.log("Create user: ", error)
                        reject({ success: false, data: null })
                    })
            })
        },
        login(state, data) {
            return new Promise((resolve, reject) => {
                let url = state.state.api + "login"

                axios.post(url, {
                    ...data
                }).then(res => {
                    resolve({ success: true, data: res.data })
                }).catch(error => {
                    console.log("Create user: ", error)
                    reject({ success: false, data: null })
                })
            })
        }
    }
}