'use client';
import React from 'react';
import { Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TabsContent } from '@/components/ui/tabs';

interface HistorySession {
  id: number;
  date: string;
  cognitive_avg: number;
  emotional_avg: number;
  points_earned: number;
  notes: string;
}

interface IntrospectionHistoryProps {
  introspectionHistory: HistorySession[];
  getScoreColor: (score: number) => string;
}

const IntrospectionHistory: React.FC<IntrospectionHistoryProps> = ({
  introspectionHistory,
  getScoreColor
}) => {
  return (
    <TabsContent value= "history">
    <div>
      <div className="bg-blue-50 p-6 rounded-xl shadow-sm mb-6 border border-blue-100">
        <h3 className="text-xl font-semibold text-blue-800 mb-3 flex items-center">
          <Calendar className="mr-3 text-amber-500" size={20} />
          Introspection History
        </h3>
        <div className="text-base text-gray-600 mb-6">
          Review your previous introspection sessions and track your progress
        </div>
        
        <div className="space-y-6">
          {introspectionHistory.map((session) => (
            <Card key={session.id} className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow rounded-xl">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-black text-xl">Session #{session.id}</CardTitle>
                  <Badge className="bg-green-600 px-3 py-1">+{session.points_earned} pts</Badge>
                </div>
                <CardDescription className="text-gray-600 text-base">
                  {session.date}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-50 p-3 rounded-lg text-center border border-blue-100">
                    <div className="text-sm text-gray-600 mb-1">Cognitive</div>
                    <div className={`text-2xl font-bold ${getScoreColor(session.cognitive_avg)}`}>
                      {session.cognitive_avg.toFixed(1)}/10
                    </div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg text-center border border-blue-100">
                    <div className="text-sm text-gray-600 mb-1">Emotional</div>
                    <div className={`text-2xl font-bold ${getScoreColor(session.emotional_avg)}`}>
                      {session.emotional_avg.toFixed(1)}/10
                    </div>
                  </div>
                </div>
                <div className="text-base text-gray-800 border-t border-gray-200 pt-4">
                  <p className="italic">"{session.notes}"</p>
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-200 pt-4 pb-4">
                <Button variant="outline" size="sm" className="w-full border-gray-300 text-gray-800 hover:bg-gray-100 py-5 text-base rounded-lg">
                  View Full Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Button variant="link" className="text-blue-600 text-base font-medium">
            View All History
          </Button>
        </div>
      </div>
    </div>
    </TabsContent>
  );
};

export default IntrospectionHistory; 