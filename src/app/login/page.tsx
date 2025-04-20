'use client'
import { useState } from 'react';
import React from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { MotionAnimation } from '@/components/shared/animations/MotionAnimation';
import { Activity, Mail, Eye, EyeOff, Lock } from 'lucide-react';
import { login } from '@/api/auth/login';
import { toast, Toaster } from 'sonner';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const validateForm = () => {
        let isValid = true;

        if (!email.trim()) {
            toast.error('Email required', {
                description: 'Please enter your email address',
                duration: 3000
            });
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            toast.error('Invalid email', {
                description: 'Please enter a valid email address',
                duration: 3000
            });
            isValid = false;
        }

        if (!password) {
            toast.error('Password required', {
                description: 'Please enter your password',
                duration: 3000
            });
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Show loading toast
        const loadingToast = toast.loading('Signing you in...', {
            duration: Infinity
        });

        setIsSubmitting(true);

        try {
            const response = await login({ email, password });

            toast.dismiss(loadingToast);

            if (response.success) {
                toast.success('Login successful', {
                    description: 'Welcome back! Redirecting to dashboard...',
                    duration: 3000
                });

                // Small delay to show the success message
                setTimeout(() => {
                    router.push('/dashboard/goals');
                }, 1000);
            } else {
                // Handle different error cases
                if (response.error?.includes('account not found')) {
                    toast.error('Account not found', {
                        description: 'No account exists with this email. Please check your email or sign up.',
                        duration: 5000
                    });
                } else if (response.error?.includes('incorrect password')) {
                    toast.error('Incorrect password', {
                        description: 'The password you entered is incorrect. Please try again.',
                        duration: 5000
                    });
                } else if (response.error?.includes('account locked')) {
                    toast.error('Account locked', {
                        description: 'Your account has been temporarily locked. Please reset your password or contact support.',
                        duration: 7000
                    });
                } else {
                    toast.error('Login failed', {
                        description: response.error || 'Please check your credentials and try again.',
                        duration: 5000
                    });
                }
            }
        } catch (error) {
            toast.dismiss(loadingToast);
            console.error('Login error', error);

            if (error instanceof Error && error.message.includes('network')) {
                toast.error('Connection error', {
                    description: 'Unable to connect to our servers. Please check your internet connection and try again.',
                    duration: 5000
                });
            } else if (error instanceof Error && error.message.includes('timeout')) {
                toast.error('Request timeout', {
                    description: 'The server took too long to respond. Please try again later.',
                    duration: 5000
                });
            } else {
                toast.error('Login error', {
                    description: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.',
                    duration: 5000
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleForgotPassword = (e: React.MouseEvent) => {
        e.preventDefault();
        toast.info('Password reset', {
            description: 'Password reset functionality coming soon!',
            duration: 3000
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50/30 flex flex-col items-center justify-center p-4 font-plus-jakarta">
            <MotionAnimation />
            <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(56,189,248,0.05),transparent)] pointer-events-none" />

            {/* Logo Section */}
            <div className="flex items-center gap-2 mb-8 group">
                <Activity className="h-8 w-8 text-orange-500 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-2xl font-cabinet-grotesk tracking-wider text-gray-900">
                    Chronos Mind
                </span>
            </div>

            <Toaster
                position="top-right"
                toastOptions={{
                    className: 'border border-gray-100 shadow-md',
                    style: {
                        fontSize: '14px'
                    }
                }}
            />

            {/* Login Card */}
            <Card className="w-full max-w-md relative overflow-hidden bg-white/70 backdrop-blur-sm">
                <CardHeader className="space-y-2 text-center">
                    <CardTitle className="text-2xl font-cabinet-grotesk">Welcome back</CardTitle>
                    <CardDescription>Enter your email to sign in to your account</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    className="pl-10"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    className="tracking-wider pl-10 pr-10"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                    onClick={togglePasswordVisibility}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <span className="text-sm text-gray-600">Remember me</span>
                            </label>
                            <a
                                href="#"
                                className="text-sm text-orange-600 hover:text-orange-700 hover:underline"
                                onClick={handleForgotPassword}
                            >
                                Forgot password?
                            </a>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-orange-500 hover:bg-orange-600 font-medium tracking-wide relative group overflow-hidden"
                            disabled={isSubmitting}
                        >
                            <span className="relative z-10">
                                {isSubmitting ? "Signing in..." : "Sign in"}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-orange-400/30 to-orange-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    {/* Social Login */}
                    <Button
                        variant="outline"
                        className="w-full relative group"
                        onClick={() => {
                            toast.info('Google Sign-In', {
                                description: 'Google authentication is coming soon!',
                                duration: 3000
                            });
                        }}
                    >
                        <span className="relative z-10">Google</span>
                    </Button>

                    {/* Sign Up Link */}
                    <div className="text-center text-sm">
                        <span className="text-gray-600">Don't have an account?</span>{' '}
                        <Link href="/register" className="text-orange-600 hover:text-orange-700 hover:underline font-medium">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginPage;