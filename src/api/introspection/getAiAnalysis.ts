import ApiLayer from "@/api/apiLayer";
import { API_CONFIG } from "@/config/api.config";

export const getAiAnalysis = async () => {
    const response = await ApiLayer.request(
        API_CONFIG.ENDPOINTS.AI_SESSION,
        "GET",
        null,
        true
    );
    console.log(response)
    return response;
}