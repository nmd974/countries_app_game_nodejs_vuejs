import api from './api'

//collection of request to API for computer
export default {
    index() {
        return api.get('/')
    },
    getDetailsCountry(code) {
        return api.get(`/country/${code}`)
    },
    getCountriesGame() {
        return api.get(`/game`)
    }
}