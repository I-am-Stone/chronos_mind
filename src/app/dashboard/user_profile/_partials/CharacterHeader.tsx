'use client';
import React from 'react';
import Image from 'next/image';
import { Award, Zap, Trophy } from 'lucide-react';

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
  );
};

export default CharacterHeader; 