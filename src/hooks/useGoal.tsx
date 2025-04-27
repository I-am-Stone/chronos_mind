'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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

// Proper context type definition
interface GoalContextType {
  goals: Goal[] | null;
  fetchAllGoals: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

// Create context with correct type
const GoalContext = createContext<GoalContextType>({
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

interface GoalProviderProps {
  children: ReactNode;
}

// Fixed the component declaration
export const GoalProvider: React.FC<GoalProviderProps> = ({ children }) => {
  const [goals, setGoals] = useState<Goal[] | null>(null);
  const [loading, setLoading] = useState(false);
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
    } catch (err) {
      setError('An error occurred while fetching goals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllGoals();
  }, []);

  return (
    <GoalContext.Provider value={{ goals, fetchAllGoals, loading, error }}>
      {children}
    </GoalContext.Provider>
  );
};

// Export the context to make it accessible
export { GoalContext };