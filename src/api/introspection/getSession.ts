import apiLayer from "../apiLayer";
import { API_CONFIG } from "@/config/api.config";

interface SessionIntrospection {
    id: number;
    timestamp: string;
    working_memory: number;
    processing_speed: number;
    attentional_control: number;
    cognitive_flexibility: number;
    metacognition: number;
    emotional_valence: number;
    emotional_arousal: number;
    emotional_regulation: number;
    observations: string;
    environmental_factors: string;
    physical_state: string;
    user: number;
}

export const getSessions = async (): Promise<SessionIntrospection[]> => {
    try {
        const response = await apiLayer.get<SessionIntrospection[]>(
            API_CONFIG.ENDPOINTS.GET_SESSION,
            true,
            {}
        );
        return response.data || [];
    } catch (error) {
        console.error("Failed to fetch session data:", error);
        return [];
    }
};