'use client'
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Plus, Trash2, Clock, AlarmClock } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { postHabit } from "@/api/habit/postHabit";
import { getHabit } from "@/api/habit/getHabit";
import { deleteHabit } from "@/api/habit/deleteHabit";
import {habitComplete} from "@/api/habit/habitComplete";
// Type definitions
type ResetOption = 'daily' | 'weekly' | 'monthly' | 'never';

type Habit = {
  id: number;
  name: string;
  description?: string;
  completed: boolean;
  completedAt?: Date | null;
  resetTime?: string;
  resetOption?: ResetOption;
};

interface ApiHabit {
  id: number;
  name: string;
  description?: string;
  completed?: boolean;
  completedAt?: string | null;
  resetTime?: string;
  resetOption?: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  id?: number;
}

interface HabitInput {
  name: string;
  description?: string;
  resetOption?: ResetOption;
  resetTime?: string;
}

export function HabitTracker() {
  // State hooks
  const [habits, setHabits] = useState<Habit[]>([]);
  const [nextId, setNextId] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  // Form state
  const [habitName, setHabitName] = useState('');
  const [habitDescription, setHabitDescription] = useState('');
  const [showResetSettings, setShowResetSettings] = useState(false);
  const [resetTime, setResetTime] = useState('');
  const [resetOption, setResetOption] = useState<ResetOption>('daily');

  // Load habits on component mount
  useEffect(() => {
    fetchHabits();
  }, []);

  // Check and reset habits at specified times
  useEffect(() => {
    const checkResetHabits = () => {
      const now = new Date();
      const currentTime = formatTime(now);

      setHabits(prevHabits =>
          prevHabits.map(habit => {
            if (!shouldResetHabit(habit, now, currentTime)) {
              return habit;
            }
            return { ...habit, completed: false, completedAt: null };
          })
      );
    };

    // Run immediately and set up interval
    checkResetHabits();
    const interval = setInterval(checkResetHabits, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  // Helper function to format time as HH:MM
  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Helper function to determine if a habit should be reset
  const shouldResetHabit = (habit: Habit, now: Date, currentTime: string) => {
    if (!habit.completed || !habit.completedAt || !habit.resetOption || habit.resetOption === 'never' || !habit.resetTime) {
      return false;
    }

    // Only check when the current time matches the reset time
    if (currentTime !== habit.resetTime) {
      return false;
    }

    const completedAt = new Date(habit.completedAt);

    switch (habit.resetOption) {
      case 'daily':
        return true;
      case 'weekly':
        return now.getDay() === completedAt.getDay();
      case 'monthly':
        return now.getDate() === completedAt.getDate();
      default:
        return false;
    }
  };

  // Fetch habits from API
  const fetchHabits = async () => {
    try {
      const response = await getHabit() as ApiResponse<ApiHabit[]>;

      if (response.success && response.data) {
        const fetchedHabits: Habit[] = response.data.map((habit: ApiHabit) => ({
          id: habit.id,
          name: habit.name,
          description: habit.description || '',
          completed: habit.completed || false,
          completedAt: habit.completedAt ? new Date(habit.completedAt) : null,
          resetTime: habit.resetTime || '',
          resetOption: (habit.resetOption as ResetOption) || 'never'
        }));

        setHabits(fetchedHabits);

        // Update nextId to be one more than the highest id from fetched habits
        if (fetchedHabits.length > 0) {
          const maxId = Math.max(...fetchedHabits.map(h => h.id));
          setNextId(maxId + 1);
        }
      } else {
        console.error("Failed to fetch habits:", response.error);
      }
    } catch (error) {
      console.error("Error fetching habits:", error);
    }
  };

  // Create a new habit
  const handleCreateHabit = async () => {
    if (!habitName.trim()) return;

    try {
      const habitInput: HabitInput = {
        name: habitName,
        description: habitDescription || undefined
      };

      // Add reset settings if enabled
      if (showResetSettings) {
        habitInput.resetOption = resetOption;
        if (resetOption !== 'never') {
          habitInput.resetTime = resetTime || '09:00'; // Default to 9am if no time set
        }
      }

      const response = await postHabit(habitInput) as ApiResponse<ApiHabit>;

      if (response.success) {
        let createdHabit: Habit;

        if (response.data) {
          // Use the returned habit data
          createdHabit = {
            id: response.data.id,
            name: response.data.name,
            description: response.data.description,
            completed: response.data.completed || false,
            completedAt: response.data.completedAt ? new Date(response.data.completedAt) : null,
            resetTime: response.data.resetTime,
            resetOption: response.data.resetOption as ResetOption
          };
        } else if (response.id) {
          // If only an ID is returned, use our local data with the returned ID
          createdHabit = {
            id: response.id,
            name: habitName,
            description: habitDescription,
            completed: false,
            resetOption: showResetSettings ? resetOption : undefined,
            resetTime: (showResetSettings && resetOption !== 'never') ? (resetTime || '09:00') : undefined
          };
        } else {
          // Fallback to our local data with the next ID
          createdHabit = {
            id: nextId,
            name: habitName,
            description: habitDescription,
            completed: false,
            resetOption: showResetSettings ? resetOption : undefined,
            resetTime: (showResetSettings && resetOption !== 'never') ? (resetTime || '09:00') : undefined
          };
        }

        setHabits([...habits, createdHabit]);
        setNextId(nextId + 1);
        resetForm();
      } else {
        console.error("Failed to create habit:", response.error);
      }
    } catch (error) {
      console.error("Error creating habit:", error);
    }
  };

  // Reset the form fields
  const resetForm = () => {
    setHabitName('');
    setHabitDescription('');
    setIsAdding(false);
    setShowResetSettings(false);
    setResetTime('');
    setResetOption('daily');
  };

  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreateHabit();
    } else if (e.key === 'Escape') {
      resetForm();
    }
  };

  // Toggle habit completion status
  const toggleHabitCompletion = async (id: number) => {
    try {
      // Get the habit we're updating
      const habitToUpdate = habits.find(habit => habit.id === id);
      if (!habitToUpdate) return;

      // Define the new completion state
      const newCompletedState = !habitToUpdate.completed;

      // If we're marking as completed, call the API
      if (newCompletedState) {
        const response = await habitComplete(id);
        if (!response.success) {
          console.error("Failed to update habit completion status:", response.error);
          return;
        }
      }

      // Update the local state
      setHabits(habits.map(habit => {
        if (habit.id !== id) return habit;

        return {
          ...habit,
          completed: newCompletedState,
          completedAt: newCompletedState ? new Date() : null
        };
      }));
    } catch (error) {
      console.error("Error updating habit completion status:", error);
    }
  };


  // Update habit reset option
  const updateHabitResetOption = (id: number, option: ResetOption) => {
    setHabits(habits.map(habit =>
        habit.id === id ? { ...habit, resetOption: option } : habit
    ));
  };

  // Update habit reset time
  const updateHabitResetTime = (id: number, time: string) => {
    setHabits(habits.map(habit =>
        habit.id === id ? { ...habit, resetTime: time } : habit
    ));
  };

  // Delete a habit
  const handleDeleteHabit = async (id: number) => {
    try {
      const response = await deleteHabit(id);
      if (response.success) {
        setHabits(habits.filter(habit => habit.id !== id));
      } else {
        console.error("Failed to delete habit:", response.error);
      }
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  };

  // Clear all completed habits
  const clearCompletedHabits = () => {
    setHabits(habits.filter(habit => !habit.completed));
  };

  return (
      <div className="max-w-md mx-auto">
        <Card className="bg-white border-none shadow-sm">
          <CardContent className="p-4">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Habits</h2>
              <p className="text-gray-500 text-sm">Track your daily habits</p>
            </div>

            {/* Habits List */}
            <div className="space-y-1 mb-4">
              {habits.length > 0 ? (
                  habits.map((habit) => (
                      <div
                          key={habit.id}
                          className="group flex items-center py-2 px-1 hover:bg-gray-50 rounded-sm transition-colors"
                      >
                        {/* Completion Checkbox */}
                        <button
                            onClick={() => toggleHabitCompletion(habit.id)}
                            className={`h-5 w-5 rounded flex-shrink-0 border ${
                                habit.completed
                                    ? 'bg-blue-500 border-blue-500'
                                    : 'border-gray-300 hover:border-gray-400'
                            } flex items-center justify-center mr-3`}
                        >
                          {habit.completed && <Check className="h-3 w-3 text-white" />}
                        </button>

                        {/* Habit Name and Description */}
                        <div className="flex-grow">
                    <span className={`text-gray-800 ${
                        habit.completed ? 'line-through text-gray-400' : ''
                    }`}>
                      {habit.name}
                    </span>
                          {habit.description && (
                              <p className="text-xs text-gray-500 mt-1">{habit.description}</p>
                          )}
                        </div>

                        {/* Habit Controls */}
                        <div className="flex items-center">
                          {habit.resetTime && (
                              <span className="text-xs text-gray-500 mr-2 flex items-center">
                        <AlarmClock className="h-3 w-3 mr-1" />
                                {habit.resetTime}
                      </span>
                          )}

                          {/* Reset Settings Popover */}
                          <Popover>
                            <PopoverTrigger asChild>
                              <button className="h-6 w-6 flex items-center justify-center text-gray-400 opacity-0 group-hover:opacity-100 hover:text-gray-600 transition-opacity mr-1">
                                <Clock className="h-4 w-4" />
                              </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-56 p-3 space-y-3">
                              <div className="space-y-2">
                                <Label className="text-xs">Reset schedule</Label>
                                <Select
                                    value={habit.resetOption || 'never'}
                                    onValueChange={(value: ResetOption) => updateHabitResetOption(habit.id, value)}
                                >
                                  <SelectTrigger className="h-8">
                                    <SelectValue placeholder="Select reset option" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="daily">Daily</SelectItem>
                                    <SelectItem value="weekly">Weekly</SelectItem>
                                    <SelectItem value="monthly">Monthly</SelectItem>
                                    <SelectItem value="never">Never</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              {habit.resetOption && habit.resetOption !== 'never' && (
                                  <div className="space-y-2">
                                    <Label className="text-xs">Reset time</Label>
                                    <Input
                                        type="time"
                                        value={habit.resetTime || ''}
                                        onChange={(e) => updateHabitResetTime(habit.id, e.target.value)}
                                        className="h-8"
                                        placeholder="Select time"
                                    />
                                  </div>
                              )}
                            </PopoverContent>
                          </Popover>

                          {/* Delete Button */}
                          <button
                              onClick={() => handleDeleteHabit(habit.id)}
                              className="h-6 w-6 flex items-center justify-center text-gray-400 opacity-0 group-hover:opacity-100 hover:text-gray-600 transition-opacity"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                  ))
              ) : (
                  <div className="py-6 text-center text-gray-400 text-sm italic">
                    No habits yet. Add one below.
                  </div>
              )}
            </div>

            {/* Add Habit Form or Button */}
            {isAdding ? (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleCreateHabit();
                }} className="py-2 space-y-3">
                  {/* Habit Name Input */}
                  <div className="space-y-2">
                    <Label className="text-xs">Habit Name*</Label>
                    <Input
                        placeholder="Enter habit name"
                        className="border border-gray-200 text-gray-800 rounded-sm focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-0"
                        value={habitName}
                        onChange={(e) => setHabitName(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        required
                        minLength={1}
                        maxLength={255}
                    />
                  </div>

                  {/* Description Input */}
                  <div className="space-y-2">
                    <Label className="text-xs">Description</Label>
                    <Input
                        placeholder="Optional description"
                        className="border border-gray-200 text-gray-800 rounded-sm focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-0"
                        value={habitDescription}
                        onChange={(e) => setHabitDescription(e.target.value)}
                    />
                  </div>

                  {/* Reset Schedule Options */}
                  {!showResetSettings ? (
                      <button
                          type="button"
                          onClick={() => setShowResetSettings(true)}
                          className="text-xs text-blue-500 hover:text-blue-700 flex items-center"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add reset schedule
                      </button>
                  ) : (
                      <div className="space-y-3 border-t pt-3">
                        <div className="space-y-2">
                          <Label className="text-xs">Reset schedule</Label>
                          <Select
                              value={resetOption}
                              onValueChange={(value: ResetOption) => setResetOption(value)}
                          >
                            <SelectTrigger className="h-8">
                              <SelectValue placeholder="Select reset option" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="never">Never</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {resetOption !== 'never' && (
                            <div className="space-y-2">
                              <Label className="text-xs">Reset time</Label>
                              <Input
                                  type="time"
                                  value={resetTime}
                                  onChange={(e) => setResetTime(e.target.value)}
                                  className="h-8"
                                  placeholder="Select time"
                              />
                            </div>
                        )}
                        <button
                            type="button"
                            onClick={() => setShowResetSettings(false)}
                            className="text-xs text-red-500 hover:text-red-700"
                        >
                          Remove reset schedule
                        </button>
                      </div>
                  )}

                  {/* Form Buttons */}
                  <div className="flex justify-end gap-2 mt-2">
                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={resetForm}
                        className="text-gray-500 hover:text-gray-700 h-8"
                    >
                      Cancel
                    </Button>
                    <Button
                        type="submit"
                        size="sm"
                        className="bg-blue-500 hover:bg-blue-600 text-white h-8"
                    >
                      Add Habit
                    </Button>
                  </div>
                </form>
            ) : (
                <div
                    onClick={() => setIsAdding(true)}
                    className="flex items-center py-2 px-1 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  <span>Add a habit</span>
                </div>
            )}

            {/* Footer Stats and Actions */}
            {habits.length > 0 && (
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100 text-xs text-gray-500">
                  <span>{habits.length} habit{habits.length !== 1 ? 's' : ''}</span>
                  {habits.some(habit => habit.completed) && (
                      <Button
                          size="sm"
                          variant="ghost"
                          onClick={clearCompletedHabits}
                          className="text-xs h-6 text-gray-500 hover:text-gray-700"
                      >
                        Clear completed
                      </Button>
                  )}
                </div>
            )}
          </CardContent>
        </Card>
      </div>
  );
}