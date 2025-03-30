import { API_CONFIG } from "@/config/api.config";
import apiLayer from "../apiLayer";

interface User {
    username: string;
    email: string;
    password: string;
    confirmPassword: string
}
export const register = async (User: User) => {

    const response = await apiLayer.request(
        API_CONFIG.ENDPOINTS.REGISTER,
        "POST",
        User,
        false
    );
    return response;
};