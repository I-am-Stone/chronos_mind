import apiLayer from "../apiLayer";
import { API_CONFIG } from "@/config/api.config";


export const GetGoalProfile = async () => {
    const response = await apiLayer.request(
        API_CONFIG.ENDPOINTS.STREAK,
        "GET",
        null,
        true
    );
    return response;
}

