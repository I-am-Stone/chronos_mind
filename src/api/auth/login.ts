import apiLayer from "../apiLayer";
import { API_CONFIG } from "@/config/api.config";

interface User {
    email: string;
    password: string;
}

export const login = async (User: User) => {
    const response = await apiLayer.request(
        API_CONFIG.ENDPOINTS.LOGIN,
        "POST",
        User,
        false
    );
    return response;
};