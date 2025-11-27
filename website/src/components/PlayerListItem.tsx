import React from 'react';
import { ChevronRight, User } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PlayerListItemProps {
  jerseyNumber: number;
  name?: string;
  image?: string;
  keyStat?: string;
  statLabel?: string;
  isLinked?: boolean;
  onClick?: () => void;
}

export function PlayerListItem({ 
  jerseyNumber, 
  name, 
  image, 
  keyStat, 
  statLabel = 'Goals',
  isLinked = false, 
  onClick 
}: PlayerListItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full p-4 rounded-lg border border-gray-200 bg-white hover:shadow-md hover:border-gray-300 transition-all active:scale-[0.98]"
    >
      <div className="flex items-center gap-4">
        {/* Player Image or Placeholder */}
        {isLinked && image ? (
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 shadow-sm">
            <ImageWithFallback
              src={image}
              alt={name || `Player ${jerseyNumber}`}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 shadow-sm">
            <User className="h-8 w-8 text-gray-400" />
          </div>
        )}

        {/* Player Info */}
        <div className="flex-1 text-left">
          {isLinked && name ? (
            <>
              <p className="mb-1" style={{ color: '#333333' }}>{name}</p>
              <p className="text-sm text-gray-600">#{jerseyNumber}</p>
            </>
          ) : (
            <>
              <p className="mb-1" style={{ color: '#333333' }}>Player #{jerseyNumber}</p>
              <p className="text-sm" style={{ color: '#f97316' }}>Pending Invitation</p>
            </>
          )}
        </div>

        <ChevronRight className="h-5 w-5 text-gray-400" />
      </div>
    </button>
  );
}
