import apiLayer from "../apiLayer"
import { API_CONFIG } from "@/config/api.config";

export const GetGoals = async () => {
    const response = await apiLayer.request(
        API_CONFIG.ENDPOINTS.GET_GOALS,
        "GET",
        null,
        true
    );
    return response;
}
