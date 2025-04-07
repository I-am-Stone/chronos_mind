'use client';
import React from 'react';
import { Lightbulb, Brain, Heart, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { TabsContent } from '@/components/ui/tabs';

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

interface IntrospectionSessionProps {
  cognitiveMetrics: CognitiveMetrics;
  emotionalMetrics: EmotionalMetrics;
  qualitativeData: QualitativeData;
  cognitiveAvg: number;
  emotionalAvg: number;
  estimatedPoints: number;
  onMetricChange: (category: 'cognitive' | 'emotional', metric: string, value: number[]) => void;
  onTextChange: (field: keyof QualitativeData, value: string) => void;
  getScoreColor: (score: number) => string;
}

const IntrospectionSession: React.FC<IntrospectionSessionProps> = ({
  cognitiveMetrics,
  emotionalMetrics,
  qualitativeData,
  cognitiveAvg,
  emotionalAvg,
  estimatedPoints,
  onMetricChange,
  onTextChange,
  getScoreColor
}) => {
  return (
    <TabsContent value="session" className="mt-0 space-y-6">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
          <Lightbulb className="mr-3 text-amber-500" size={20} />
          Session Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm text-center border border-gray-200 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-600 mb-2">Cognitive Average</div>
            <div className={`text-3xl font-bold ${getScoreColor(cognitiveAvg)}`}>
              {cognitiveAvg.toFixed(1)}/10
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm text-center border border-gray-200 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-600 mb-2">Emotional Average</div>
            <div className={`text-3xl font-bold ${getScoreColor(emotionalAvg)}`}>
              {emotionalAvg.toFixed(1)}/10
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm text-center mb-2 border border-gray-200 hover:shadow-md transition-shadow">
          <div className="text-sm text-gray-600 mb-2">Estimated Points</div>
          <div className="text-3xl font-bold text-green-600 flex items-center justify-center">
            <Award className="mr-2 text-amber-500" size={24} />
            +{estimatedPoints} pts
          </div>
          <div className="text-sm text-gray-500 mt-2">Complete your introspection to earn</div>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Cognitive Metrics */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-black flex items-center text-xl">
              <Brain className="mr-3 text-blue-600" size={20} />
              Cognitive Metrics
            </CardTitle>
            <CardDescription className="text-gray-600 text-base">
              Rate your current cognitive state (0-10)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 px-6">
            {Object.entries(cognitiveMetrics).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-base text-gray-800 capitalize font-medium">
                    {key.replace(/_/g, ' ')}
                  </label>
                  <span className={`text-base font-medium ${getScoreColor(value)}`}>
                    {value}
                  </span>
                </div>
                <Slider
                  defaultValue={[value]}
                  max={10}
                  step={0.5}
                  onValueChange={(newValue) => onMetricChange('cognitive', key, newValue)}
                  className="[&_[role=slider]]:bg-blue-600 [&_[role=slider]]:h-5 [&_[role=slider]]:w-5"
                />
              </div>
            ))}
          </CardContent>
        </Card>
        
        {/* Emotional Metrics */}
        <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-black flex items-center text-xl">
              <Heart className="mr-3 text-rose-600" size={20} />
              Emotional Metrics
            </CardTitle>
            <CardDescription className="text-gray-600 text-base">
              Rate your current emotional state (0-10)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 px-6">
            {Object.entries(emotionalMetrics).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-base text-gray-800 capitalize font-medium">
                    {key.replace(/_/g, ' ')}
                  </label>
                  <span className={`text-base font-medium ${getScoreColor(value)}`}>
                    {value}
                  </span>
                </div>
                <Slider
                  defaultValue={[value]}
                  max={10}
                  step={0.5}
                  onValueChange={(newValue) => onMetricChange('emotional', key, newValue)}
                  className="[&_[role=slider]]:bg-rose-600 [&_[role=slider]]:h-5 [&_[role=slider]]:w-5"
                />
              </div>
            ))}
          </CardContent>
        </Card>
        
        {/* Qualitative Data */}
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-black text-xl">Qualitative Reflections</CardTitle>
            <CardDescription className="text-gray-600 text-base">
              Share additional context about your current state
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 px-6">
            <div className="space-y-2">
              <label className="text-base text-gray-800 font-medium">Observations and Notes</label>
              <Textarea 
                placeholder="What are you noticing about your thoughts and feelings right now?"
                className="bg-white border-gray-300 focus:border-blue-500 text-black min-h-24 p-3 text-base"
                value={qualitativeData.observations}
                onChange={(e) => onTextChange('observations', e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <label className="text-base text-gray-800 font-medium">Environmental Factors</label>
              <Textarea 
                placeholder="How is your environment affecting you? (noise, light, etc.)"
                className="bg-white border-gray-300 focus:border-blue-500 text-black p-3 text-base"
                value={qualitativeData.environmental_factors}
                onChange={(e) => onTextChange('environmental_factors', e.target.value)}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <label className="text-base text-gray-800 font-medium">Physical State</label>
              <Textarea 
                placeholder="How does your body feel? (energy, pain, comfort, etc.)"
                className="bg-white border-gray-300 focus:border-blue-500 text-black p-3 text-base"
                value={qualitativeData.physical_state}
                onChange={(e) => onTextChange('physical_state', e.target.value)}
                rows={2}
              />
            </div>
          </CardContent>
          <CardFooter className="pt-2 px-6 pb-6">
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-base py-6 rounded-lg font-semibold transition-colors">
              Complete Introspection
            </Button>
          </CardFooter>
        </Card>
      </div>
    </TabsContent>
  );
};

export default IntrospectionSession; 