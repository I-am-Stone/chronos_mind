'use client';
import React from 'react';
import { Zap, CheckCircle } from 'lucide-react';

interface Habit {
  id: number;
  title: string;
  category: string;
  streak: number;
  points: number;
  color: string;
}

interface HabitsProps {
  habits: Habit[];
}

const Habits: React.FC<HabitsProps> = ({ habits }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <Zap size={20} className="mr-2 text-green-600" />
          Daily Habits
        </h2>
        <span className="text-sm text-gray-500">{habits.length} tracking</span>
      </div>
      
      <div className="space-y-3">
        {habits.map(habit => (
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
  );
};

export default Habits; 