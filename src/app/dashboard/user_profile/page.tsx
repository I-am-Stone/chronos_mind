'use client';
import React, { useState } from 'react';
import { Calendar, Award, Target, BarChart2, Book, CheckCircle, Bell, AlertTriangle, ChevronDown, X, User, Zap, Trophy, Star, Heart, Shield } from 'lucide-react';
import Image from 'next/image';
import SidebarLayout from '@/components/shared/sidebar/layout';

const UserProfilePage = () => {
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

  // Calculate percentage to next level
  const percentToNextLevel = (userData.xp / userData.xpToNextLevel) * 100;

  // Game stats
  const gameStats = [
    { name: "Total Quests", value: 12, icon: <Shield size={16} className="text-blue-500" /> },
    { name: "Achievements", value: userData.achievements, icon: <Trophy size={16} className="text-yellow-500" /> },
    { name: "Longest Streak", value: 28, icon: <Zap size={16} className="text-orange-500" /> },
    { name: "Days Active", value: 92, icon: <Calendar size={16} className="text-green-500" /> }
  ];

  return (
    <SidebarLayout>
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        {/* Character Header Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-6 mb-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-20">
            <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M45,-60.3C57.5,-50.2,66.3,-34.7,70.4,-17.8C74.5,-0.9,73.9,17.4,65.8,33.3C57.7,49.2,42.1,62.7,23.9,69.7C5.7,76.7,-15.1,77.2,-32.8,69.3C-50.5,61.4,-65.1,45.1,-70.7,26.2C-76.3,7.3,-72.9,-14.2,-62.6,-32.7C-52.3,-51.2,-35.2,-66.6,-17.1,-73.2C1.1,-79.8,20.1,-77.6,45,-60.3Z" transform="translate(100 100)" />
            </svg>
          </div>
          
          <div className="flex flex-col md:flex-row items-center relative z-10">
            <div className="relative">
            <Image
                src={userData.profileImage}
                alt={userData.name}
                width={24}
                height={24}
                className="w-24 h-24 rounded-full object-cover border-4 border-yellow-400 shadow-lg"
            />
              <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-indigo-800 rounded-full w-10 h-10 flex items-center justify-center font-bold border-2 border-white shadow-md">
                Lv.{userData.level}
              </div>
            </div>
            
            <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
              <h1 className="text-2xl font-bold">{userData.name}</h1>
              <p className="text-indigo-100">@{userData.username}</p>
              <div className="flex flex-wrap items-center mt-2 justify-center md:justify-start gap-2">
                <span className="bg-yellow-400 text-indigo-900 px-3 py-1 rounded-full flex items-center font-medium shadow-sm">
                  <Award size={16} className="mr-1" />
                  {userData.points} XP
                </span>
                <span className="bg-red-400 text-white px-3 py-1 rounded-full flex items-center font-medium shadow-sm">
                  <Zap size={16} className="mr-1" />
                  {userData.streak} Day Streak
                </span>
                <span className="bg-green-400 text-white px-3 py-1 rounded-full flex items-center font-medium shadow-sm">
                  <Trophy size={16} className="mr-1" />
                  {userData.achievements} Achievements
                </span>
              </div>
            </div>
            
            <div className="flex-grow mt-6 md:mt-0">
              <div className="ml-auto max-w-xs">
                <div className="bg-indigo-800 bg-opacity-50 rounded-xl p-3 backdrop-blur-sm">
                  <div className="flex justify-between mb-1 text-xs text-indigo-100">
                    <span>Lv.{userData.level} {userData.characterClass}</span>
                    <span>Lv.{userData.level + 1}</span>
                  </div>
                  <div className="w-full bg-indigo-800 rounded-full h-3 shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full shadow-md" 
                      style={{ width: `${percentToNextLevel}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-center mt-1 text-indigo-100">
                    {userData.xp} / {userData.xpToNextLevel} XP to next level
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats and Inventory */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Game Stats */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <BarChart2 size={20} className="mr-2 text-purple-600" />
              Game Stats
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {gameStats.map((stat, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg flex items-center">
                  <div className="bg-white p-2 rounded-full mr-3 shadow-sm">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{stat.name}</p>
                    <p className="font-bold text-gray-800">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Character Info */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <User size={20} className="mr-2 text-blue-600" />
              Character
            </h2>
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <User size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Class</p>
                <p className="font-bold text-blue-600">{userData.characterClass}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <Star size={24} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Rank</p>
                <p className="font-bold text-purple-600">{userData.characterLevel}</p>
              </div>
            </div>
          </div>
          
          {/* Inventory */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-yellow-600">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
              Inventory
            </h2>
            <div className="space-y-3">
              {userData.inventory.map(item => (
                <div key={item.id} className="flex justify-between items-center p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-100">
                  <div className="flex items-center">
                    <div className="bg-yellow-100 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-600">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      </svg>
                    </div>
                    <span className="font-medium text-gray-800">{item.name}</span>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 text-xs rounded-full font-bold">
                    x{item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Quests */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <Shield size={20} className="mr-2 text-red-600" />
                Active Quests
              </h2>
              <span className="text-sm text-gray-500">{userData.quests.length} in progress</span>
            </div>
            
            <div className="space-y-4">
              {userData.quests.map(quest => (
                <div key={quest.id} className="border-l-4 border-red-400 pl-4 py-1">
                  <h3 className="font-bold text-gray-800">{quest.title}</h3>
                  <div className="flex items-center mt-1 mb-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${quest.color} h-2 rounded-full`} 
                        style={{ width: `${(quest.progress / quest.total) * 100}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-xs font-medium text-gray-600">{quest.progress}/{quest.total}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Reward: {quest.reward} XP</span>
                    <button className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-bold hover:bg-red-200 transition">
                      View Quest
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Habits */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <Zap size={20} className="mr-2 text-green-600" />
                Daily Habits
              </h2>
              <span className="text-sm text-gray-500">{userData.habits.length} tracking</span>
            </div>
            
            <div className="space-y-3">
              {userData.habits.map(habit => (
                <div key={habit.id} className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-white rounded-lg border border-green-100">
                  <div>
                    <h3 className="font-bold text-gray-800">{habit.title}</h3>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <span className="flex items-center mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-green-500">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        {habit.streak} day streak
                      </span>
                      <span className="text-gray-300">|</span>
                      <span className="ml-2">{habit.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-green-100 text-green-800 px-2 py-1 text-xs rounded-full font-bold mr-2">
                      +{habit.points} XP
                    </span>
                    <button className="bg-green-500 text-white p-1 rounded-full hover:bg-green-600 transition">
                      <CheckCircle size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Goals */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <Target size={20} className="mr-2 text-blue-600" />
                Current Goals
              </h2>
              <span className="text-sm text-gray-500">{userData.goals.length} active</span>
            </div>
            
            <div className="space-y-4">
              {userData.goals.map(goal => (
                <div key={goal.id} className="border-l-4 border-blue-400 pl-4 py-1">
                  <h3 className="font-bold text-gray-800">{goal.title}</h3>
                  <div className="flex items-center mt-1 mb-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${goal.color} h-2 rounded-full`} 
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-xs font-medium text-gray-600">{goal.progress}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Reward: {goal.points} XP</span>
                    <button className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-bold hover:bg-blue-200 transition">
                      Track Progress
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Activity Feed */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <Bell size={20} className="mr-2 text-purple-600" />
              Recent Activity
            </h2>
            <span className="text-sm text-gray-500">{notifications.length} updates</span>
          </div>
          
          <div className="space-y-3">
            {notifications.map(notification => (
              <div 
                key={notification.id} 
                className="flex items-start p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition cursor-pointer"
              >
                <div className="flex-shrink-0 mr-3 mt-1">
                  {notification.icon}
                </div>
                
                <div className="flex-grow">
                  <h3 className="font-bold text-gray-800">{notification.title}</h3>
                  <p className="text-sm text-gray-600">{notification.description}</p>
                  {notification.points && (
                    <div className="mt-1 flex items-center">
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full font-bold">
                        +{notification.points} XP
                      </span>
                    </div>
                  )}
                  <div className="text-xs text-gray-400 mt-1">
                    {notification.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </SidebarLayout>
  );
};

export default UserProfilePage;