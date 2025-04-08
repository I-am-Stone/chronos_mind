import apiLayer from "../apiLayer";
import { API_CONFIG } from "@/config/api.config";


export const GetHabitProfile = async () => {
    const response = await apiLayer.get(
        API_CONFIG.ENDPOINTS.HABIT_PROFILE,
        true,
        {}

    );
    return response;
}

