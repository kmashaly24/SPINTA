import React from 'react';
import { ChevronRight } from 'lucide-react';

interface MatchListItemProps {
  opponent: string;
  date: string;
  score?: string;
  result?: 'win' | 'loss' | 'draw';
  isUpcoming?: boolean;
  onClick?: () => void;
  clubName?: string;
}

export function MatchListItem({ opponent, date, score, result, isUpcoming = false, onClick, clubName }: MatchListItemProps) {
  // Background tint based on result
  const getBackgroundColor = () => {
    if (isUpcoming) return 'bg-blue-50';
    if (result === 'win') return 'bg-green-50';
    if (result === 'loss') return 'bg-red-50';
    if (result === 'draw') return 'bg-gray-50';
    return 'bg-white';
  };

  // Result indicator with colored dot
  const getResultIndicator = () => {
    if (isUpcoming) {
      return (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <span className="text-sm text-blue-600">Upcoming</span>
        </div>
      );
    }
    if (result === 'win') {
      return (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-sm text-green-600">Win</span>
        </div>
      );
    }
    if (result === 'loss') {
      return (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <span className="text-sm text-red-600">Loss</span>
        </div>
      );
    }
    if (result === 'draw') {
      return (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          <span className="text-sm text-gray-600">Draw</span>
        </div>
      );
    }
    return null;
  };

  // Format match display with both team names and score
  const formatMatchDisplay = () => {
    if (clubName && score) {
      const [homeScore, awayScore] = score.split('-');
      return `${clubName} ${homeScore} - ${awayScore} ${opponent}`;
    }
    return opponent;
  };

  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-lg ${getBackgroundColor()} transition-all hover:shadow-md active:scale-[0.98]`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 text-left space-y-2 min-w-0">
          <p className="text-sm text-gray-500">{date}</p>
          <p className="font-bold text-base truncate" style={{ color: '#333333' }}>
            {formatMatchDisplay()}
          </p>
          {getResultIndicator()}
        </div>
        <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
      </div>
    </button>
  );
}
