import axios from 'axios'

export default axios.create({
    baseURL: `${process.env.VUE_APP_BASE_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
})