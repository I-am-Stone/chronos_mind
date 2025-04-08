import { API_CONFIG } from "@/config/api.config";
import apiLayer from "../apiLayer";

interface DeleteGoalResponse {
    success: boolean;
    message?: string;
    error?: string;
}

export const deleteGoal = async (goalId: number) => {
    const endpoint = API_CONFIG.ENDPOINTS.DELETE_GOAL.replace('{goal_id}', goalId.toString());

    const response: DeleteGoalResponse = await apiLayer.delete<DeleteGoalResponse>(
        endpoint,
        true
    );
    return response;
};