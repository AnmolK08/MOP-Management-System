import axios from "axios";

const backendPort = import.meta.env.PORT || 8080;
console.log("Backend URL:", backendPort);

export const axiosInstance = axios.create({
    baseURL : `http://localhost:${backendPort}/`,
    withCredentials : true,
})
