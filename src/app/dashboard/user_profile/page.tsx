'use client';
import React, { useEffect, useState } from 'react';
import { Trophy, Zap, Shield, AlertTriangle, Star } from 'lucide-react';
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

// Define the expected type for user data based on the CharacterHeader component's requirements
interface UserData {
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

export default function UserProfilePage() {
  // Initialize with the correct structure and proper typing
  const [userData, setUserData] = useState<UserData>({
    user_name: '',
    user_profile: {
      profile_picture: null,
      level: 1,
      character_class: 'NOVICE WARRIOR',
      exp_points: 0,
      total_points: 0,
      achievements: null,
      about_me: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  });

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getProfileData();
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  // Activity updates/notifications with game-like events
  const [notifications] = useState([
    {
      id: 1,
      type: 'achievement',
      action: 'unlocked',
      title: 'Polyglot Novice',
      description: 'Learned 10 words in a new language',
      points: 200,
      timestamp: '2 hours ago',
      icon: <Trophy size={20} className="text-yellow-500" />
    },
    {
      id: 2,
      type: 'streak',
      action: 'milestone',
      title: '7-Day Streak!',
      description: 'Morning meditation streak continues',
      days: 7,
      points: 50,
      timestamp: '6 hours ago',
      icon: <Zap size={20} className="text-orange-500" />
    },
    {
      id: 3,
      type: 'quest',
      action: 'progress',
      title: 'Quest Progress',
      description: 'Completed 3/7 days of fitness challenge',
      points: 30,
      timestamp: 'Yesterday',
      icon: <Shield size={20} className="text-blue-500" />
    },
    {
      id: 4,
      type: 'streak',
      action: 'ended',
      title: 'Streak Broken',
      description: 'Daily exercise streak ended at 12 days',
      days: 12,
      timestamp: 'Yesterday',
      icon: <AlertTriangle size={20} className="text-red-500" />
    },
    {
      id: 5,
      type: 'level',
      action: 'progress',
      title: 'Level Progress',
      description: 'You\'re 70% to the next level!',
      progress: 70,
      timestamp: '2 days ago',
      icon: <Star size={20} className="text-purple-500" />
    }
  ]);

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
          <ActivityFeed notifications={notifications} />
        </div>
      </div>
    </SidebarLayout>
  );
}