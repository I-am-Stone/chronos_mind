'use client';
import React from 'react';
import { Brain, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface IntrospectionHeaderProps {
  level: number;
}

const IntrospectionHeader: React.FC<IntrospectionHeaderProps> = ({ level }) => {
  return (
    <div className="bg-gradient-to-r from-blue-700 to-blue-500 px-6 py-5 rounded-t-xl">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Brain className="mr-3 text-white" size={28} />
          Mind Lab: Introspection Chamber
        </h2>
        <Badge variant="outline" className="bg-white text-blue-600 border-white px-3 py-1 text-sm font-medium self-start md:self-auto">
          <Award className="mr-2" size={16} />
          Level {level}
        </Badge>
      </div>
    </div>
  );
};

export default IntrospectionHeader; 