"use client";
import { useEffect, useState } from "react";
import React from 'react';
import { Line, Radar } from 'react-chartjs-2';
import { TabsContent } from '@/components/ui/tabs';
import { getIntrospectionGraphData } from "@/api/introspection/getIntrospectionGraphData";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Define interface for API response
interface ApiResponse {
  success: boolean;
  data: {
    average_metrics: {
      working_memory__avg: number;
      processing_speed__avg: number;
      attentional_control__avg: number;
      cognitive_flexibility__avg: number;
      metacognition__avg: number;
      emotional_valence__avg: number;
      emotional_arousal__avg: number;
      emotional_regulation__avg: number;
      observations: string;
      environmental_factors: string;
      physical_state: string;
    };
    graph_data: {
      working_memory: number[];
      processing_speed: number[];
      attentional_control: number[];
      cognitive_flexibility: number[];
      metacognition: number[];
      emotional_valence: number[];
      emotional_arousal: number[];
      emotional_regulation: number[];
      timestamp: string[];
    };
  };
  statusCode: number;
}

const IntrospectionWeeklyMetricsChart: React.FC = () => {
  const [data, setData] = useState<ApiResponse['data'] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const response = await getIntrospectionGraphData();
        // Check if response is a promise that needs to be resolved
        const resolvedResponse = response instanceof Promise ? await response : response;
        
        // Check if the response has the expected structure
        if (!resolvedResponse || !resolvedResponse.success || !resolvedResponse.data) {
          throw new Error("Invalid API response format");
        }
        
        // Extract the actual data from the response
        setData(resolvedResponse.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching metrics data:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch data");
        setLoading(false);
      }
    };

    fetchGraphData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading metrics data...</div>;
  }

  if (error || !data) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <p className="text-red-500">Error loading metrics data</p>
        <p className="text-sm text-gray-500 mt-2">{error}</p>
      </div>
    );
  }

  // Ensure we have data before proceeding
  if (!data.graph_data.timestamp || data.graph_data.timestamp.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 text-yellow-500">
        No metric data available for the selected period
      </div>
    );
  }

  // Format dates for labels
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    } catch (e) {
      console.error("Error formatting date:", e);
      return "Invalid date";
    }
  };

  // Sort timestamps chronologically and get corresponding data
  const sortedIndices = [...Array(data.graph_data.timestamp.length).keys()].sort(
    (a, b) => new Date(data.graph_data.timestamp[a]).getTime() - new Date(data.graph_data.timestamp[b]).getTime()
  );
  
  // Generate labels from sorted timestamps
  const labels = sortedIndices.map(i => formatDate(data.graph_data.timestamp[i]));
  
  // Create data arrays in the same sorted order
  const sortedData = {
    working_memory: sortedIndices.map(i => data.graph_data.working_memory[i]),
    processing_speed: sortedIndices.map(i => data.graph_data.processing_speed[i]),
    attentional_control: sortedIndices.map(i => data.graph_data.attentional_control[i]),
    cognitive_flexibility: sortedIndices.map(i => data.graph_data.cognitive_flexibility[i]),
    metacognition: sortedIndices.map(i => data.graph_data.metacognition[i]),
    emotional_valence: sortedIndices.map(i => data.graph_data.emotional_valence[i]),
    emotional_arousal: sortedIndices.map(i => data.graph_data.emotional_arousal[i]),
    emotional_regulation: sortedIndices.map(i => data.graph_data.emotional_regulation[i]),
  };

  const lineData = {
    labels,
    datasets: [
      {
        label: 'Working Memory',
        data: sortedData.working_memory,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        fill: false,
      },
      {
        label: 'Processing Speed',
        data: sortedData.processing_speed,
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1,
        fill: false,
      },
      {
        label: 'Attentional Control',
        data: sortedData.attentional_control,
        borderColor: 'rgb(153, 102, 255)',
        tension: 0.1,
        fill: false,
      },
      {
        label: 'Cognitive Flexibility',
        data: sortedData.cognitive_flexibility,
        borderColor: 'rgb(255, 159, 64)',
        tension: 0.1,
        fill: false,
      },
      {
        label: 'Metacognition',
        data: sortedData.metacognition,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
        fill: false,
      },
      {
        label: 'Emotional Valence',
        data: sortedData.emotional_valence,
        borderColor: 'rgb(255, 205, 86)',
        tension: 0.1,
        fill: false,
      },
      {
        label: 'Emotional Arousal',
        data: sortedData.emotional_arousal,
        borderColor: 'rgb(201, 203, 207)',
        tension: 0.1,
        fill: false,
      },
      {
        label: 'Emotional Regulation',
        data: sortedData.emotional_regulation,
        borderColor: 'rgb(75, 192, 192)',
        borderDash: [5, 5], // Add dashed line to differentiate from Working Memory
        tension: 0.1,
        fill: false,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Weekly Cognitive and Emotional Metrics',
      },
    },
    scales: {
      y: {
        min: 0,
        max: 10, // Adjust max since data is on a 0-10 scale
        title: {
          display: true,
          text: 'Score (0-10)',
        },
      },
    },
  };

  // Use average_metrics for the snapshot radar chart
  const radarData = {
    labels: [
      'Working Memory',
      'Processing Speed',
      'Attentional Control',
      'Cognitive Flexibility',
      'Metacognition',
      'Emotional Valence',
      'Emotional Arousal',
      'Emotional Regulation',
    ],
    datasets: [
      {
        label: 'Current Metrics Snapshot',
        data: [
          data.average_metrics.working_memory__avg,
          data.average_metrics.processing_speed__avg,
          data.average_metrics.attentional_control__avg,
          data.average_metrics.cognitive_flexibility__avg,
          data.average_metrics.metacognition__avg,
          data.average_metrics.emotional_valence__avg,
          data.average_metrics.emotional_arousal__avg,
          data.average_metrics.emotional_regulation__avg,
        ],
        backgroundColor: 'rgba(136, 132, 216, 0.4)',
        borderColor: 'rgba(136, 132, 216, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(136, 132, 216, 1)',
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        min: 0,
        max: 10, // Adjust max since data is on a 0-10 scale
        ticks: {
          stepSize: 2,
        },
        pointLabels: {
          font: {
            size: 12,
          },
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  // Format current date for display
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  // Find highest and lowest metrics
  const metricsArray = [
    { name: 'Working Memory', value: data.average_metrics.working_memory__avg },
    { name: 'Processing Speed', value: data.average_metrics.processing_speed__avg },
    { name: 'Attentional Control', value: data.average_metrics.attentional_control__avg },
    { name: 'Cognitive Flexibility', value: data.average_metrics.cognitive_flexibility__avg },
    { name: 'Metacognition', value: data.average_metrics.metacognition__avg },
    { name: 'Emotional Valence', value: data.average_metrics.emotional_valence__avg },
    { name: 'Emotional Arousal', value: data.average_metrics.emotional_arousal__avg },
    { name: 'Emotional Regulation', value: data.average_metrics.emotional_regulation__avg },
  ];

  const highestMetric = [...metricsArray].sort((a, b) => b.value - a.value)[0];
  const lowestMetric = [...metricsArray].sort((a, b) => a.value - b.value)[0];

  return (
    <TabsContent value="charts">
      <div className="space-y-6">
        <div className="bg-white p-4 rounded-lg shadow w-full mx-auto">
          <h2 className="text-xl font-medium mb-2">Weekly Metrics Trend</h2>
          <p className="text-sm text-gray-600 mb-4">
            Tracking your metrics over time
          </p>
          <div className="h-96">
            <Line options={lineOptions} data={lineData} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow w-full mx-auto">
          <h2 className="text-xl font-medium mb-2">Current Metrics Snapshot</h2>
          <p className="text-sm text-gray-600 mb-4">
            {currentDate}
          </p>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              <div className="h-96">
                <Radar data={radarData} options={radarOptions} />
              </div>
            </div>
            <div className="w-full md:w-1/2 p-4">
              <h3 className="text-lg font-medium mb-3">Metrics Summary</h3>
              <ul className="space-y-2">
                <li><span className="font-medium">{highestMetric.name}:</span> {highestMetric.value.toFixed(1)}/10 - Highest scoring metric</li>
                <li><span className="font-medium">Cognitive Flexibility:</span> {data.average_metrics.cognitive_flexibility__avg.toFixed(1)}/10 - Good mental adaptability</li>
                <li><span className="font-medium">Emotional Regulation:</span> {data.average_metrics.emotional_regulation__avg.toFixed(1)}/10 - Strong emotional control</li>
                <li><span className="font-medium">{lowestMetric.name}:</span> {lowestMetric.value.toFixed(1)}/10 - Lowest scoring metric</li>
              </ul>
              
              <h3 className="text-lg font-medium mt-6 mb-3">Progress Insights</h3>
              <p className="text-gray-700">
                Recent trends show improvement in metacognition and emotional regulation. 
                Compare your cognitive metrics with emotional metrics to identify patterns
                in how they influence each other.
              </p>
            </div>
          </div>
        </div>
      </div>
    </TabsContent>
  );
};

export default IntrospectionWeeklyMetricsChart;