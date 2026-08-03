import axios from "axios";
import { store } from "../src/redux/store";

const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true
});

api.interceptors.request.use((config) => {
    const state = store.getState();
    const userId = state?.user?.userData?._id;
    if (userId) {
        config.headers["x-user-id"] = userId;
    }
    return config;
});

export default api;
