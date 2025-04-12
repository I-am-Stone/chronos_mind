'use client';
import React from 'react';
import { Target } from 'lucide-react';

interface Goal {
  id: number;
  title: string;
  category: string;
  points: number;
  progress: number;
  color: string;
}

interface GoalsProps {
  goals: Goal[];
}

const Introspection: React.FC<GoalsProps> = ({ goals }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <Target size={20} className="mr-2 text-blue-600" />
          Current Goals
        </h2>
        <span className="text-sm text-gray-500">{goals.length} active</span>
      </div>
      
      <div className="space-y-4">
        {goals.map(goal => (
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
  );
};

export default Introspection;