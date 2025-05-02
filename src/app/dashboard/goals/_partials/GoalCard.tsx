'use client';
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {addSubtask} from "@/api/goals/postSubtask";
import {
  PencilIcon,
  TrashIcon,
  CalendarIcon,
  CheckIcon,
  XIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon
} from "lucide-react";
import { motion } from "framer-motion";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateGoal } from "@/api/goals/goalUpdate";
import { Checkbox } from "@/components/ui/checkbox";
import {SubtaskComplete} from "@/api/goals/subtaskComplete";
import { UpdateProgress } from "@/api/goals/progressUpdate";
import { toast } from "sonner";

interface Subtask {
  id: number;
  title: string;
  completed: boolean;
}

interface Goal {
  id: number;
  title: string;
  description: string;
  status: string;
  targetDate: string;
  progress: number;
  difficulty: string;
  goal_type: string;
  subtasks: Subtask[];
}

interface GoalCardProps {
  goal: Goal;
  onEditAction: (goal: Goal) => void;
  onDeleteAction: (id: number) => void;
  onProgressUpdateAction: (id: number, progress: number) => void;
  onSubtaskUpdateAction?: (goalId: number, subtasks: Subtask[]) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'in-progress':
      return 'bg-blue-100 text-blue-800';
    case 'not-started':
      return 'bg-gray-100 text-gray-800';
    default:
      return '';
  }
};

const getDaysRemaining = (targetDate: string) => {
  const today = new Date();
  const target = new Date(targetDate);
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
};

export const GoalCard: React.FC<GoalCardProps> = ({
  goal,
  onEditAction,
  onDeleteAction,
  onProgressUpdateAction,
  onSubtaskUpdateAction,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoal, setEditedGoal] = useState<Goal>({ ...goal });
  const [subtasksExpanded, setSubtasksExpanded] = useState(false);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  const [subtasks, setSubtasks] = useState<Subtask[]>(goal.subtasks || []);
  const [manualProgressMode, setManualProgressMode] = useState(false);

  // Calculate progress based on subtasks completion
  const calculateProgress = (currentSubtasks: Subtask[]) => {
    if (currentSubtasks.length === 0) {
      return goal.progress; // Retain current progress if no subtasks
    }
    
    const completedCount = currentSubtasks.filter(subtask => subtask.completed).length;
    return Math.round((completedCount / currentSubtasks.length) * 100);
  };

  // Update progress whenever subtasks change
  useEffect(() => {
    if (!manualProgressMode && subtasks.length > 0) {
      const newProgress = calculateProgress(subtasks);
      if (newProgress !== goal.progress) {
        updateGoalProgress(newProgress);
      }
    }
  }, [subtasks]);

  const updateGoalProgress = async (newProgress: number) => {
    try {
      // Call the progress update API
      const response = await UpdateProgress(goal.id, newProgress);
      
      if (response.success) {
        // Update parent component's state
        onProgressUpdateAction(goal.id, newProgress);
      } else {
        toast.error("Failed to update goal progress");
      }
    } catch (error) {
      console.error("Error updating goal progress:", error);
      toast.error("An error occurred while updating goal progress");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedGoal({ ...goal });
  };

  const handleSave = async () => {
    try {
      const response = await updateGoal(editedGoal.id, {
        goal_title: editedGoal.title,
        description: editedGoal.description,
        target_date: editedGoal.targetDate,
        goal_type: editedGoal.goal_type,
      });

      if (response.success) {
        onEditAction(editedGoal);
        setIsEditing(false);
      } else {
        console.error("Failed to update goal:", response.message);
      }
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = Math.min(100, Math.max(0, Number(e.target.value)));
    setManualProgressMode(true); // Enable manual progress mode when user changes progress directly
    onProgressUpdateAction(goal.id, newProgress);
  };

  const toggleManualProgressMode = () => {
    if (manualProgressMode) {
      // Switching back to automatic mode
      const calculatedProgress = calculateProgress(subtasks);
      updateGoalProgress(calculatedProgress);
    }
    setManualProgressMode(!manualProgressMode);
  };

  const toggleSubtasks = () => {
    setSubtasksExpanded(!subtasksExpanded);
  };

  const handleAddSubtask = async () => {
    if (newSubtaskTitle.trim() === "") {
      toast.warning("Subtask title cannot be empty");
      return;
    }

    try {
      const toastId = toast.loading("Adding subtask...");
      const response = await addSubtask(goal.id, newSubtaskTitle);

      if (response.success && response.data) {
        const newSubtask: Subtask = {
          id: response.data.id,
          title: response.data.title,
          completed: false
        };

        const updatedSubtasks = [...subtasks, newSubtask];
        setSubtasks(updatedSubtasks);
        setNewSubtaskTitle("");

        toast.success("Subtask added successfully!", { id: toastId });

        if (onSubtaskUpdateAction) {
          onSubtaskUpdateAction(goal.id, updatedSubtasks);
        }
      } else {
        toast.error(response.message || "Failed to add subtask", { id: toastId });
      }
    } catch (error) {
      toast.error("An error occurred while adding subtask");
      console.error("Error adding subtask:", error);
    }
  };

  const handleDeleteSubtask = async (subtaskId: number) => {
    const subtaskToDelete = subtasks.find(subtask => subtask.id === subtaskId);
    if (!subtaskToDelete) return;

    try {
      const toastId = toast.loading(`Deleting "${subtaskToDelete.title}"...`);

      // Call your delete API here if you have one
      // await deleteSubtaskAPI(subtaskId);

      const updatedSubtasks = subtasks.filter(subtask => subtask.id !== subtaskId);
      setSubtasks(updatedSubtasks);

      toast.success(`Subtask deleted successfully`, { id: toastId });

      if (onSubtaskUpdateAction) {
        onSubtaskUpdateAction(goal.id, updatedSubtasks);
      }
    } catch (error) {
      toast.error("Failed to delete subtask");
      console.error("Error deleting subtask:", error);
    }
  };

  const handleToggleSubtaskCompletion = async (subtaskId: number) => {
    // Find the current subtask
    const currentSubtask = subtasks.find(subtask => subtask.id === subtaskId);
    if (!currentSubtask) return;

    // Optimistically update UI
    const updatedSubtasks = subtasks.map(subtask =>
      subtask.id === subtaskId
        ? { ...subtask, completed: !subtask.completed }
        : subtask
    );
    setSubtasks(updatedSubtasks);

    try {
      // Show loading toast
      const toastId = toast.loading(
        `${currentSubtask.completed ? 'Uncompleting' : 'Completing'} subtask...`
      );

      // Call API
      const response = await SubtaskComplete(subtaskId);

      if (response.success) {
        toast.success(
          `Subtask "${currentSubtask.title}" ${currentSubtask.completed ? 'marked incomplete' : 'completed'}!`,
          { id: toastId }
        );

        // Update parent component if needed
        if (onSubtaskUpdateAction) {
          onSubtaskUpdateAction(goal.id, updatedSubtasks);
        }
      } else {
        // Revert on failure
        setSubtasks(subtasks);
        toast.error(
          `Failed to update subtask: ${response.message || response.error}`,
          { id: toastId }
        );
      }
    } catch (error) {
      // Revert on error
      setSubtasks(subtasks);
      toast.error(
        'An unexpected error occurred while updating the subtask',
        { id: toastId }
      );
      console.error("Error updating subtask completion:", error);
    }
  };

  const daysRemaining = getDaysRemaining(goal.targetDate);

  return (
    <div className="max-w-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="mb-4"
      >
        <Card>
          <CardContent className="pt-6">
            {isEditing ? (
              <div className="space-y-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="mb-4">
                      <label className="text-sm font-medium mb-1 block">Goal Title</label>
                      <Input
                        value={editedGoal.title}
                        onChange={(e) => setEditedGoal({ ...editedGoal, title: e.target.value })}
                        className="w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="text-sm font-medium mb-1 block">Description</label>
                      <Textarea
                        value={editedGoal.description}
                        onChange={(e) => setEditedGoal({ ...editedGoal, description: e.target.value })}
                        className="w-full"
                        rows={3}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="text-sm font-medium mb-1 block">Target Date</label>
                      <Input
                        type="date"
                        value={editedGoal.targetDate.split('T')[0]}
                        onChange={(e) => setEditedGoal({ ...editedGoal, targetDate: e.target.value })}
                        className="w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="text-sm font-medium mb-1 block">Goal Type</label>
                      <Select
                        value={editedGoal.goal_type}
                        onValueChange={(value) => setEditedGoal({ ...editedGoal, goal_type: value })}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select goal type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="personal">Personal</SelectItem>
                          <SelectItem value="professional">Professional</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button onClick={() => setIsEditing(false)} variant="outline" size="sm">
                    <XIcon className="h-4 w-4 mr-1" /> Cancel
                  </Button>
                  <Button onClick={handleSave} variant="default" size="sm">
                    <CheckIcon className="h-4 w-4 mr-1" /> Save
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold font-vt323">{goal.title}</h3>
                      <Badge className={getStatusColor(goal.status)}>
                        {goal.status.replace('-', ' ')}
                      </Badge>
                      <Badge>{goal.difficulty}</Badge>
                      <Badge variant="outline">{goal.goal_type}</Badge>
                    </div>
                    <div className="max-h-32 overflow-y-auto">
                      <p className="text-gray-600 mb-2 font-vt323 break-all whitespace-normal overflow-hidden">
                        {goal.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleEdit}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteAction(goal.id)}
                    >
                      <TrashIcon className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 font-vt323">
                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                    <span>Due: {new Date(goal.targetDate).toLocaleDateString()}</span>
                    {daysRemaining < 0 ? (
                      <Badge variant="destructive">Overdue</Badge>
                    ) : daysRemaining <= 7 ? (
                      <Badge variant="secondary">Due soon</Badge>
                    ) : null}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 font-vt323">Progress</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium font-vt323">{goal.progress}%</span>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={toggleManualProgressMode}
                          className="px-2 py-0 h-6 text-xs"
                        >
                          {manualProgressMode ? "Auto" : "Manual"}
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 font-vt323">
                      <Progress value={goal.progress} className="flex-1" />
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={goal.progress}
                        onChange={handleProgressChange}
                        className="w-20"
                        disabled={!manualProgressMode && subtasks.length > 0}
                      />
                    </div>
                    {!manualProgressMode && subtasks.length > 0 && (
                      <p className="text-xs text-gray-500 italic">
                        Progress is automatically calculated based on subtask completion
                      </p>
                    )}
                  </div>

                  {/* Subtasks Section */}
                  <div className="border-t pt-2 mt-4">
                    <Button
                      variant="ghost"
                      onClick={toggleSubtasks}
                      className="flex w-full justify-between items-center p-2 text-sm"
                    >
                      <span className="font-medium">Subtasks ({subtasks.filter(st => st.completed).length}/{subtasks.length})</span>
                      {subtasksExpanded ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
                    </Button>

                    {subtasksExpanded && (
                      <div className="space-y-3 mt-2">
                        {/* Subtasks List */}
                        {subtasks.length > 0 ? (
                          <div className="space-y-2">
                            {subtasks.map((subtask) => (
                              <div key={subtask.id} className="flex items-center gap-2 group">
                                <div className="flex-1 flex items-center gap-2">
                                  <Checkbox
                                    id={`subtask-${subtask.id}`}
                                    checked={subtask.completed}
                                    onCheckedChange={() => handleToggleSubtaskCompletion(subtask.id)}
                                  />
                                  <label
                                    htmlFor={`subtask-${subtask.id}`}
                                    className={`text-sm ${subtask.completed ? 'line-through text-gray-500' : ''}`}
                                  >
                                    {subtask.title}
                                  </label>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => handleDeleteSubtask(subtask.id)}
                                >
                                  <TrashIcon className="h-3 w-3 text-red-500" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 italic">No subtasks yet</p>
                        )}

                        {/* Add New Subtask */}
                        <div className="flex gap-2 items-center mt-3">
                          <Input
                            type="text"
                            placeholder="New subtask..."
                            value={newSubtaskTitle}
                            onChange={(e) => setNewSubtaskTitle(e.target.value)}
                            className="text-sm"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleAddSubtask();
                              }
                            }}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleAddSubtask}
                          >
                            <PlusIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default GoalCard;