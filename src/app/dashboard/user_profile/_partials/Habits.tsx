'use client';
import React from 'react';
import { Zap, CheckCircle, Award, Flame } from 'lucide-react';

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
        <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-xl p-6 border border-green-100">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-extrabold text-gray-800 flex items-center">
                    <Flame size={24} className="mr-3 text-green-600" />
                    Daily Habits
                </h2>
                <span className="bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-medium flex items-center">
          <Zap size={16} className="mr-1" />
                    {habits.length} tracking
        </span>
            </div>

            <div className="space-y-4">
                {habits.map(habit => (
                    <div
                        key={habit.id}
                        className={`flex justify-between items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-l-4 ${habit.color ? habit.color : 'border-green-400'}`}
                    >
                        <div className="flex-grow">
                            <h3 className="font-bold text-lg text-gray-800">{habit.title}</h3>
                            <div className="flex items-center text-sm text-gray-600 mt-2">
                <span className="flex items-center mr-3 bg-green-50 px-2 py-1 rounded-lg">
                  <Flame size={16} className="mr-1 text-orange-500" />
                  <span className="font-medium">{habit.streak}</span> day streak
                </span>
                                <span className="px-2 py-1 rounded-lg bg-indigo-50 text-indigo-700">
                  {habit.category}
                </span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
              <span className="bg-gradient-to-r from-green-400 to-green-500 text-white px-3 py-1 text-sm rounded-lg font-bold shadow-sm">
                +{habit.points} XP
              </span>
                            <button className="bg-gradient-to-br from-green-500 to-green-600 text-white p-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-110">
                                <CheckCircle size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Achievements preview */}
            <div className="mt-6 pt-4 border-t border-green-100">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-gray-700 flex items-center">
                        <Award size={16} className="mr-2 text-yellow-500" />
                        Habit Streak Achievements
                    </h3>
                </div>
                <div className="flex gap-2 justify-center mt-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center text-white shadow-md">7</div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white shadow-md">30</div>
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 shadow-sm">60</div>
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 shadow-sm">90</div>
                </div>
            </div>
        </div>
    );
};

export default Habits;