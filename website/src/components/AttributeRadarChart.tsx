import React from 'react';

interface AttributeRadarChartProps {
  attributes: {
    attacking: number;
    technique: number;
    tactical: number;
    defending: number;
    creativity: number;
  };
}

export function AttributeRadarChart({ attributes }: AttributeRadarChartProps) {
  // Pentagon points (5 vertices) - positioned around a circle
  const radius = 100;
  const centerX = 150;
  const centerY = 150;
  
  // Calculate positions for each attribute (starting from top, going clockwise)
  const angleOffset = -90; // Start from top
  const angleStep = 72; // 360/5 = 72 degrees between each point
  
  const positions = [
    { label: 'ATT', key: 'attacking', angle: angleOffset },
    { label: 'TEC', key: 'technique' as const, angle: angleOffset + angleStep },
    { label: 'TAC', key: 'tactical' as const, angle: angleOffset + angleStep * 2 },
    { label: 'DEF', key: 'defending' as const, angle: angleOffset + angleStep * 3 },
    { label: 'CRE', key: 'creativity' as const, angle: angleOffset + angleStep * 4 },
  ];
  
  // Function to get color based on value
  const getColor = (value: number) => {
    if (value >= 80) return '#10b981'; // green
    if (value >= 60) return '#eab308'; // yellow
    return '#9ca3af'; // gray
  };
  
  // Calculate point coordinates on pentagon
  const calculatePoint = (angle: number, distance: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: centerX + Math.cos(rad) * distance,
      y: centerY + Math.sin(rad) * distance,
    };
  };
  
  // Generate background pentagon lines
  const backgroundLevels = [0.2, 0.4, 0.6, 0.8, 1.0];
  const backgroundPentagons = backgroundLevels.map((level) => {
    const points = positions.map(({ angle }) => {
      const point = calculatePoint(angle, radius * level);
      return `${point.x},${point.y}`;
    }).join(' ');
    return points;
  });
  
  // Generate data polygon based on attribute values
  const dataPoints = positions.map(({ key, angle }) => {
    const value = attributes[key];
    const distance = (value / 100) * radius;
    return calculatePoint(angle, distance);
  });
  
  const dataPolygon = dataPoints.map(p => `${p.x},${p.y}`).join(' ');
  
  return (
    <div className="relative w-full aspect-square max-w-sm mx-auto">
      <svg viewBox="0 0 300 300" className="w-full h-full">
        {/* Background pentagons */}
        {backgroundPentagons.map((points, idx) => (
          <polygon
            key={idx}
            points={points}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        ))}
        
        {/* Axis lines */}
        {positions.map(({ angle }, idx) => {
          const point = calculatePoint(angle, radius);
          return (
            <line
              key={idx}
              x1={centerX}
              y1={centerY}
              x2={point.x}
              y2={point.y}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          );
        })}
        
        {/* Data polygon */}
        <defs>
          <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <polygon
          points={dataPolygon}
          fill="url(#radarGradient)"
          stroke="#10b981"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        
        {/* Data points */}
        {dataPoints.map((point, idx) => (
          <circle
            key={idx}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#10b981"
          />
        ))}
      </svg>
      
      {/* Labels and values */}
      {positions.map(({ label, key, angle }) => {
        const value = attributes[key];
        const color = getColor(value);
        const labelDistance = radius + 35;
        const point = calculatePoint(angle, labelDistance);
        
        // Adjust text anchor based on position
        let textAnchor = 'middle';
        if (point.x < centerX - 10) textAnchor = 'end';
        if (point.x > centerX + 10) textAnchor = 'start';
        
        return (
          <div
            key={key}
            className="absolute flex items-center gap-2"
            style={{
              left: `${(point.x / 300) * 100}%`,
              top: `${(point.y / 300) * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* Position label on left or right based on location */}
            {point.x < centerX ? (
              <>
                <span className="text-sm text-gray-500">{label}</span>
                <span
                  className="px-2 py-1 rounded text-white text-sm min-w-[2.5rem] text-center"
                  style={{ backgroundColor: color }}
                >
                  {value}
                </span>
              </>
            ) : (
              <>
                <span
                  className="px-2 py-1 rounded text-white text-sm min-w-[2.5rem] text-center"
                  style={{ backgroundColor: color }}
                >
                  {value}
                </span>
                <span className="text-sm text-gray-500">{label}</span>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
