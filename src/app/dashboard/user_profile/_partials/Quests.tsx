'use client';
import React from 'react';
import { Shield } from 'lucide-react';

interface Quest {
  id: number;
  title: string;
  reward: number;
  progress: number;
  total: number;
  color: string;
}

interface QuestsProps {
  quests: Quest[];
}

const Quests: React.FC<QuestsProps> = ({ quests }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <Shield size={20} className="mr-2 text-red-600" />
          Active Quests
        </h2>
        <span className="text-sm text-gray-500">{quests.length} in progress</span>
      </div>
      
      <div className="space-y-4">
        {quests.map(quest => (
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
  );
};

export default Quests; 