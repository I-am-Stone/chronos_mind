import {API_CONFIG} from "@/config/api.config";
import ApiLayer, {ApiResponse} from "@/api/apiLayer";

interface UpdateGoalResponse {
    success: boolean;
    message: string;
}

interface goal {
    goal_title: string;
    description: string;
    target_date: string;
    goal_type: string;
}

export const updateGoal = async (goalId: number, goal: goal) => {
    const response:ApiResponse<UpdateGoalResponse> = await ApiLayer.request(
        API_CONFIG.ENDPOINTS.UPDATE_GOAL.replace('{goal_id}', goalId.toString()),
        "PUT",
        goal,
        true
    );
    return response;
}