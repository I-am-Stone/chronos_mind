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
import { toast, Toaster } from 'sonner';

export default function GoalsPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [goals, setGoals] = useState<backendGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState<'date' | 'progress' | 'title'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchGoals = async () => {
      const loadingToast = toast.loading('Loading your quests...', {
        duration: 5000
      });

      try {
        setLoading(true);
        const response = await getGoals();

        if (response.success && response.data) {
          setGoals(response.data);
          setError(null);
          toast.dismiss(loadingToast);
          if (refreshTrigger > 0) {
            toast.success('Goals updated', {
              description: 'Your quest log has been refreshed!',
              duration: 3000
            });
          }
        } else {
          setError("Failed to fetch goals");
          setGoals([]);
          toast.dismiss(loadingToast);
          toast.error('Failed to load quests', {
            description: response.error || 'Please try again later',
            duration: 5000
          });
        }
      } catch (err) {
        console.error("Error fetching goals:", err);
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

    fetchGoals().then(r => console.log(r));
  }, [refreshTrigger]);

  useEffect(() => {
    const fetchGoalStats = async () => {
      try {
        const response = await GetGoalStats();

        if (response.success && response.data) {
          setChartData(Array.isArray(response.data) ? response.data[0] : response.data);
        } else {
          console.error("Failed to fetch Goal Stats:", response.error || "Unknown error");
          toast.error('Stats unavailable', {
            description: 'Could not load your goal statistics',
            duration: 3000
          });
        }
      } catch (error) {
        console.error("Error fetching Goal Stats:", error);
        toast.error('Stats error', {
          description: 'Failed to load your achievement statistics',
          duration: 3000
        });
      }
    };

    fetchGoalStats().then(r => console.log(r));
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

  const handleEdit = (updatedGoal:any) => {
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

    toast.info('Goal updated', {
      description: 'Your quest has been updated!',
      duration: 3000
    });
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to abandon this quest?');

    if (!confirmDelete) return;

    const deleteToast = toast.loading('Deleting your quest...', {
      duration: 5000
    });

    try {
      const response = await deleteGoal(id);

      if (response.success) {
        setGoals(prevGoals => prevGoals.filter(goal => goal.id !== id));
        toast.dismiss(deleteToast);
        toast.success('Quest abandoned', {
          description: 'Your quest has been removed from your log',
          duration: 3000
        });
      } else {
        toast.dismiss(deleteToast);
        toast.error('Failed to delete', {
          description: response.error || 'There was a problem deleting this quest',
          duration: 5000
        });
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

  const handleProgressUpdate = async (id: number, progress: number, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }

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

    if (progress === 100) {
      toast.success('Quest completed!', {
        description: 'Congratulations on completing your quest!',
        duration: 4000
      });
    } else if (progress === 0) {
      toast.info('Progress reset', {
        description: 'Your quest progress has been reset to zero',
        duration: 3000
      });
    } else {
      toast.success('Progress updated', {
        description: `Your quest is now ${progress}% complete`,
        duration: 2000
      });
    }

    try {
      const response = await UpdateProgress(id, progress);

      if (!response.success) {
        toast.error('Update failed', {
          description: response.error || 'Failed to update progress on the server',
          duration: 5000
        });

        const freshGoalsResponse = await getGoals();
        if (freshGoalsResponse.success && freshGoalsResponse.data) {
          setGoals(freshGoalsResponse.data);
        }
      } else {
        const statsResponse = await GetGoalStats();
        if (statsResponse.success && statsResponse.data) {
          setChartData(Array.isArray(statsResponse.data) ? statsResponse.data[0] : statsResponse.data);
        }
      }
    } catch (error) {
      console.error('Error updating progress:', error);
      toast.error('Connection error', {
        description: 'Could not save your progress. Please try again.',
        duration: 5000
      });
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
        <Toaster
            position="top-right"
            toastOptions={{
              className: 'font-vt323 border border-gray-100',
              style: {
                fontSize: '16px'
              }
            }}
        />
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
                <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                >
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
                      <div>
                        <GoalStreak/>
                      </div>
                      <div className="p-25">
                        {chartData ? (
                            <GoalsBarChart chartData={chartData} />
                        ) : (
                            <div className="text-center p-8 text-gray-500">
                              <p className="font-vt323 text-xl">No statistics available</p>
                              <p className="font-vt323 mt-2">
                                Complete goals to see your progress analytics
                              </p>
                            </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="goals">
                    <div className="p-8">
                      <GoalForm
                          onGoalCreated={() => {
                            setRefreshTrigger(prev => prev + 1);
                            setActiveTab('all goals');
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
                          setFilterStatus={(status) => {
                            setFilterStatus(status);
                            if (status !== 'all') {
                              toast.info('Filtering quests', {
                                description: `Showing ${status} quests`,
                                duration: 2000
                              });
                            }
                          }}
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
                            <p className="font-vt323 mt-2">
                              {goals.length === 0
                                  ? "Create your first quest to get started!"
                                  : "No quests match your current filters"}
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
                                    goal_type: backendGoal.goal_type,
                                    status: backendGoal.progress_bar === 100
                                        ? 'completed'
                                        : backendGoal.progress_bar > 0
                                            ? 'in-progress'
                                            : 'not-started',
                                    subtasks: backendGoal.subtasks,
                                  }}
                                  onDeleteAction={handleDelete}
                                  onEditAction={handleEdit}
                                  onProgressUpdateAction={(id, progress) => handleProgressUpdate(id, progress)}
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