'use client';
import { useEffect, useState } from "react";
import { GetGoalProfile } from '@/api/goals/goalProfileData';

export interface StreakData {
  user: number;
  current_streak: number;
  points: number;
  last_progress_date: string;
  longest_streak: number;
  total_goals_completed: number;
  total_goals: number;
}

export const GoalProfileData = () => {
  const [streak, setStreak] = useState<StreakData | null>(null);

  useEffect(() => {
    const fetchStreak = async () => {
      try {
        const response = await GetGoalProfile();

        if (response.success && response.data) {
          console.log("API Response:", response.data);
          setStreak(response.data);
        } else {
          console.error("Failed to fetch Streak");
        }
      } catch (err) {
        console.error("Error fetching goals:", err);
      }
    };

    fetchStreak().then((result) => {
      console.log(result);
    });
  }, []);

  return {streak};
};