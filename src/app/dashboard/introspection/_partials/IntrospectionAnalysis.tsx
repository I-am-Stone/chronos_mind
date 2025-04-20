'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Bot, CheckCircle, Lightbulb, RefreshCw, Clock, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface APIResponse {
  success: boolean;
  data?: {
    ai_analysis: {
      overall: string;
      emotional_state_evaluation: string;
      cognitive_functioning_evaluation: string;
      Strengths: {
        [key: string]: string;
      };
      areas_for_improvement: {
        [key: string]: string;
      };
      Recommendations: {
        [key: string]: string;
      };
      factors_influence: {
        [key: string]: string;
      };
      conclusion: string;
    };
  };
  statusCode: number;
  created_at?: string;
  id?: string | number;
  // Legacy fields for older analyses
  overall_response?: string;
  emotional_evaluation?: string;
  cognitive_evaluation?: string;
  strengths?: any;
  areas_for_improvement?: any;
  recommendations?: any;
  influencing_factors?: any;
  conclusion?: string;
}

interface IntrospectionAnalysisProps {
  currentAnalysis: APIResponse | null;
  isLoading: boolean;
  error: string | null;
  onFetchAnalysis: () => void;
  pastAnalyses?: APIResponse[];
  onFetchPastAnalyses?: () => Promise<APIResponse[]>;
}

const IntrospectionAnalysis: React.FC<IntrospectionAnalysisProps> = ({
  currentAnalysis,
  isLoading,
  error,
  onFetchAnalysis,
  pastAnalyses = [],
  onFetchPastAnalyses = async () => { return []; }
}) => {
  const [viewingPastAnalyses, setViewingPastAnalyses] = useState(false);
  const [currentPastAnalysisIndex, setCurrentPastAnalysisIndex] = useState(0);
  const [loadingPastAnalyses, setLoadingPastAnalyses] = useState(false);
  const [formattedPastAnalyses, setFormattedPastAnalyses] = useState<APIResponse[]>([]);
  const [localPastAnalyses, setLocalPastAnalyses] = useState<APIResponse[]>([]);

  // Convert object properties to array and filter out empty/NA values
  const objectToArray = useCallback((obj: { [key: string]: string } | undefined): string[] => {
    if (!obj) return [];
    return Object.entries(obj)
      .filter(([_, val]) =>
        val !== undefined &&
        val !== '' &&
        val !== 'N/A' &&
        !val.includes('No further') &&
        !val.includes('cannot be identified')
      )
      .map(([_, val]) => val);
  }, []);

  // Helper function to ensure object structure
  const convertToObject = useCallback((data: any): { [key: string]: string } => {
    if (!data) return {};
    if (typeof data === 'string') return { '1': data };
    if (Array.isArray(data)) {
      return data.reduce((acc, item, index) => {
        if (item) acc[String(index + 1)] = item;
        return acc;
      }, {} as { [key: string]: string });
    }
    return data;
  }, []);

  // Format analysis data consistently
  const formatAnalysis = useCallback((analysis: APIResponse): APIResponse => {
    if (!analysis) return {
      success: false,
      statusCode: 400,
      data: {
        ai_analysis: {
          overall: 'No analysis data available',
          emotional_state_evaluation: '',
          cognitive_functioning_evaluation: '',
          Strengths: {},
          areas_for_improvement: {},
          Recommendations: {},
          factors_influence: {},
          conclusion: ''
        }
      }
    };

    if (analysis.data?.ai_analysis) {
      return analysis;
    }

    return {
      ...analysis,
      data: {
        ai_analysis: {
          overall: analysis.overall_response || '',
          emotional_state_evaluation: analysis.emotional_evaluation || '',
          cognitive_functioning_evaluation: analysis.cognitive_evaluation || '',
          Strengths: convertToObject(analysis.strengths),
          areas_for_improvement: convertToObject(analysis.areas_for_improvement),
          Recommendations: convertToObject(analysis.recommendations),
          factors_influence: convertToObject(analysis.influencing_factors),
          conclusion: analysis.conclusion || ''
        }
      }
    };
  }, [convertToObject]);

  // Safely extract analysis data with fallbacks
  const getAnalysisData = useCallback((analysis: APIResponse | null) => {
    if (!analysis) {
      return {
        overall: 'No analysis data available',
        emotionalEvaluation: 'No emotional evaluation available',
        cognitiveEvaluation: 'No cognitive evaluation available',
        strengths: [] as string[],
        areasForImprovement: [] as string[],
        recommendations: [] as string[],
        factorsInfluence: [] as string[],
        conclusion: 'No conclusion available',
        createdAt: 'Unknown date',
        id: null
      };
    }

    const formatted = formatAnalysis(analysis);
    const aiAnalysis = formatted.data?.ai_analysis;

    return {
      overall: aiAnalysis?.overall || 'No overall assessment available',
      emotionalEvaluation: aiAnalysis?.emotional_state_evaluation || 'No emotional evaluation available',
      cognitiveEvaluation: aiAnalysis?.cognitive_functioning_evaluation || 'No cognitive evaluation available',
      strengths: objectToArray(aiAnalysis?.Strengths),
      areasForImprovement: objectToArray(aiAnalysis?.areas_for_improvement),
      recommendations: objectToArray(aiAnalysis?.Recommendations),
      factorsInfluence: objectToArray(aiAnalysis?.factors_influence),
      conclusion: aiAnalysis?.conclusion || 'No conclusion available',
      createdAt: formatted.created_at || new Date().toLocaleString(),
      id: formatted.id || null
    };
  }, [formatAnalysis, objectToArray]);

  // Process and format past analyses when they change
  useEffect(() => {
    if (pastAnalyses && pastAnalyses.length > 0) {
      const formatted = pastAnalyses.map(formatAnalysis);
      setFormattedPastAnalyses(formatted);
      setLocalPastAnalyses(formatted);
    }
  }, [pastAnalyses, formatAnalysis]);

  // Handle fetching past analyses
  const handleViewPastAnalyses = useCallback(async () => {
    try {
      setLoadingPastAnalyses(true);
      const fetchedAnalyses = await onFetchPastAnalyses();
      
      // Store the fetched analyses locally to handle the case where they might not be preserved in props
      if (fetchedAnalyses && fetchedAnalyses.length > 0) {
        const formatted = fetchedAnalyses.map(formatAnalysis);
        setLocalPastAnalyses(formatted);
        setViewingPastAnalyses(true);
        setCurrentPastAnalysisIndex(0);
      } else if (formattedPastAnalyses.length > 0) {
        // Use existing formatted analyses if available
        setViewingPastAnalyses(true);
        setCurrentPastAnalysisIndex(0);
      } else if (pastAnalyses.length > 0) {
        // Use pastAnalyses from props as fallback
        const formatted = pastAnalyses.map(formatAnalysis);
        setLocalPastAnalyses(formatted);
        setViewingPastAnalyses(true);
        setCurrentPastAnalysisIndex(0);
      } else {
        console.log("No past analyses available");
      }
    } catch (err) {
      console.error("Error fetching past analyses:", err);
    } finally {
      setLoadingPastAnalyses(false);
    }
  }, [onFetchPastAnalyses, formatAnalysis, formattedPastAnalyses.length, pastAnalyses]);

  // Handle returning to current analysis
  const handleReturnToCurrent = useCallback(() => {
    setViewingPastAnalyses(false);
  }, []);

  // Navigation for past analyses
  const handlePreviousAnalysis = useCallback(() => {
    setCurrentPastAnalysisIndex(prev => Math.max(0, prev - 1));
  }, []);

  const handleNextAnalysis = useCallback(() => {
    const analysesList = localPastAnalyses.length > 0 ? localPastAnalyses : formattedPastAnalyses;
    setCurrentPastAnalysisIndex(prev => Math.min(analysesList.length - 1, prev + 1));
  }, [localPastAnalyses, formattedPastAnalyses]);

  // Determine which analysis to display
  const displayedAnalysis = useMemo(() => {
    if (viewingPastAnalyses) {
      const analysesList = localPastAnalyses.length > 0 ? localPastAnalyses : formattedPastAnalyses;
      if (analysesList.length > currentPastAnalysisIndex) {
        return analysesList[currentPastAnalysisIndex];
      }
    }
    return currentAnalysis;
  }, [viewingPastAnalyses, localPastAnalyses, formattedPastAnalyses, currentPastAnalysisIndex, currentAnalysis]);

  // Format date for display
  const formatDate = useCallback((dateString: string) => {
    if (!dateString) return "Unknown date";
    
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? dateString : date.toLocaleString();
    } catch (e) {
      console.error('Error formatting date:', e);
      return dateString;
    }
  }, []);

  
  const analysisData = getAnalysisData(displayedAnalysis);
  const analysesList = localPastAnalyses.length > 0 ? localPastAnalyses : formattedPastAnalyses;

  return (
    <TabsContent value="analysis">
      <div>
        <Alert className="bg-blue-50 border-blue-200 mb-6 p-4 rounded-xl">
          <Bot className="h-6 w-6 text-blue-600" />
          <AlertTitle className="text-blue-800 text-lg">AI Analysis</AlertTitle>
          <AlertDescription className="text-gray-800 text-base mt-1">
            Your Mind Lab AI can analyze your recent introspection data and prepare personalized insights.
          </AlertDescription>
        </Alert>

        {/* Primary Actions */}
        <div className="flex flex-wrap gap-4 mb-6 justify-between">
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={onFetchAnalysis}
              className={`bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 text-base rounded-lg font-medium transition-colors flex items-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Lightbulb className="h-4 w-4 mr-2" />
              )}
              Generate Analysis
            </Button>

            <Button
              onClick={handleViewPastAnalyses}
              className={`bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 text-base rounded-lg font-medium transition-colors flex items-center ${loadingPastAnalyses ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loadingPastAnalyses}
            >
              {loadingPastAnalyses ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Calendar className="h-4 w-4 mr-2" />
              )}
              View Past Analyses ({pastAnalyses.length})
            </Button>
          </div>

          {viewingPastAnalyses && analysesList.length > 0 && (
            <div className="flex items-center">
              <Button
                onClick={handleReturnToCurrent}
                variant="outline"
                className="border-gray-300 text-gray-800 hover:bg-gray-100 flex items-center"
              >
                <ChevronLeft size={16} className="mr-1" /> Return to Current
              </Button>
              <Badge className="ml-3 bg-blue-100 text-blue-800 hover:bg-blue-200">
                {currentPastAnalysisIndex + 1} of {analysesList.length}
              </Badge>
            </div>
          )}
        </div>

        {/* Loading states */}
        {isLoading && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
            <RefreshCw className="h-10 w-10 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Generating your cognitive and emotional analysis...</p>
          </div>
        )}

        {loadingPastAnalyses && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
            <RefreshCw className="h-10 w-10 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading your past analyses...</p>
          </div>
        )}

        {/* Error state */}
        {error && !isLoading && !loadingPastAnalyses && (
          <div className="bg-red-50 text-red-800 p-6 rounded-lg mb-4 flex flex-col items-center">
            <p className="mb-4">{error}</p>
            <Button
              onClick={onFetchAnalysis}
              className="bg-red-100 hover:bg-red-200 text-red-800 px-5 py-2 rounded"
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Empty state when no analysis is available */}
        {!displayedAnalysis && !isLoading && !loadingPastAnalyses && !error && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-6">
              {viewingPastAnalyses
                ? "No past analyses available yet. Generate your first analysis to build your history."
                : "No analysis data available. Generate a new analysis to see your personalized insights."}
            </p>
          </div>
        )}

        {/* Analysis display */}
        {displayedAnalysis && !isLoading && !loadingPastAnalyses && (
          <Card className="bg-white border-gray-200 shadow-md rounded-xl">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-black text-xl">Cognitive-Emotional Analysis</CardTitle>
                  <CardDescription className="text-gray-600 text-base">
                    Generated on {analysisData.createdAt && formatDate(analysisData.createdAt)}
                  </CardDescription>
                </div>
                {viewingPastAnalyses && (
                  <Badge className="bg-blue-600 text-white">Past Analysis</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6 px-6">
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 shadow-sm">
                <h3 className="text-blue-800 font-medium text-lg mb-2">Overall Assessment</h3>
                <p className="text-gray-800 text-base">{analysisData.overall}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 shadow-sm">
                  <h3 className="text-blue-800 font-medium text-lg mb-2">Cognitive Evaluation</h3>
                  <p className="text-gray-800 text-base">{analysisData.cognitiveEvaluation}</p>
                </div>

                <div className="bg-rose-50 rounded-xl p-4 border border-rose-100 shadow-sm">
                  <h3 className="text-rose-800 font-medium text-lg mb-2">Emotional Evaluation</h3>
                  <p className="text-gray-800 text-base">{analysisData.emotionalEvaluation}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-xl p-4 border border-green-100 shadow-sm">
                  <h3 className="text-green-800 font-medium text-lg mb-3 flex items-center">
                    <CheckCircle size={18} className="mr-2" />
                    Strengths
                  </h3>
                  <ul className="text-gray-800 text-base pl-2 space-y-2">
                    {analysisData.strengths.length > 0 ? (
                      analysisData.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-600 mr-2 text-lg">•</span> {strength}
                        </li>
                      ))
                    ) : (
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 text-lg">•</span> Not enough data to identify specific cognitive strengths.
                      </li>
                    )}
                  </ul>
                </div>

                <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 shadow-sm">
                  <h3 className="text-amber-800 font-medium text-lg mb-3">Areas for Improvement</h3>
                  <ul className="text-gray-800 text-base pl-2 space-y-2">
                    {analysisData.areasForImprovement.length > 0 ? (
                      analysisData.areasForImprovement.map((area, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-amber-600 mr-2 text-lg">•</span> {area}
                        </li>
                      ))
                    ) : (
                      <li className="flex items-start">
                        <span className="text-amber-600 mr-2 text-lg">•</span> Insufficient data to determine areas needing improvement.
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 shadow-sm">
                <h3 className="text-blue-800 font-medium text-lg mb-3">Recommendations</h3>
                <div className="space-y-3">
                  {analysisData.recommendations.length > 0 ? (
                    analysisData.recommendations.map((rec, index) => (
                      <div key={index} className="bg-white p-3 rounded-lg text-base text-gray-800 flex items-center border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <Lightbulb size={18} className="text-amber-500 mr-3 flex-shrink-0" />
                        {rec}
                      </div>
                    ))
                  ) : (
                    <div className="bg-white p-3 rounded-lg text-base text-gray-800 flex items-center border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <Lightbulb size={18} className="text-amber-500 mr-3 flex-shrink-0" />
                      No specific recommendations available based on current data.
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-4 border border-purple-100 shadow-sm">
                <h3 className="text-purple-800 font-medium text-lg mb-3">Influencing Factors</h3>
                <ul className="text-gray-800 text-base pl-2 space-y-2">
                  {analysisData.factorsInfluence.length > 0 ? (
                    analysisData.factorsInfluence.map((factor, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-purple-600 mr-2 text-lg">•</span> {factor}
                      </li>
                    ))
                  ) : (
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2 text-lg">•</span> Insufficient data to determine influential factors.
                    </li>
                  )}
                </ul>
              </div>

              <div className="bg-blue-100 rounded-xl p-4 border border-blue-200 shadow-sm">
                <h3 className="text-blue-800 font-medium text-lg mb-2">Conclusion</h3>
                <p className="text-gray-800 text-base">{analysisData.conclusion}</p>
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-200 pt-5 pb-6 px-6 flex flex-col md:flex-row justify-between gap-4">
              {/* Past Analysis Navigation */}
              {viewingPastAnalyses && analysesList.length > 0 && (
                <div className="flex items-center gap-3">
                  <Button
                    onClick={handlePreviousAnalysis}
                    disabled={currentPastAnalysisIndex === 0}
                    variant="outline"
                    className="border-gray-300 text-gray-800 hover:bg-gray-100 flex items-center"
                  >
                    <ChevronLeft size={18} className="mr-1" />
                    Previous
                  </Button>
                  <Badge className="mx-2 bg-blue-50 text-blue-800">
                    {currentPastAnalysisIndex + 1} / {analysesList.length}
                  </Badge>
                  <Button
                    onClick={handleNextAnalysis}
                    disabled={currentPastAnalysisIndex === analysesList.length - 1}
                    variant="outline"
                    className="border-gray-300 text-gray-800 hover:bg-gray-100 flex items-center"
                  >
                    Next
                    <ChevronRight size={18} className="ml-1" />
                  </Button>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                {!viewingPastAnalyses ? (
                  <Button
                    onClick={onFetchAnalysis}
                    variant="outline"
                    className="border-blue-300 text-blue-800 hover:bg-blue-50"
                  >
                    <RefreshCw size={18} className="mr-2" />
                    Refresh Analysis
                  </Button>
                ) : (
                  <Button
                    onClick={handleReturnToCurrent}
                    variant="outline"
                    className="border-blue-300 text-blue-800 hover:bg-blue-50"
                  >
                    Return to Current
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        )}
      </div>
    </TabsContent>
  );
};

export default IntrospectionAnalysis;