'use client'
import React from 'react';
import { Trophy, Zap, Target, Heart, Brain, Star, BarChart2, ChevronRight } from 'lucide-react';
import SidebarLayout from "@/components/shared/sidebar/layout";
const UserManualPage = () => {
    return (
        <>
        <SidebarLayout>
        <div className="min-h-screen p-6" style={{
            backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(245, 243, 255, 1) 0%, rgba(255, 250, 240, 1) 90%)',
            backgroundAttachment: 'fixed'
        }}>
            <div className="max-w-4xl mx-auto">
                {/* Header with dual-tone gradient */}
                <div className="text-center mb-12 pt-8">
                    <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-orange-500 mb-4">
                        LEVEL UP YOUR LIFE
                    </h1>
                    <p className="text-xl text-purple-600 italic font-medium">Your personal quest for greatness begins here</p>
                </div>

                {/* Main content */}
                <div className="space-y-10">
                    {/* Intro card */}
                    <div className="bg-white rounded-2xl p-8 border-2 border-purple-100 shadow-lg relative overflow-hidden">
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-100 rounded-full blur-3xl"></div>
                        <h2 className="text-3xl font-bold mb-4 text-purple-800">WELCOME, ADVENTURER</h2>
                        <p className="text-gray-800 text-lg leading-relaxed">
                            This is not just a tool – it's your companion on the journey to becoming your best self.
                            Set out on quests, forge powerful habits, and watch as you transform day by day.
                            <span className="block mt-4 text-orange-600 font-semibold">The only limit is your imagination.</span>
                        </p>
                    </div>

                    {/* Game mechanics grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Account Creation */}
                        <div className="bg-white backdrop-blur-sm rounded-2xl p-6 transform transition-all duration-300 hover:scale-[1.02] border-2 border-purple-50 hover:border-purple-200 hover:shadow-xl group">
                            <div className="flex items-center mb-4">
                                <div className="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-200 transition-colors">
                                    <Trophy className="text-purple-600 w-6 h-6 group-hover:text-purple-700" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 ml-4">Begin Your Journey</h3>
                            </div>
                            <p className="text-gray-600">Create your unique player profile and step into a world where every achievement matters.</p>
                        </div>

                        {/* Goals/Quests */}
                        <div className="bg-white rounded-2xl p-6 transform transition-all duration-300 hover:scale-[1.02] border-2 border-orange-50 hover:border-orange-200 hover:shadow-xl group">
                            <div className="flex items-center mb-4">
                                <div className="bg-orange-100 p-3 rounded-lg group-hover:bg-orange-200 transition-colors">
                                    <Target className="text-orange-600 w-6 h-6 group-hover:text-orange-700" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 ml-4">Epic Quests</h3>
                            </div>
                            <p className="text-gray-600">Embark on meaningful quests that align with your life goals. Each completion brings rewards and growth.</p>
                        </div>

                        {/* Habits */}
                        <div className="bg-white rounded-2xl p-6 transform transition-all duration-300 hover:scale-[1.02] border-2 border-purple-50 hover:border-purple-200 hover:shadow-xl group">
                            <div className="flex items-center mb-4">
                                <div className="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-200 transition-colors">
                                    <Heart className="text-purple-600 w-6 h-6 group-hover:text-purple-700" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 ml-4">Forge Habits</h3>
                            </div>
                            <p className="text-gray-600">Build powerful daily routines that strengthen your character. Small consistent actions lead to remarkable results.</p>
                        </div>

                        {/* Introspection */}
                        <div className="bg-white rounded-2xl p-6 transform transition-all duration-300 hover:scale-[1.02] border-2 border-orange-50 hover:border-orange-200 hover:shadow-xl group">
                            <div className="flex items-center mb-4">
                                <div className="bg-orange-100 p-3 rounded-lg group-hover:bg-orange-200 transition-colors">
                                    <Brain className="text-orange-600 w-6 h-6 group-hover:text-orange-700" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 ml-4">Inner Wisdom</h3>
                            </div>
                            <p className="text-gray-600">Reflect on your journey to gain powerful insights. Self-knowledge is the ultimate weapon on your quest.</p>
                        </div>

                        {/* Points */}
                        <div className="bg-white rounded-2xl p-6 transform transition-all duration-300 hover:scale-[1.02] border-2 border-purple-50 hover:border-purple-200 hover:shadow-xl group">
                            <div className="flex items-center mb-4">
                                <div className="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-200 transition-colors">
                                    <Star className="text-purple-600 w-6 h-6 group-hover:text-purple-700" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 ml-4">Experience Points</h3>
                            </div>
                            <p className="text-gray-600">Earn XP with every achievement. Watch your levels rise as you conquer challenges and surpass your limits.</p>
                        </div>

                        {/* Streaks */}
                        <div className="bg-white rounded-2xl p-6 transform transition-all duration-300 hover:scale-[1.02] border-2 border-orange-50 hover:border-orange-200 hover:shadow-xl group">
                            <div className="flex items-center mb-4">
                                <div className="bg-orange-100 p-3 rounded-lg group-hover:bg-orange-200 transition-colors">
                                    <Zap className="text-orange-600 w-6 h-6 group-hover:text-orange-700" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 ml-4">Power Streaks</h3>
                            </div>
                            <p className="text-gray-600">Build momentum with unbroken chains of success. Every consecutive victory amplifies your power and rewards.</p>
                        </div>

                        {/* Stats & Analytics */}
                        <div className="bg-gradient-to-r from-purple-50 to-orange-50 rounded-2xl p-6 col-span-1 md:col-span-2 transform transition-all duration-300 hover:scale-[1.02] border-2 border-purple-100 hover:shadow-xl group">
                            <div className="flex items-center mb-4">
                                <div className="bg-purple-600 p-3 rounded-lg group-hover:bg-purple-700 transition-colors">
                                    <BarChart2 className="text-white w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 ml-4">Hero's Journey Map</h3>
                            </div>
                            <p className="text-gray-600">Visualize your progress with detailed analytics. Identify your strengths, overcome weaknesses, and optimize your strategy for maximum growth.</p>
                            <div className="mt-4 flex items-center text-purple-600 group-hover:text-purple-700 transition-colors">
                                <span className="font-medium">Discover your potential</span>
                                <ChevronRight className="w-5 h-5 ml-1 group-hover:ml-2 transition-all" />
                            </div>
                        </div>
                    </div>

                    {/* Motivational quote */}
                    <div className="my-8 text-center px-6 py-8">
                        <p className="text-2xl italic text-purple-700 font-medium">"The quest is not just about the destination, but who you become along the way."</p>
                    </div>

                    {/* Call to action */}
                    <div className="text-center mt-12 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-orange-200 rounded-full blur-3xl transform -translate-y-1/2"></div>
                        <button className="relative bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-500 hover:to-orange-400 text-white font-bold py-4 px-10 rounded-full text-xl transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-orange-300">
                            BEGIN YOUR EPIC JOURNEY
                        </button>
                        <p className="relative mt-6 text-purple-700 font-medium">Your greatest adventure awaits. Who will you become?</p>
                    </div>
                </div>
            </div>
        </div>
        </SidebarLayout>
        </>
    );
};

export default UserManualPage;