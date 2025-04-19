'use client';
import React from "react";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Activity, Mail, User, Lock, Eye, EyeOff } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { MotionAnimation } from '@/components/shared/animations/MotionAnimation';
import { register } from '@/api/auth/register';
import Link from 'next/link';
import { toast, Toaster } from 'sonner';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        } else if (formData.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        // Show validation errors as toast notifications
        if (Object.keys(newErrors).length > 0) {
            toast.error('Please fix the form errors', {
                description: Object.values(newErrors)[0],
                duration: 3000
            });
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));

        // Clear error when user starts typing
        if (errors[id]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[id];
                return newErrors;
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        // Show loading toast
        const loadingToast = toast.loading('Creating your account...', {
            duration: Infinity
        });

        setLoading(true);

        try {
            const response = await register({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword
            });

            toast.dismiss(loadingToast);

            if (response.success) {
                toast.success('Account created successfully!', {
                    description: 'Redirecting you to the login page...',
                    duration: 3000
                });

                setTimeout(() => {
                    router.push('/login');
                }, 1500);
            } else {
                // Handle API response errors
                handleApiErrors(response.error);
            }
        } catch (error) {
            console.error("Registration error:", error);
            toast.dismiss(loadingToast);

            // Improved error handling for network/unexpected errors
            const errorMessage = error instanceof Error ? error.message : 'Unable to connect to the server';

            toast.error('Connection error', {
                description: `${errorMessage}. Please check your internet connection and try again.`,
                duration: 5000
            });
        } finally {
            setLoading(false);
        }
    };

    // New function to handle different API error formats
    const handleApiErrors = (error: any) => {
        if (!error) {
            toast.error('Registration failed', {
                description: 'An unknown error occurred. Please try again.',
                duration: 5000
            });
            return;
        }

        let fieldErrors: Record<string, string> = {};

        // Case 1: Error is an object with field names as keys
        if (typeof error === 'object' && !Array.isArray(error)) {
            fieldErrors = error;
        }
        // Case 2: Error is a string in "field: message | field2: message2" format
        else if (typeof error === 'string' && error.includes('|')) {
            fieldErrors = error.split('|').reduce((acc, fieldError) => {
                const [field, message] = fieldError.trim().split(':');
                if (field && message) {
                    acc[field.trim()] = message.trim();
                }
                return acc;
            }, {} as Record<string, string>);
        }
        // Case 3: Error is a simple string with "field: message" format (single field)
        else if (typeof error === 'string' && error.includes(':')) {
            const [field, message] = error.trim().split(':');
            if (field && message) {
                fieldErrors[field.trim()] = message.trim();
            }
        }
        // Case 4: Error is a plain string message
        else if (typeof error === 'string') {
            // No specific field, show as general error
            toast.error('Registration failed', {
                description: error,
                duration: 5000
            });
            return;
        }

        // Update form errors state if we have field-specific errors
        if (Object.keys(fieldErrors).length > 0) {
            setErrors(fieldErrors);

            // Show the first error in the toast
            const firstField = Object.keys(fieldErrors)[0];
            const firstMessage = fieldErrors[firstField];

            toast.error('Registration failed', {
                description: `${firstField}: ${firstMessage}`,
                duration: 5000
            });
        } else {
            // Fallback for any other error format
            const errorMessage = typeof error === 'string' ? error : 'Registration failed. Please try again.';
            toast.error('Registration failed', {
                description: errorMessage,
                duration: 5000
            });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-50/30 flex flex-col items-center justify-center p-4 font-plus-jakarta">
                <MotionAnimation />
                <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(99,102,241,0.05),transparent)] pointer-events-none" />
                <div className="flex items-center gap-2 mb-8 group">
                    <Activity className="h-8 w-8 text-orange-600 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-2xl font-cabinet-grotesk tracking-wider text-gray-900">
                        Creating your account...
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-50/30 flex flex-col items-center justify-center p-4 font-plus-jakarta">
            <MotionAnimation />
            <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(99,102,241,0.05),transparent)] pointer-events-none" />
            <Toaster
                position="top-right"
                toastOptions={{
                    className: 'border border-gray-100',
                    style: {
                        fontSize: '14px'
                    }
                }}
            />
            <div className="flex items-center gap-2 mb-8 group">
                <Activity className="h-8 w-8 text-orange-600 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-2xl font-cabinet-grotesk tracking-wider text-gray-900">
                    Create Your Account
                </span>
            </div>

            <Card className="w-full max-w-md relative overflow-hidden bg-white/70 backdrop-blur-sm border-indigo-100">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-indigo-500/0 opacity-0 group-hover:opacity-100" />

                <CardHeader className="space-y-2 text-center">
                    <CardTitle className="text-2xl font-cabinet-grotesk">Join us today</CardTitle>
                    <CardDescription>Fill in your details to create your account</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Choose a username"
                                    className={`pl-10 border-indigo-100 focus:ring-indigo-500 ${errors.username ? 'border-red-300' : ''}`}
                                    value={formData.username}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    className={`pl-10 border-indigo-100 focus:ring-indigo-500 ${errors.email ? 'border-red-300' : ''}`}
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a strong password"
                                    className={`pl-10 pr-10 border-indigo-100 focus:ring-indigo-500 ${errors.password ? 'border-red-300' : ''}`}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                <Input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    className={`pl-10 pr-10 border-indigo-100 focus:ring-indigo-500 ${errors.confirmPassword ? 'border-red-300' : ''}`}
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                                >
                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-orange-500 hover:bg-orange-600 font-medium tracking-wide relative group overflow-hidden"
                            disabled={loading}
                        >
                            <span className="relative z-10">
                                Create Account
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/0 via-indigo-400/30 to-indigo-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <Separator className="w-full" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        className="w-full border-indigo-100 hover:bg-indigo-50"
                        onClick={() => {
                            toast.info('Google Sign-In', {
                                description: 'Google authentication is coming soon!',
                                duration: 3000
                            });
                        }}
                    >
                        Sign in with Google
                    </Button>

                    <div className="text-center text-sm relative z-10"> {/* Added z-index to ensure it's above other elements */}
                        <span className="text-gray-600">Already have an account?</span>{' '}
                        <Link
                            href="/login"
                            className="text-orange-600 hover:text-orange-700 hover:underline font-medium inline-block py-1"
                            onClick={(e) => {
                                // Optional: Add logging to verify click is registered
                                console.log(`Sign in link clicked ${e}`);
                                // You can add additional logic here if needed
                            }}
                        >
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default RegisterPage;