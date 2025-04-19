'use client';
import React from 'react';
import { Award, Trophy, Star, Flame } from 'lucide-react';

interface UserProfile {
  user: number;
  level: number;
  character_class: string;
  exp_points: number;
  total_points: number;
  achievements: any[] | null;
  created_at: string;
  updated_at: string;
  profile_picture?: string | null;
}

interface CharacterHeaderProps {
  user_name: string;
  user_profile: UserProfile;
}

const CharacterHeader: React.FC<CharacterHeaderProps> = ({
                                                           user_name = "Guest",
                                                           user_profile
                                                         }) => {
  // Calculate streak based on account age
  const createdDate = new Date(user_profile.created_at);
  const currentDate = new Date();
  const daysSinceCreation = Math.floor(
      (currentDate.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const streak = Math.max(1, daysSinceCreation);

  // XP calculations
  const calculateLevelThreshold = (level: number) => {
    const thresholds: Record<number, number> = {
      1: 0, 2: 1000, 3: 2000, 4: 4000,
      5: 8000, 6: 16000, 7: 32000, 8: 64000
    };
    return thresholds[level] || 0;
  };

  const currentLevelThreshold = calculateLevelThreshold(user_profile.level);
  const nextLevelThreshold = calculateLevelThreshold(user_profile.level + 1);
  const isMaxLevel = user_profile.level >= 8;

  const currentLevelXP = user_profile.exp_points - currentLevelThreshold;
  const xpToNextLevel = isMaxLevel ? 0 : nextLevelThreshold - currentLevelThreshold;
  const percentToNextLevel = isMaxLevel
      ? 100
      : Math.min(100, (currentLevelXP / xpToNextLevel) * 100);

  const xpProgressText = isMaxLevel
      ? `${currentLevelXP} XP (Max Level)`
      : `${currentLevelXP} / ${xpToNextLevel} XP`;

  return (
      <div className="bg-gradient-to-r from-purple-600 to-rose-500 rounded-2xl shadow-2xl p-8 mb-8 text-white relative overflow-hidden border border-rose-400 border-opacity-30">
        {/* Background elements */}
        <div className="absolute top-0 right-0 opacity-10">
          <svg width="300" height="300" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M45,-60.3C57.5,-50.2,66.3,-34.7,70.4,-17.8C74.5,-0.9,73.9,17.4,65.8,33.3C57.7,49.2,42.1,62.7,23.9,69.7C5.7,76.7,-15.1,77.2,-32.8,69.3C-50.5,61.4,-65.1,45.1,-70.7,26.2C-76.3,7.3,-72.9,-14.2,-62.6,-32.7C-52.3,-51.2,-35.2,-66.6,-17.1,-73.2C1.1,-79.8,20.1,-77.6,45,-60.3Z" transform="translate(100 100)" />
          </svg>
        </div>

        {/* Sparkle effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-300 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 left-1/2 w-3 h-3 bg-rose-300 rounded-full animate-ping opacity-75"></div>
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-yellow-200 rounded-full animate-pulse"></div>
        </div>

        <div className="flex flex-col relative z-10">
          {/* User info */}
          <div className="text-center flex flex-col items-center">
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-purple-900 rounded-full w-20 h-20 flex items-center justify-center font-bold border-2 border-white shadow-lg text-3xl transform transition-transform duration-300 hover:scale-110 mb-4">
              Lv.{user_profile.level}
            </div>

            <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-amber-200">
              {user_name}
            </h1>
            <p className="text-xl text-rose-100 font-light mb-3">
              @{user_name.toLowerCase()}
            </p>

            {/* Character class badge */}
            <div className="mb-6">
            <span className="bg-purple-900 bg-opacity-50 text-amber-100 px-6 py-2 rounded-lg inline-flex items-center font-medium border border-amber-400 border-opacity-30 text-lg">
              <Star size={20} className="mr-2 text-amber-400" />
              {user_profile.character_class}
            </span>
            </div>

            {/* Stats badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl mb-6">
            <span className="bg-amber-400 text-purple-900 px-4 py-3 rounded-xl flex items-center justify-center font-medium shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <Award size={24} className="mr-3" />
              {user_profile.total_points} XP
            </span>
              <span className="bg-rose-400 text-white px-4 py-3 rounded-xl flex items-center justify-center font-medium shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <Flame size={24} className="mr-3" />
                {streak} Day Streak
            </span>
              <span className="bg-emerald-400 text-purple-900 px-4 py-3 rounded-xl flex items-center justify-center font-medium shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <Trophy size={24} className="mr-3" />
                {user_profile.achievements?.length || 0} Achievements
            </span>
            </div>
          </div>

          {/* XP Progress bar */}
          <div className="w-full max-w-3xl mx-auto">
            <div className="bg-purple-900 bg-opacity-40 rounded-2xl p-6 backdrop-blur-sm border border-rose-400 border-opacity-30 shadow-inner">
              <div className="flex justify-between mb-2 text-base text-amber-100 font-medium">
                <span>Level {user_profile.level}</span>
                {isMaxLevel ? (
                    <span>Max Level</span>
                ) : (
                    <span>Level {user_profile.level + 1}</span>
                )}
              </div>

              <div className="w-full bg-purple-900 rounded-full h-6 shadow-inner overflow-hidden">
                <div
                    className="bg-gradient-to-r from-amber-400 to-orange-500 h-6 rounded-full shadow-md relative transition-all duration-1000 ease-out"
                    style={{ width: `${percentToNextLevel}%` }}
                >
                  <div className="absolute inset-0 opacity-30 w-full h-full bg-white"></div>
                </div>
              </div>

              <p className="text-lg text-center mt-3 text-white font-medium">
                {xpProgressText}
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CharacterHeader;