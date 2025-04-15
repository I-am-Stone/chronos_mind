import { 
    User, 
    Target, 
    BarChart3, 
    Settings, 
    Backpack, 
    Award,
    ScrollText,
    Book,
    Dumbbell,
    LogOut,
  } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar";
  
import Link from "next/link";
  // Game-themed menu items with improved icons
  const items = [
    {
      title: "Profile",
      url: "user_profile",
      icon: User,
      color: "text-cyan-500",
      badge: "Lvl 5"
    },
    {
      title: "Quests",
      url: "goals",
      icon: Target,
      color: "text-emerald-500",
      badge: "3"
    },
    {
      title: "Habits",
      url: "habit",
      icon: Dumbbell,
      color: "text-emerald-500",
      badge: "3"
    },
    {
      title: "Introspection",
      url: "introspection",
      icon: ScrollText,
      color: "text-emerald-500",
      badge: "3"
    },
    {
      title: "User Manual",
      url: "user_manul",
      icon: Book,
      color: "text-emerald-500",
      badge: "3"
    },
    {
      title: "Stats",
      url: "stats",
      icon: BarChart3,
      color: "text-purple-500"
    },
    {
      title: "Shop",
      url: "shop",
      icon: Backpack,
      color: "text-amber-500",
      badge: "New"
    },
    {
      title: "Settings",
      url: "settings",
      icon: Settings,
      color: "text-gray-500"
    },
    {
      title: "Logout",
      url: "logout",
      icon: LogOut,
      color: "text-gray-500"
    },
  ];
  
  export function AppSidebar() {
    return (
      <Sidebar className="border-r-2 border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <SidebarContent>
          <div className="flex items-center gap-2 px-4 py-3 mb-2 border-b border-gray-200 dark:border-gray-800">
            <Award className="h-6 w-6 text-indigo-500" />
            <div className="text-2xl font-bold font-vt323 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              GOAL MASTER
            </div>
          </div>
          
          <div className="px-3 py-2 mb-6">
            <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2.5">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full w-2/3"></div>
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-600 dark:text-gray-400 font-vt323">
              <span>XP: 650/1000</span>
              <span>Next Level: 35%</span>
            </div>
          </div>
          
          <SidebarGroup>
            <SidebarGroupLabel>
              <div className="text-xl font-vt323 flex items-center gap-2">
                <span className="inline-block w-4 h-4 bg-indigo-500 rounded-full"></span>
                Main Menu
              </div>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title} className="my-1">
                    <SidebarMenuButton asChild>
                      <Link href={item.url} className="flex items-center justify-between group py-1.5 font-vt323 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-all">
                        <div className="flex items-center">
                          <div className={`p-1.5 rounded-md mr-3 ${item.color} bg-opacity-10 group-hover:bg-opacity-20`}>
                            <item.icon className={`h-5 w-5 ${item.color}`} />
                          </div>
                          <span className="text-lg">{item.title}</span>
                        </div>
                        
                        {item.badge && (
                          <span className={`mr-2 px-2 py-0.5 text-xs rounded-full bg-${item.color.split('-')[1]}-100 text-${item.color.split('-')[1]}-600 dark:bg-${item.color.split('-')[1]}-900/30 dark:text-${item.color.split('-')[1]}-400`}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          
          <div className="px-4 py-3 mt-6">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg border border-indigo-200 dark:border-indigo-800">
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <h4 className="font-vt323 font-bold text-indigo-700 dark:text-indigo-300">Daily Challenge</h4>
              </div>
              <p className="text-xs text-gray-700 dark:text-gray-300 font-vt323">
                Complete 2 more quests to earn 50 XP and unlock a new badge!
              </p>
            </div>
          </div>
        </SidebarContent>
      </Sidebar>
    );
  }