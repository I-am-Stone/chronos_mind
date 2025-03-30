'use Client';

import { Card, CardContent} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PencilIcon, TrashIcon, CalendarIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from '@/components/ui/input';

interface Goal {
  id: number;
  title: string;
  description: string;
  status: string;
  targetDate: string;
  progress: number;
  difficulty: string;
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
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-semibold font-vt323">{goal.title}</h3>
                <Badge className={getStatusColor(goal.status)}>
                  {goal.status.replace('-', ' ').charAt(0).toUpperCase() + goal.status.slice(1)}
                </Badge>
                <Badge>
                  {goal.difficulty.replace('-', ' ').charAt(0).toUpperCase() + goal.difficulty.slice(1)}  
                </Badge>
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
                onClick={() => onEdit(goal)}
              >
                <PencilIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(goal.id)}
              >
                <TrashIcon className="h-4 w-4 text-red-500" />
              </Button>'use Client';
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-vt323">
              <CalendarIcon className="h-4 w-4 text-gray-500" />
              <span>Due: {new Date(goal.targetDate).toLocaleDateString()}</span>
              {getDaysRemaining(goal.targetDate) < 0 ? (
                <Badge variant="destructive">Overdue</Badge>
              ) : getDaysRemaining(goal.targetDate) <= 7 ? (
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
                  onChange={(e) => onProgressUpdate(goal.id, Number(e.target.value))}
                  className="w-20"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
    </div>
  );
};

export default GoalCard;