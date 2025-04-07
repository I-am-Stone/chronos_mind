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

// Define the structure of weekly data
interface WeeklyMetric {
  week: number;
  date: string;
  timestamp: string;
  cognitive: {
    working_memory: number;
    processing_speed: number;
    attentional_control: number;
    cognitive_flexibility: number;
    metacognition: number;
  };
  emotional: {
    emotional_valence: number;
    emotional_arousal: number;
    emotional_regulation: number;
  };
}

// Dummy weekly data
const weeklyData: WeeklyMetric[] = [
  {
    week: 5,
    date: '2025-04-01',
    timestamp: '2025-04-01T10:00:00Z',
    cognitive: {
      working_memory: 75,
      processing_speed: 80,
      attentional_control: 70,
      cognitive_flexibility: 65,
      metacognition: 78,
    },
    emotional: {
      emotional_valence: 72,
      emotional_arousal: 68,
      emotional_regulation: 74,
    },
  },
  {
    week: 4,
    date: '2025-03-25',
    timestamp: '2025-03-25T10:00:00Z',
    cognitive: {
      working_memory: 72,
      processing_speed: 78,
      attentional_control: 66,
      cognitive_flexibility: 60,
      metacognition: 74,
    },
    emotional: {
      emotional_valence: 70,
      emotional_arousal: 66,
      emotional_regulation: 72,
    },
  },
  {
    week: 3,
    date: '2025-03-18',
    timestamp: '2025-03-18T10:00:00Z',
    cognitive: {
      working_memory: 70,
      processing_speed: 76,
      attentional_control: 64,
      cognitive_flexibility: 58,
      metacognition: 71,
    },
    emotional: {
      emotional_valence: 68,
      emotional_arousal: 64,
      emotional_regulation: 70,
    },
  },
  {
    week: 2,
    date: '2025-03-11',
    timestamp: '2025-03-11T10:00:00Z',
    cognitive: {
      working_memory: 68,
      processing_speed: 73,
      attentional_control: 62,
      cognitive_flexibility: 56,
      metacognition: 69,
    },
    emotional: {
      emotional_valence: 66,
      emotional_arousal: 62,
      emotional_regulation: 68,
    },
  },
  {
    week: 1,
    date: '2025-03-04',
    timestamp: '2025-03-04T10:00:00Z',
    cognitive: {
      working_memory: 65,
      processing_speed: 70,
      attentional_control: 60,
      cognitive_flexibility: 55,
      metacognition: 66,
    },
    emotional: {
      emotional_valence: 64,
      emotional_arousal: 60,
      emotional_regulation: 66,
    },
  },
];

const IntrospectionWeeklyMetricsChart: React.FC = () => {
  const labels = weeklyData.map((data) => `Week ${data.week}`);

  const lineData = {
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
        max: 100,
        title: {
          display: true,
          text: 'Score (0-100)',
        },
      },
    },
  };

  const latest = weeklyData[0]; // Most recent week

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
          latest.cognitive.working_memory,
          latest.cognitive.processing_speed,
          latest.cognitive.attentional_control,
          latest.cognitive.cognitive_flexibility,
          latest.cognitive.metacognition,
          latest.emotional.emotional_valence,
          latest.emotional.emotional_arousal,
          latest.emotional.emotional_regulation,
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
        max: 100,
        ticks: {
          stepSize: 20,
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

  return (
      <TabsContent value="charts">
        <div className="space-y-6">
          <div style={{ width: '800px', height: '500px', margin: '0 auto' }}>
            <Line options={lineOptions} data={lineData} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow h-[500px] w-full max-w-4xl mx-auto">
            <h2 className="text-xl font-medium mb-2">Current Metrics Snapshot</h2>
            <p className="text-sm text-gray-600 mb-4">
              {latest.timestamp} ({latest.date})
            </p>
            <Radar options={radarOptions} data={radarData} />
          </div>
        </div>
      </TabsContent>
  );
};

export default IntrospectionWeeklyMetricsChart;
