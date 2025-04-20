import {API_CONFIG} from "@/config/api.config";
import apiLayer from "@/api/apiLayer";



interface goal {
    goal_title: string;
    description: string;
    target_date: string;
    goal_type: string;
}

export const updateGoal = async (goalId: number, goal: goal) => {
    return await apiLayer.request(
        API_CONFIG.ENDPOINTS.UPDATE_GOAL.replace('{goal_id}', goalId.toString()),
        "PUT",
        goal,
        true
    );
}