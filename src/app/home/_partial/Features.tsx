
"use client";
import {Award, BarChart2, Brain, Calendar, CheckCircle, Layout} from "lucide-react";

export const features = [
    {
        icon: <Layout className="w-8 h-8 text-teal-600"/>,
        title: "Task Management System",
        description: "Organize and prioritize your tasks with our intuitive interface"
    },
    {
        icon: <BarChart2 className="w-8 h-8 text-blue-600"/>,
        title: "Performance Tracking",
        description: "Monitor your productivity and identify areas for improvement"
    },
    {
        icon: <Brain className="w-8 h-8 text-purple-600"/>,
        title: "Wellness Insights",
        description: "Get personalized recommendations for mental and physical well-being"
    },
    {
        icon: <CheckCircle className="w-8 h-8 text-green-600"/>,
        title: "Goal Achievement",
        description: "Break down complex goals into manageable steps"
    },
    {
        icon: <Calendar className="w-8 h-8 text-orange-600"/>,
        title: "Smart Scheduling",
        description: "Optimize your time with intelligent calendar integration"
    },
    {
        icon: <Award className="w-8 h-8 text-yellow-600"/>,
        title: "Progress Recognition",
        description: "Celebrate milestones and track your personal growth"
    }
];