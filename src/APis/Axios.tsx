import axios, {
    AxiosError,
    type AxiosResponse,
    type InternalAxiosRequestConfig,
} from "axios";

const api = axios.create({
    baseURL: "https://multi-vendors-989.saied.aait-d.com/api",
});

// Request Interceptor
api.interceptors.request.use(
    (
        request: InternalAxiosRequestConfig
    ): InternalAxiosRequestConfig => {
        const token = localStorage.getItem('token_bablyon');
        if (token) {
            request.headers.Authorization = `Bearer ${token}`;
        }
        return request;
    },
    (error: AxiosError): Promise<AxiosError> => {
        return Promise.reject(error);
    }
);

// Response Interceptor
api.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => response,

    (error: AxiosError): Promise<AxiosError> => {
        const status = error.response?.status;

        if (status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token_bablyon');
            window.location.href = "/login";
        }

        if (status === 404) {
            window.location.href = "/404";
        }

        if (status === 500) {
            window.location.href = "/500";
        }

        if (status === 403) {
            window.location.href = "/403";
        }

        return Promise.reject(error);
    }
);

export default api;