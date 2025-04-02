"use client";
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Brain, Heart, History, Bot, Lightbulb, Award, Calendar, CheckCircle } from 'lucide-react';
import SidebarLayout from '@/components/shared/sidebar/layout';

const IntrospectionSection = () => {
  // State for introspection session form
  const [cognitiveMetrics, setCognitiveMetrics] = useState({
    working_memory: 5,
    processing_speed: 6,
    attentional_control: 4,
    cognitive_flexibility: 7,
    metacognition: 5
  });
  
  const [emotionalMetrics, setEmotionalMetrics] = useState({
    emotional_valence: 6,
    emotional_arousal: 4,
    emotional_regulation: 7
  });
  
  const [qualitativeData, setQualitativeData] = useState({
    observations: '',
    environmental_factors: '',
    physical_state: ''
  });
  
  // Sample history data
  const introspectionHistory = [
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
  const currentAnalysis = {
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
  const handleMetricChange = (category, metric, value) => {
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
  const handleTextChange = (field, value) => {
    setQualitativeData({
      ...qualitativeData,
      [field]: value
    });
  };
  
  // Calculate average scores
  const cognitiveAvg = Object.values(cognitiveMetrics).reduce((a, b) => a + b, 0) / Object.values(cognitiveMetrics).length;
  const emotionalAvg = Object.values(emotionalMetrics).reduce((a, b) => a + b, 0) / Object.values(emotionalMetrics).length;
  
  // Helper function to get color based on score
  const getScoreColor = (score) => {
    if (score >= 8) return "text-green-500";
    if (score >= 6) return "text-emerald-500";
    if (score >= 4) return "text-amber-500";
    return "text-red-500";
  };
  
  // Estimate points based on metrics and text length
  const estimatedPoints = Math.round(
    (cognitiveAvg + emotionalAvg) * 3 + 
    Math.min(qualitativeData.observations.length, 200) / 10
  );
  
  return (
    <SidebarLayout>
    <div className="bg-gray-900 text-gray-100 rounded-lg shadow-xl p-1 overflow-hidden">
      <Tabs defaultValue="session" className="w-full">
        <div className="bg-gray-800 px-4 py-3 rounded-t-lg">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-bold text-white flex items-center">
              <Brain className="mr-2 text-indigo-400" size={24} />
              Mind Lab: Introspection Chamber
            </h2>
            <Badge variant="outline" className="bg-indigo-900 text-indigo-100 border-indigo-700 px-3 py-1">
              <Award className="mr-1" size={14} />
              Level 3
            </Badge>
          </div>
          
          <TabsList className="grid grid-cols-3 bg-gray-700 rounded-md">
            <TabsTrigger value="session" className="data-[state=active]:bg-indigo-700 data-[state=active]:text-white">
              <Brain className="mr-2 h-4 w-4" /> New Session
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-indigo-700 data-[state=active]:text-white">
              <History className="mr-2 h-4 w-4" /> History
            </TabsTrigger>
            <TabsTrigger value="analysis" className="data-[state=active]:bg-indigo-700 data-[state=active]:text-white">
              <Bot className="mr-2 h-4 w-4" /> AI Analysis
            </TabsTrigger>
          </TabsList>
        </div>
        
        <div className="p-4">
          {/* New Introspection Session Tab */}
          <TabsContent value="session" className="mt-0">
            <div className="bg-gray-800 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-semibold text-indigo-300 mb-2 flex items-center">
                <Lightbulb className="mr-2" size={18} />
                Session Status
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-700 p-3 rounded-lg text-center">
                  <div className="text-xs text-gray-400 mb-1">Cognitive Average</div>
                  <div className={`text-2xl font-bold ${getScoreColor(cognitiveAvg)}`}>
                    {cognitiveAvg.toFixed(1)}/10
                  </div>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg text-center">
                  <div className="text-xs text-gray-400 mb-1">Emotional Average</div>
                  <div className={`text-2xl font-bold ${getScoreColor(emotionalAvg)}`}>
                    {emotionalAvg.toFixed(1)}/10
                  </div>
                </div>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg text-center mb-3">
                <div className="text-xs text-gray-400 mb-1">Estimated Points</div>
                <div className="text-2xl font-bold text-indigo-400">
                  +{estimatedPoints} pts
                </div>
                <div className="text-xs text-gray-400 mt-1">Complete your introspection to earn</div>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Cognitive Metrics */}
              <Card className="bg-gray-800 border-gray-700 shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white flex items-center">
                    <Brain className="mr-2 text-indigo-400" size={18} />
                    Cognitive Metrics
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Rate your current cognitive state (0-10)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(cognitiveMetrics).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <div className="flex justify-between">
                        <label className="text-sm text-gray-300 capitalize">
                          {key.replace(/_/g, ' ')}
                        </label>
                        <span className={`text-sm font-medium ${getScoreColor(value)}`}>
                          {value}
                        </span>
                      </div>
                      <Slider
                        defaultValue={[value]}
                        max={10}
                        step={0.5}
                        onValueChange={(newValue) => handleMetricChange('cognitive', key, newValue)}
                        className="[&_[role=slider]]:bg-indigo-600"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              {/* Emotional Metrics */}
              <Card className="bg-gray-800 border-gray-700 shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white flex items-center">
                    <Heart className="mr-2 text-pink-400" size={18} />
                    Emotional Metrics
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Rate your current emotional state (0-10)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(emotionalMetrics).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <div className="flex justify-between">
                        <label className="text-sm text-gray-300 capitalize">
                          {key.replace(/_/g, ' ')}
                        </label>
                        <span className={`text-sm font-medium ${getScoreColor(value)}`}>
                          {value}
                        </span>
                      </div>
                      <Slider
                        defaultValue={[value]}
                        max={10}
                        step={0.5}
                        onValueChange={(newValue) => handleMetricChange('emotional', key, newValue)}
                        className="[&_[role=slider]]:bg-pink-600"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              {/* Qualitative Data */}
              <Card className="bg-gray-800 border-gray-700 shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white">Qualitative Reflections</CardTitle>
                  <CardDescription className="text-gray-400">
                    Share additional context about your current state
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">Observations and Notes</label>
                    <Textarea 
                      placeholder="What are you noticing about your thoughts and feelings right now?"
                      className="bg-gray-700 border-gray-600 focus:border-indigo-500 text-white"
                      value={qualitativeData.observations}
                      onChange={(e) => handleTextChange('observations', e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">Environmental Factors</label>
                    <Textarea 
                      placeholder="How is your environment affecting you? (noise, light, etc.)"
                      className="bg-gray-700 border-gray-600 focus:border-indigo-500 text-white"
                      value={qualitativeData.environmental_factors}
                      onChange={(e) => handleTextChange('environmental_factors', e.target.value)}
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">Physical State</label>
                    <Textarea 
                      placeholder="How does your body feel? (energy, pain, comfort, etc.)"
                      className="bg-gray-700 border-gray-600 focus:border-indigo-500 text-white"
                      value={qualitativeData.physical_state}
                      onChange={(e) => handleTextChange('physical_state', e.target.value)}
                      rows={2}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                    Complete Introspection
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          {/* History Tab */}
          <TabsContent value="history" className="mt-0">
            <div className="bg-gray-800 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-semibold text-indigo-300 mb-3 flex items-center">
                <Calendar className="mr-2" size={18} />
                Introspection History
              </h3>
              <div className="text-sm text-gray-400 mb-4">
                Review your previous introspection sessions and track your progress
              </div>
              
              <div className="space-y-4">
                {introspectionHistory.map((session) => (
                  <Card key={session.id} className="bg-gray-700 border-gray-600">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-white text-lg">Session #{session.id}</CardTitle>
                        <Badge className="bg-indigo-600">+{session.points_earned} pts</Badge>
                      </div>
                      <CardDescription className="text-gray-400">
                        {session.date}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="bg-gray-800 p-2 rounded text-center">
                          <div className="text-xs text-gray-400 mb-1">Cognitive</div>
                          <div className={`text-xl font-bold ${getScoreColor(session.cognitive_avg)}`}>
                            {session.cognitive_avg.toFixed(1)}/10
                          </div>
                        </div>
                        <div className="bg-gray-800 p-2 rounded text-center">
                          <div className="text-xs text-gray-400 mb-1">Emotional</div>
                          <div className={`text-xl font-bold ${getScoreColor(session.emotional_avg)}`}>
                            {session.emotional_avg.toFixed(1)}/10
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-300 border-t border-gray-600 pt-3">
                        <p className="italic">"{session.notes}"</p>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t border-gray-600 pt-3">
                      <Button variant="outline" size="sm" className="w-full border-gray-500 text-gray-300 hover:bg-gray-600">
                        View Full Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <Button variant="link" className="text-indigo-400">
                  View All History
                </Button>
              </div>
            </div>
          </TabsContent>
          
          {/* AI Analysis Tab */}
          <TabsContent value="analysis" className="mt-0">
            <Alert className="bg-indigo-950 border-indigo-800 mb-4">
              <Bot className="h-5 w-5 text-indigo-400" />
              <AlertTitle className="text-indigo-300">AI Analysis Active</AlertTitle>
              <AlertDescription className="text-gray-300">
                Your Mind Lab AI has analyzed your recent introspection data and prepared insights.
              </AlertDescription>
            </Alert>
            
            <Card className="bg-gray-800 border-gray-700 shadow-md">
              <CardHeader>
                <CardTitle className="text-white">Cognitive-Emotional Analysis</CardTitle>
                <CardDescription className="text-gray-400">
                  Based on your session from {currentAnalysis.created_at}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-700 rounded-lg p-3">
                  <h3 className="text-indigo-300 font-medium mb-1">Overall Assessment</h3>
                  <p className="text-gray-300 text-sm">{currentAnalysis.overall_response}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-gray-700 rounded-lg p-3">
                    <h3 className="text-indigo-300 font-medium mb-1">Cognitive Evaluation</h3>
                    <p className="text-gray-300 text-sm">{currentAnalysis.cognitive_evaluation}</p>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-3">
                    <h3 className="text-pink-300 font-medium mb-1">Emotional Evaluation</h3>
                    <p className="text-gray-300 text-sm">{currentAnalysis.emotional_evaluation}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-gray-700 rounded-lg p-3">
                    <h3 className="text-green-400 font-medium mb-1 flex items-center">
                      <CheckCircle size={16} className="mr-1" />
                      Strengths
                    </h3>
                    <ul className="text-gray-300 text-sm pl-2">
                      {currentAnalysis.strengths.map((strength, index) => (
                        <li key={index} className="mb-1 flex items-start">
                          <span className="text-green-400 mr-1">•</span> {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-3">
                    <h3 className="text-amber-400 font-medium mb-1">Areas for Improvement</h3>
                    <ul className="text-gray-300 text-sm pl-2">
                      {currentAnalysis.areas_for_improvement.map((area, index) => (
                        <li key={index} className="mb-1 flex items-start">
                          <span className="text-amber-400 mr-1">•</span> {area}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-3">
                  <h3 className="text-blue-400 font-medium mb-2">Recommendations</h3>
                  <div className="space-y-2">
                    {currentAnalysis.recommendations.map((rec, index) => (
                      <div key={index} className="bg-gray-800 p-2 rounded text-sm text-gray-300 flex items-center">
                        <Lightbulb size={16} className="text-blue-400 mr-2 flex-shrink-0" />
                        {rec}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-indigo-900/30 rounded-lg p-3 border border-indigo-800">
                  <h3 className="text-indigo-300 font-medium mb-1">Conclusion</h3>
                  <p className="text-gray-300 text-sm">{currentAnalysis.conclusion}</p>
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-700 pt-4 flex justify-between">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  Previous Analysis
                </Button>
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  Apply Recommendations
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
    </SidebarLayout>
  );
};

export default IntrospectionSection;