"use client";

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import Navigation from './_partial/NavigationComponent';
import FeatureCard from './_partial/FeatureCard';
import StepCard from './_partial/stepCard';
import Footer from './_partial/footer';
import { steps } from "./_partial/steps";
import { features } from "./_partial/Features";
import { motion } from 'framer-motion';
import { MotionAnimation } from '@/components/shared/animations/MotionAnimation';


const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50/40 relative overflow-hidden font-inter">
      <MotionAnimation />
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(56,189,248,0.08),transparent)] pointer-events-none" />
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-teal-300/15 to-blue-300/15 rounded-full blur-3xl pointer-events-none" />
        <h1 className="relative text-5xl font-bold text-gray-900 mb-6 animate-fade-in font-cabinet-grotesk tracking-tight">
          Achieve More, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-blue-500">Stress Less</span>
        </h1>
        <p className="relative text-xl text-gray-700 mb-8 max-w-2xl mx-auto animate-fade-in-up font-plus-jakarta leading-relaxed">
          Your path to balanced productivity and well-being starts here. Join thousands of professionals who have transformed their work-life balance.
        </p>
        <Button
          size="lg"
          className="relative bg-gradient-to-r from-orange-500 to-teal-500 hover:from-orange-600 hover:to-teal-600 group overflow-hidden font-medium tracking-wide"
        >
          <span className="relative z-10 flex items-center">
            Start Your Journey Now
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        </Button>
      </div>

      {/* Features Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-orange-300">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 font-cabinet-grotesk">
          Features designed for your well-being
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
          {features.map((feature, index) => (
            <motion.div 
              key={`feature-${index}`}
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="relative bg-gradient-to-b from-white-900 to-white-900 py-20 border-orange-300">
        <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_0px,rgba(56,189,248,0.08),transparent)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 font-cabinet-grotesk">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
            {steps.map((step, index) => (
              <motion.div 
                key={`step-${index}`}
                whileHover={{ scale: 1.08 }} 
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <StepCard {...step} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <Card className="relative bg-gradient-to-b from-white-900 to-white-900 p-3 border-orange-300 rounded-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_0px,rgba(255,255,255,0.15),transparent)] pointer-events-none" />
        <CardContent className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <CardTitle className="text-3xl font-bold mb-6 text-black font-cabinet-grotesk">
            Ready to transform your productivity?
          </CardTitle>
          <p className="text-xl mb-8 text-black/90 font-plus-jakarta">
            Join Today and Get a Free Wellness Guide!
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="bg-orange-500 text-white hover:bg-orange-400 group relative overflow-hidden font-medium tracking-wide"
          >
            <span className="relative z-10">Sign Up Now</span>
            <div className="absolute inset-0 bg-gradient-to-r from-teal-50/0 via-teal-50/40 to-teal-50/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </Button>
        </CardContent>
      </Card>
      <Footer />
    </div>
  );
};

export default LandingPage;