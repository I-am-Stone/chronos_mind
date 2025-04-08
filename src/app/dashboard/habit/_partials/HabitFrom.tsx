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
} from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { PostHabit } from "@/api/habit/postHabit";

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

export function HabitTracker() {
  const [habitName, setHabitName] = useState('');
  const [habitDescription, setHabitDescription] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [nextId, setNextId] = useState(1);
  const [showResetSettings, setShowResetSettings] = useState(false);
  const [resetTime, setResetTime] = useState('');  // Changed from '09:00' to empty string
  const [resetOption, setResetOption] = useState<ResetOption>('daily');

  useEffect(() => {
    const checkResetHabits = () => {
      const now = new Date();
      const currentHours = String(now.getHours()).padStart(2, '0');
      const currentMinutes = String(now.getMinutes()).padStart(2, '0');
      const currentTime = `${currentHours}:${currentMinutes}`;

      setHabits(prevHabits =>
          prevHabits.map(habit => {
            if (!habit.completed || !habit.completedAt || !habit.resetOption || habit.resetOption === 'never') {
              return habit;
            }

            const completedAt = new Date(habit.completedAt);
            let needsReset = false;

            const shouldCheckTimeReset = habit.resetTime && currentTime === habit.resetTime;

            if (shouldCheckTimeReset) {
              switch (habit.resetOption) {
                case 'daily':
                  needsReset = true;
                  break;
                case 'weekly':
                  needsReset = now.getDay() === completedAt.getDay();
                  break;
                case 'monthly':
                  needsReset = now.getDate() === completedAt.getDate();
                  break;
              }
            }

            if (needsReset) {
              return { ...habit, completed: false, completedAt: null };
            }

            return habit;
          })
      );
    };

    checkResetHabits();
    const interval = setInterval(checkResetHabits, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleCreateHabit = async () => {
    if (habitName.trim()) {
      const newHabit: Habit = {
        id: nextId,
        name: habitName,
        description: habitDescription,
        completed: false,
      };

      if (showResetSettings) {
        newHabit.resetOption = resetOption;
        if (resetOption !== 'never') {
          // Use default time if user didn't input any
          newHabit.resetTime = resetTime || '09:00';
        }
      }

      try {
        const response = await PostHabit({
          name: habitName,
          description: habitDescription
        });

        if (response.success) {
          setHabits([...habits, newHabit]);
          setNextId(nextId + 1);
          setHabitName('');
          setHabitDescription('');
          setIsAdding(false);
          setShowResetSettings(false);
          setResetTime('');  // Reset the time input after adding
        } else {
          console.error("Failed to create habit:", response.error);
        }
      } catch (error) {
        console.error("Error creating habit:", error);
      }
    }
  };

  const handleAddHabit = () => {
    setIsAdding(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreateHabit();
    } else if (e.key === 'Escape') {
      setIsAdding(false);
      setHabitName('');
      setHabitDescription('');
      setShowResetSettings(false);
      setResetTime('');  // Reset the time input when canceling
    }
  };

  const toggleHabit = (id: number) => {
    setHabits(habits.map(habit => {
      if (habit.id !== id) return habit;

      const newCompletedState = !habit.completed;
      return {
        ...habit,
        completed: newCompletedState,
        completedAt: newCompletedState ? new Date() : null
      };
    }));
  };

  const updateResetOption = (id: number, option: ResetOption) => {
    setHabits(habits.map(habit =>
        habit.id === id ? { ...habit, resetOption: option } : habit
    ));
  };

  const updateResetTime = (id: number, time: string) => {
    setHabits(habits.map(habit =>
        habit.id === id ? { ...habit, resetTime: time } : habit
    ));
  };

  const deleteHabit = (id: number) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  const clearCompleted = () => {
    setHabits(habits.filter(habit => !habit.completed));
  };

  return (
      <div className="max-w-md mx-auto">
        <Card className="bg-white border-none shadow-sm">
          <CardContent className="p-4">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Habits</h2>
              <p className="text-gray-500 text-sm">Track your daily habits</p>
            </div>

            <div className="space-y-1 mb-4">
              {habits.length > 0 ? (
                  habits.map((habit) => (
                      <div
                          key={habit.id}
                          className="group flex items-center py-2 px-1 hover:bg-gray-50 rounded-sm transition-colors"
                      >
                        <button
                            onClick={() => toggleHabit(habit.id)}
                            className={`h-5 w-5 rounded flex-shrink-0 border ${
                                habit.completed
                                    ? 'bg-blue-500 border-blue-500'
                                    : 'border-gray-300 hover:border-gray-400'
                            } flex items-center justify-center mr-3`}
                        >
                          {habit.completed && <Check className="h-3 w-3 text-white" />}
                        </button>
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
                        <div className="flex items-center">
                          {habit.resetTime && (
                              <span className="text-xs text-gray-500 mr-2 flex items-center">
                        <AlarmClock className="h-3 w-3 mr-1" />
                                {habit.resetTime}
                      </span>
                          )}
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
                                    onValueChange={(value: ResetOption) => updateResetOption(habit.id, value)}
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
                                        onChange={(e) => updateResetTime(habit.id, e.target.value)}
                                        className="h-8"
                                        placeholder="Select time"
                                    />
                                  </div>
                              )}
                            </PopoverContent>
                          </Popover>
                          <button
                              onClick={() => deleteHabit(habit.id)}
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

            {isAdding ? (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleCreateHabit();
                }} className="py-2 space-y-3">
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
                  <div className="space-y-2">
                    <Label className="text-xs">Description</Label>
                    <Input
                        placeholder="Optional description"
                        className="border border-gray-200 text-gray-800 rounded-sm focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-0"
                        value={habitDescription}
                        onChange={(e) => setHabitDescription(e.target.value)}
                    />
                  </div>

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

                  <div className="flex justify-end gap-2 mt-2">
                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setIsAdding(false);
                          setHabitName('');
                          setHabitDescription('');
                          setShowResetSettings(false);
                          setResetTime('');  // Reset the time input when canceling
                        }}
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
                    onClick={handleAddHabit}
                    className="flex items-center py-2 px-1 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  <span>Add a habit</span>
                </div>
            )}

            {habits.length > 0 && (
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100 text-xs text-gray-500">
                  <span>{habits.length} habit{habits.length !== 1 ? 's' : ''}</span>
                  {habits.some(habit => habit.completed) && (
                      <Button
                          size="sm"
                          variant="ghost"
                          onClick={clearCompleted}
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