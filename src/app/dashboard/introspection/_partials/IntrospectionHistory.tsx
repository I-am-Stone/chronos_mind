'use client';

import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TabsContent } from '@/components/ui/tabs';

interface HistorySession {
  id: number;
  timestamp: string;
  working_memory: number;
  processing_speed: number;
  attentional_control: number;
  cognitive_flexibility: number;
  metacognition: number;
  emotional_valence: number;
  emotional_arousal: number;
  emotional_regulation: number;
  observations: string;
  environmental_factors: string;
  physical_state: string;
  user: number;
  cognitive_avg?: number;
  emotional_avg?: number;
}

interface IntrospectionHistoryProps {
  introspectionHistory?: HistorySession[];
  getScoreColor: (score: number) => string;
}

const calculateCognitiveAvg = (session: HistorySession): number => {
  const { working_memory, processing_speed, attentional_control, cognitive_flexibility, metacognition } = session;
  return (working_memory + processing_speed + attentional_control + cognitive_flexibility + metacognition) / 5;
};

const calculateEmotionalAvg = (session: HistorySession): number => {
  const { emotional_valence, emotional_arousal, emotional_regulation } = session;
  return (emotional_valence + emotional_arousal + emotional_regulation) / 3;
};

const IntrospectionHistory: React.FC<IntrospectionHistoryProps> = ({
                                                                     introspectionHistory = [],
                                                                     getScoreColor
                                                                   }) => {
  const [selectedSession, setSelectedSession] = useState<HistorySession | null>(null);
  const [showAllHistory, setShowAllHistory] = useState(false);

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const openSessionDetails = (session: HistorySession) => {
    setSelectedSession(session);
  };

  const closeSessionDetails = () => {
    setSelectedSession(null);
  };

  const openAllHistory = () => {
    setShowAllHistory(true);
  };

  const closeAllHistory = () => {
    setShowAllHistory(false);
  };

  return (
      <TabsContent value="history">
        <div>
          <div className="bg-blue-50 p-6 rounded-xl shadow-sm mb-6 border border-blue-100">
            <h3 className="text-xl font-semibold text-blue-800 mb-3 flex items-center">
              <Calendar className="mr-3 text-amber-500" size={20} />
              Introspection History
            </h3>
            <div className="text-base text-gray-600 mb-6">
              Review your previous introspection sessions and track your progress
            </div>

            {introspectionHistory.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No session history available
                </div>
            ) : (
                <div className="space-y-6">
                  {introspectionHistory.map((session) => {
                    const cognitiveAvg = session.cognitive_avg || calculateCognitiveAvg(session);
                    const emotionalAvg = session.emotional_avg || calculateEmotionalAvg(session);

                    return (
                        <Card key={session.id} className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow rounded-xl">
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-black text-xl">Session #{session.id}</CardTitle>
                            </div>
                            <CardDescription className="text-gray-600 text-base">
                              {formatDate(session.timestamp)}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div className="bg-blue-50 p-3 rounded-lg text-center border border-blue-100">
                                <div className="text-sm text-gray-600 mb-1">Cognitive</div>
                                <div className={`text-2xl font-bold ${getScoreColor(cognitiveAvg)}`}>
                                  {cognitiveAvg.toFixed(1)}/10
                                </div>
                              </div>
                              <div className="bg-blue-50 p-3 rounded-lg text-center border border-blue-100">
                                <div className="text-sm text-gray-600 mb-1">Emotional</div>
                                <div className={`text-2xl font-bold ${getScoreColor(emotionalAvg)}`}>
                                  {emotionalAvg.toFixed(1)}/10
                                </div>
                              </div>
                            </div>
                            <div className="text-base text-gray-800 border-t border-gray-200 pt-4">
                              <p className="italic">"{session.observations || 'No notes available'}"</p>
                            </div>
                          </CardContent>
                          <CardFooter className="border-t border-gray-200 pt-4 pb-4">
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full border-gray-300 text-gray-800 hover:bg-gray-100 py-5 text-base rounded-lg"
                                onClick={() => openSessionDetails(session)}
                            >
                              View Full Details
                            </Button>
                          </CardFooter>
                        </Card>
                    );
                  })}
                </div>
            )}

            {introspectionHistory.length > 0 && (
                <div className="mt-6 text-center">
                  <Button
                      variant="link"
                      className="text-blue-600 text-base font-medium"
                      onClick={openAllHistory}
                  >
                    View All History
                  </Button>
                </div>
            )}
          </div>
        </div>

        {/* Single Session Dialog */}
        <Dialog open={!!selectedSession} onOpenChange={closeSessionDetails}>
          <DialogContent className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="border-b pb-4">
              <DialogTitle className="text-2xl">
                Mind Lab Report - Session #{selectedSession?.id}
              </DialogTitle>
            </DialogHeader>

            {selectedSession && (
                <div className="space-y-6 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-blue-50 border-blue-100">
                      <CardHeader>
                        <CardTitle className="text-lg">Session Info</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p><span className="font-medium">Date:</span> {formatDate(selectedSession.timestamp)}</p>
                          <p><span className="font-medium">User ID:</span> {selectedSession.user}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-blue-50 border-blue-100">
                      <CardHeader>
                        <CardTitle className="text-lg">Cognitive Metrics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p><span className="font-medium">Working Memory:</span> <span className={getScoreColor(selectedSession.working_memory)}>{selectedSession.working_memory.toFixed(1)}/10</span></p>
                          <p><span className="font-medium">Processing Speed:</span> <span className={getScoreColor(selectedSession.processing_speed)}>{selectedSession.processing_speed.toFixed(1)}/10</span></p>
                          <p><span className="font-medium">Attentional Control:</span> <span className={getScoreColor(selectedSession.attentional_control)}>{selectedSession.attentional_control.toFixed(1)}/10</span></p>
                          <p><span className="font-medium">Cognitive Flexibility:</span> <span className={getScoreColor(selectedSession.cognitive_flexibility)}>{selectedSession.cognitive_flexibility.toFixed(1)}/10</span></p>
                          <p><span className="font-medium">Metacognition:</span> <span className={getScoreColor(selectedSession.metacognition)}>{selectedSession.metacognition.toFixed(1)}/10</span></p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-blue-50 border-blue-100">
                      <CardHeader>
                        <CardTitle className="text-lg">Emotional Metrics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p><span className="font-medium">Emotional Valence:</span> <span className={getScoreColor(selectedSession.emotional_valence)}>{selectedSession.emotional_valence.toFixed(1)}/10</span></p>
                          <p><span className="font-medium">Emotional Arousal:</span> <span className={getScoreColor(selectedSession.emotional_arousal)}>{selectedSession.emotional_arousal.toFixed(1)}/10</span></p>
                          <p><span className="font-medium">Emotional Regulation:</span> <span className={getScoreColor(selectedSession.emotional_regulation)}>{selectedSession.emotional_regulation.toFixed(1)}/10</span></p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Session Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{selectedSession.observations || 'No notes available'}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Additional Observations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Environmental Factors</h4>
                          <p className="text-gray-700">{selectedSession.environmental_factors || 'No data recorded'}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Physical State</h4>
                          <p className="text-gray-700">{selectedSession.physical_state || 'No data recorded'}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
            )}
          </DialogContent>
        </Dialog>

        {/* All History Dialog */}
        <Dialog open={showAllHistory} onOpenChange={closeAllHistory}>
          <DialogContent className="w-full max-w-7xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="border-b pb-4">
              <DialogTitle className="text-2xl">
                Mind Lab Complete History Report
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-8 pt-4">
              {introspectionHistory.map((session) => {
                const cognitiveAvg = session.cognitive_avg || calculateCognitiveAvg(session);
                const emotionalAvg = session.emotional_avg || calculateEmotionalAvg(session);

                return (
                    <Card key={session.id} className="border-gray-200">
                      <CardHeader className="bg-blue-50 rounded-t-lg">
                        <CardTitle className="text-xl">Session #{session.id} - {formatDate(session.timestamp)}</CardTitle>
                        <CardDescription className="flex justify-between items-center">
                      <span>Overall:
                        <span className={`ml-2 font-bold ${getScoreColor(cognitiveAvg)}`}>
                          Cognitive {cognitiveAvg.toFixed(1)}/10
                        </span>
                        <span className={`ml-2 font-bold ${getScoreColor(emotionalAvg)}`}>
                          Emotional {emotionalAvg.toFixed(1)}/10
                        </span>
                      </span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-bold text-lg mb-3">Cognitive Metrics</h4>
                            <div className="space-y-2">
                              <p><span className="font-medium">Working Memory:</span> <span className={getScoreColor(session.working_memory)}>{session.working_memory.toFixed(1)}/10</span></p>
                              <p><span className="font-medium">Processing Speed:</span> <span className={getScoreColor(session.processing_speed)}>{session.processing_speed.toFixed(1)}/10</span></p>
                              <p><span className="font-medium">Attentional Control:</span> <span className={getScoreColor(session.attentional_control)}>{session.attentional_control.toFixed(1)}/10</span></p>
                              <p><span className="font-medium">Cognitive Flexibility:</span> <span className={getScoreColor(session.cognitive_flexibility)}>{session.cognitive_flexibility.toFixed(1)}/10</span></p>
                              <p><span className="font-medium">Metacognition:</span> <span className={getScoreColor(session.metacognition)}>{session.metacognition.toFixed(1)}/10</span></p>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-bold text-lg mb-3">Emotional Metrics</h4>
                            <div className="space-y-2">
                              <p><span className="font-medium">Emotional Valence:</span> <span className={getScoreColor(session.emotional_valence)}>{session.emotional_valence.toFixed(1)}/10</span></p>
                              <p><span className="font-medium">Emotional Arousal:</span> <span className={getScoreColor(session.emotional_arousal)}>{session.emotional_arousal.toFixed(1)}/10</span></p>
                              <p><span className="font-medium">Emotional Regulation:</span> <span className={getScoreColor(session.emotional_regulation)}>{session.emotional_regulation.toFixed(1)}/10</span></p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6">
                          <h4 className="font-bold text-lg mb-3">Notes & Observations</h4>
                          <div className="space-y-4">
                            <div>
                              <p className="font-medium mb-1">Session Notes</p>
                              <p className="text-gray-700">{session.observations || 'No notes available'}</p>
                            </div>
                            <div>
                              <p className="font-medium mb-1">Environmental Factors</p>
                              <p className="text-gray-700">{session.environmental_factors || 'No data recorded'}</p>
                            </div>
                            <div>
                              <p className="font-medium mb-1">Physical State</p>
                              <p className="text-gray-700">{session.physical_state || 'No data recorded'}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                );
              })}
            </div>
          </DialogContent>
        </Dialog>
      </TabsContent>
  );
};

export default IntrospectionHistory;