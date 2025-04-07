import React from 'react';
import { Line } from 'react-chartjs-2';
import { TabsContent } from '@/components/ui/tabs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

interface WeeklyData {
  week: number;
  cognitive: CognitiveMetrics;
  emotional: EmotionalMetrics;
  timestamp: string;
  date: string;
}

const IntrospectionWeeklyMetricsChart: React.FC = () => {
  // Sample data for 5 weeks
  const weeklyData: WeeklyData[] = [
    {
      week: 1,
      timestamp: '1 week ago',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      cognitive: {
        working_memory: 65,
        processing_speed: 70,
        attentional_control: 60,
        cognitive_flexibility: 55,
        metacognition: 62,
      },
      emotional: {
        emotional_valence: 68,
        emotional_arousal: 72,
        emotional_regulation: 65,
      },
    },
    {
      week: 2,
      timestamp: '2 weeks ago',
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      cognitive: {
        working_memory: 68,
        processing_speed: 72,
        attentional_control: 63,
        cognitive_flexibility: 58,
        metacognition: 65,
      },
      emotional: {
        emotional_valence: 70,
        emotional_arousal: 70,
        emotional_regulation: 68,
      },
    },
    {
      week: 3,
      timestamp: '3 weeks ago',
      date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      cognitive: {
        working_memory: 72,
        processing_speed: 75,
        attentional_control: 67,
        cognitive_flexibility: 62,
        metacognition: 70,
      },
      emotional: {
        emotional_valence: 72,
        emotional_arousal: 68,
        emotional_regulation: 72,
      },
    },
    {
      week: 4,
      timestamp: '4 weeks ago',
      date: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      cognitive: {
        working_memory: 70,
        processing_speed: 73,
        attentional_control: 65,
        cognitive_flexibility: 60,
        metacognition: 68,
      },
      emotional: {
        emotional_valence: 71,
        emotional_arousal: 65,
        emotional_regulation: 70,
      },
    },
    {
      week: 5,
      timestamp: '5 weeks ago',
      date: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      cognitive: {
        working_memory: 75,
        processing_speed: 78,
        attentional_control: 70,
        cognitive_flexibility: 65,
        metacognition: 73,
      },
      emotional: {
        emotional_valence: 75,
        emotional_arousal: 67,
        emotional_regulation: 75,
      },
    },
  ];

  // Prepare data for Chart.js
  const labels = weeklyData.map((data) => `Week ${data.week}`);

  const data = {
    labels,
    datasets: [
      {
        label: 'Working Memory',
        data: weeklyData.map((data) => data.cognitive.working_memory),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Processing Speed',
        data: weeklyData.map((data) => data.cognitive.processing_speed),
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1,
      },
      {
        label: 'Attentional Control',
        data: weeklyData.map((data) => data.cognitive.attentional_control),
        borderColor: 'rgb(153, 102, 255)',
        tension: 0.1,
      },
      {
        label: 'Cognitive Flexibility',
        data: weeklyData.map((data) => data.cognitive.cognitive_flexibility),
        borderColor: 'rgb(255, 159, 64)',
        tension: 0.1,
      },
      {
        label: 'Metacognition',
        data: weeklyData.map((data) => data.cognitive.metacognition),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
      {
        label: 'Emotional Valence',
        data: weeklyData.map((data) => data.emotional.emotional_valence),
        borderColor: 'rgb(255, 205, 86)',
        tension: 0.1,
      },
      {
        label: 'Emotional Arousal',
        data: weeklyData.map((data) => data.emotional.emotional_arousal),
        borderColor: 'rgb(201, 203, 207)',
        tension: 0.1,
      },
      {
        label: 'Emotional Regulation',
        data: weeklyData.map((data) => data.emotional.emotional_regulation),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
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
        max: 100,
        title: {
          display: true,
          text: 'Score (0-100)',
        },
      },
    },
  };

  // Prepare data for RadarChart
  const getLatestRadarData = () => {
    const latestData = weeklyData[0]; // Most recent data is first in array
    return [
      {
        subject: 'Working Memory',
        value: latestData.cognitive.working_memory / 10, // Scale down to 0-10
      },
      {
        subject: 'Processing Speed',
        value: latestData.cognitive.processing_speed / 10,
      },
      {
        subject: 'Attentional Control',
        value: latestData.cognitive.attentional_control / 10,
      },
      {
        subject: 'Cognitive Flexibility',
        value: latestData.cognitive.cognitive_flexibility / 10,
      },
      {
        subject: 'Metacognition',
        value: latestData.cognitive.metacognition / 10,
      },
      {
        subject: 'Emotional Valence',
        value: latestData.emotional.emotional_valence / 10,
      },
      {
        subject: 'Emotional Arousal',
        value: latestData.emotional.emotional_arousal / 10,
      },
      {
        subject: 'Emotional Regulation',
        value: latestData.emotional.emotional_regulation / 10,
      },
    ];
  };

  return (
    <TabsContent value="charts">
      <div className="space-y-6">
        <div style={{ width: '800px', height: '500px', margin: '0 auto' }}>
          <Line options={options} data={data} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow h-96">
          <h2 className="text-xl font-medium mb-2">Current Metrics Snapshot</h2>
          <p className="text-sm text-gray-600 mb-4">
            {weeklyData[0].timestamp} ({weeklyData[0].date})
          </p>
          <ResponsiveContainer width="100%" height="85%">
            <RadarChart outerRadius="70%" data={getLatestRadarData()}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis domain={[0, 10]} />
              <Radar
                name="Current Values"
                dataKey="value"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Tooltip formatter={(value) => [value.toFixed(1), 'Value']} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </TabsContent>
  );
};

export default IntrospectionWeeklyMetricsChart;