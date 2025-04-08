import apiLayer from "@/api/apiLayer";
import { API_CONFIG } from "@/config/api.config";
import { backendGoal } from "@/app/dashboard/goals/_partials/goalType";

export const getGoals = async () => {
    const response = await apiLayer.get<backendGoal[]>(
        API_CONFIG.ENDPOINTS.GET_GOALS,
        true, // Authentication required
        {} // Optional headers (empty object if not needed)
    );
    return response;
}