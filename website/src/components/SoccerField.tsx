import React from 'react';

interface HeatmapData {
  x: number; // 0-100 (percentage of field width)
  y: number; // 0-100 (percentage of field height)
  intensity: number; // 0-1
}

interface PassData {
  from: { x: number; y: number };
  to: { x: number; y: number };
  successful: boolean;
}

interface ShotData {
  x: number;
  y: number;
  outcome: 'goal' | 'on-target' | 'off-target' | 'blocked';
}

interface SoccerFieldProps {
  type: 'heatmap' | 'passmap' | 'shotmap';
  heatmapData?: HeatmapData[];
  passData?: PassData[];
  shotData?: ShotData[];
}

export const SoccerField: React.FC<SoccerFieldProps> = ({
  type,
  heatmapData = [],
  passData = [],
  shotData = [],
}) => {
  return (
    <div className="w-full aspect-[3/2] relative bg-green-600 rounded-lg overflow-hidden shadow-lg">
      {/* Field markings */}
      <svg
        viewBox="0 0 300 200"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Field base */}
        <rect x="0" y="0" width="300" height="200" fill="#4ade80" />
        
        {/* Outer lines */}
        <rect
          x="2"
          y="2"
          width="296"
          height="196"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
        />
        
        {/* Center line */}
        <line
          x1="150"
          y1="2"
          x2="150"
          y2="198"
          stroke="white"
          strokeWidth="1.5"
        />
        
        {/* Center circle */}
        <circle
          cx="150"
          cy="100"
          r="20"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
        />
        <circle cx="150" cy="100" r="2" fill="white" />
        
        {/* Left penalty area */}
        <rect
          x="2"
          y="50"
          width="40"
          height="100"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
        />
        
        {/* Left goal area */}
        <rect
          x="2"
          y="75"
          width="15"
          height="50"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
        />
        
        {/* Left penalty arc */}
        <path
          d="M 42 80 A 20 20 0 0 1 42 120"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
        />
        
        {/* Left penalty spot */}
        <circle cx="30" cy="100" r="1.5" fill="white" />
        
        {/* Right penalty area */}
        <rect
          x="258"
          y="50"
          width="40"
          height="100"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
        />
        
        {/* Right goal area */}
        <rect
          x="283"
          y="75"
          width="15"
          height="50"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
        />
        
        {/* Right penalty arc */}
        <path
          d="M 258 80 A 20 20 0 0 0 258 120"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
        />
        
        {/* Right penalty spot */}
        <circle cx="270" cy="100" r="1.5" fill="white" />
        
        {/* Goals */}
        <rect x="0" y="85" width="2" height="30" fill="white" opacity="0.5" />
        <rect x="298" y="85" width="2" height="30" fill="white" opacity="0.5" />

        {/* Render based on type */}
        {type === 'heatmap' && heatmapData.map((point, idx) => {
          const x = (point.x / 100) * 300;
          const y = (point.y / 100) * 200;
          const radius = 15;
          const opacity = point.intensity * 0.6;
          
          return (
            <circle
              key={idx}
              cx={x}
              cy={y}
              r={radius}
              fill="red"
              opacity={opacity}
              style={{ filter: 'blur(8px)' }}
            />
          );
        })}

        {type === 'passmap' && passData.map((pass, idx) => (
          <g key={idx}>
            <line
              x1={(pass.from.x / 100) * 300}
              y1={(pass.from.y / 100) * 200}
              x2={(pass.to.x / 100) * 300}
              y2={(pass.to.y / 100) * 200}
              stroke={pass.successful ? '#fbbf24' : '#ef4444'}
              strokeWidth="2"
              opacity="0.6"
              markerEnd={`url(#arrow-${pass.successful ? 'success' : 'fail'})`}
            />
          </g>
        ))}

        {type === 'shotmap' && shotData.map((shot, idx) => {
          const x = (shot.x / 100) * 300;
          const y = (shot.y / 100) * 200;
          
          let color = '#ef4444'; // off-target
          let symbol = '✕';
          
          if (shot.outcome === 'goal') {
            color = '#22c55e';
            symbol = '⚽';
          } else if (shot.outcome === 'on-target') {
            color = '#fbbf24';
            symbol = '🎯';
          } else if (shot.outcome === 'blocked') {
            color = '#6b7280';
            symbol = '🛡️';
          }
          
          return (
            <g key={idx}>
              <circle
                cx={x}
                cy={y}
                r="5"
                fill={color}
                stroke="white"
                strokeWidth="1.5"
                opacity="0.9"
              />
              <text
                x={x}
                y={y + 1}
                textAnchor="middle"
                fontSize="6"
                fill="white"
              >
                {symbol}
              </text>
            </g>
          );
        })}

        {/* Arrow markers for passmap */}
        {type === 'passmap' && (
          <defs>
            <marker
              id="arrow-success"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#fbbf24" />
            </marker>
            <marker
              id="arrow-fail"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
            </marker>
          </defs>
        )}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 text-xs shadow-md">
        {type === 'heatmap' && (
          <div className="space-y-1">
            <p className="font-medium" style={{ color: '#333333' }}>Player Activity</p>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 opacity-30"></div>
              <span className="text-gray-600">Low</span>
              <div className="w-3 h-3 rounded-full bg-red-500 opacity-60"></div>
              <span className="text-gray-600">High</span>
            </div>
          </div>
        )}
        {type === 'passmap' && (
          <div className="space-y-1">
            <p className="font-medium" style={{ color: '#333333' }}>Passes</p>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-yellow-500"></div>
              <span className="text-gray-600">Complete</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-red-500"></div>
              <span className="text-gray-600">Incomplete</span>
            </div>
          </div>
        )}
        {type === 'shotmap' && (
          <div className="space-y-1">
            <p className="font-medium" style={{ color: '#333333' }}>Shots</p>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-gray-600">Goal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-gray-600">On Target</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-gray-600">Off Target</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-500"></div>
              <span className="text-gray-600">Blocked</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
