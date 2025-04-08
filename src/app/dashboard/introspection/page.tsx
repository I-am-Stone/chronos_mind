'use client';

import React, { useState, useEffect } from 'react';
import { Tabs } from '@/components/ui/tabs';
import SidebarLayout from '@/components/shared/sidebar/layout';
import IntrospectionTabs from './_partials/IntrospectionTabs';
import IntrospectionSession from './_partials/IntrospectionSession';
import IntrospectionHistory from './_partials/IntrospectionHistory';
import IntrospectionAnalysis from './_partials/IntrospectionAnalysis';
import { motion } from 'framer-motion';
import IntrospectionWeeklyMetricsChart from './_partials/IntrospectionLineChart';
import { getSessions } from "@/api/introspection/getSession";

type TabValue = 'session' | 'history' | 'analysis' | 'charts';

interface CognitiveMetrics {
  working_memory: number;
  processing_speed: number;
  attentional_control: number;
  cognitive_flexibility: number;
  metacognition: number;
}

interface EmotionalMetrics {
  emotional_valence: number;
  emotional_arousal: number;
  emotional_regulation: number;
}

interface QualitativeData {
  observations: string;
  environmental_factors: string;
  physical_state: string;
}

interface SessionData {
  cognitiveMetrics: CognitiveMetrics;
  emotionalMetrics: EmotionalMetrics;
  qualitativeData: QualitativeData;
}

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

interface AIAnalysis {
  overall_response: string;
  emotional_evaluation: string;
  cognitive_evaluation: string;
  strengths: string[];
  areas_for_improvement: string[];
  recommendations: string[];
  conclusion: string;
  created_at: string;
}

const calculateCognitiveAvg = (session: HistorySession): number => {
  const { working_memory, processing_speed, attentional_control, cognitive_flexibility, metacognition } = session;
  return (working_memory + processing_speed + attentional_control + cognitive_flexibility + metacognition) / 5;
};

const calculateEmotionalAvg = (session: HistorySession): number => {
  const { emotional_valence, emotional_arousal, emotional_regulation } = session;
  return (emotional_valence + emotional_arousal + emotional_regulation) / 3;
};

const IntrospectionSection = () => {
  const [history, setHistory] = useState<HistorySession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sessionData, setSessionData] = useState<SessionData>({
    cognitiveMetrics: {
      working_memory: 5,
      processing_speed: 6,
      attentional_control: 4,
      cognitive_flexibility: 7,
      metacognition: 5
    },
    emotionalMetrics: {
      emotional_valence: 6,
      emotional_arousal: 4,
      emotional_regulation: 7
    },
    qualitativeData: {
      observations: '',
      environmental_factors: '',
      physical_state: ''
    }
  });

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getSessions();

        const sessionsWithAverages = response.map(session => ({
          ...session,
          cognitive_avg: calculateCognitiveAvg(session),
          emotional_avg: calculateEmotionalAvg(session)
        }));

        setHistory(sessionsWithAverages);
      } catch (error) {
        console.error("Failed to load sessions:", error);
        setError("Failed to load session history. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const currentAnalysis: AIAnalysis = {
    overall_response: "Your introspection indicates moderate cognitive performance with good emotional regulation. Your cognitive flexibility score stands out as a strength.",
    emotional_evaluation: "Your emotional state shows good regulation despite moderate arousal, suggesting you're managing stress effectively. Your emotional valence indicates a generally positive mood.",
    cognitive_evaluation: "Cognitive metrics show solid flexibility with room for improvement in attentional control. Working memory is at average levels.",
    strengths: ["Cognitive flexibility", "Emotional regulation", "Self-awareness"],
    areas_for_improvement: ["Attentional control", "Working memory", "Emotional arousal management"],
    recommendations: [
      "Try focused breathing exercises before complex tasks",
      "Practice mindfulness for 10 minutes daily",
      "Consider environment adjustments to reduce distractions"
    ],
    conclusion: "Overall, you're demonstrating good self-awareness and regulation. Focus on attention training to improve cognitive performance further.",
    created_at: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  };

  const cognitiveAvg = Object.values(sessionData.cognitiveMetrics).reduce((a, b) => a + b, 0) /
      Object.values(sessionData.cognitiveMetrics).length;
  const emotionalAvg = Object.values(sessionData.emotionalMetrics).reduce((a, b) => a + b, 0) /
      Object.values(sessionData.emotionalMetrics).length;

  const getScoreColor = (score: number): string => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-blue-600";
    if (score >= 4) return "text-amber-600";
    return "text-red-600";
  };

  const estimatedPoints = Math.round(
      (cognitiveAvg + emotionalAvg) * 3 +
      Math.min(sessionData.qualitativeData.observations.length, 200) / 10
  );

  const [activeTab, setActiveTab] = useState<TabValue>('session');

  const refreshHistory = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getSessions();
      const sessionsWithAverages = response.map(session => ({
        ...session,
        cognitive_avg: calculateCognitiveAvg(session),
        emotional_avg: calculateEmotionalAvg(session)
      }));
      setHistory(sessionsWithAverages);
    } catch (error) {
      console.error("Failed to refresh sessions:", error);
      setError("Failed to refresh session history. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <SidebarLayout>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Mind Lab
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Build lasting habits with proven strategies
              </p>
            </motion.div>
          </div>
        </div>
        <div className="p-6 md:p-8 max-w-5xl mx-auto">
          <div className="bg-white text-black rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <Tabs defaultValue="session" className="w-full">
              <div className="px-6 pb-4">
                <IntrospectionTabs activeTab={activeTab} onTabChange={setActiveTab} />
              </div>

              <div className="p-6">
                {activeTab === 'session' && (
                    <IntrospectionSession
                        initialData={sessionData}
                        cognitiveAvg={cognitiveAvg}
                        emotionalAvg={emotionalAvg}
                        estimatedPoints={estimatedPoints}
                        getScoreColor={getScoreColor}
                    />
                )}

                {activeTab === 'history' && (
                    <>
                      {isLoading && <div className="text-center py-8">Loading session history...</div>}
                      {error && (
                          <div className="bg-red-50 text-red-800 p-4 rounded-lg mb-4">
                            {error}
                            <button
                                onClick={refreshHistory}
                                className="ml-4 bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded"
                            >
                              Retry
                            </button>
                          </div>
                      )}
                      {!isLoading && !error && (
                          <IntrospectionHistory
                              introspectionHistory={history}
                              getScoreColor={getScoreColor}
                          />
                      )}
                    </>
                )}

                {activeTab === 'analysis' && (
                    <IntrospectionAnalysis
                        currentAnalysis={currentAnalysis}
                    />
                )}

                {activeTab === 'charts' && (
                    <IntrospectionWeeklyMetricsChart />
                )}
              </div>
            </Tabs>
          </div>
        </div>
      </SidebarLayout>
  );
};

export default IntrospectionSection;