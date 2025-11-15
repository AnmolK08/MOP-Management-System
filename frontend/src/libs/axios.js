import axios from "axios";

const backendPort = import.meta.env.PORT || 8080;
const BACKEND_URL = import.meta.env.BACKEDND_URL || `http://localhost:${backendPort}`;
console.log("Backend URL:", backendPort);

export const axiosInstance = axios.create({
    baseURL : BACKEND_URL+"/",
    withCredentials : true,
})
