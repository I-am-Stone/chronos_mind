'use client';
import React, { useState } from "react";
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
  subtasks:[];
}

interface GoalCardProps {
  goal: Goal;
  onEditAction: (goal: Goal) => void;
  onDeleteAction: (id: number) => void;
  onProgressUpdateAction: (id: number, progress: number) => void;
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
                                                  }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoal, setEditedGoal] = useState<Goal>({ ...goal });

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
    onProgressUpdateAction(goal.id, newProgress);
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
                              <SelectItem value="health">Health</SelectItem>
                              <SelectItem value="financial">Financial</SelectItem>
                              <SelectItem value="educational">Educational</SelectItem>
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
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 font-vt323">Progress</span>
                          <span className="text-sm font-medium font-vt323">{goal.progress}%</span>
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
