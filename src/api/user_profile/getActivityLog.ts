import { API_CONFIG } from "@/config/api.config";
import apiLayer from "@/api/apiLayer";

// Updated interface to match the actual response structure


export const getActivityLog = async () => {
    const response = await apiLayer.get(
        API_CONFIG.ENDPOINTS.GET_ACTIVITY,
        true, // Authentication required
        {} // Optional headers (empty object if not needed)
    );
    return response;
}