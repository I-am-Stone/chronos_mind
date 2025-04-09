'use client';
import React from 'react';
import { Bot, CheckCircle, Lightbulb, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TabsContent } from '@/components/ui/tabs';

// Updated API response interface to match the actual structure
interface APIResponse {
  success: boolean;
  data: {
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
}

interface IntrospectionAnalysisProps {
  currentAnalysis: APIResponse | null;
  isLoading: boolean;
  error: string | null;
  onFetchAnalysis: () => void;
}

const IntrospectionAnalysis: React.FC<IntrospectionAnalysisProps> = ({
                                                                       currentAnalysis,
                                                                       isLoading,
                                                                       error,
                                                                       onFetchAnalysis
                                                                     }) => {
  // For debugging - remove this in production
  console.log("Analysis component received:", currentAnalysis);

  // Helper function to convert object to array and filter out "N/A" values
  const objectToArray = (obj: { [key: string]: string } | undefined): string[] => {
    if (!obj) return [];
    return Object.values(obj)
        .filter(val => val !== undefined && val !== '' && val !== 'N/A' && !val.includes('No further') && !val.includes('cannot be identified'));
  };

  // Safely get analysis data with fallbacks
  const getAnalysisData = () => {
    if (!currentAnalysis || !currentAnalysis.success || !currentAnalysis.data || !currentAnalysis.data.ai_analysis) {
      return {
        overall: 'No overall assessment available',
        emotionalEvaluation: 'No emotional evaluation available',
        cognitiveEvaluation: 'No cognitive evaluation available',
        strengths: [],
        areasForImprovement: [],
        recommendations: [],
        factorsInfluence: [],
        conclusion: 'No conclusion available',
        createdAt: 'Unknown date'
      };
    }

    const aiAnalysis = currentAnalysis.data.ai_analysis;

    return {
      overall: aiAnalysis.overall || 'No overall assessment available',
      emotionalEvaluation: aiAnalysis.emotional_state_evaluation || 'No emotional evaluation available',
      cognitiveEvaluation: aiAnalysis.cognitive_functioning_evaluation || 'No cognitive evaluation available',
      strengths: objectToArray(aiAnalysis.Strengths),
      areasForImprovement: objectToArray(aiAnalysis.areas_for_improvement),
      recommendations: objectToArray(aiAnalysis.Recommendations),
      factorsInfluence: objectToArray(aiAnalysis.factors_influence),
      conclusion: aiAnalysis.conclusion || 'No conclusion available',
      createdAt: new Date().toLocaleString() // Using current date since the API doesn't return created_at
    };
  };

  const analysisData = getAnalysisData();

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

          {(!currentAnalysis || !currentAnalysis.success) && !isLoading && !error && (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-6">No analysis data available. Generate a new analysis to view insights.</p>
                <Button
                    onClick={onFetchAnalysis}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-5 px-8 text-base rounded-lg font-semibold transition-colors"
                >
                  Generate Analysis
                </Button>
              </div>
          )}

          {isLoading && (
              <div className="text-center py-12">
                <RefreshCw className="h-10 w-10 text-blue-600 animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Generating your cognitive and emotional analysis...</p>
              </div>
          )}

          {error && (
              <div className="bg-red-50 text-red-800 p-6 rounded-lg mb-4 text-center">
                <p className="mb-4">{error}</p>
                <Button
                    onClick={onFetchAnalysis}
                    className="bg-red-100 hover:bg-red-200 text-red-800 px-5 py-2 rounded"
                >
                  Try Again
                </Button>
              </div>
          )}

          {currentAnalysis && currentAnalysis.success && currentAnalysis.data && currentAnalysis.data.ai_analysis && (
              <Card className="bg-white border-gray-200 shadow-md rounded-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-black text-xl">Cognitive-Emotional Analysis</CardTitle>
                  <CardDescription className="text-gray-600 text-base">
                    Generated on {analysisData.createdAt}
                  </CardDescription>
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
                              <span className="text-green-600 mr-2 text-lg">•</span> Due to the absence of data, no cognitive strengths can be identified.
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
                              <span className="text-amber-600 mr-2 text-lg">•</span> The complete lack of data makes it impossible to pinpoint specific areas for improvement.
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
                            No recommendations available
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
                            <span className="text-purple-600 mr-2 text-lg">•</span> Without sufficient data, influencing factors cannot be determined.
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
                  <Button variant="outline" className="border-gray-300 text-gray-800 hover:bg-gray-100 py-5 text-base rounded-lg">
                    Previous Analysis
                  </Button>
                  <div className="flex gap-4">
                    <Button
                        onClick={onFetchAnalysis}
                        variant="outline"
                        className="border-blue-300 text-blue-800 hover:bg-blue-50 py-5 text-base rounded-lg"
                    >
                      <RefreshCw size={18} className="mr-2" />
                      Refresh Analysis
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700 text-white py-5 text-base rounded-lg font-semibold transition-colors">
                      Apply Recommendations
                    </Button>
                  </div>
                </CardFooter>
              </Card>
          )}
        </div>
      </TabsContent>
  );
};

export default IntrospectionAnalysis;