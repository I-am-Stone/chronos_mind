import { API_CONFIG } from "@/config/api.config";
import apiLayer from "../apiLayer";

interface User {
    username: string;
    email: string;
    password: string;
    confirmPassword: string
}
export const register = async (User: User) => {

    const response = await apiLayer.post(
        API_CONFIG.ENDPOINTS.REGISTER,
        User,
        false,
    );
    console.log(response);
    return response;
};