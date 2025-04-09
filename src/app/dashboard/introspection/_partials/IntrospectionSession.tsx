'use client';
import React, { useState } from 'react';
import { Lightbulb, Brain, Heart, Award, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';
import postSession from '@/api/introspection/postSession';

// Backend expects a flat structure
interface BackendSessionData {
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
}

// Component uses nested structure for organization
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

interface IntrospectionSessionProps {
  initialData: SessionData;
  cognitiveAvg: number;
  emotionalAvg: number;
  estimatedPoints: number;
  getScoreColor: (score: number) => string;
  onSubmitSuccess?: () => void;
}

// Create initial empty state
const createEmptySessionData = (): SessionData => ({
  cognitiveMetrics: {
    working_memory: 5,
    processing_speed: 5,
    attentional_control: 5,
    cognitive_flexibility: 5,
    metacognition: 5,
  },
  emotionalMetrics: {
    emotional_valence: 5,
    emotional_arousal: 5,
    emotional_regulation: 5,
  },
  qualitativeData: {
    observations: '',
    environmental_factors: '',
    physical_state: '',
  }
});

const IntrospectionSession: React.FC<IntrospectionSessionProps> = ({
                                                                     initialData,
                                                                     cognitiveAvg,
                                                                     emotionalAvg,
                                                                     estimatedPoints,
                                                                     getScoreColor,
                                                                     onSubmitSuccess
                                                                   }) => {
  const [formData, setFormData] = useState<SessionData>(createEmptySessionData());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleMetricChange = (category: 'cognitive' | 'emotional', metric: string, value: number[]) => {
    setFormData(prev => ({
      ...prev,
      [`${category}Metrics`]: {
        ...prev[`${category}Metrics`],
        [metric]: value[0]
      }
    }));
  };

  const handleTextChange = (field: keyof QualitativeData, value: string) => {
    setFormData(prev => ({
      ...prev,
      qualitativeData: {
        ...prev.qualitativeData,
        [field]: value
      }
    }));
  };

  // Convert nested structure to flat structure expected by backend
  const formatDataForBackend = (): BackendSessionData => {
    return {
      // Cognitive metrics
      working_memory: formData.cognitiveMetrics.working_memory,
      processing_speed: formData.cognitiveMetrics.processing_speed,
      attentional_control: formData.cognitiveMetrics.attentional_control,
      cognitive_flexibility: formData.cognitiveMetrics.cognitive_flexibility,
      metacognition: formData.cognitiveMetrics.metacognition,

      // Emotional metrics
      emotional_valence: formData.emotionalMetrics.emotional_valence,
      emotional_arousal: formData.emotionalMetrics.emotional_arousal,
      emotional_regulation: formData.emotionalMetrics.emotional_regulation,

      // Qualitative data
      observations: formData.qualitativeData.observations,
      environmental_factors: formData.qualitativeData.environmental_factors,
      physical_state: formData.qualitativeData.physical_state
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      // Format data for backend before submission
      const backendData = formatDataForBackend();

      // Send formatted data to backend
      await postSession(backendData);

      setSubmitSuccess(true);
      toast.success("Introspection session submitted successfully!");

      // Reset form after successful submission
      setFormData(createEmptySessionData());

      // Call onSubmitSuccess if provided
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }

      // Reset success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      toast.error("Failed to submit session. Please try again.");
      console.error("Session submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <TabsContent value="session" className="mt-0 space-y-6">
        <form onSubmit={handleSubmit}>
          {/* Status Section with Loading Animation */}
          <div className="p-6 relative">
            {isSubmitting && (
                <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10 rounded-xl">
                  <div className="flex flex-col items-center">
                    <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
                    <p className="text-lg font-medium text-gray-700">Processing your introspection...</p>
                  </div>
                </div>
            )}

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

          {/* Main Form Content */}
          <div className="space-y-6">
            {/* Cognitive Metrics Card */}
            <Card className="relative">
              {isSubmitting && <div className="absolute inset-0 bg-gray-100 bg-opacity-50 z-10 rounded-lg" />}
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
                {Object.entries(formData.cognitiveMetrics).map(([key, value]) => (
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
                          disabled={isSubmitting}
                      />
                    </div>
                ))}
              </CardContent>
            </Card>

            {/* Emotional Metrics Card */}
            <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow rounded-xl relative">
              {isSubmitting && <div className="absolute inset-0 bg-gray-100 bg-opacity-50 z-10 rounded-lg" />}
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
                {Object.entries(formData.emotionalMetrics).map(([key, value]) => (
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
                          disabled={isSubmitting}
                      />
                    </div>
                ))}
              </CardContent>
            </Card>

            {/* Qualitative Data Card */}
            <Card className="bg-white relative">
              {isSubmitting && <div className="absolute inset-0 bg-gray-100 bg-opacity-50 z-10 rounded-lg" />}
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
                      value={formData.qualitativeData.observations}
                      onChange={(e) => handleTextChange('observations', e.target.value)}
                      rows={3}
                      disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-base text-gray-800 font-medium">Environmental Factors</label>
                  <Textarea
                      placeholder="How is your environment affecting you? (noise, light, etc.)"
                      className="bg-white border-gray-300 focus:border-blue-500 text-black p-3 text-base"
                      value={formData.qualitativeData.environmental_factors}
                      onChange={(e) => handleTextChange('environmental_factors', e.target.value)}
                      rows={2}
                      disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-base text-gray-800 font-medium">Physical State</label>
                  <Textarea
                      placeholder="How does your body feel? (energy, pain, comfort, etc.)"
                      className="bg-white border-gray-300 focus:border-blue-500 text-black p-3 text-base"
                      value={formData.qualitativeData.physical_state}
                      onChange={(e) => handleTextChange('physical_state', e.target.value)}
                      rows={2}
                      disabled={isSubmitting}
                  />
                </div>
              </CardContent>
              <CardFooter className="pt-2 px-6 pb-6">
                <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white text-base py-6 rounded-lg font-semibold transition-colors relative overflow-hidden"
                    disabled={isSubmitting}
                >
                  {submitSuccess ? (
                      <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2 text-white animate-check" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Submitted Successfully!
                  </span>
                  ) : isSubmitting ? (
                      <span className="flex items-center justify-center">
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting...
                  </span>
                  ) : (
                      'Complete Introspection'
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </form>
      </TabsContent>
  );
};

export default IntrospectionSession;