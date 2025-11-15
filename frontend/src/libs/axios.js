import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : "https://mop-management-system.onrender.com/",
    withCredentials : true,
})
