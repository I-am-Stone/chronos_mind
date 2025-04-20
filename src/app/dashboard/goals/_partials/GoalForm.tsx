'use client';
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sword, Target, Calendar, ScrollText } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PostGoal } from '@/api/goals/postGoals';

interface GoalData {
  goal_title: string;
  description: string;
  difficulty: string;
  target_date: string;
  goal_type: string;
}

interface GoalFormProps {
  onGoalCreated?: () => void;
}

export function GoalForm({ onGoalCreated }: GoalFormProps) {
  const difficulties = [
    { level: 'Easy', color: 'bg-green-500' },
    { level: 'Medium', color: 'bg-yellow-500' },
    { level: 'Hard', color: 'bg-red-500' }
  ];

  const goalType = [
    { level: 'personal', color: 'bg-sky-500' },
    { level: 'professional', color: 'bg-orange-500' },
  ];
  const [goal_title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [type, setType] = useState('');

  async function createGoal(data: GoalData) {
    try {
      const response = await PostGoal(data);
      if (response.success) {
        console.log("Goal created:", response.data);
        // Reset form after successful submission
        setTitle('');
        setDescription('');
        setDifficulty('');
        setTargetDate('');
        setType('');
        if (onGoalCreated) {
          onGoalCreated();
        }
      } else {
        console.error("Goal creation failed:", response.error);
      }
    } catch (error) {
      console.error("Error during goal creation:", error);
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const goalData: GoalData = {
      goal_title,
      description,
      difficulty,
      target_date: targetDate,
      goal_type: type
    };

    await createGoal(goalData);
  };

  return (
      <div className="max-w-md mx-auto font-vt323">
        <Card className="pixel-borders bg-slate-50">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center font-press-start leading-relaxed">Create Your Quest</CardTitle>
            <div className="text-center text-slate-500 text-xl font-press-start">Forge your path to victory!</div>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <ScrollText className="w-5 h-5 text-purple-500" />
                  <Label htmlFor="title" className="text-lg font-press-start">Quest Title</Label>
                </div>
                <Input
                    id="title"
                    name="title"
                    placeholder="Enter your epic quest title"
                    className="border-2 text-lg font-vt323"
                    value={goal_title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                    required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  <Label htmlFor="description" className="text-lg font-press-start">Quest Description</Label>
                </div>
                <Input
                    id="description"
                    name="description"
                    placeholder="Describe your noble quest"
                    className="border-2 text-lg font-vt323"
                    value={description}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                    required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-500" />
                  <Label htmlFor="targetDate" className="text-lg font-press-start">Target Date</Label>
                </div>
                <Input
                    id="targetDate"
                    name="targetDate"
                    type="date"
                    className="border-2 text-lg font-vt323"
                    value={targetDate}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTargetDate(e.target.value)}
                    required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Sword className="w-5 h-5 text-red-500" />
                  <Label htmlFor="difficulty" className="text-lg font-press-start">Difficulty</Label>
                </div>
                <Select
                    name="difficulty"
                    value={difficulty}
                    onValueChange={setDifficulty}
                    required
                >
                  <SelectTrigger className="w-full border-2 text-lg font-vt323 h-12 bg-white/90 shadow-inner">
                    <SelectValue placeholder="Select your challenge" />
                  </SelectTrigger>
                  <SelectContent className="font-vt323 text-lg border-2">
                    {difficulties.map((diff) => (
                        <SelectItem
                            key={diff.level}
                            value={diff.level.toLowerCase()}
                            className={`${diff.color} cursor-pointer hover:bg-slate-100`}
                        >
                          {diff.level}
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Sword className="w-5 h-5 text-red-500" />
                  <Label htmlFor="goalType" className="text-lg font-press-start">Goal Type</Label>
                </div>
                <Select
                    name="goalType"
                    value={type}
                    onValueChange={setType}
                    required
                >
                  <SelectTrigger className="w-full border-2 text-lg font-vt323 h-12 bg-white/90 shadow-inner">
                    <SelectValue placeholder="Goal Type" />
                  </SelectTrigger>
                  <SelectContent className="font-vt323 text-lg border-2">
                    {goalType.map((type) => (
                        <SelectItem
                            key={type.level}
                            value={type.level.toLowerCase()}
                            className={`${type.color} cursor-pointer hover:bg-slate-100`}
                        >
                          {type.level}
                        </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-press-start py-6"
              >
                Embark on Quest
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
  );
}

export default GoalForm;