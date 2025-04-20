'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, CheckCircle, Calendar, BarChart3, Award } from "lucide-react";

export default function GoalStrategies() {
  return (
      <div>
        <Card className="mb-4 border-2 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 font-vt323 text-base">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-2xl font-bold">
              <Target className="text-blue-500" size={28} />
              Goal Setting Strategies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-base text-slate-600 dark:text-slate-300">
              Effective strategies to create meaningful goals and follow through to completion. Apply these principles to achieve your ambitions.
            </p>

            <div className="space-y-4">
              {/* Strategy 1: SMART Goals */}
              <div className="rounded-lg bg-emerald-50 p-4 dark:bg-emerald-900/30">
                <div className="flex items-center gap-2 font-bold text-lg text-emerald-600 dark:text-emerald-400">
                  <CheckCircle size={20} />
                  <span>SMART GOALS</span>
                </div>
                <p className="mt-2 text-base text-slate-700 dark:text-slate-300">
                  Create goals that are <span className="font-bold">Specific, Measurable, Achievable, Relevant, and Time-bound</span>.
                  Example: "I will run 3 miles three times per week for the next month" instead of "I'll exercise more."
                </p>
              </div>

              {/* Strategy 2: Implementation Plans */}
              <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/30">
                <div className="flex items-center gap-2 font-bold text-lg text-blue-600 dark:text-blue-400">
                  <Calendar size={20} />
                  <span>IMPLEMENTATION PLANS</span>
                </div>
                <p className="mt-2 text-base text-slate-700 dark:text-slate-300">
                  Create <span className="font-bold">detailed action steps</span> with specific dates and triggers.
                  Break down larger goals into manageable tasks with deadlines, and schedule them in your calendar.
                </p>
              </div>

              {/* Strategy 3: Progress Tracking */}
              <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/30">
                <div className="flex items-center gap-2 font-bold text-lg text-purple-600 dark:text-purple-400">
                  <BarChart3 size={20} />
                  <span>TRACK PROGRESS</span>
                </div>
                <p className="mt-2 text-base text-slate-700 dark:text-slate-300">
                  <span className="font-bold">Measure and visualize your progress</span> regularly.
                  Keep a log or journal of your efforts, review weekly, and adjust your approach based on what's working and what isn't.
                </p>
              </div>

              {/* Strategy 4: Accountability */}
              <div className="rounded-lg bg-amber-50 p-4 dark:bg-amber-900/30">
                <div className="flex items-center gap-2 font-bold text-lg text-amber-600 dark:text-amber-400">
                  <Award size={20} />
                  <span>ACCOUNTABILITY SYSTEM</span>
                </div>
                <p className="mt-2 text-base text-slate-700 dark:text-slate-300">
                  <span className="font-bold">Share your goals with others</span> and create consequences for success and failure.
                  Find an accountability partner, join a group with similar goals, or use commitment devices like public pledges.
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/20">
              <p className="text-center text-sm font-medium text-indigo-800 dark:text-indigo-300">
                Remember: The most successful goals align with your core values and intrinsic motivation!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
  );
}