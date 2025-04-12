'use client';
import React from 'react';
import Image from 'next/image';
import { Award, Zap, Trophy, Star, Flame } from 'lucide-react';

interface CharacterHeaderProps {
  userData: {
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
  };
}

const CharacterHeader: React.FC<CharacterHeaderProps> = ({ userData }) => {
  const percentToNextLevel = (userData.xp / userData.xpToNextLevel) * 100;

  return (
      <div className="bg-gradient-to-r from-indigo-700 to-purple-700 rounded-2xl shadow-2xl p-8 mb-8 text-white relative overflow-hidden border border-indigo-400 border-opacity-30">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 opacity-20">
          <svg width="300" height="300" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M45,-60.3C57.5,-50.2,66.3,-34.7,70.4,-17.8C74.5,-0.9,73.9,17.4,65.8,33.3C57.7,49.2,42.1,62.7,23.9,69.7C5.7,76.7,-15.1,77.2,-32.8,69.3C-50.5,61.4,-65.1,45.1,-70.7,26.2C-76.3,7.3,-72.9,-14.2,-62.6,-32.7C-52.3,-51.2,-35.2,-66.6,-17.1,-73.2C1.1,-79.8,20.1,-77.6,45,-60.3Z" transform="translate(100 100)" />
          </svg>
        </div>

        {/* Sparkle effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 left-1/2 w-3 h-3 bg-purple-300 rounded-full animate-ping opacity-75"></div>
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-indigo-200 rounded-full animate-pulse"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center relative z-10 gap-6">
          {/* Profile image with enhanced styling */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <Image
                  src={userData.profileImage}
                  alt={userData.name}
                  width={32}
                  height={32}
                  className="w-32 h-32 rounded-full object-cover border-4 border-yellow-400 shadow-xl"
              />
              <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-indigo-900 rounded-full w-14 h-14 flex items-center justify-center font-bold border-2 border-white shadow-lg text-xl transform transition-transform duration-300 hover:scale-110">
                Lv.{userData.level}
              </div>
            </div>
          </div>

          {/* User info with larger text */}
          <div className="md:ml-4 mt-6 md:mt-0 text-center md:text-left flex-grow">
            <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
              {userData.name}
            </h1>
            <p className="text-xl text-indigo-200 font-light">@{userData.username}</p>

            {/* Character class badge */}
            <div className="mt-2 mb-4">
            <span className="bg-indigo-900 bg-opacity-50 text-indigo-100 px-4 py-1 rounded-lg inline-flex items-center font-medium border border-indigo-400 border-opacity-30">
              <Star size={18} className="mr-2 text-yellow-400" />
              <span className="text-lg">{userData.characterClass}</span>
            </span>
            </div>

            {/* Stats badges with hover effects */}
            <div className="flex flex-wrap items-center mt-3 justify-center md:justify-start gap-3">
            <span className="bg-yellow-400 text-indigo-900 px-4 py-2 rounded-xl flex items-center font-medium shadow-md text-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <Award size={20} className="mr-2" />
              {userData.points} XP
            </span>
              <span className="bg-red-400 text-white px-4 py-2 rounded-xl flex items-center font-medium shadow-md text-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <Flame size={20} className="mr-2" />
                {userData.streak} Day Streak
            </span>
              <span className="bg-green-400 text-indigo-900 px-4 py-2 rounded-xl flex items-center font-medium shadow-md text-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <Trophy size={20} className="mr-2" />
                {userData.achievements} Achievements
            </span>
            </div>
          </div>

          {/* XP Progress bar with enhanced styling */}
          <div className="w-full md:w-1/3 mt-6 md:mt-0">
            <div className="bg-indigo-800 bg-opacity-60 rounded-2xl p-4 backdrop-blur-sm border border-indigo-500 border-opacity-30 shadow-inner transform transition-transform duration-300 hover:scale-105">
              <div className="flex justify-between mb-2 text-sm text-indigo-100 font-medium">
                <span>Level {userData.level}</span>
                <span>Level {userData.level + 1}</span>
              </div>

              <div className="w-full bg-indigo-900 rounded-full h-5 shadow-inner overflow-hidden">
                <div
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 h-5 rounded-full shadow-md relative transition-all duration-1000 ease-out"
                    style={{ width: `${percentToNextLevel}%` }}
                >
                  <div className="absolute inset-0 bg-white opacity-30 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiIGlkPSJhIj48c3RvcCBzdG9wLWNvbG9yPSIjRkZGIiBzdG9wLW9wYWNpdHk9Ii4yIiBvZmZzZXQ9IjAlIi8+PHN0b3Agc3RvcC1jb2xvcj0iI0ZGRiIgc3RvcC1vcGFjaXR5PSIwIiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBmaWxsPSJ1cmwoI2EpIiBkPSJNMCAwaDMwdjMwSDB6Ii8+PC9zdmc+')]"></div>
                </div>
              </div>

              <p className="text-base text-center mt-2 text-indigo-100 font-medium">
                {userData.xp} / {userData.xpToNextLevel} XP
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CharacterHeader;