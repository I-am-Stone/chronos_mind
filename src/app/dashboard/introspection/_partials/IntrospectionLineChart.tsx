"use client";
import { useEffect, useState } from "react";
import React from 'react';
import { Line, Radar } from 'react-chartjs-2';
import { TabsContent } from '@/components/ui/tabs';
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
  LineController,
  RadarController,
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
    Filler,
    LineController,
    RadarController
);

// Define interface for backend response
interface BackendResponse {
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
}

const IntrospectionWeeklyMetricsChart: React.FC = () => {
  const [data, setData] = useState<BackendResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        // In a real implementation, this would be an actual API call
        // For demonstration, we'll use the provided JSON data
        const mockResponse = {
          average_metrics: {
            working_memory__avg: 7.5,
            processing_speed__avg: 9.5,
            attentional_control__avg: 7.5,
            cognitive_flexibility__avg: 8,
            metacognition__avg: 7.5,
            emotional_valence__avg: 7,
            emotional_arousal__avg: 7.5,
            emotional_regulation__avg: 8.5,
            observations: "nindra",
            environmental_factors: "moise",
            physical_state: "bored"
          },
          graph_data: {
            working_memory: [7.5, 7.2, 7.0, 6.8, 6.5],
            processing_speed: [9.5, 9.2, 9.0, 8.7, 8.4],
            attentional_control: [7.5, 7.3, 7.1, 6.9, 6.7],
            cognitive_flexibility: [8.0, 7.8, 7.6, 7.4, 7.2],
            metacognition: [7.5, 7.3, 7.1, 6.9, 6.7],
            emotional_valence: [7.0, 6.8, 6.6, 6.4, 6.2],
            emotional_arousal: [7.5, 7.3, 7.1, 6.9, 6.7],
            emotional_regulation: [8.5, 8.3, 8.1, 7.9, 7.7],
            timestamp: [
              "2025-04-19T05:25:56.997653Z",
              "2025-04-12T05:25:56.997653Z",
              "2025-04-05T05:25:56.997653Z",
              "2025-03-29T05:25:56.997653Z",
              "2025-03-22T05:25:56.997653Z"
            ]
          }
        };

        setData(mockResponse);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchGraphData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading metrics data...</div>;
  }

  if (error || !data) {
    return <div className="flex justify-center items-center h-64 text-red-500">Error loading metrics data</div>;
  }

  // Format dates for labels
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  // Generate labels from timestamps
  const labels = data.graph_data.timestamp.map(formatDate);

  const lineData = {
    labels,
    datasets: [
      {
        label: 'Working Memory',
        data: data.graph_data.working_memory,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Processing Speed',
        data: data.graph_data.processing_speed,
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1,
      },
      {
        label: 'Attentional Control',
        data: data.graph_data.attentional_control,
        borderColor: 'rgb(153, 102, 255)',
        tension: 0.1,
      },
      {
        label: 'Cognitive Flexibility',
        data: data.graph_data.cognitive_flexibility,
        borderColor: 'rgb(255, 159, 64)',
        tension: 0.1,
      },
      {
        label: 'Metacognition',
        data: data.graph_data.metacognition,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
      {
        label: 'Emotional Valence',
        data: data.graph_data.emotional_valence,
        borderColor: 'rgb(255, 205, 86)',
        tension: 0.1,
      },
      {
        label: 'Emotional Arousal',
        data: data.graph_data.emotional_arousal,
        borderColor: 'rgb(201, 203, 207)',
        tension: 0.1,
      },
      {
        label: 'Emotional Regulation',
        data: data.graph_data.emotional_regulation,
        borderColor: 'rgb(75, 192, 192)',
        borderDash: [5, 5], // Add dashed line to differentiate from Working Memory
        tension: 0.1,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
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

  return (
      <TabsContent value="charts">
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow w-full mx-auto">
            <h2 className="text-xl font-medium mb-2">Weekly Metrics Trend</h2>
            <p className="text-sm text-gray-600 mb-4">
              Tracking your metrics over time
            </p>
            <div style={{ height: '400px' }}>
              <Line options={lineOptions} data={lineData} />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow w-full mx-auto">
            <h2 className="text-xl font-medium mb-2">Current Metrics Snapshot</h2>
            <p className="text-sm text-gray-600 mb-4">
              {currentDate} | Environmental Factors: {data.average_metrics.environmental_factors} |
              Physical State: {data.average_metrics.physical_state}
            </p>
            <div className="flex">
              <div className="w-1/2">
                <div style={{ height: '400px' }}>
                  <Radar options={radarOptions} data={radarData} />
                </div>
              </div>
              <div className="w-1/2 p-4">
                <h3 className="text-lg font-medium mb-3">Observations</h3>
                <p className="text-gray-700">{data.average_metrics.observations}</p>

                <h3 className="text-lg font-medium mt-6 mb-3">Metrics Summary</h3>
                <ul className="space-y-2">
                  <li><span className="font-medium">Processing Speed:</span> {data.average_metrics.processing_speed__avg}/10 - Highest scoring metric</li>
                  <li><span className="font-medium">Emotional Regulation:</span> {data.average_metrics.emotional_regulation__avg}/10 - Strong emotional control</li>
                  <li><span className="font-medium">Emotional Valence:</span> {data.average_metrics.emotional_valence__avg}/10 - Lowest scoring metric</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
  );
};

export default IntrospectionWeeklyMetricsChart;