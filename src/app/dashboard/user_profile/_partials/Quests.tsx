'use client';
import React from 'react';
import { Shield, Target, Flag, Star, ChevronRight, XCircle } from 'lucide-react';

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
        <div className="bg-gradient-to-br from-white to-red-50 rounded-2xl shadow-xl p-6 border border-red-100">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-extrabold text-gray-800 flex items-center">
                    <Shield size={24} className="mr-3 text-red-600" />
                    Active Quests
                </h2>
                <div className="flex items-center">
          <span className="bg-red-100 text-red-800 px-4 py-1 rounded-full text-sm font-medium flex items-center">
            <Target size={16} className="mr-1" />
              {quests.length} in progress
          </span>
                </div>
            </div>

            <div className="space-y-5">
                {quests.map(quest => (
                    <div key={quest.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                        {/* Quest header with colored bar */}
                        <div className={`h-1 ${quest.color ? quest.color : 'bg-red-500'}`}></div>

                        <div className="p-4">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-lg text-gray-800">{quest.title}</h3>
                                <div className="flex items-center">
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 text-sm rounded-lg font-bold flex items-center">
                    <Star size={14} className="mr-1" />
                      {quest.reward} XP
                  </span>
                                </div>
                            </div>

                            {/* Progress section */}
                            <div className="mt-4">
                                <div className="flex justify-between mb-1 text-xs text-gray-500 font-medium">
                                    <span>Progress</span>
                                    <span className="text-gray-700 font-bold">{Math.round((quest.progress / quest.total) * 100)}%</span>
                                </div>
                                <div className="relative">
                                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
                                        <div
                                            className={`${quest.color ? quest.color : 'bg-gradient-to-r from-red-500 to-red-400'} h-3 rounded-full`}
                                            style={{ width: `${(quest.progress / quest.total) * 100}%` }}
                                        >
                                            {/* Animated progress pulse */}
                                            <div className="h-full w-full bg-white opacity-30 animate-pulse"></div>
                                        </div>
                                    </div>

                                    {/* Progress markers */}
                                    <div className="flex justify-between mt-1 px-1">
                                        <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                                        <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                                        <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                                        <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                                        <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm font-medium text-gray-700 flex items-center">
                    <Flag size={14} className="mr-1 text-red-500" />
                      {quest.progress}/{quest.total} completed
                  </span>

                                    <div className="flex space-x-2">
                                        <button className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg font-medium hover:bg-gray-200 transition flex items-center">
                                            <XCircle size={12} className="mr-1" />
                                            Skip
                                        </button>
                                        <button className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-lg font-medium hover:bg-red-200 transition flex items-center">
                                            Details
                                            <ChevronRight size={14} className="ml-1" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quest completion indicator */}
            <div className="mt-6 bg-red-50 p-4 rounded-xl">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-gray-700 flex items-center">
                        <Shield size={16} className="mr-2 text-red-500" />
                        Quest Completion
                    </h3>
                    <span className="text-red-700 text-sm font-bold">2/5 Completed</span>
                </div>
                <div className="w-full bg-white rounded-full h-2 mt-2 shadow-inner">
                    <div className="bg-gradient-to-r from-red-500 to-red-400 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
            </div>
        </div>
    );
};

export default Quests;