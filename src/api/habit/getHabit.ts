import ApiLayer from "@/api/apiLayer";
import { API_CONFIG } from "@/config/api.config";

export const getHabit = async () => {
    const response = await ApiLayer.request(
        API_CONFIG.ENDPOINTS.GET_HABITS,
        "GET",
        null,
        true
    );
    return response;
}