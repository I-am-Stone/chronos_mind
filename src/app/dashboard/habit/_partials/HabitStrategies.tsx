'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Trophy, TrendingUp, Calendar, CheckCircle } from "lucide-react";

export default function HabitStrategies() {
    return (
        <div>
            <Card className="mb-4 border-2 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 font-vt323 text-base">
                <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-2xl font-bold">
                        <TrendingUp className="text-green-500" size={28} />
                        Habit Building Strategies
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="mb-4 text-base text-slate-600 dark:text-slate-300">
                        Effective techniques to build lasting habits. Implement these strategies to make your new behaviors stick.
                    </p>

                    <div className="space-y-4">
                        {/* Strategy 1: Start Small */}
                        <div className="rounded-lg bg-emerald-50 p-3 dark:bg-emerald-900/30">
                            <div className="flex items-center gap-2 font-bold text-lg text-emerald-600 dark:text-emerald-400">
                                <Star size={20} />
                                <span>START SMALL</span>
                            </div>
                            <p className="mt-1 text-base text-slate-700 dark:text-slate-300">
                                Begin with <span className="font-bold">tiny, manageable actions</span> that require minimal willpower.
                                Want to read more? Start with 2 pages per day. Small wins build momentum.
                            </p>
                        </div>

                        {/* Strategy 2: Habit Stacking */}
                        <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
                            <div className="flex items-center gap-2 font-bold text-lg text-blue-600 dark:text-blue-400">
                                <CheckCircle size={20} />
                                <span>HABIT STACKING</span>
                            </div>
                            <p className="mt-1 text-base text-slate-700 dark:text-slate-300">
                                <span className="font-bold">Attach new habits</span> to existing routines. Example: "After I brush my teeth,
                                I will meditate for 1 minute." This leverages established patterns.
                            </p>
                        </div>

                        {/* Strategy 3: Environment Design */}
                        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/30">
                            <div className="flex items-center gap-2 font-bold text-lg text-purple-600 dark:text-purple-400">
                                <Trophy size={20} />
                                <span>ENVIRONMENT DESIGN</span>
                            </div>
                            <p className="mt-1 text-base text-slate-700 dark:text-slate-300">
                                <span className="font-bold">Shape your surroundings</span> to make good habits easier and bad habits harder.
                                Want to exercise more? Lay out your workout clothes the night before.
                            </p>
                        </div>

                        {/* Strategy 4: Implementation Intentions */}
                        <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/30">
                            <div className="flex items-center gap-2 font-bold text-lg text-amber-600 dark:text-amber-400">
                                <Calendar size={20} />
                                <span>BE SPECIFIC</span>
                            </div>
                            <p className="mt-1 text-base text-slate-700 dark:text-slate-300">
                                Use <span className="font-bold">"When/Then" planning</span>: "When [situation], then I will [behavior]."
                                Example: "When I wake up, then I will drink a glass of water."
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/20">
                        <p className="text-center text-sm font-medium text-indigo-800 dark:text-indigo-300">
                            Remember: Habits form through consistent repetition, not intensity. Focus on showing up daily!
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}