import { API_CONFIG } from "@/config/api.config";
import apiLayer from "../apiLayer";

export const UpdateProgress = async (goal_id: number, progress_increment: number) => {
    const response = await apiLayer.put(
        API_CONFIG.ENDPOINTS.UPDATE_PROGRESS.replace('{goal_id}', goal_id.toString()),
        { progress_increment},
        true
    );
    return response;
};