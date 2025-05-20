import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (token) {
            prom.resolve(token);
        } else {
            prom.reject(error);
        }
    });
    failedQueue = [];
};

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = "Bearer " + token;
    }
    return config;
},
)

api.interceptors.response.use(
    (response) => response,
    async (err) => {
        const originalRequest = err.config;

        if (err.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                        originalRequest.headers.Authorization = "Bearer " + token;
                        return api(originalRequest);
                    })
            }
            
            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");
                if (!refreshToken) {
                    throw new Error("Refresh token not found.");
                }
                const response = await axios.post("http://localhost:5000/api/refresh", { refreshToken });
                const data = response.data;
                localStorage.setItem("accessToken", data);

                api.defaults.headers.common.Authorization = `Bearer ${data}`;
                processQueue(null, data);

                return api(originalRequest);
            } catch (error) {
                processQueue(error, null);

                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                return Promise.reject(error);
            }
        }
        
        return Promise.reject(err);
    }
);

export default api;