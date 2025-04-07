import React from 'react';
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
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const IntrospectionLineChart = () => {
    // Sample historical data - in a real app, this would come from props or context
    const historicalData = [
        { date: "March 22, 2025", cognitive_avg: 4.1, emotional_avg: 5.5 },
        { date: "March 26, 2025", cognitive_avg: 7.4, emotional_avg: 7.8 },
        { date: "March 29, 2025", cognitive_avg: 6.2, emotional_avg: 5.3 },
        { date: "April 1, 2025", cognitive_avg: 5.8, emotional_avg: 6.7 },
        { date: "April 3, 2025", cognitive_avg: 6.5, emotional_avg: 6.2 },
        { date: "April 5, 2025", cognitive_avg: 7.1, emotional_avg: 5.9 },
    ];

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 10,
                title: {
                    display: true,
                    text: 'Score (0-10)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Date'
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Introspection Trends Over Time',
                font: {
                    size: 16
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.dataset.label || '';
                        const value = context.raw.toFixed(1);
                        return `${label}: ${value}`;
                    }
                }
            }
        },
    };

    const chartData = {
        labels: historicalData.map(entry => entry.date),
        datasets: [
            {
                label: 'Cognitive Average',
                data: historicalData.map(entry => entry.cognitive_avg),
                borderColor: 'rgb(59, 130, 246)', // blue-500
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderWidth: 2,
                tension: 0.3,
                pointRadius: 4,
            },
            {
                label: 'Emotional Average',
                data: historicalData.map(entry => entry.emotional_avg),
                borderColor: 'rgb(236, 72, 153)', // pink-500
                backgroundColor: 'rgba(236, 72, 153, 0.2)',
                borderWidth: 2,
                tension: 0.3,
                pointRadius: 4,
            }
        ],
    };

    return (
        <TabsContent value="charts" className="pt-4">
            <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                <h3 className="text-lg font-medium mb-4">Cognitive and Emotional Metrics Trends</h3>
                <div className="text-sm text-gray-500 mb-6">
                    Track your cognitive and emotional metrics over time to identify patterns and improvements.
                </div>
                <div className="h-80">
                    <Line options={chartOptions} data={chartData} />
                </div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="text-blue-700 font-medium mb-2">Cognitive Insights</h4>
                        <p className="text-sm">Your cognitive scores show improvement following regular practice. Consider tracking which specific activities correlate with higher cognitive scores.</p>
                    </div>
                    <div className="bg-pink-50 p-4 rounded-lg">
                        <h4 className="text-pink-700 font-medium mb-2">Emotional Insights</h4>
                        <p className="text-sm">Your emotional regulation scores have been relatively stable. Notice how environmental factors might influence these patterns.</p>
                    </div>
                </div>
            </div>
        </TabsContent>
    );
};

export default IntrospectionLineChart;