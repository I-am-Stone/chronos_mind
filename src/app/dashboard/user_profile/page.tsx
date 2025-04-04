'use client';
import React, { useState } from 'react';
import { Trophy, Zap, Shield, AlertTriangle, Star } from 'lucide-react';
import SidebarLayout from '@/components/shared/sidebar/layout';
import CharacterHeader from './_partials/CharacterHeader';
import GameStats from './_partials/GameStats';
import CharacterInfo from './_partials/CharacterInfo';
import Inventory from './_partials/Inventory';
import Quests from './_partials/Quests';
import Habits from './_partials/Habits';
import Goals from './_partials/Goals';
import ActivityFeed from './_partials/ActivityFeed';

export default function UserProfilePage() {
  // Sample user data with game-like properties
  const [userData] = useState({
    name: "Alex Johnson",
    username: "DragonSlayer42",
    joinedDate: "January 15, 2025",
    points: 1250,
    level: 3,
    xp: 350,
    xpToNextLevel: 500,
    streak: 14,
    achievements: 8,
    profileImage: "/api/placeholder/150/150",
    characterClass: "Warrior",
    characterLevel: "Novice Adventurer",
    inventory: [
      { id: 1, name: "Health Potion", quantity: 3 },
      { id: 2, name: "Mana Potion", quantity: 2 },
      { id: 3, name: "Golden Key", quantity: 1 }
    ],
    goals: [
      { id: 1, title: "Learn Spanish", category: "Education", points: 350, progress: 45, color: "bg-blue-500" },
      { id: 2, title: "Run a half marathon", category: "Fitness", points: 450, progress: 30, color: "bg-red-500" },
      { id: 3, title: "Read 20 books", category: "Personal Growth", points: 200, progress: 25, color: "bg-purple-500" }
    ],
    habits: [
      { id: 1, title: "Morning meditation", category: "Mindfulness", streak: 7, points: 140, color: "bg-green-500" },
      { id: 2, title: "Daily exercise", category: "Fitness", streak: 3, points: 120, color: "bg-yellow-500" },
      { id: 3, title: "Journaling", category: "Reflection", streak: 14, points: 210, color: "bg-indigo-500" }
    ],
    quests: [
      { id: 1, title: "7-Day Fitness Challenge", reward: 150, progress: 3, total: 7, color: "bg-red-400" },
      { id: 2, title: "Learn 50 New Words", reward: 100, progress: 12, total: 50, color: "bg-blue-400" },
      { id: 3, title: "Meditation Mastery", reward: 200, progress: 5, total: 21, color: "bg-green-400" }
    ]
  });

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
      <div className="min-h-screen p-6 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <CharacterHeader userData={userData} />
          
          {/* Stats and Inventory */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <GameStats achievements={userData.achievements} />
            <CharacterInfo 
              characterClass={userData.characterClass}
              characterLevel={userData.characterLevel}
            />
            <Inventory inventory={userData.inventory} />
          </div>
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Quests quests={userData.quests} />
            <Habits habits={userData.habits} />
            <Goals goals={userData.goals} />
          </div>
          
          {/* Activity Feed */}
          <ActivityFeed notifications={notifications} />
        </div>
      </div>
    </SidebarLayout>
  );
}