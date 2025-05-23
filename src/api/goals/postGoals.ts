import apiLayer from "../apiLayer";
import { API_CONFIG } from "@/config/api.config";

interface GoalData {
    goal_title: string;
    description: string;
    difficulty: string;
    target_date: string;
    goal_type:String;
}


export const PostGoal = async (goal: GoalData) => {
    const response = await apiLayer.post(
        API_CONFIG.ENDPOINTS.POST_GOAL,
        goal,
        true,
    );
    return response;
};