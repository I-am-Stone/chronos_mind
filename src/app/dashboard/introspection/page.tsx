"use client";
import React, { useState } from 'react';
import { Tabs } from '@/components/ui/tabs';
import SidebarLayout from '@/components/shared/sidebar/layout';
import IntrospectionTabs from './_partials/IntrospectionTabs';
import IntrospectionSession from './_partials/IntrospectionSession';
import IntrospectionHistory from './_partials/IntrospectionHistory';
import IntrospectionAnalysis from './_partials/IntrospectionAnalysis';
import {motion} from 'framer-motion';
import IntrospectionWeeklyMetricsChart from './_partials/IntrospectionLineChart';

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

interface HistorySession {
  id: number;
  date: string;
  cognitive_avg: number;
  emotional_avg: number;
  points_earned: number;
  notes: string;
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

const IntrospectionSection = () => {
  // State for introspection session form
  const [cognitiveMetrics, setCognitiveMetrics] = useState<CognitiveMetrics>({
    working_memory: 5,
    processing_speed: 6,
    attentional_control: 4,
    cognitive_flexibility: 7,
    metacognition: 5
  });
  
  const [emotionalMetrics, setEmotionalMetrics] = useState<EmotionalMetrics>({
    emotional_valence: 6,
    emotional_arousal: 4,
    emotional_regulation: 7
  });
  
  const [qualitativeData, setQualitativeData] = useState<QualitativeData>({
    observations: '',
    environmental_factors: '',
    physical_state: ''
  });
  
  // Sample history data
  const introspectionHistory: HistorySession[] = [
    {
      id: 1,
      date: "March 29, 2025",
      cognitive_avg: 6.2,
      emotional_avg: 5.3,
      points_earned: 45,
      notes: "Felt focused but emotionally drained after a long day"
    },
    {
      id: 2,
      date: "March 26, 2025",
      cognitive_avg: 7.4,
      emotional_avg: 7.8,
      points_earned: 65,
      notes: "Excellent session after morning meditation"
    },
    {
      id: 3,
      date: "March 22, 2025",
      cognitive_avg: 4.1,
      emotional_avg: 5.5,
      points_earned: 30,
      notes: "Struggled with focus due to poor sleep"
    }
  ];
  
  // Sample AI analysis
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
    created_at: "March 30, 2025"
  };
  
  // Handle metric change
  const handleMetricChange = (category: 'cognitive' | 'emotional', metric: string, value: number[]) => {
    if (category === 'cognitive') {
      setCognitiveMetrics({
        ...cognitiveMetrics,
        [metric]: value[0] // Slider returns an array
      });
    } else if (category === 'emotional') {
      setEmotionalMetrics({
        ...emotionalMetrics,
        [metric]: value[0]
      });
    }
  };
  
  // Handle text input change
  const handleTextChange = (field: keyof QualitativeData, value: string) => {
    setQualitativeData({
      ...qualitativeData,
      [field]: value
    });
  };
  
  // Calculate average scores
  const cognitiveAvg = Object.values(cognitiveMetrics).reduce((a, b) => a + b, 0) / Object.values(cognitiveMetrics).length;
  const emotionalAvg = Object.values(emotionalMetrics).reduce((a, b) => a + b, 0) / Object.values(emotionalMetrics).length;
  
  // Helper function to get color based on score
  const getScoreColor = (score: number): string => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-blue-600";
    if (score >= 4) return "text-amber-600";
    return "text-red-600";
  };
  
  // Estimate points based on metrics and text length
  const estimatedPoints = Math.round(
    (cognitiveAvg + emotionalAvg) * 3 + 
    Math.min(qualitativeData.observations.length, 200) / 10
  );
  
  // State for active tab
  const [activeTab, setActiveTab] = useState<TabValue>('session');
  
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
              <IntrospectionSession 
                cognitiveMetrics={cognitiveMetrics}
                emotionalMetrics={emotionalMetrics}
                qualitativeData={qualitativeData}
                cognitiveAvg={cognitiveAvg}
                emotionalAvg={emotionalAvg}
                estimatedPoints={estimatedPoints}
                onMetricChange={handleMetricChange}
                onTextChange={handleTextChange}
                getScoreColor={getScoreColor}
              />
              
              <IntrospectionHistory 
                introspectionHistory={introspectionHistory}
                getScoreColor={getScoreColor}
              />
              
              <IntrospectionAnalysis 
                currentAnalysis={currentAnalysis}
              />
              <IntrospectionWeeklyMetricsChart/>
            </div>
          </Tabs>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default IntrospectionSection;