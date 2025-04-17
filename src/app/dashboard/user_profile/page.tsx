'use client';
import React, { useEffect, useState } from 'react';
import { Trophy, Zap, Shield, AlertTriangle, Star, Bell, Check, Target, Award } from 'lucide-react';
import SidebarLayout from '@/components/shared/sidebar/layout';
import CharacterHeader from './_partials/CharacterHeader';
// import GameStats from './_partials/GameStats';
// import CharacterInfo from './_partials/CharacterInfo';
// import Inventory from './_partials/Inventory';
// import Quests from './_partials/Quests';
// import Habits from './_partials/Habits';
// import Introspection from './_partials/introspection';
import ActivityFeed from './_partials/ActivityFeed';
import { getProfileData } from '@/api/user_profile/getProfileData';
import { getActivityLog } from '@/api/user_profile/getActivityLog';

// Define the level thresholds based on the backend logic
const LEVEL_THRESHOLDS = [
  { level: 1, threshold: 0 },
  { level: 2, threshold: 1000 },
  { level: 3, threshold: 2000 },
  { level: 4, threshold: 4000 },
  { level: 5, threshold: 8000 },
  { level: 6, threshold: 16000 },
  { level: 7, threshold: 32000 },
  { level: 8, threshold: 64000 },
  { level: 9, threshold: Infinity }  // To handle any XP beyond level 8
];

// Define the expected type for user data based on the API response
interface UserProfileData {
  user_name: string;
  user_profile: {
    profile_picture: string | null;
    level: number;
    character_class: string;
    exp_points: number;
    total_points: number;
    achievements: any[] | null;
    about_me: string | null;
    created_at: string;
    updated_at: string;
  };
}

// Define the type expected by the CharacterHeader component
interface FormattedUserData {
  name: string;
  username: string;
  points: number;
  streak: number;
  achievements: number;
  profileImage: string;
  level: number;
  characterClass: string;
  xp: number;
  xpToNextLevel: number;
}

// Define activity log interface based on the backend response
interface ActivityLogItem {
  id: number;
  activity_type: string;
  exp_earned: number;
  timestamp: string;
  description: string;
  user_profile: number;
}

// Define the interface for formatted activity notifications
interface ActivityNotification {
  id: number;
  type: string;
  action: string;
  title: string;
  description: string;
  points?: number;
  timestamp: string;
  icon: React.ReactNode;
}

// Function to calculate level and XP to next level
function calculateLevelInfo(expPoints: number) {
  // Find current level based on exp points
  const currentLevelData = LEVEL_THRESHOLDS.find((data, index) => {
    return expPoints >= data.threshold && expPoints < (LEVEL_THRESHOLDS[index + 1]?.threshold || Infinity);
  }) || LEVEL_THRESHOLDS[0];

  // Calculate XP for next level
  const nextLevelIndex = LEVEL_THRESHOLDS.findIndex(data => data.level === currentLevelData.level) + 1;
  const nextLevelThreshold = LEVEL_THRESHOLDS[nextLevelIndex]?.threshold || Infinity;

  // If we're at max level, set next threshold to a reasonable value above current XP
  const xpToNextLevel = nextLevelThreshold === Infinity ?
      expPoints + 10000 :
      nextLevelThreshold - expPoints;

  return {
    level: currentLevelData.level,
    xp: expPoints,
    xpToNextLevel,
    currentLevelThreshold: currentLevelData.threshold,
    nextLevelThreshold: nextLevelThreshold === Infinity ? null : nextLevelThreshold
  };
}

// Helper function to format the timestamp
function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffDay > 0) {
    return diffDay === 1 ? 'Yesterday' : `${diffDay} days ago`;
  } else if (diffHour > 0) {
    return `${diffHour} ${diffHour === 1 ? 'hour' : 'hours'} ago`;
  } else if (diffMin > 0) {
    return `${diffMin} ${diffMin === 1 ? 'minute' : 'minutes'} ago`;
  } else {
    return 'Just now';
  }
}

// Helper function to map activity types to icons and format titles
function mapActivityToNotification(activity: ActivityLogItem): ActivityNotification {
  let icon = <Bell size={20} className="text-gray-500" />;
  let title = 'Activity Update';
  let action = 'completed';
  let type = 'general';

  // Map activity types to appropriate icons and titles
  switch (activity.activity_type) {
    case 'GOAL_COMPLETION':
      icon = <Check size={20} className="text-green-500" />;
      title = 'Goal Completed';
      type = 'achievement';
      break;
    case 'HABIT_TRACKED':
      icon = <Shield size={20} className="text-blue-500" />;
      title = 'Habit Tracked';
      type = 'habit';
      break;
    case 'STREAK_MILESTONE':
      icon = <Zap size={20} className="text-orange-500" />;
      title = 'Streak Milestone';
      type = 'streak';
      break;
    case 'ACHIEVEMENT_UNLOCKED':
      icon = <Trophy size={20} className="text-yellow-500" />;
      title = 'Achievement Unlocked';
      type = 'achievement';
      break;
    case 'QUEST_PROGRESS':
      icon = <Target size={20} className="text-purple-500" />;
      title = 'Quest Progress';
      type = 'quest';
      break;
    case 'LEVEL_UP':
      icon = <Star size={20} className="text-purple-500" />;
      title = 'Level Up';
      type = 'level';
      break;
    case 'POINT_AWARD':
      icon = <Award size={20} className="text-indigo-500" />;
      title = 'Points Awarded';
      type = 'point';
      break;
    default:
      // Default case already set
      break;
  }

  return {
    id: activity.id,
    type,
    action,
    title,
    description: activity.description,
    points: activity.exp_earned,
    timestamp: formatTimestamp(activity.timestamp),
    icon
  };
}

export default function UserProfilePage() {
  // Initialize with the correct structure for CharacterHeader
  const [userData, setUserData] = useState<FormattedUserData>({
    name: 'User',
    username: 'user',
    points: 0,
    streak: 0,
    achievements: 0,
    profileImage: '/assets/images/default-avatar.png',
    level: 1,
    characterClass: 'NOVICE WARRIOR',
    xp: 0,
    xpToNextLevel: 1000
  });

  // Initialize activity feed state
  const [activityFeed, setActivityFeed] = useState<ActivityNotification[]>([]);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getProfileData();

        if (response.success && response.data) {
          const { user_name, user_profile } = response.data;

          // Calculate level info based on exp_points
          const levelInfo = calculateLevelInfo(user_profile.exp_points);

          setUserData({
            name: user_name || 'User',
            username: user_name?.toLowerCase() || 'user',
            points: user_profile.total_points || 0,
            streak: 0, // Add this if you have streak data
            achievements: user_profile.achievements?.length || 0,
            profileImage: user_profile.profile_picture || '/assets/images/default-avatar.png',
            level: levelInfo.level,
            characterClass: user_profile.character_class || 'NOVICE WARRIOR',
            xp: user_profile.exp_points || 0,
            xpToNextLevel: levelInfo.xpToNextLevel,
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Fetch activity log
  useEffect(() => {
    const fetchActivityLog = async () => {
      try {
        const response = await getActivityLog();

        if (response.success && response.data) {
          // Map backend activity data to the format expected by the ActivityFeed component
          const formattedActivities = response.data.map((activity: ActivityLogItem) =>
              mapActivityToNotification(activity)
          );

          setActivityFeed(formattedActivities);
        }
      } catch (error) {
        console.error('Error fetching activity log:', error);
        // Set default activity logs in case of error
        setActivityFeed([
          {
            id: 1,
            type: 'achievement',
            action: 'unlocked',
            title: 'System Update',
            description: 'Could not retrieve your activity logs',
            timestamp: 'Just now',
            icon: <AlertTriangle size={20} className="text-red-500" />
          }
        ]);
      }
    };

    fetchActivityLog();
  }, []);

  return (
      <SidebarLayout>
        <div className="min-h-screen p-8 flex justify-center items-center bg-gradient-to-br from-purple-50 to-blue-50">
          <div className="max-w-6xl mx-auto w-full">
            <CharacterHeader userData={userData} />
            {/* Stats and Inventory */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Content for stats and inventory will go here */}
            </div>
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Main content will go here */}
            </div>
            {/* Activity Feed */}
            <ActivityFeed notifications={activityFeed} />
          </div>
        </div>
      </SidebarLayout>
  );
}