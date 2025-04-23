// /api/goals/subtaskDelete.ts
import ApiLayer from "@/api/apiLayer";
import { API_CONFIG } from "@/config/api.config";

interface DeleteSubtaskResponse {
    success: boolean;
    message?: string;
    error?: string;
}

export const subtaskDelete = async (subTaskID: number) => {
    const endpoint = API_CONFIG.ENDPOINTS.DELETE_SUB_TASK.replace('{id}', subTaskID.toString());

    const response: DeleteSubtaskResponse = await ApiLayer.request(
        endpoint,
        "DELETE",
        {},
        true
    );
    return response;
};