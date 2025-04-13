import apiLayer from "../apiLayer";
import { API_CONFIG } from "@/config/api.config";

interface User {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    user: {
        id: string;
        email: string;
    };
    error: string;
}

export const login = async (user: User) => {
    const response = await apiLayer.post<LoginResponse>(
        API_CONFIG.ENDPOINTS.LOGIN,
        user,
        false
    );

    if (response.success && response.data?.token) {
        localStorage.setItem("authToken", response.data.token);
    }

    console.log(response.error);

    return response;
};