'use client';
import React, { useEffect, useState } from 'react';
import { Trophy, Zap, Shield, AlertTriangle, Star, Bell, Check, Target, Award } from 'lucide-react';
import SidebarLayout from '@/components/shared/sidebar/layout';
import CharacterHeader from './_partials/CharacterHeader';
import ActivityFeed from './_partials/ActivityFeed';
import { getProfileData } from '@/api/user_profile/getProfileData';
import { getActivityLog } from '@/api/user_profile/getActivityLog'
import Inventory from './_partials/Inventory';
import { getOrders } from "@/api/shop/listOrderitem";

interface UserProfileData {
  user_name: string;
  user_profile: {
    user: number;
    level: number;
    character_class: string;
    exp_points: number;
    total_points: number;
    achievements: any[] | null;
    created_at: string;
    updated_at: string;
    profile_picture?: string | null;
    about_me?: string | null;
  };
}

interface ActivityLogItem {
  id: number;
  activity_type: string;
  exp_earned: number;
  timestamp: string;
  description: string;
  user_profile: number;
}

interface ActivityNotification {
  id: number;
  type: string;
  action: string;
  title: string;
  description: string;
  points?: number;
  timestamp: string;
  icon: React.ReactNode;
}

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  description: string;
  imageURI: string;
  category: string;
}

interface ProfileResponse {
  success: boolean;
  data: UserProfileData;
}

interface ActivityResponse {
  success: boolean;
  data: ActivityLogItem[];
}

export default function UserProfilePage() {
  const [userData, setUserData] = useState<UserProfileData | null>(null);
  const [activityFeed, setActivityFeed] = useState<ActivityNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [inventory, setItems] = useState<InventoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [showItemDetails, setShowItemDetails] = useState(false);

  useEffect(() => {
    const fetchOrderItems = async () => {
      const response = await getOrders();
      setItems(response.data);
    };
    fetchOrderItems().then(r => console.log(r));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [profileResponse, activityResponse] = await Promise.all([
          await getProfileData() as unknown as ProfileResponse,
          await getActivityLog() as unknown as ActivityResponse
        ]);
        if (profileResponse.success) {
          setUserData(profileResponse.data);
        }

        if (activityResponse.success) {
          setActivityFeed(
              activityResponse.data.map((activity: ActivityLogItem) =>
                  mapActivityToNotification(activity)
              ));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setActivityFeed([{
          id: 1,
          type: 'error',
          action: 'error',
          title: 'System Error',
          description: 'Failed to load data',
          timestamp: 'Just now',
          icon: <AlertTriangle size={20} className="text-red-500" />
        }]);
      } finally {
        setLoading(false);
      }
    };

    fetchData().catch(error => {
      console.error('Error in fetchData:', error);
      setLoading(false);
    });
  }, []);

  function mapActivityToNotification(activity: ActivityLogItem): ActivityNotification {
    const iconMap: Record<string, React.ReactNode> = {
      'GOAL_COMPLETION': <Check size={20} className="text-green-500" />,
      'HABIT_TRACKED': <Shield size={20} className="text-blue-500" />,
      'STREAK_MILESTONE': <Zap size={20} className="text-orange-500" />,
      'ACHIEVEMENT_UNLOCKED': <Trophy size={20} className="text-yellow-500" />,
      'QUEST_PROGRESS': <Target size={20} className="text-purple-500" />,
      'LEVEL_UP': <Star size={20} className="text-purple-500" />,
      'POINT_AWARD': <Award size={20} className="text-indigo-500" />
    };

    const titleMap: Record<string, string> = {
      'GOAL_COMPLETION': 'Goal Completed',
      'HABIT_TRACKED': 'Habit Tracked',
      'STREAK_MILESTONE': 'Streak Milestone',
      'ACHIEVEMENT_UNLOCKED': 'Achievement Unlocked',
      'QUEST_PROGRESS': 'Quest Progress',
      'LEVEL_UP': 'Level Up',
      'POINT_AWARD': 'Points Awarded'
    };

    return {
      id: activity.id,
      type: activity.activity_type.toLowerCase().split('_')[0],
      action: 'completed',
      title: titleMap[activity.activity_type] || 'Activity Update',
      description: activity.description,
      points: activity.exp_earned,
      timestamp: formatTimestamp(activity.timestamp),
      icon: iconMap[activity.activity_type] || <Bell size={20} className="text-gray-500" />
    };
  }

  function formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMin = Math.floor(diffMs / (1000 * 60));
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffDay > 0) return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
    if (diffHour > 0) return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    if (diffMin > 0) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    return 'Just now';
  }

  const onItemClick = (item: InventoryItem) => {
    setSelectedItem(item);
    setShowItemDetails(true);
  };

  const closeItemDetails = () => {
    setShowItemDetails(false);
    setSelectedItem(null);
  };

  if (loading) {
    return (
        <SidebarLayout>
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        </SidebarLayout>
    );
  }

  return (
      <SidebarLayout>
        <div className="min-h-screen p-8 bg-gradient-to-br from-purple-50 to-blue-50">
          <div className="max-w-6xl mx-auto w-full">
            {userData && (
                <CharacterHeader
                    user_name={userData.user_name}
                    user_profile={userData.user_profile}
                />
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            </div>

            <div className="mb-6">
              <Inventory
                  inventory={inventory}
                  onItemClick={onItemClick}
              />
            </div>

            {showItemDetails && selectedItem && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 max-h-[80vh] overflow-y-auto">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{selectedItem.name}</h3>
                      <button
                          onClick={closeItemDetails}
                          className="text-gray-500 hover:text-gray-700"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {selectedItem.imageURI && (
                        <div className="mb-4 flex justify-center">
                          <img
                              src={selectedItem.imageURI}
                              alt={selectedItem.name}
                              className="h-40 w-40 object-contain rounded-lg border border-gray-200"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=Item';
                              }}
                          />
                        </div>
                    )}

                    <div className="mb-4">
                      <p className="text-gray-700">{selectedItem.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {selectedItem.category && (
                          <div>
                            <span className="text-sm font-medium text-gray-500">Category:</span>
                            <p className="text-gray-900 capitalize">{selectedItem.category.toLowerCase()}</p>
                          </div>
                      )}

                      {selectedItem.quantity !== undefined && (
                          <div>
                            <span className="text-sm font-medium text-gray-500">Quantity:</span>
                            <p className="text-gray-900">{selectedItem.quantity}</p>
                          </div>
                      )}
                    </div>

                    <div className="mt-6">
                      <button
                          onClick={closeItemDetails}
                          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
            )}

            <ActivityFeed notifications={activityFeed} />
          </div>
        </div>
      </SidebarLayout>
  );
}