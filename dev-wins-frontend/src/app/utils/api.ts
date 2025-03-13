import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const special_sauce = localStorage.getItem("special_sauce");
    if (special_sauce) {
        config.headers.Authorization = `Bearer ${special_sauce}`;
    }
    return config;
});