'use client';
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
    const [apiError, setApiError] = useState<string | null>(null);
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
        setApiError(null);
        
        if (!validateForm()) return;

        setLoading(true);

        try {
            const response = await register({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword
            });

            if (response.success) {
                router.push('/login?registrationSuccess=true');
            } else {
                setApiError(response.error || 'Registration failed. Please try again.');
            }
            
        } catch (error) {
            console.error("Registration error:", error);
            setApiError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
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
                    {apiError && (
                        <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
                            {apiError}
                        </div>
                    )}

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
                                {loading ? "Creating account..." : "Create Account"}
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
                    >
                        Sign in with Google
                    </Button>

                    <div className="text-center text-sm">
                        <span className="text-gray-600">Already have an account?</span>{' '}
                        <Link href="/login" className="text-orange-600 hover:text-orange-700 hover:underline font-medium">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default RegisterPage;