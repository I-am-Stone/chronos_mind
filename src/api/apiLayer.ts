import { API_CONFIG } from "@/config/api.config";

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

const getAuthToken = (): string | null => localStorage.getItem("authToken");

const apiLayer = {
    async request<T>(
        endpoint: string,
        method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
        data?: T,
        authRequired: boolean = false,
        headers: Record<string, string> = {}
    ): Promise<ApiResponse<T>> {
        try {
            const url = `${API_CONFIG.BASE_URL}${endpoint}`;

            if (authRequired) {
                const token = getAuthToken();
                if (!token) {
                    return { success: false, error: "Authentication required but no token found." };
                }
            }

            const options: RequestInit = {
                method,
                headers: {
                    "Content-Type": "application/json",
                    ...headers,
                },
            };

            if (authRequired) {
                const token = getAuthToken();
                options.headers = {
                    ...options.headers,
                    Authorization: `Token ${token}`,
                };
            }

            if (data) {
                options.body = JSON.stringify(data);
            }

            const response = await fetch(url, options);
            if (!response.ok) {
                console.error(`HTTP error! Status: ${response.status}`);
            }

            const result: T = await response.json();
            return { success: true, data: result };
        } catch (error: any) {
            console.error("API Service Error:", error.message);
            return { success: false, error: error.message };
        }
    },
};

export default apiLayer;