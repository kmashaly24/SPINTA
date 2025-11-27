import React from 'react';
import { Users, MessageSquare, TrendingUp, Calendar, Dumbbell, User } from 'lucide-react';

type CoachTab = 'club' | 'players' | 'chatbot' | 'profile';
type PlayerTab = 'stats' | 'matches' | 'training' | 'profile';

interface BottomNavigationProps {
  userType: 'coach' | 'player';
  activeTab: CoachTab | PlayerTab;
  onTabChange: (tab: CoachTab | PlayerTab) => void;
}

export function BottomNavigation({ userType, activeTab, onTabChange }: BottomNavigationProps) {
  if (userType === 'coach') {
    const tabs = [
      { id: 'club' as CoachTab, label: 'Club', icon: '⚽' },
      { id: 'players' as CoachTab, label: 'Players', icon: Users },
      { id: 'chatbot' as CoachTab, label: 'Chatbot', icon: MessageSquare },
      { id: 'profile' as CoachTab, label: 'Profile', icon: User },
    ];

    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-pb">
        <div className="flex items-center justify-around px-2 py-3">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const IconComponent = typeof tab.icon === 'string' ? null : tab.icon;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="flex flex-col items-center space-y-1 min-w-[60px] transition-colors"
              >
                {IconComponent ? (
                  <IconComponent 
                    className={`h-6 w-6 ${isActive ? 'text-orange-500' : 'text-gray-500'}`}
                  />
                ) : (
                  <span className="text-2xl">{tab.icon}</span>
                )}
                <span 
                  className={`text-xs ${isActive ? 'text-orange-500' : 'text-gray-500'}`}
                  style={isActive ? {} : { color: '#666' }}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Player navigation
  const tabs = [
    { id: 'stats' as PlayerTab, label: 'My Stats', icon: TrendingUp },
    { id: 'matches' as PlayerTab, label: 'Matches', icon: Calendar },
    { id: 'training' as PlayerTab, label: 'Training', icon: Dumbbell },
    { id: 'profile' as PlayerTab, label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-pb">
      <div className="flex items-center justify-around px-2 py-3">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const IconComponent = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center space-y-1 min-w-[60px] transition-colors"
            >
              <div className={isActive ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500' : ''}>
                <IconComponent 
                  className={`h-6 w-6 ${isActive ? 'stroke-current' : 'text-gray-500'}`}
                  style={isActive ? { 
                    stroke: 'url(#iconGradient)',
                    fill: 'none'
                  } : {}}
                />
              </div>
              <span 
                className={`text-xs ${isActive ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500' : 'text-gray-500'}`}
              >
                {tab.label}
              </span>
              {isActive && (
                <svg width="0" height="0" style={{ position: 'absolute' }}>
                  <defs>
                    <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#facc15" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                  </defs>
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
