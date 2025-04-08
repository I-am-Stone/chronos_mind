'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Flame, Calendar, Trophy, Star, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { GetGoalProfile } from '@/api/goals/goalProfileData';

// Type definitions
interface StreakData {
  user: number;
  current_streak: number;
  points: number;
  last_progress_date: string;
  longest_streak: number;
  total_goals_completed: number;
  total_goals: number;
}

// Card data configuration
const STREAK_CARDS_CONFIG = [
  {
    title: "Current Streak",
    valueKey: "current_streak",
    icon: Flame,
    color: "text-orange-500",
    bgColor: "bg-orange-100 dark:bg-orange-900/30",
    borderColor: "border-orange-200 dark:border-orange-800",
    description: "Days in a row",
    footer: (streak: StreakData) => (
        <>
          <div className="text-gray-600 dark:text-gray-300">Next milestone:</div>
          <div className="flex items-center">
            <Star className="h-3 w-3 text-yellow-500 mr-1" />
            <span className="font-bold">
            {streak.current_streak < 7 ? 7 : streak.current_streak < 30 ? 30 : 100}
          </span>
          </div>
        </>
    )
  },
  {
    title: "Last Progress",
    valueKey: "last_progress_date",
    icon: Calendar,
    color: "text-blue-500",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    borderColor: "border-blue-200 dark:border-blue-800",
    description: "Last activity",
    footer: (streak: StreakData) => (
        <>
          <div className="text-gray-600 dark:text-gray-300">Status:</div>
          <div className="flex items-center">
          <span className={`font-bold ${
              new Date(streak.last_progress_date) >= new Date(Date.now() - 86400000)
                  ? "text-green-500"
                  : "text-yellow-500"
          }`}>
            {new Date(streak.last_progress_date) >= new Date(Date.now() - 86400000)
                ? "Active"
                : "Inactive"}
          </span>
          </div>
        </>
    )
  },
  {
    title: "Longest Streak",
    valueKey: "longest_streak",
    icon: Trophy,
    color: "text-purple-500",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
    borderColor: "border-purple-200 dark:border-purple-800",
    description: "Your record",
    footer: (streak: StreakData) => (
        <>
          <div className="text-gray-600 dark:text-gray-300">Achievement:</div>
          <div className="flex items-center">
          <span className="font-bold text-purple-500">
            {streak.longest_streak >= 30 ? "Pro" : streak.longest_streak >= 7 ? "Regular" : "Beginner"}
          </span>
          </div>
        </>
    )
  },
  {
    title: "Completed Goals",
    valueKey: "total_goals_completed",
    icon: Trophy,
    color: "text-green-500",
    bgColor: "bg-green-100 dark:bg-green-900/30",
    borderColor: "border-green-200 dark:border-green-800",
    description: "Goals finished",
    footer: (streak: StreakData) => (
        <>
          <div className="text-gray-600 dark:text-gray-300">Completion rate:</div>
          <div className="flex items-center">
          <span className="font-bold text-green-500">
            {streak.total_goals > 0
                ? Math.round((streak.total_goals_completed / streak.total_goals) * 100)
                : 0}%
          </span>
          </div>
        </>
    )
  },
  {
    title: "Total Goals",
    valueKey: "total_goals",
    icon: Star,
    color: "text-blue-500",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    borderColor: "border-blue-200 dark:border-blue-800",
    description: "All goals",
    footer: (streak: StreakData) => (
        <>
          <div className="text-gray-600 dark:text-gray-300">Active:</div>
          <div className="flex items-center">
          <span className="font-bold text-blue-500">
            {streak.total_goals - streak.total_goals_completed}
          </span>
          </div>
        </>
    )
  }
];

// Special card for points with different styling
const POINTS_CARD_CONFIG = {
  title: "Total Points",
  valueKey: "points",
  icon: Zap,
  color: "text-yellow-500",
  bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
  borderColor: "border-yellow-200 dark:border-yellow-800",
  description: "Earned points",
  footer: (streak: StreakData) => (
      <>
        <div className="text-gray-600 dark:text-gray-300">Level:</div>
        <div className="flex items-center">
        <span className="font-bold text-yellow-500">
          {Math.floor(streak.points / 100)} ({(streak.points % 100)}/100)
        </span>
        </div>
      </>
  )
};

export default function GoalStreak() {
  const [streak, setStreak] = useState<StreakData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStreak = async () => {
      try {
        const response = await GetGoalProfile();

        if (response.success && response.data) {
          setStreak(Array.isArray(response.data) ? response.data[0] : response.data);
        } else {
          setError("Failed to fetch streak data");
        }
      } catch (err) {
        console.error("Error fetching goals:", err);
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchStreak();
  }, []);

  if (loading) {
    return (
        <div className="text-center p-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
          <p>Loading your streak data...</p>
        </div>
    );
  }

  if (error) {
    return (
        <div className="text-center p-4 text-red-500">
          <p>{error}</p>
        </div>
    );
  }

  if (!streak) {
    return (
        <div className="text-center p-4 text-gray-500">
          <p>No streak data available.</p>
        </div>
    );
  }

  return (
      <div className="space-y-4">
        {/* Points Card - Featured at the top */}
        <div className="grid grid-cols-1">
          <StreakCard
              config={POINTS_CARD_CONFIG}
              streak={streak}
              featured={true}
          />
        </div>

        {/* Regular Streak Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-vt323">
          {STREAK_CARDS_CONFIG.map((card) => (
              <StreakCard
                  key={card.title}
                  config={card}
                  streak={streak}
              />
          ))}
        </div>
      </div>
  );
}

interface StreakCardProps {
  config: typeof STREAK_CARDS_CONFIG[0] | typeof POINTS_CARD_CONFIG;
  streak: StreakData;
  featured?: boolean;
}

function StreakCard({ config, streak, featured = false }: StreakCardProps) {
  const value = streak[config.valueKey as keyof StreakData];

  return (
      <Card
          className={`p-0 border-2 ${config.borderColor} shadow-md rounded-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl overflow-hidden ${
              featured ? 'border-4' : ''
          }`}
      >
        {/* Card Header and Content */}
        <div className={`${config.bgColor} p-4 ${featured ? 'pb-6' : ''}`}>
          <CardHeader className="flex flex-row items-center justify-between p-0 pb-2">
            <CardTitle className={`font-bold text-gray-700 dark:text-gray-200 ${
                featured ? 'text-lg' : 'text-sm'
            }`}>
              {config.title}
            </CardTitle>
            <config.icon className={`${config.color} ${
                featured ? 'h-6 w-6' : 'h-5 w-5'
            }`} />
          </CardHeader>

          <CardContent className="p-0 pt-1">
            <div className="flex items-baseline">
              <div className={`font-bold text-gray-900 dark:text-white ${
                  featured ? 'text-5xl' : 'text-4xl'
              }`}>
                {value}
              </div>
              <div className={`ml-2 text-gray-500 dark:text-gray-400 ${
                  featured ? 'text-sm' : 'text-xs'
              }`}>
                {config.description}
              </div>
            </div>
          </CardContent>
        </div>

        {/* Card Footer */}
        <div className={`px-4 py-2 bg-white dark:bg-gray-800 flex items-center justify-between ${
            featured ? 'text-sm' : 'text-xs'
        }`}>
          {config.footer(streak)}
        </div>
      </Card>
  );
}