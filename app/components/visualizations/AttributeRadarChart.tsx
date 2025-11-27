import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Svg, { Polygon, Line, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { COLORS, TYPOGRAPHY } from '@/constants/theme';

interface Attributes {
  attacking: number;
  technique: number;
  tactical: number;
  defending: number;
  creativity: number;
}

interface AttributeRadarChartProps {
  attributes: Attributes;
  size?: number;
  style?: ViewStyle;
}

export const AttributeRadarChart: React.FC<AttributeRadarChartProps> = ({
  attributes,
  size = 280,
  style,
}) => {
  // Pentagon points (5 vertices) - positioned around a circle
  const radius = 100;
  const centerX = 150;
  const centerY = 150;

  // Calculate positions for each attribute (starting from top, going clockwise)
  const angleOffset = -90; // Start from top
  const angleStep = 72; // 360/5 = 72 degrees between each point

  const positions = [
    { label: 'ATT', key: 'attacking' as const, angle: angleOffset },
    { label: 'TEC', key: 'technique' as const, angle: angleOffset + angleStep },
    { label: 'TAC', key: 'tactical' as const, angle: angleOffset + angleStep * 2 },
    { label: 'DEF', key: 'defending' as const, angle: angleOffset + angleStep * 3 },
    { label: 'CRE', key: 'creativity' as const, angle: angleOffset + angleStep * 4 },
  ];

  // Function to get color based on value
  const getColor = (value: number): string => {
    if (value >= 80) return COLORS.successLight; // green
    if (value >= 60) return '#eab308'; // yellow
    return COLORS.gray400; // gray
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

  // Calculate label positions (outside the pentagon)
  const labelDistance = radius + 35;

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <Svg width={size} height={size} viewBox="0 0 300 300">
        {/* Background pentagons */}
        {backgroundPentagons.map((points, idx) => (
          <Polygon
            key={`bg-${idx}`}
            points={points}
            fill="none"
            stroke={COLORS.gray200}
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {positions.map(({ angle }, idx) => {
          const point = calculatePoint(angle, radius);
          return (
            <Line
              key={`axis-${idx}`}
              x1={centerX}
              y1={centerY}
              x2={point.x}
              y2={point.y}
              stroke={COLORS.gray200}
              strokeWidth="1"
            />
          );
        })}

        {/* Data polygon */}
        <Defs>
          <LinearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={COLORS.successLight} stopOpacity="0.4" />
            <Stop offset="100%" stopColor={COLORS.success} stopOpacity="0.4" />
          </LinearGradient>
        </Defs>
        <Polygon
          points={dataPolygon}
          fill="url(#radarGradient)"
          stroke={COLORS.successLight}
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {dataPoints.map((point, idx) => (
          <Circle
            key={`point-${idx}`}
            cx={point.x}
            cy={point.y}
            r="4"
            fill={COLORS.successLight}
          />
        ))}
      </Svg>

      {/* Labels and values */}
      {positions.map(({ label, key, angle }) => {
        const value = attributes[key];
        const color = getColor(value);
        const point = calculatePoint(angle, labelDistance);

        // Convert from SVG coordinates to percentage for absolute positioning
        const leftPercent = (point.x / 300) * 100;
        const topPercent = (point.y / 300) * 100;

        // Determine if label should be on left or right of value
        const isLeft = point.x < centerX;

        return (
          <View
            key={key}
            style={[
              styles.labelContainer,
              {
                left: `${leftPercent}%`,
                top: `${topPercent}%`,
              },
            ]}
          >
            {isLeft ? (
              <>
                <Text style={styles.labelText}>{label}</Text>
                <View style={[styles.valueBadge, { backgroundColor: color }]}>
                  <Text style={styles.valueText}>{value}</Text>
                </View>
              </>
            ) : (
              <>
                <View style={[styles.valueBadge, { backgroundColor: color }]}>
                  <Text style={styles.valueText}>{value}</Text>
                </View>
                <Text style={styles.labelText}>{label}</Text>
              </>
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  labelContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    transform: [{ translateX: -30 }, { translateY: -12 }], // Center the label
  },
  labelText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.mutedForeground,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  valueBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.primaryForeground,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
  },
});
