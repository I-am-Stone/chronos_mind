import { API_CONFIG } from "@/config/api.config";

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    statusCode?: number;
}

const getAuthToken = (): string | null => localStorage.getItem("authToken");

const apiLayer = {
    async request<T>(
        endpoint: string,
        method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
        data?: any,
        authRequired: boolean = false,
        headers: Record<string, string> = {}
    ): Promise<ApiResponse<T>> {
        try {
            const url = `${API_CONFIG.BASE_URL}${endpoint}`;

            if (authRequired) {
                const token = getAuthToken();
                if (!token) {
                    return {
                        success: false,
                        error: "Authentication required but no token found.",
                        statusCode: 401
                    };
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
                let errorMessage = "An error occurred while processing your request.";
                let responseData;

                try {
                    responseData = await response.json();
                    if (responseData.error || responseData.message) {
                        errorMessage = responseData.error || responseData.message;
                    }
                } catch (e) {
                    errorMessage = response.statusText || errorMessage;
                }

                if (response.status === 401) {
                    console.error("Authentication failed: Invalid or expired token");
                    return {
                        success: false,
                        error: "Authentication failed. Please log in again.",
                        statusCode: 401
                    };
                } else if (response.status === 403) {
                    return {
                        success: false,
                        error: "You don't have permission to access this resource.",
                        statusCode: 403
                    };
                } else {
                    console.error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);

                    return {
                        success: false,
                        error: errorMessage,
                        statusCode: response.status
                    };
                }
            }
            const result = await response.json();
            return {
                success: true,
                data: result as T,
                statusCode: response.status
            };
        } catch (error: any) {
            console.error("API Service Error:", error.message);
            return {
                success: false,
                error: "Network or server error. Please check your connection and try again."
            };
        }
    },

    get<T>(endpoint: string, authRequired = false, headers = {}): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, "GET", undefined, authRequired, headers);
    },

    post<T>(endpoint: string, data: any, authRequired = false, headers = {}): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, "POST", data, authRequired, headers);
    },

    put<T>(endpoint: string, data: any, authRequired = false, headers = {}): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, "PUT", data, authRequired, headers);
    },

    delete<T>(endpoint: string, authRequired = false, headers = {}): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, "DELETE", undefined, authRequired, headers);
    }
};

export default apiLayer;