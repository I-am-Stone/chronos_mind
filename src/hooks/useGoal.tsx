'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getGoals } from '@/api/goals/getGoals';

interface Goal {
  id: number;
  goal_title: string;
  description: string;
  target_date: string;
  difficulty: string;
  progress_bar: number;
  goal_type: string;
}

interface GoalContextType {
  goals: Goal[] | null;
  fetchAllGoals: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const GoalContext = createContext<GoalContextType>({
  goals: null,
  fetchAllGoals: async () => {},
  loading: false,
  error: null
});

export const useGoals = () => {
  const context = useContext(GoalContext);
  if (context === undefined) {
    throw new Error('useGoals must be used within a GoalProvider');
  }
  return context;
};

//provider component
export const GoalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [goals, setGoals] = useState<Goal[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllGoals = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getGoals();
      if (response.success && response.data) {
        setGoals(response.data);
      } else {
        setError('Failed to fetch goals');
      }
    } catch (error) {
      console.error('Error fetching goals:', error);
      setError('An error occurred while fetching goals');
    } finally {
      setLoading(false);
    }
  };

  // Load goals on first render
  useEffect(() => {
    fetchAllGoals();
  }, []);

  const value: GoalContextType = {
    goals,
    fetchAllGoals,
    loading,
    error
  };

  return (
    <GoalContext.Provider value={value}>
      {children}
    </GoalContext.Provider>
  );
};