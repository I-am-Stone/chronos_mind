import apiLayer from "../apiLayer";
import { API_CONFIG } from "@/config/api.config";

interface GoalData {
    goal_title: string;
    description: string;
    difficulty: string;
    target_date: string;
}


export const PostGoal = async (goal: GoalData) => {
    const response = await apiLayer.request(
        API_CONFIG.ENDPOINTS.POST_GOAL,
        "POST",
        goal,
        true
    );
    return response;
};