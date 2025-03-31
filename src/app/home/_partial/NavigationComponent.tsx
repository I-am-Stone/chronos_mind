"use client";
import React, { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Navigation = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const handleNavigation = (path: string) => {
    if (mounted) {
      router.push(path);
    }
  };
  
  return (
    <nav className="bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 shadow-lg border-t-2 border-orange-500 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_400px_at_50%_300px,rgba(251,146,60,0.15),transparent)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center relative">
        <div className="flex items-center group">
          <div className="relative">
            <Activity className="h-8 w-8 text-orange-500 group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>
          <span className="ml-2 text-xl font-cabinet-grotesk tracking-wider text-gray-800 uppercase relative">
            Mind
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </span>
        </div>
        <div className="flex gap-4">
          <Button
            onClick={() => handleNavigation('/login')}
            variant="ghost"
            className="font-plus-jakarta text-orange-600 hover:text-orange-700 tracking-wide relative group overflow-hidden"
          >
            <span className="relative z-10">Log in</span>
            <div className="absolute inset-0 bg-orange-100 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Button>
          <Button
            onClick={() => handleNavigation('/register')}
            variant="default"
            className="font-plus-jakarta bg-orange-500 hover:bg-orange-600 tracking-wide border-2 border-orange-600 relative group overflow-hidden"
          >
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-orange-400/30 to-orange-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;