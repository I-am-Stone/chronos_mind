'use client';
import SidebarLayout from "@/components/shared/sidebar/layout"
import { SidebarTrigger } from "@/components/ui/sidebar"
import GoalForm from "./_partials/GoalForm"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GoalCard from "./_partials/GoalCard"
import { getGoals } from "@/api/goals/getGoals"
import React, { useState, useEffect, useMemo } from 'react';
import { backendGoal } from "./_partials/goalType"
import { GoalFilters } from "./_partials/GoalFilter"
import GoalStreak from "./_partials/GoalStreak";
import GoalRules from "./_partials/GoalRule"
import { deleteGoal } from "@/api/goals/deleteGoals"
import { UpdateProgress } from "@/api/goals/progressUpdate"
import { motion } from 'framer-motion';
import GoalsBarChart from "./_partials/GoalAnalytics";
import { GetGoalStats } from "@/api/goals/getGoalStats";
import { getSubTAsk } from "@/api/goals/listSubtask";
import { addSubtask } from "@/api/goals/postSubtask";
import { subtaskDelete } from "@/api/goals/DeleteSubtask";
import { SubtaskComplete } from "@/api/goals/subtaskComplete";
import { toast, Toaster } from 'sonner';

interface Subtask {
  id: number;
  title: string;
  completed: boolean;
  goal_id?: number;
}

export default function GoalsPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [goals, setGoals] = useState<backendGoal[]>([]);
  const [subtasks, setSubtasks] = useState<Record<number, Subtask[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState<'date' | 'progress' | 'title'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [chartData, setChartData] = useState(null);

  // Fetch all goals and subtasks
  useEffect(() => {
    const fetchData = async () => {
      const loadingToast = toast.loading('Loading your quests...', { duration: 5000 });

      try {
        setLoading(true);
        
        // Fetch goals and subtasks in parallel
        const [goalsResponse, subtasksResponse] = await Promise.all([
          getGoals(),
          getSubTAsk()
        ]);

        if (goalsResponse.success && goalsResponse.data) {
          setGoals(goalsResponse.data);
          setError(null);
        } else {
          setError("Failed to fetch goals");
          setGoals([]);
        }

        if (subtasksResponse.success && subtasksResponse.data) {
          const subtasksByGoal: Record<number, Subtask[]> = {};
          subtasksResponse.data.forEach((subtask: any) => {
            const goalId = subtask.goal_id;
            if (!subtasksByGoal[goalId]) {
              subtasksByGoal[goalId] = [];
            }
            subtasksByGoal[goalId].push({
              id: subtask.id,
              title: subtask.title,
              completed: subtask.completed,
              goal_id: goalId
            });
          });
          setSubtasks(subtasksByGoal);
        }

        toast.dismiss(loadingToast);
        if (refreshTrigger > 0) {
          toast.success('Goals updated', {
            description: 'Your quest log has been refreshed!',
            duration: 3000
          });
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("An error occurred while fetching your goals");
        setGoals([]);
        toast.dismiss(loadingToast);
        toast.error('Connection error', {
          description: 'Unable to connect to the server. Please check your internet connection and try again.',
          duration: 5000
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshTrigger]);

  // Fetch goal stats
  useEffect(() => {
    const fetchGoalStats = async () => {
      try {
        const response = await GetGoalStats();
        if (response.success && response.data) {
          setChartData(Array.isArray(response.data) ? response.data[0] : response.data);
        }
      } catch (error) {
        console.error("Error fetching Goal Stats:", error);
      }
    };

    fetchGoalStats();
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
        return sortOrder === 'asc' ? comparison : -comparison;
      });
  }, [goals, searchTerm, filterStatus, sortBy, sortOrder]);

  const updateGoalProgressFromSubtasks = (goalId: number) => {
    const goalSubtasks = subtasks[goalId] || [];
    if (goalSubtasks.length === 0) return;

    const completedCount = goalSubtasks.filter(st => st.completed).length;
    const newProgress = Math.round((completedCount / goalSubtasks.length) * 100);
    handleProgressUpdate(goalId, newProgress);
  };

  const handleEdit = (updatedGoal) => {
    setGoals(prevGoals =>
      prevGoals.map(goal =>
        goal.id === updatedGoal.id ? {
          ...goal,
          goal_title: updatedGoal.title,
          description: updatedGoal.description,
          target_date: updatedGoal.targetDate,
          goal_type: updatedGoal.goal_type
        } : goal
      )
    );
    toast.info('Goal updated', { description: 'Your quest has been updated!', duration: 3000 });
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to abandon this quest?');
    if (!confirmDelete) return;

    const deleteToast = toast.loading('Deleting your quest...', { duration: 5000 });

    try {
      const response = await deleteGoal(id);
      if (response.success) {
        setGoals(prevGoals => prevGoals.filter(goal => goal.id !== id));
        setSubtasks(prev => {
          const newSubtasks = { ...prev };
          delete newSubtasks[id];
          return newSubtasks;
        });
        toast.dismiss(deleteToast);
        toast.success('Quest abandoned', { description: 'Your quest has been removed from your log', duration: 3000 });
        setRefreshTrigger(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error deleting goal:', error);
      toast.dismiss(deleteToast);
      toast.error('Connection error', {
        description: 'Could not connect to the server. Please try again.',
        duration: 5000
      });
    }
  };

  const handleProgressUpdate = async (id: number, progress: number) => {
    setGoals(prevGoals =>
      prevGoals.map(goal =>
        goal.id === id ? {
          ...goal,
          progress_bar: progress,
          status: progress === 100 ? 'completed' : progress > 0 ? 'in-progress' : 'not-started'
        } : goal
      )
    );

    try {
      await UpdateProgress(id, progress);
      if (progress === 100) {
        toast.success('Quest completed!', { description: 'Congratulations!', duration: 4000 });
      }
    } catch (error) {
      console.error('Error updating progress:', error);
      toast.error('Update failed', { description: 'Could not save your progress', duration: 3000 });
    }
  };

  const handleSubtaskAdd = async (goalId: number, subtaskTitle: string) => {
    try {
      const response = await addSubtask(goalId, subtaskTitle);
      if (response.success) {
        const newSubtask = {
          id: response.data.id,
          title: subtaskTitle,
          completed: false,
          goal_id: goalId
        };
        setSubtasks(prev => ({
          ...prev,
          [goalId]: [...(prev[goalId] || []), newSubtask]
        }));
        updateGoalProgressFromSubtasks(goalId);
        toast.success('Subtask added', { description: 'New step added to your quest', duration: 2000 });
      }
    } catch (error) {
      console.error("Error adding subtask:", error);
      toast.error('Failed to add subtask', { description: 'Please try again', duration: 3000 });
    }
  };

  const handleSubtaskToggle = async (goalId: number, subtaskId: number, completed: boolean) => {
    setSubtasks(prev => ({
      ...prev,
      [goalId]: (prev[goalId] || []).map(st =>
        st.id === subtaskId ? { ...st, completed } : st
      )
    }));

    try {
      await SubtaskComplete(subtaskId);
      updateGoalProgressFromSubtasks(goalId);
    } catch (error) {
      console.error("Error toggling subtask:", error);
      setSubtasks(prev => ({
        ...prev,
        [goalId]: (prev[goalId] || []).map(st =>
          st.id === subtaskId ? { ...st, completed: !completed } : st
        )
      }));
    }
  };

  const handleSubtaskDelete = async (goalId: number, subtaskId: number) => {
    setSubtasks(prev => ({
      ...prev,
      [goalId]: (prev[goalId] || []).filter(st => st.id !== subtaskId)
    }));

    try {
      await subtaskDelete(subtaskId);
      updateGoalProgressFromSubtasks(goalId);
    } catch (error) {
      console.error("Error deleting subtask:", error);
      setRefreshTrigger(prev => prev + 1);
    }
  };

  if (loading) {
    return (
      <SidebarLayout>
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-xl font-vt323">Loading your quests...</div>
        </div>
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout>
      <Toaster position="top-right" />
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
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
                    <GoalStreak/>
                    {chartData ? (
                      <GoalsBarChart chartData={chartData} />
                    ) : (
                      <div className="text-center p-8 text-gray-500">
                        <p className="font-vt323 text-xl">No statistics available</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="goals">
                  <div className="p-8">
                    <GoalForm
                      onGoalCreated={() => {
                        setRefreshTrigger(prev => prev + 1);
                        setActiveTab('allgoals');
                        toast.success('New quest created!', {
                          description: 'Your new quest has been added to your log',
                          duration: 3000
                        });
                      }}
                    />
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
                        <p className="font-vt323 text-xl">No quests found</p>
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
                            goal_type: backendGoal.goal_type,
                            status: backendGoal.progress_bar === 100
                              ? 'completed'
                              : backendGoal.progress_bar > 0
                                ? 'in-progress'
                                : 'not-started',
                            subtasks: subtasks[backendGoal.id] || []
                          }}
                          onDelete={handleDelete}
                          onEdit={handleEdit}
                          onProgressUpdate={handleProgressUpdate}
                          onSubtaskToggle={handleSubtaskToggle}
                          onSubtaskDelete={handleSubtaskDelete}
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