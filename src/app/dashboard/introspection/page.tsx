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
  
  return (
    <SidebarLayout>
      <div className="p-6 md:p-8 max-w-5xl mx-auto">
        <div className="bg-white text-black rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <Tabs defaultValue="session" className="w-full">
            <div className="bg-gradient-to-r from-blue-700 to-blue-500 px-6 py-5 rounded-t-xl">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <Brain className="mr-3 text-white" size={28} />
                  Mind Lab: Introspection Chamber
                </h2>
                <Badge variant="outline" className="bg-white text-blue-600 border-white px-3 py-1 text-sm font-medium self-start md:self-auto">
                  <Award className="mr-2" size={16} />
                  Level 3
                </Badge>
              </div>
              
              <TabsList className="grid grid-cols-3 bg-blue-800/30 rounded-md p-1">
                <TabsTrigger value="session" className="data-[state=active]:bg-white data-[state=active]:text-blue-600 py-2 rounded-md">
                  <Brain className="mr-2 h-4 w-4" /> New Session
                </TabsTrigger>
                <TabsTrigger value="history" className="data-[state=active]:bg-white data-[state=active]:text-blue-600 py-2 rounded-md">
                  <History className="mr-2 h-4 w-4" /> History
                </TabsTrigger>
                <TabsTrigger value="analysis" className="data-[state=active]:bg-white data-[state=active]:text-blue-600 py-2 rounded-md">
                  <Bot className="mr-2 h-4 w-4" /> AI Analysis
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="p-6">
              {/* New Introspection Session Tab */}
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
                            onValueChange={(newValue) => handleMetricChange('cognitive', key, newValue)}
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
                            onValueChange={(newValue) => handleMetricChange('emotional', key, newValue)}
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
                          onChange={(e) => handleTextChange('observations', e.target.value)}
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-base text-gray-800 font-medium">Environmental Factors</label>
                        <Textarea 
                          placeholder="How is your environment affecting you? (noise, light, etc.)"
                          className="bg-white border-gray-300 focus:border-blue-500 text-black p-3 text-base"
                          value={qualitativeData.environmental_factors}
                          onChange={(e) => handleTextChange('environmental_factors', e.target.value)}
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-base text-gray-800 font-medium">Physical State</label>
                        <Textarea 
                          placeholder="How does your body feel? (energy, pain, comfort, etc.)"
                          className="bg-white border-gray-300 focus:border-blue-500 text-black p-3 text-base"
                          value={qualitativeData.physical_state}
                          onChange={(e) => handleTextChange('physical_state', e.target.value)}
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
              
              {/* History Tab */}
              <TabsContent value="history" className="mt-0">
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
              </TabsContent>
              
              {/* AI Analysis Tab */}
              <TabsContent value="analysis" className="mt-0">
                <Alert className="bg-blue-50 border-blue-200 mb-6 p-4 rounded-xl">
                  <Bot className="h-6 w-6 text-blue-600" />
                  <AlertTitle className="text-blue-800 text-lg">AI Analysis Active</AlertTitle>
                  <AlertDescription className="text-gray-800 text-base mt-1">
                    Your Mind Lab AI has analyzed your recent introspection data and prepared insights.
                  </AlertDescription>
                </Alert>
                
                <Card className="bg-white border-gray-200 shadow-md rounded-xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-black text-xl">Cognitive-Emotional Analysis</CardTitle>
                    <CardDescription className="text-gray-600 text-base">
                      Based on your session from {currentAnalysis.created_at}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 px-6">
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 shadow-sm">
                      <h3 className="text-blue-800 font-medium text-lg mb-2">Overall Assessment</h3>
                      <p className="text-gray-800 text-base">{currentAnalysis.overall_response}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 shadow-sm">
                        <h3 className="text-blue-800 font-medium text-lg mb-2">Cognitive Evaluation</h3>
                        <p className="text-gray-800 text-base">{currentAnalysis.cognitive_evaluation}</p>
                      </div>
                      
                      <div className="bg-rose-50 rounded-xl p-4 border border-rose-100 shadow-sm">
                        <h3 className="text-rose-800 font-medium text-lg mb-2">Emotional Evaluation</h3>
                        <p className="text-gray-800 text-base">{currentAnalysis.emotional_evaluation}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-green-50 rounded-xl p-4 border border-green-100 shadow-sm">
                        <h3 className="text-green-800 font-medium text-lg mb-3 flex items-center">
                          <CheckCircle size={18} className="mr-2" />
                          Strengths
                        </h3>
                        <ul className="text-gray-800 text-base pl-2 space-y-2">
                          {currentAnalysis.strengths.map((strength, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-green-600 mr-2 text-lg">•</span> {strength}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 shadow-sm">
                        <h3 className="text-amber-800 font-medium text-lg mb-3">Areas for Improvement</h3>
                        <ul className="text-gray-800 text-base pl-2 space-y-2">
                          {currentAnalysis.areas_for_improvement.map((area, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-amber-600 mr-2 text-lg">•</span> {area}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 shadow-sm">
                      <h3 className="text-blue-800 font-medium text-lg mb-3">Recommendations</h3>
                      <div className="space-y-3">
                        {currentAnalysis.recommendations.map((rec, index) => (
                          <div key={index} className="bg-white p-3 rounded-lg text-base text-gray-800 flex items-center border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <Lightbulb size={18} className="text-amber-500 mr-3 flex-shrink-0" />
                            {rec}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-blue-100 rounded-xl p-4 border border-blue-200 shadow-sm">
                      <h3 className="text-blue-800 font-medium text-lg mb-2">Conclusion</h3>
                      <p className="text-gray-800 text-base">{currentAnalysis.conclusion}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-gray-200 pt-5 pb-6 px-6 flex flex-col md:flex-row justify-between gap-4">
                    <Button variant="outline" className="border-gray-300 text-gray-800 hover:bg-gray-100 py-5 text-base rounded-lg">
                      Previous Analysis
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700 text-white py-5 text-base rounded-lg font-semibold transition-colors">
                      Apply Recommendations
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default IntrospectionSection;