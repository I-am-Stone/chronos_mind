'use client';
import SidebarLayout from "@/components/shared/sidebar/layout"
import { SidebarTrigger } from "@/components/ui/sidebar"
import GoalForm from "./_partials/GoalForm"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GoalCard from "./_partials/GoalCard"
import { GetGoals } from "@/api/goals/getGoals"
import { useState, useEffect, useMemo } from 'react';
import { backendGoal } from "./_partials/goalType"
import { GoalFilters } from "./_partials/GoalFilter"
import GoalStreak from "./_partials/GoalStreak";
import GoalRules from "./_partials/GoalRule"
import { DeleteGoal } from "@/api/goals/deleteGoals"
import { UpdateProgress } from "@/api/goals/progressUpdate"
import { motion } from 'framer-motion';
import { GoalProfileData } from "@/helper/goalhelper/goalStreak";



interface Goal {
  id: number;
  title: string;
  description: string;
  status: string;
  targetDate: string;
  progress: number;
  difficulty: string;
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<backendGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Filter and sort states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState<'date' | 'progress' | 'title'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Use the custom hook to get streak data
  const profileData = GoalProfileData();

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        setLoading(true);
        const response = await GetGoals();
        console.log("API Response:", response.data);

        if (response.success && response.data) {
          setGoals(response.data);
          setError(null);
        } else {
          setError("Failed to fetch goals");
          setGoals([]);
        }

      } catch (err) {
        console.error("Error fetching goals:", err);
        setError("An error occurred while fetching your goals");
        setGoals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals().then((result) => {
      console.log(result);
    });
  }, [refreshTrigger]);

  const filteredGoals = useMemo(() => {
    return goals
        .filter(goal => {
          const matchesSearch = goal.goal_title.toLowerCase().includes(searchTerm.toLowerCase());

          const statusMatch =
              filterStatus === 'all' ? true :
                  filterStatus === 'completed' ? goal.progress_bar === 100 :
                      filterStatus === 'in-progress' ? (goal.progress_bar > 0 && goal.progress_bar < 100) :
                          filterStatus === 'not-started' ? goal.progress_bar === 0 : true;

          return matchesSearch && statusMatch;
        })
        .sort((a, b) => {
          let comparison = 0;

          if (sortBy === 'date') {
            comparison = new Date(a.target_date).getTime() - new Date(b.target_date).getTime();
          } else if (sortBy === 'progress') {
            comparison = a.progress_bar - b.progress_bar;
          } else if (sortBy === 'title') {
            comparison = a.goal_title.localeCompare(b.goal_title);
          }

          // Apply sort order
          return sortOrder === 'asc' ? comparison : -comparison;
        });
  }, [goals, searchTerm, filterStatus, sortBy, sortOrder]);

  const handleEdit = (goal: Goal) => {
    console.log('Editing goal:', goal);
  };

  const handleDelete = async (id: number) => {
    console.log('Deleting goal with id:', id);
    try {
      const response = await DeleteGoal(id);
      if (response.success) {
        setGoals(prevGoals => prevGoals.filter(goal => goal.id !== id));
      } else {
        console.error('Failed to delete goal:', response.error);
      }
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const handleProgressUpdate = async (id: number, progress: number) => {
    console.log('Updating progress for goal with id:', id, 'to', progress);

    try {
      setGoals(prevGoals =>
          prevGoals.map(goal =>
              goal.id === id
                  ? {
                    ...goal,
                    progress_bar: progress,
                    status: progress === 100
                        ? 'completed'
                        : progress > 0
                            ? 'in-progress'
                            : 'not-started'
                  }
                  : goal
          )
      );
      try {
        const response = await UpdateProgress(id, progress);
        if (!response.success) {
          console.error('Failed to update progress:', response.error);
        }else {
          console.log('Progress updated successfully:', response.data);
        }
      }catch (error){
        console.error('Error updating progress:', error);
      }
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  if (loading) {
    return (
        <SidebarLayout>
          <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="text-xl font-vt323">Loading your goals...</div>
          </div>
        </SidebarLayout>
    );
  }

  return (
      <SidebarLayout>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
          <SidebarTrigger />
          <div className="max-w-6xl mx-auto px-6 py-12">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Quest System
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Embark on a Quest of Goals
              </p>
            </motion.div>
          </div>
        </div>
        <div className="min-h-screen bg-slate-50">
          <div className="flex items-start p-4">
            <div className="w-full flex flex-col items-center">
              <div className="w-full max-w-4xl mx-auto mt-6">
                <Tabs defaultValue="dashboard" className="w-full">
                  <div className="flex justify-center mb-6">
                    <TabsList className="flex font-vt323 w-full max-w-2xl justify-between">
                      <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                      <TabsTrigger value="goals">Create Goals</TabsTrigger>
                      <TabsTrigger value="allgoals">All Goals</TabsTrigger>
                      <TabsTrigger value="rules">Rules</TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent value="dashboard">
                    <div className="p-4">
                      {profileData?.streak && <GoalStreak streak={profileData.streak} />}
                      {/* <CharacterSprite /> */}
                    </div>
                  </TabsContent>
                  <TabsContent value="goals">
                    <div className="p-8">
                      <GoalForm onGoalCreated={() => setRefreshTrigger(prev => prev + 1)} />
                    </div>
                  </TabsContent>
                  <TabsContent value="allgoals">
                    <div className="p-4">
                      <GoalFilters
                          searchTerm={searchTerm}
                          setSearchTerm={setSearchTerm}
                          filterStatus={filterStatus}
                          setFilterStatus={setFilterStatus}
                          sortBy={sortBy}
                          setSortBy={setSortBy}
                          sortOrder={sortOrder}
                          setSortOrder={setSortOrder}
                      />
                      {error ? (
                          <div className="text-red-500 p-4 text-center">{error}</div>
                      ) : filteredGoals.length === 0 ? (
                          <div className="text-center p-8 text-gray-500">
                            <p className="font-vt323 text-xl">No goals found</p>
                            <p className="font-vt323 mt-2">
                              {goals.length === 0
                                  ? "Create your first goal to get started!"
                                  : "No goals match your current filters"}
                            </p>
                          </div>
                      ) : (
                          filteredGoals.map((backendGoal) => (
                              <GoalCard
                                  key={backendGoal.id}
                                  goal={{
                                    id: backendGoal.id,
                                    title: backendGoal.goal_title,
                                    description: backendGoal.description,
                                    targetDate: backendGoal.target_date,
                                    difficulty: backendGoal.difficulty,
                                    progress: backendGoal.progress_bar,
                                    status: backendGoal.progress_bar === 100
                                        ? 'completed'
                                        : backendGoal.progress_bar > 0
                                            ? 'in-progress'
                                            : 'not-started'
                                  }}
                                  onDelete={handleDelete}
                                  onEdit={handleEdit}
                                  onProgressUpdate={handleProgressUpdate}
                              />
                          ))
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="rules">
                    <div className="p-4">
                      <GoalRules/>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </SidebarLayout>
  );
}