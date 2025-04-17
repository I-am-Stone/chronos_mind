'use client';
import React from 'react';
import { User, Star } from 'lucide-react';
import {useState, useEffect} from "react";
import {getProfileData} from "@/api/user_profile/getProfileData";

interface CharacterInfoProps {
  characterClass: string;
  characterLevel: string;
}

const CharacterInfo: React.FC<CharacterInfoProps> = ({ characterClass, characterLevel }) => {

    useEffect(() => {
        const fetchProfileData = async () => {
            const response = await  getProfileData();
            console.log(response);
        }

    }, []);
  return (
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
          <p className="font-bold text-blue-600">{characterClass}</p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="bg-purple-100 p-3 rounded-full mr-4">
          <Stargi size={24} className="text-purple-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Rank</p>
          <p className="font-bold text-purple-600">{characterLevel}</p>
        </div>
      </div>
    </div>
  );
};

export default CharacterInfo; 