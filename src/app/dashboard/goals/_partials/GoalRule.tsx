import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Star, Award, Trophy } from "lucide-react";

export default function GoalRules() {
  return (
    <div>
      <Card className="mb-4 border-2 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 font-vt323 text-xl">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-xl font-bold">
            <Trophy className="text-amber-500" size={24} />
            Challenge Levels
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
            Choose your challenge level wisely! The greater the difficulty, the greater the rewards and achievements you'll unlock.
          </p>
          
          <div className="space-y-4">
            {/* Level: Easy */}
            <div className="rounded-lg bg-emerald-50 p-3 dark:bg-emerald-900/30">
              <div className="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400">
                <Star size={18} />
                <span>BEGINNER</span>
                <span className="ml-auto text-xs">+20 XP</span>
              </div>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                Set goals at least <span className="font-bold">1 week</span> from today. Perfect for building momentum and quick wins.
              </p>
            </div>
            
            {/* Level: Medium */}
            <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
              <div className="flex items-center gap-2 font-bold text-blue-600 dark:text-blue-400">
                <Award size={18} />
                <span>CHALLENGER</span>
                <span className="ml-auto text-xs">+30 XP</span>
              </div>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                Set goals at least <span className="font-bold">3 weeks</span> from today. These require planning and consistent effort.
              </p>
            </div>
            
            {/* Level: Hard */}
            <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30">
              <div className="flex items-center gap-2 font-bold text-purple-600 dark:text-purple-400">
                <Trophy size={18} />
                <span>MASTER</span>
                <span className="ml-auto text-xs">+70 XP</span>
              </div>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                Set goals at least <span className="font-bold">4 weeks</span> from today. These ambitious challenges transform habits and unlock major achievements.
              </p>
            </div>
          </div>
          
          <div className="mt-4 rounded-lg bg-amber-50 p-3 dark:bg-amber-900/20">
            <p className="text-center text-xs font-medium text-amber-800 dark:text-amber-300">
              Complete goals to level up, earn badges, and unlock special themes!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}