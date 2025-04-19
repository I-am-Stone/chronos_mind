'use client';
import React from 'react';
import { Brain, History, Bot, BarChart } from 'lucide-react'; // Added BarChart icon
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

type TabValue = 'session' | 'history' | 'analysis' | 'charts';

interface IntrospectionTabsProps {
  activeTab: TabValue;
  onTabChange: (value: TabValue) => void;
}

const IntrospectionTabs: React.FC<IntrospectionTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <TabsList className="grid grid-cols-4 "> {/* Changed to grid-cols-4 */}
      <TabsTrigger 
        value="session" 
        className=""
        onClick={() => onTabChange('session')

      }
      >
        <Brain className="mr-2 h-4 w-4" /> New Session
      </TabsTrigger>
      <TabsTrigger 
        value="history" 
        className=""
        onClick={() => onTabChange('history')}
      >
        <History className="mr-2 h-4 w-4" /> History
      </TabsTrigger>
      <TabsTrigger 
        value="analysis" 
        className=""
        onClick={() => onTabChange('analysis')}
      >
        <Bot className="mr-2 h-4 w-4" /> AI Analysis
      </TabsTrigger>
      <TabsTrigger
        value="charts" // Fixed value prop
        className=""
        onClick={() => onTabChange('charts')}
      >
        <BarChart className="mr-2 h-4 w-4" /> Introspection charts {/* Changed icon */}
      </TabsTrigger>
    </TabsList>
  );
};

export default IntrospectionTabs;