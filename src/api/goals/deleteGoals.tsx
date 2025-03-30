import { API_CONFIG } from "@/config/api.config";
import apiLayer from "../apiLayer";

export const DeleteGoal = async (goal_id: number) => {
    const response = await apiLayer.request(
        API_CONFIG.ENDPOINTS.DELETE_GOAL.replace('{goal_id}', goal_id.toString()),
        "DELETE",
        null,
        true
    );
    return response;
};