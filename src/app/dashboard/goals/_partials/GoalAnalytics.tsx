//analytics parts'use client'; // This is needed for client-side components in Next.js 13+
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

export default function GoalsBarChart() {
  // Dummy data based on your Django model
  const goalsData = [
    { title: "Learn Django", progress: 75, difficulty: "medium", type: "professional" },
    { title: "Run a marathon", progress: 30, difficulty: "hard", type: "personal" },
    { title: "Read 12 books", progress: 50, difficulty: "medium", type: "personal" },
    { title: "Build a portfolio", progress: 90, difficulty: "easy", type: "professional" },
    { title: "Meditate daily", progress: 15, difficulty: "easy", type: "personal" }
  ];

  // Prepare data for the chart
  const data = {
    labels: goalsData.map(goal => goal.title),
    datasets: [
      {
        label: 'Progress (%)',
        data: goalsData.map(goal => goal.progress),
        backgroundColor: goalsData.map(goal => {
          switch(goal.difficulty) {
            case 'easy': return 'rgba(75, 192, 192, 0.6)';
            case 'medium': return 'rgba(255, 206, 86, 0.6)';
            case 'hard': return 'rgba(255, 99, 132, 0.6)';
            default: return 'rgba(54, 162, 235, 0.6)';
          }
        }),
        borderColor: goalsData.map(goal => {
          switch(goal.difficulty) {
            case 'easy': return 'rgba(75, 192, 192, 1)';
            case 'medium': return 'rgba(255, 206, 86, 1)';
            case 'hard': return 'rgba(255, 99, 132, 1)';
            default: return 'rgba(54, 162, 235, 1)';
          }
        }),
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
          afterLabel: function(context) {
            const goal = goalsData[context.dataIndex];
            return `Difficulty: ${goal.difficulty}\nType: ${goal.type}`;
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