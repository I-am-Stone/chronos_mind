'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Flame, Calendar, Trophy, Star } from "lucide-react";
import { StreakData } from "@/helper/goalhelper/goalStreak";

interface GoalStreakProps {
  streak: StreakData;
}

export default function GoalStreak({ streak }: GoalStreakProps) {
  if (!streak) {
    return <div>Loading streak data...</div>;
  }

  const data = [
    {
      title: "Current Streak",
      value: streak.current_streak, // Fixed property name
      icon: Flame,
      color: "text-orange-500",
      bgColor: "bg-orange-100 dark:bg-orange-900/30",
      borderColor: "border-orange-200 dark:border-orange-800",
      description: "Days in a row"
    },
    {
      title: "Last Progress Date",
      value: streak.last_progress_date,
      icon: Calendar,
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      borderColor: "border-blue-200 dark:border-blue-800",
      description: "Total active days"
    },
    {
      title: "Longest Streak",
      value: streak.longest_streak,
      icon: Trophy,
      color: "text-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
      borderColor: "border-purple-200 dark:border-purple-800",
      description: "Your record"
    },
    {
      title: "Completed Goals",
      value: streak.total_goals_completed,
      icon: Trophy,
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900/30",
      borderColor: "border-green-200 dark:border-green-800",
      description: "Goals finished"
    },
    {
      title: "Total Goals",
      value: streak.total_goals,
      icon: Star,
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      borderColor: "border-blue-200 dark:border-blue-800",
      description: "All goals"
    },
  ];

  return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-vt323">
        {data.map((item) => (
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
                {item.title === "Current Streak" && (
                    <>
                      <div className="text-gray-600 dark:text-gray-300">Next milestone:</div>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-500 mr-1" />
                        <span className="font-bold">15 days</span>
                      </div>
                    </>
                )}

                {item.title === "Last Progress Date" && (
                    <>
                      <div className="text-gray-600 dark:text-gray-300">Status:</div>
                      <div className="flex items-center">
                        <span className="font-bold text-green-500">Active</span>
                      </div>
                    </>
                )}

                {item.title === "Longest Streak" && (
                    <>
                      <div className="text-gray-600 dark:text-gray-300">Achievement:</div>
                      <div className="flex items-center">
                        <span className="font-bold text-purple-500">Novice</span>
                      </div>
                    </>
                )}
              </div>
            </Card>
        ))}
      </div>
  );
}