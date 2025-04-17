'use client';
import React from 'react';
import { Bell } from 'lucide-react';

interface Notification {
  id: number;
  type: string;
  action: string;
  title: string;
  description: string;
  points?: number;
  timestamp: string;
  icon: React.ReactNode;
}

interface ActivityFeedProps {
  notifications: Notification[];
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ notifications }) => {
  return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <Bell size={20} className="mr-2 text-purple-600" />
            Recent Activity
          </h2>
          <span className="text-sm text-gray-500">{notifications.length} updates</span>
        </div>

        <div className="space-y-3">
          {notifications.length === 0 ? (
              <div className="text-center p-6 text-gray-500">
                No recent activity to display
              </div>
          ) : (
              notifications.map(notification => (
                  <div
                      key={notification.id}
                      className="flex items-start p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition cursor-pointer"
                  >
                    <div className="flex-shrink-0 mr-3 mt-1">
                      {notification.icon}
                    </div>

                    <div className="flex-grow">
                      <h3 className="font-bold text-gray-800">{notification.title}</h3>
                      <p className="text-sm text-gray-600">{notification.description}</p>
                      {notification.points && notification.points > 0 && (
                          <div className="mt-1 flex items-center">
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full font-bold">
                      +{notification.points} XP
                    </span>
                          </div>
                      )}
                      <div className="text-xs text-gray-400 mt-1">
                        {notification.timestamp}
                      </div>
                    </div>
                  </div>
              ))
          )}
        </div>
      </div>
  );
};

export default ActivityFeed;