
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50/80">
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700" />
      <CardHeader className="relative">
        <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
          {icon}
          <div className="absolute inset-0 blur-xl opacity-20">{icon}</div>
        </div>
        <CardTitle className="text-xl text-gray-900 relative font-cabinet-grotesk">
          {title}
          <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-current scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left opacity-30" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 relative z-10 font-plus-jakarta">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;

