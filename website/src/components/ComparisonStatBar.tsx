import React from 'react';

interface ComparisonStatBarProps {
  label: string;
  homeValue: number;
  awayValue: number;
  isPercentage?: boolean;
  homeColor?: string;
  awayColor?: string;
}

export function ComparisonStatBar({
  label,
  homeValue,
  awayValue,
  isPercentage = false,
  homeColor = '#FACC15', // yellow-400
  awayColor = '#F97316', // orange-500
}: ComparisonStatBarProps) {
  const total = homeValue + awayValue;
  const homePercentage = total > 0 ? (homeValue / total) * 100 : 50;
  const awayPercentage = total > 0 ? (awayValue / total) * 100 : 50;

  const formatValue = (value: number) => {
    if (isPercentage) {
      return `${value.toFixed(1)}%`;
    }
    return value.toString();
  };

  return (
    <div className="space-y-2">
      {/* Label */}
      <div className="text-center">
        <p className="text-sm text-gray-500">{label}</p>
      </div>

      {/* Bar Chart */}
      <div className="flex items-center gap-3">
        {/* Home Value */}
        <div className="w-16 text-right">
          <span className="text-sm" style={{ color: '#333333' }}>
            {formatValue(homeValue)}
          </span>
        </div>

        {/* Bar */}
        <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden flex">
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${homePercentage}%`,
              backgroundColor: homeColor,
            }}
          ></div>
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${awayPercentage}%`,
              backgroundColor: awayColor,
            }}
          ></div>
        </div>

        {/* Away Value */}
        <div className="w-16 text-left">
          <span className="text-sm" style={{ color: '#333333' }}>
            {formatValue(awayValue)}
          </span>
        </div>
      </div>
    </div>
  );
}
