'use client';
import React from 'react';
import { BarChart2, Shield, Trophy, Zap, Calendar } from 'lucide-react';

interface GameStatsProps {
  achievements: number;
  total_goals: number;
  total_habits: number;
}

const GameStats: React.FC<GameStatsProps> = ({ achievements }) => {
  const gameStats = [
    { name: "Total Quests", value: 12, icon: <Shield size={16} className="text-blue-500" /> },
    { name: "Achievements", value: achievements, icon: <Trophy size={16} className="text-yellow-500" /> },
    { name: "Longest Streak", value: 28, icon: <Zap size={16} className="text-orange-500" /> },
    { name: "Days Active", value: 92, icon: <Calendar size={16} className="text-green-500" /> }
  ];

  return (
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
  );
};

export default GameStats; 