import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : "https://mop-management-system.onrender.com/",
    withCredentials : true,
})

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const response = await axios.post("https://mop-management-system.onrender.com/auth/refresh" ,{}, {withCredentials : true});
                const { accessToken } = response.data;
                localStorage.setItem("token", accessToken);
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return axiosInstance(originalRequest);
            } catch (err) {
                localStorage.removeItem("token");
                window.location.href = "/login"; 
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);
