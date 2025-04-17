'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Updated import for App Router
import { LogOut } from 'lucide-react';
import { useAuth } from "@/context/authContext";

export default function LogoutPage() {
    const router = useRouter();
    const { logout } = useAuth();

    useEffect(() => {
        const performLogout = async () => {
            try {
                // Call the logout function from auth context
                logout(); // Note: Your logout implementation is synchronous

                // Small delay to ensure state updates before redirect
                setTimeout(() => {
                    router.push('/login');
                }, 500);
            } catch (error) {
                console.error('Logout failed:', error);
                // Since we're catching any potential errors, we should still redirect
                router.push('/login');
            }
        };

        performLogout();
    }, [logout, router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
            <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <div className="flex flex-col items-center text-center">
                    <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                        <LogOut className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Logging Out...</h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Thanks for using Healthy Task Manager!
                    </p>
                </div>
                <div className="flex justify-center">
                    <div className="w-16 h-1 bg-orange-500 animate-pulse rounded-full"></div>
                </div>
            </div>
        </div>
    );
}