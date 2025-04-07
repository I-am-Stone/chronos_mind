"use client";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// Interface for the chart data
interface ChartData {
  labels: string[];
  goal_progress: number[];
  difficulty: string[];
  goal_type: string[];
}

export default function GoalsBarChart({ chartData }: { chartData?: ChartData }) {
  const {
    labels = [],
    goal_progress = [],
    difficulty = [],
    goal_type = []
  } = chartData || {};

  const hasData = labels.length > 0 && goal_progress.length > 0;

  if (!hasData) {
    return (
        <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-md text-center">
          <p className="text-gray-600 text-lg">No stats are available yet.</p>
          <p className="text-gray-500 mt-2">Start tracking your goals to see progress statistics.</p>
        </div>
    );
  }

  // Define color mapping for difficulties
  const getDifficultyColor = (difficulty: string, alpha = 0.6) => {
    switch(difficulty) {
      case 'easy': return `rgba(75, 192, 192, ${alpha})`;
      case 'medium': return `rgba(255, 206, 86, ${alpha})`;
      case 'hard': return `rgba(255, 99, 132, ${alpha})`;
      default: return `rgba(54, 162, 235, ${alpha})`;
    }
  };

  // Prepare data for the chart
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Progress (%)',
        data: goal_progress,
        backgroundColor: difficulty.map(diff => getDifficultyColor(diff)),
        borderColor: difficulty.map(diff => getDifficultyColor(diff, 1)),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Goals Progress',
        font: {
          size: 18
        }
      },
      tooltip: {
        callbacks: {
          afterLabel: function(context: any) {
            const index = context.dataIndex;
            return `Difficulty: ${difficulty[index]}\nType: ${goal_type[index]}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Progress (%)'
        }
      }
    }
  };

  return (
      <div className="w-full max-w-2xl p-4 bg-white rounded-lg shadow-md">
        <Bar data={data} options={options} />
        <div className="mt-4 flex justify-center space-x-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-400 mr-1"></div>
            <span className="text-sm">Easy</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-400 mr-1"></div>
            <span className="text-sm">Medium</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-400 mr-1"></div>
            <span className="text-sm">Hard</span>
          </div>
        </div>
      </div>
  );
}