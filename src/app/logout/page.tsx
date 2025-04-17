// pages/logout.tsx or app/logout/page.tsx depending on your Next.js setup
'use Client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { LogOut } from 'lucide-react';

// Assuming you're using some auth management like Auth Context or a library
import {useAuth} from "@/context/authContext";

export default function LogoutPage() {
    const router = useRouter();
    const { logout } = useAuth();

    useEffect(() => {
        const performLogout = async () => {
            try {
                await logout();
                // Redirect to login page after successful logout
                router.push('/login');
            } catch (error) {
                console.error('Logout failed:', error);
                // Display error message or handle failed logout
            }
        };

        performLogout();
    }, [logout, router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
            <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <div className="flex flex-col items-center text-center">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                        <LogOut className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h1 className="mt-4 text-2xl font-bold font-vt323 text-gray-900 dark:text-white">Logging Out...</h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400 font-vt323">
                        Thanks for using Goal Master!
                    </p>
                </div>
                <div className="flex justify-center">
                    <div className="w-16 h-1 bg-indigo-500 animate-pulse rounded-full"></div>
                </div>
            </div>
        </div>
    );
}