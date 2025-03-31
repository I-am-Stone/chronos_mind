"use client";
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

interface StepCardProps {
  number: string;
  title: string;
  description: string;
}

const StepCard = ({ number, title, description }: StepCardProps) => {
  return (
    <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50/80">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0 opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700" />
      <CardHeader>
        <div className="relative">
          <div className="text-4xl font-bold text-gray-200 mb-4 group-hover:text-gray-300 transition-colors duration-300 font-cabinet-grotesk">
            {number}
          </div>
          <div className="absolute -top-1 -left-2 text-4xl font-bold text-orange-500/10 group-hover:text-orange-500/20 transition-colors duration-300 scale-150 group-hover:scale-125 blur-sm">
            {number}
          </div>
        </div>
        <CardTitle className="text-xl text-gray-900 relative font-cabinet-grotesk">
          {title}
          <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-orange-500/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 relative z-10 group-hover:text-gray-700 transition-colors duration-300 font-plus-jakarta">
          {description}
        </p>
      </CardContent>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500/0 via-orange-500/20 to-orange-500/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </Card>
  );
};

export default StepCard;

