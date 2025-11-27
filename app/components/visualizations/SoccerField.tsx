import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, {
  Rect,
  Line,
  Circle,
  Path,
  G,
  Defs,
  Marker,
} from 'react-native-svg';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/constants/theme';

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
  const fieldWidth = 300;
  const fieldHeight = 200;

  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <Svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${fieldWidth} ${fieldHeight}`}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Field base */}
          <Rect x="0" y="0" width={fieldWidth} height={fieldHeight} fill={COLORS.fieldGreen} />

          {/* Outer lines */}
          <Rect
            x="2"
            y="2"
            width={fieldWidth - 4}
            height={fieldHeight - 4}
            fill="none"
            stroke="white"
            strokeWidth="1.5"
          />

          {/* Center line */}
          <Line
            x1={fieldWidth / 2}
            y1="2"
            x2={fieldWidth / 2}
            y2={fieldHeight - 2}
            stroke="white"
            strokeWidth="1.5"
          />

          {/* Center circle */}
          <Circle
            cx={fieldWidth / 2}
            cy={fieldHeight / 2}
            r="20"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
          />
          <Circle cx={fieldWidth / 2} cy={fieldHeight / 2} r="2" fill="white" />

          {/* Left penalty area */}
          <Rect
            x="2"
            y="50"
            width="40"
            height="100"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
          />

          {/* Left goal area */}
          <Rect
            x="2"
            y="75"
            width="15"
            height="50"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
          />

          {/* Left penalty arc */}
          <Path
            d="M 42 80 A 20 20 0 0 1 42 120"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
          />

          {/* Left penalty spot */}
          <Circle cx="30" cy="100" r="1.5" fill="white" />

          {/* Right penalty area */}
          <Rect
            x={fieldWidth - 42}
            y="50"
            width="40"
            height="100"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
          />

          {/* Right goal area */}
          <Rect
            x={fieldWidth - 17}
            y="75"
            width="15"
            height="50"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
          />

          {/* Right penalty arc */}
          <Path
            d={`M ${fieldWidth - 42} 80 A 20 20 0 0 0 ${fieldWidth - 42} 120`}
            fill="none"
            stroke="white"
            strokeWidth="1.5"
          />

          {/* Right penalty spot */}
          <Circle cx={fieldWidth - 30} cy="100" r="1.5" fill="white" />

          {/* Goals */}
          <Rect x="0" y="85" width="2" height="30" fill="white" opacity="0.5" />
          <Rect x={fieldWidth - 2} y="85" width="2" height="30" fill="white" opacity="0.5" />

          {/* Render based on type */}
          {type === 'heatmap' && heatmapData.map((point, idx) => {
            const x = (point.x / 100) * fieldWidth;
            const y = (point.y / 100) * fieldHeight;
            const radius = 15;
            const opacity = point.intensity * 0.6;

            return (
              <Circle
                key={idx}
                cx={x}
                cy={y}
                r={radius}
                fill={COLORS.heatmapRed}
                opacity={opacity}
              />
            );
          })}

          {type === 'passmap' && (
            <>
              <Defs>
                <Marker
                  id="arrow-success"
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <Path d="M 0 0 L 10 5 L 0 10 z" fill={COLORS.passSuccess} />
                </Marker>
                <Marker
                  id="arrow-fail"
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <Path d="M 0 0 L 10 5 L 0 10 z" fill={COLORS.passFail} />
                </Marker>
              </Defs>
              {passData.map((pass, idx) => (
                <G key={idx}>
                  <Line
                    x1={(pass.from.x / 100) * fieldWidth}
                    y1={(pass.from.y / 100) * fieldHeight}
                    x2={(pass.to.x / 100) * fieldWidth}
                    y2={(pass.to.y / 100) * fieldHeight}
                    stroke={pass.successful ? COLORS.passSuccess : COLORS.passFail}
                    strokeWidth="2"
                    opacity="0.6"
                    markerEnd={`url(#arrow-${pass.successful ? 'success' : 'fail'})`}
                  />
                </G>
              ))}
            </>
          )}

          {type === 'shotmap' && shotData.map((shot, idx) => {
            const x = (shot.x / 100) * fieldWidth;
            const y = (shot.y / 100) * fieldHeight;

            let color = COLORS.passFail; // off-target
            if (shot.outcome === 'goal') {
              color = COLORS.success;
            } else if (shot.outcome === 'on-target') {
              color = COLORS.passSuccess;
            } else if (shot.outcome === 'blocked') {
              color = COLORS.gray500;
            }

            return (
              <Circle
                key={idx}
                cx={x}
                cy={y}
                r="5"
                fill={color}
                stroke="white"
                strokeWidth="1.5"
                opacity="0.9"
              />
            );
          })}
        </Svg>

        {/* Legend */}
        <View style={styles.legend}>
          {type === 'heatmap' && (
            <View style={styles.legendContent}>
              <Text style={styles.legendTitle}>Player Activity</Text>
              <View style={styles.legendRow}>
                <View style={[styles.legendDot, styles.legendDotLow]} />
                <Text style={styles.legendText}>Low</Text>
                <View style={[styles.legendDot, styles.legendDotHigh]} />
                <Text style={styles.legendText}>High</Text>
              </View>
            </View>
          )}
          {type === 'passmap' && (
            <View style={styles.legendContent}>
              <Text style={styles.legendTitle}>Passes</Text>
              <View style={styles.legendItem}>
                <View style={[styles.legendLine, { backgroundColor: COLORS.passSuccess }]} />
                <Text style={styles.legendText}>Complete</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendLine, { backgroundColor: COLORS.passFail }]} />
                <Text style={styles.legendText}>Incomplete</Text>
              </View>
            </View>
          )}
          {type === 'shotmap' && (
            <View style={styles.legendContent}>
              <Text style={styles.legendTitle}>Shots</Text>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: COLORS.success }]} />
                <Text style={styles.legendText}>Goal</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: COLORS.passSuccess }]} />
                <Text style={styles.legendText}>On Target</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: COLORS.passFail }]} />
                <Text style={styles.legendText}>Off Target</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: COLORS.gray500 }]} />
                <Text style={styles.legendText}>Blocked</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 3 / 2,
  },
  fieldContainer: {
    flex: 1,
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    backgroundColor: COLORS.fieldGreen,
    position: 'relative',
  },
  legend: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  legendContent: {
    gap: 4,
  },
  legendTitle: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.foreground,
    marginBottom: 4,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 2,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendDotLow: {
    backgroundColor: COLORS.heatmapRed,
    opacity: 0.3,
  },
  legendDotHigh: {
    backgroundColor: COLORS.heatmapRed,
    opacity: 0.6,
  },
  legendLine: {
    width: 12,
    height: 2,
  },
  legendText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.gray600,
  },
});
