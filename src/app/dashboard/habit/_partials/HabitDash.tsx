'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Flame, Calendar, Trophy, Star, Award } from "lucide-react";
import { useEffect, useState } from "react";
import { GetHabitProfile } from "@/api/habit/habitProfile";

interface HabitProfile {
    user: number;
    current_streak: number;
    points: number;
    last_progress_date: string;
    total_habit_completed: number;
    total_habit: number;
}

export default function HabitDash() {
    const [profile, setProfile] = useState<HabitProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHabitProfile = async () => {
            try {
                const response = await GetHabitProfile();

                if (response.success && response.data) {
                    // Handle both array and object responses
                    setProfile(Array.isArray(response.data) ? response.data[0] : response.data);
                } else {
                    console.error("Failed to fetch habit profile:", response.error || "Unknown error");
                }
            } catch (error) {
                console.error("Error fetching habit profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHabitProfile();
    }, []);

    if (loading) {
        return <div className="text-center p-4">Loading habit data...</div>;
    }

    if (!profile) {
        return <div className="text-center p-4">No habit data available.</div>;
    }

    // Display points prominently at the top
    const pointsCard = {
        title: "Total Points",
        value: profile.points,
        icon: Award,
        color: "text-yellow-500",
        bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
        borderColor: "border-yellow-200 dark:border-yellow-800",
        description: "Achievement points",
        footerLabel: "Level:",
        footerValue: () => {
            const level = profile.points < 100 ? "Beginner" : profile.points < 500 ? "Regular" : "Pro";
            return (
                <div className="flex items-center">
                    <Trophy className="h-3 w-3 text-purple-500 mr-1" />
                    <span className="font-bold text-purple-500">{level}</span>
                </div>
            );
        }
    };

    const dashboardItems = [
        {
            title: "Current Streak",
            value: profile.current_streak,
            icon: Flame,
            color: "text-orange-500",
            bgColor: "bg-orange-100 dark:bg-orange-900/30",
            borderColor: "border-orange-200 dark:border-orange-800",
            description: "Days in a row",
            footerLabel: "Next milestone:",
            footerValue: () => {
                const nextMilestone = profile.current_streak < 7 ? 7 : profile.current_streak < 30 ? 30 : 100;
                return (
                    <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-500 mr-1" />
                        <span className="font-bold">{nextMilestone}</span>
                    </div>
                );
            }
        },
        {
            title: "Last Progress Date",
            value: new Date(profile.last_progress_date).toLocaleDateString(),
            icon: Calendar,
            color: "text-blue-500",
            bgColor: "bg-blue-100 dark:bg-blue-900/30",
            borderColor: "border-blue-200 dark:border-blue-800",
            description: "Last active day",
            footerLabel: "Status:",
            footerValue: () => {
                const isActive = new Date(profile.last_progress_date) >= new Date(Date.now() - 86400000);
                return (
                    <span className={`font-bold ${isActive ? "text-green-500" : "text-yellow-500"}`}>
            {isActive ? "Active" : "Inactive"}
          </span>
                );
            }
        },
        {
            title: "Completed Habits",
            value: profile.total_habit_completed,
            icon: Trophy,
            color: "text-green-500",
            bgColor: "bg-green-100 dark:bg-green-900/30",
            borderColor: "border-green-200 dark:border-green-800",
            description: "Habits finished",
            footerLabel: "Completion rate:",
            footerValue: () => {
                const completionRate = profile.total_habit > 0
                    ? Math.round((profile.total_habit_completed / profile.total_habit) * 100)
                    : 0;
                return <span className="font-bold text-green-500">{completionRate}%</span>;
            }
        },
        {
            title: "Total Habits",
            value: profile.total_habit,
            icon: Star,
            color: "text-purple-500",
            bgColor: "bg-purple-100 dark:bg-purple-900/30",
            borderColor: "border-purple-200 dark:border-purple-800",
            description: "All habits",
            footerLabel: "Progress:",
            footerValue: () => {
                const progress = profile.total_habit > 0
                    ? `${profile.total_habit_completed}/${profile.total_habit}`
                    : "0/0";
                return <span className="font-bold text-blue-500">{progress}</span>;
            }
        }
    ];

    // Combine all items, with points card first
    const allItems = [pointsCard, ...dashboardItems];

    return (
        <div className="space-y-6">
            {/* Points summary */}
            <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 dark:from-yellow-900/40 dark:to-yellow-800/20 p-4 rounded-lg border-2 border-yellow-200 dark:border-yellow-800/50 shadow-md">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Award className="h-8 w-8 text-yellow-500" />
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Achievement Points</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Keep up the good work!</p>
                        </div>
                    </div>
                    <div className="text-4xl font-bold text-yellow-600 dark:text-yellow-400">{profile.points}</div>
                </div>
            </div>

            {/* Dashboard cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-vt323">
                {allItems.map((item) => (
                    <Card
                        key={item.title}
                        className={`p-0 border-2 ${item.borderColor} shadow-md rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-xl overflow-hidden`}
                    >
                        <div className={`${item.bgColor} p-3`}>
                            <CardHeader className="flex flex-row items-center justify-between p-0 pb-1">
                                <CardTitle className="text-sm font-bold text-gray-700 dark:text-gray-200">
                                    {item.title}
                                </CardTitle>
                                <item.icon className={`h-5 w-5 ${item.color}`} />
                            </CardHeader>
                            <CardContent className="p-0 pt-2">
                                <div className="flex items-baseline">
                                    <div className="text-4xl font-bold text-gray-900 dark:text-white">
                                        {item.value}
                                    </div>
                                    <div className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                                        {item.description}
                                    </div>
                                </div>
                            </CardContent>
                        </div>

                        <div className="px-3 py-2 bg-white dark:bg-gray-800 flex items-center justify-between text-xs">
                            <div className="text-gray-600 dark:text-gray-300">{item.footerLabel}</div>
                            {item.footerValue()}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}