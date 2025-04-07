import {API_CONFIG} from "@/config/api.config";
import ApiLayer from "@/api/apiLayer";

export const GetGoalStats = async () => {
    const response = await ApiLayer.request(
        API_CONFIG.ENDPOINTS.GOAL_STATS,
        "GET",
        null,
        true
    );
    return response;
}