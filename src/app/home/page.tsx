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
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50/40 relative overflow-hidden font-inter">
      <MotionAnimation />
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(56,189,248,0.08),transparent)] pointer-events-none" />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-teal-300/15 to-blue-300/15 rounded-full blur-3xl pointer-events-none" />
        <h1 className="relative text-5xl font-bold text-gray-900 mb-6 animate-fade-in font-cabinet-grotesk tracking-tight">
          Achieve More, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-blue-500">Stress Less</span>
        </h1>
        <p className="relative text-xl text-gray-700 mb-8 max-w-2xl mx-auto animate-fade-in-up font-plus-jakarta leading-relaxed">
          Your path to balanced productivity and well-being starts here. Join thousands of professionals who have transformed their work-life balance.
        </p>
        <Link href="/register">
          <Button
            className="relative size-lg bg-gradient-to-r from-orange-500 to-teal-500 hover:from-orange-600 hover:to-teal-600 group overflow-hidden font-medium tracking-wide"
          >
            <span className="relative z-10 flex items-center">
              Start Your Journey Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </Button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      </section>

      {/* How It Works Section */}
      <section className="relative py-20">
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
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-b from-blue-50/40 to-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,rgba(56,189,248,0.08),transparent)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 font-cabinet-grotesk">
              Ready to transform your productivity?
            </h2>
            <p className="text-xl mt-4 text-gray-700 font-plus-jakarta max-w-2xl mx-auto">
              Join Today and Get a Free Wellness Guide!
            </p>
          </div>
          <div className="flex justify-center">
            <Link href="/register">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-orange-500 to-teal-500 hover:from-orange-600 hover:to-teal-600 text-white group relative overflow-hidden font-medium tracking-wide py-6 px-8"
              >
                <span className="relative z-10 flex items-center text-lg">
                  Sign Up Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default LandingPage;