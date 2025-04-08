import apiLayer from "../apiLayer";
import { API_CONFIG } from "@/config/api.config";


export const GetGoalProfile = async () => {
    const response = await apiLayer.get(
        API_CONFIG.ENDPOINTS.GOAL_PROFILE,
        true,
        {}

    );
    return response;
}

