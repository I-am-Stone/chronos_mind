'use client';
import React from 'react';
import { Brain, History, Bot } from 'lucide-react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

type TabValue = 'session' | 'history' | 'analysis';

interface IntrospectionTabsProps {
  activeTab: TabValue;
  onTabChange: (value: TabValue) => void;
}

const IntrospectionTabs: React.FC<IntrospectionTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <TabsList className="grid grid-cols-3 bg-blue-800/30 rounded-md p-1">
      <TabsTrigger 
        value="session" 
        className="data-[state=active]:bg-white data-[state=active]:text-blue-600 py-2 rounded-md"
        onClick={() => onTabChange('session')}
      >
        <Brain className="mr-2 h-4 w-4" /> New Session
      </TabsTrigger>
      <TabsTrigger 
        value="history" 
        className="data-[state=active]:bg-white data-[state=active]:text-blue-600 py-2 rounded-md"
        onClick={() => onTabChange('history')}
      >
        <History className="mr-2 h-4 w-4" /> History
      </TabsTrigger>
      <TabsTrigger 
        value="analysis" 
        className="data-[state=active]:bg-white data-[state=active]:text-blue-600 py-2 rounded-md"
        onClick={() => onTabChange('analysis')}
      >
        <Bot className="mr-2 h-4 w-4" /> AI Analysis
      </TabsTrigger>
    </TabsList>
  );
};

export default IntrospectionTabs; 