// src/pages/habits/index.tsx
'use client';
import React from 'react';
import { Toaster } from 'sonner';
import SidebarLayout from '@/components/shared/sidebar/layout';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HabitTracker } from './_partials/HabitFrom';

const HabitsPage: React.FC = () => {
  

  return (
    <SidebarLayout>
      <Toaster position="top-right" />
      
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Habit Builder
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Build lasting habits with proven strategies
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="create">Create Habit</TabsTrigger>
            <TabsTrigger value="strategies">Strategies</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
            </motion.div>
          </TabsContent>

          <TabsContent value="create">
            <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-md mx-auto"
            >
              <HabitTracker />
            </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="strategies">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
            </motion.div>
          </TabsContent>

        </Tabs>
      </div>
    </SidebarLayout>
  );
};

export default HabitsPage;