import { API_CONFIG } from "@/config/api.config";

export interface ApiResponse<T> {
    message?: string;
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
        data?: T,
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
            const contentType = response.headers.get("content-type");
            let responseData: any;

            if (response.status !== 204 && contentType?.includes("application/json")) {
                try {
                    responseData = await response.json();
                } catch (e) {
                    console.warn("Response claimed to be JSON but parsing failed:", e);
                    responseData = {};
                }
            } else {
                responseData = null;
            }

            // Handle non-OK response
            if (!response.ok) {
                let errorMessage = "An error occurred while processing your request.";

                if (typeof responseData === "object" && responseData !== null) {
                    errorMessage = responseData.message || responseData.error || "";

                    // Fallback to field-level error messages
                    if (!errorMessage) {
                        errorMessage = Object.entries(responseData)
                            .map(([field, messages]) => {
                                if (Array.isArray(messages)) {
                                    return `${field}: ${messages.join(", ")}`;
                                }
                                return `${field}: ${messages}`;
                            })
                            .join(" | ");
                    }
                }

                return {
                    success: false,
                    error: errorMessage,
                    statusCode: response.status
                };
            }

            return {
                success: true,
                data: responseData as T,
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

    post<T>(endpoint: string, data: T, authRequired = false, headers = {}): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, "POST", data, authRequired, headers);
    },

    put<T>(endpoint: string, data: T, authRequired = false, headers = {}): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, "PUT", data, authRequired, headers);
    },

    delete<T>(endpoint: string, authRequired = false, headers = {}): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, "DELETE", undefined, authRequired, headers);
    }
};

export default apiLayer;
