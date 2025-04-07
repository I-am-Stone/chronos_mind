'use client';
import React from 'react';
import { Bot, CheckCircle, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TabsContent } from '@/components/ui/tabs';

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

interface IntrospectionAnalysisProps {
  currentAnalysis: AIAnalysis;
}

const IntrospectionAnalysis: React.FC<IntrospectionAnalysisProps> = ({
  currentAnalysis
}) => {
  return (
    <TabsContent value= "analysis">
    <div>
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
    </div>
    </TabsContent>
  );
};

export default IntrospectionAnalysis; 