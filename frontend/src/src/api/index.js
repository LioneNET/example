import axios from "axios";

const jsonApi = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    withCredentials: false,
    headers: {
        accept: "application/json",
    },
    transformRequest: [
        function(data, headers) {
            return data;
        }, ...axios.defaults.transformRequest
    ],
});

export default jsonApi