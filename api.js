const axios = require("axios");

module.exports = axios.create({
    baseURL: `https://countries.trevorblades.com/`,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});