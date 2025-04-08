'use client';
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PencilIcon, TrashIcon, CalendarIcon, CheckIcon, XIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateGoal } from "@/api/goals/goalUpdate";

interface Goal {
  id: number;
  title: string;
  description: string;
  status: string;
  targetDate: string;
  progress: number;
  difficulty: string;
  goal_type: string;
}

interface GoalCardProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onDelete: (id: number) => void;
  onProgressUpdate: (id: number, progress: number) => void;
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
                                                    onEdit,
                                                    onDelete,
                                                    onProgressUpdate
                                                  }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoal, setEditedGoal] = useState<Goal>({ ...goal });
  const [displayedGoal, setDisplayedGoal] = useState<Goal>({ ...goal });

  // Update local state when prop changes
  useEffect(() => {
    setDisplayedGoal({ ...goal });
    setEditedGoal({ ...goal });
  }, [goal]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedGoal({ ...displayedGoal });
  };

  const handleSave = async () => {
    try {
      // Optimistic update - update UI immediately
      setDisplayedGoal({ ...editedGoal });

      // Call the updateGoal API function
      const response = await updateGoal(editedGoal.id, {
        goal_title: editedGoal.title,
        description: editedGoal.description,
        target_date: editedGoal.targetDate,
        goal_type: editedGoal.goal_type
      });

      if (response.success) {
        // Update parent component state
        onEdit(editedGoal);
        setIsEditing(false);
      } else {
        // Revert to previous state if API call fails
        setDisplayedGoal({ ...goal });
        console.error("Failed to update goal:", response.message);
      }
    } catch (error) {
      // Revert to previous state if API call fails
      setDisplayedGoal({ ...goal });
      console.error("Error updating goal:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset editedGoal to current displayedGoal
    setEditedGoal({ ...displayedGoal });
  };

  const handleChange = (field: keyof Goal, value: string | number) => {
    setEditedGoal(prev => ({ ...prev, [field]: value }));
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = Number(e.target.value);

    // Update local state immediately for better UX
    setDisplayedGoal(prev => ({ ...prev, progress: newProgress }));

    // Notify parent component
    onProgressUpdate(displayedGoal.id, newProgress);
  };

  return (
      <div className='max-w-xl mx-auto'>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-4"
        >
          <Card>
            <CardContent className="pt-6">
              {isEditing ? (
                  // Edit Mode
                  <div className="space-y-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="mb-4">
                          <label className="text-sm font-medium mb-1 block">Goal Title</label>
                          <Input
                              value={editedGoal.title}
                              onChange={(e) => handleChange('title', e.target.value)}
                              className="w-full"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="text-sm font-medium mb-1 block">Description</label>
                          <Textarea
                              value={editedGoal.description}
                              onChange={(e) => handleChange('description', e.target.value)}
                              className="w-full"
                              rows={3}
                          />
                        </div>
                        <div className="mb-4">
                          <label className="text-sm font-medium mb-1 block">Target Date</label>
                          <Input
                              type="date"
                              value={editedGoal.targetDate.split('T')[0]}
                              onChange={(e) => handleChange('targetDate', e.target.value)}
                              className="w-full"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="text-sm font-medium mb-1 block">Goal Type</label>
                          <Select
                              value={editedGoal.goal_type}
                              onValueChange={(value) => handleChange('goal_type', value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select goal type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="personal">Personal</SelectItem>
                              <SelectItem value="professional">Professional</SelectItem>
                              <SelectItem value="health">Health</SelectItem>
                              <SelectItem value="financial">Financial</SelectItem>
                              <SelectItem value="educational">Educational</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button onClick={handleCancel} variant="outline" size="sm">
                        <XIcon className="h-4 w-4 mr-1" /> Cancel
                      </Button>
                      <Button onClick={handleSave} variant="default" size="sm">
                        <CheckIcon className="h-4 w-4 mr-1" /> Save
                      </Button>
                    </div>
                  </div>
              ) : (
                  // View Mode
                  <>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold font-vt323">{displayedGoal.title}</h3>
                          <Badge className={getStatusColor(displayedGoal.status)}>
                            {displayedGoal.status.replace('-', ' ').charAt(0).toUpperCase() + displayedGoal.status.slice(1)}
                          </Badge>
                          <Badge>
                            {displayedGoal.difficulty.replace('-', ' ').charAt(0).toUpperCase() + displayedGoal.difficulty.slice(1)}
                          </Badge>
                          <Badge variant="outline">
                            {displayedGoal.goal_type.replace('-', ' ').charAt(0).toUpperCase() + displayedGoal.goal_type.slice(1)}
                          </Badge>
                        </div>
                        <div className="max-h-32 overflow-y-auto">
                          <p className="text-gray-600 mb-2 font-vt323 break-all whitespace-normal overflow-hidden">
                            {displayedGoal.description}
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
                            onClick={() => onDelete(displayedGoal.id)}
                        >
                          <TrashIcon className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 font-vt323">
                        <CalendarIcon className="h-4 w-4 text-gray-500" />
                        <span>Due: {new Date(displayedGoal.targetDate).toLocaleDateString()}</span>
                        {getDaysRemaining(displayedGoal.targetDate) < 0 ? (
                            <Badge variant="destructive">Overdue</Badge>
                        ) : getDaysRemaining(displayedGoal.targetDate) <= 7 ? (
                            <Badge variant="secondary">Due soon</Badge>
                        ) : null}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 font-vt323">Progress</span>
                          <span className="text-sm font-medium font-vt323">{displayedGoal.progress}%</span>
                        </div>
                        <div className="flex items-center gap-4 font-vt323">
                          <Progress value={displayedGoal.progress} className="flex-1" />
                          <Input
                              type="number"
                              min="0"
                              max="100"
                              value={displayedGoal.progress}
                              onChange={handleProgressChange}
                              className="w-20"
                          />
                        </div>
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