'use client'
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Plus, Trash2 } from "lucide-react";

export function NotionStyleTodoList() {
  const [taskName, setTaskName] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [tasks, setTasks] = useState<{ id: number; text: string; completed: boolean }[]>([]);
  const [nextId, setNextId] = useState(1);

  const handleCreateTask = () => {
    if (taskName.trim()) {
      setTasks([...tasks, { id: nextId, text: taskName, completed: false }]);
      setNextId(nextId + 1);
      setTaskName('');
      setIsAdding(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreateTask();
    } else if (e.key === 'Escape') {
      setIsAdding(false);
      setTaskName('');
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  return (
    <div className="max-w-md mx-auto">
      <Card className="bg-white border-none shadow-sm">
        <CardContent className="p-4">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Tasks</h2>
            <p className="text-gray-500 text-sm">Keep track of your daily tasks</p>
          </div>
          
          {/* Task List */}
          <div className="space-y-1 mb-4">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <div 
                  key={task.id} 
                  className="group flex items-center py-2 px-1 hover:bg-gray-50 rounded-sm transition-colors"
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`h-5 w-5 rounded flex-shrink-0 border ${
                      task.completed 
                        ? 'bg-blue-500 border-blue-500' 
                        : 'border-gray-300 hover:border-gray-400'
                    } flex items-center justify-center mr-3`}
                  >
                    {task.completed && <Check className="h-3 w-3 text-white" />}
                  </button>
                  <span 
                    className={`flex-grow text-gray-800 ${
                      task.completed ? 'line-through text-gray-400' : ''
                    }`}
                  >
                    {task.text}
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="h-6 w-6 flex items-center justify-center text-gray-400 opacity-0 group-hover:opacity-100 hover:text-gray-600 transition-opacity"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="py-6 text-center text-gray-400 text-sm italic">
                No tasks yet. Add one below.
              </div>
            )}
          </div>
          
          {/* Add Task Form */}
          {isAdding ? (
            <div className="py-2">
              <Input
                placeholder="What needs to be done?"
                className="border border-gray-200 text-gray-800 rounded-sm focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-0"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              <div className="flex justify-end gap-2 mt-2">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => {
                    setIsAdding(false);
                    setTaskName('');
                  }}
                  className="text-gray-500 hover:text-gray-700 h-8"
                >
                  Cancel
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleCreateTask}
                  className="bg-blue-500 hover:bg-blue-600 text-white h-8"
                >
                  Add
                </Button>
              </div>
            </div>
          ) : (
            <div 
              onClick={() => setIsAdding(true)}
              className="flex items-center py-2 px-1 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <Plus className="h-4 w-4 mr-2" />
              <span>Add a task</span>
            </div>
          )}
          
          {/* Footer */}
          {tasks.length > 0 && (
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100 text-xs text-gray-500">
              <span>{tasks.length} task{tasks.length !== 1 ? 's' : ''}</span>
              {tasks.some(task => task.completed) && (
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={clearCompleted}
                  className="text-xs h-6 text-gray-500 hover:text-gray-700"
                >
                  Clear completed
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}