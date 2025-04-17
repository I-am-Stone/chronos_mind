// context/authContext.tsx
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { login as loginService } from "@/api/auth/login";
import { register as registerService } from "@/api/auth/register";
import apiLayer from "@/api/apiLayer";
import { API_CONFIG } from '@/config/api.config';

// Define types for our context
interface User {
    id: string;
    email: string;
    // Add any other user properties you need
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    register: (username: string, email: string, password: string, confirmPassword: string) => Promise<boolean>;
    checkAuthStatus: () => Promise<void>;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: false,
    error: null,
    login: async () => false,
    logout: () => {},
    register: async () => false,
    checkAuthStatus: async () => {},
    isAuthenticated: false,
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    // Check if user is already logged in on mount
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("authToken");

            if (!token) {
                setIsAuthenticated(false);
                setUser(null);
                return;
            }

            // Verify token and get current user data
            const response = await apiLayer.get(
                API_CONFIG.ENDPOINTS.CURRENT_USER,
                true // Requires authentication
            );

            if (response.success && response.data) {
                setUser(response.data);
                setIsAuthenticated(true);
            } else {
                // Token is invalid or expired
                localStorage.removeItem("authToken");
                setIsAuthenticated(false);
                setUser(null);
            }
        } catch (err) {
            console.error("Auth check failed:", err);
            localStorage.removeItem("authToken");
            setIsAuthenticated(false);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (email: string, password: string): Promise<boolean> => {
        try {
            setLoading(true);
            setError(null);

            const response = await loginService({
                email,
                password
            });

            if (response.success && response.data) {
                setUser(response.data.user);
                setIsAuthenticated(true);
                return true;
            } else {
                setError(response.error || "Login failed");
                return false;
            }
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        setUser(null);
        setIsAuthenticated(false);
    };

    const handleRegister = async (
        username: string,
        email: string,
        password: string,
        confirmPassword: string
    ): Promise<boolean> => {
        try {
            setLoading(true);
            setError(null);

            const response = await registerService({
                username,
                email,
                password,
                confirmPassword
            });

            if (response.success) {
                // Some systems might return a token upon registration
                // If your API does, you can auto-login here
                // Otherwise, user will need to login separately
                return true;
            } else {
                setError(response.error || "Registration failed");
                return false;
            }
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            error,
            login: handleLogin,
            logout,
            register: handleRegister,
            checkAuthStatus,
            isAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);