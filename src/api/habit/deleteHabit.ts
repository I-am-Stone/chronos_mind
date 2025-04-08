import { API_CONFIG } from "@/config/api.config";
import apiLayer from "../apiLayer";

interface DeleteGoalResponse {
    success: boolean;
    message?: string;
    error?: string;
}

export const deleteHabit = async (habit_id: number) => {
    const endpoint = API_CONFIG.ENDPOINTS.DELETE_HABIT.replace('{id}', habit_id.toString());

    const response: DeleteGoalResponse = await apiLayer.delete<DeleteGoalResponse>(
        endpoint,
        true
    );
    return response;
};