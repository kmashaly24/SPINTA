import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, TYPOGRAPHY, SPACING } from '@/constants/theme';

interface ComparisonStatBarProps {
  label: string;
  homeValue: number;
  awayValue: number;
  isPercentage?: boolean;
  homeColor?: string;
  awayColor?: string;
}

export const ComparisonStatBar: React.FC<ComparisonStatBarProps> = ({
  label,
  homeValue,
  awayValue,
  isPercentage = false,
  homeColor = COLORS.gradientStart, // yellow
  awayColor = COLORS.orange, // orange
}) => {
  // Determine which team has higher value
  const isHomeHigher = homeValue >= awayValue;
  const maxValue = Math.max(homeValue, awayValue);

  // Calculate percentages within the 50% allocated to each team
  // Each team's colored bar fills a portion of their 50% based on their value relative to max
  const homePercentageOfHalf = maxValue > 0 ? (homeValue / maxValue) * 100 : 0;
  const awayPercentageOfHalf = maxValue > 0 ? (awayValue / maxValue) * 100 : 0;

  // Gold color for lower value team
  const GOLD_COLOR = '#FFD700';
  const SILVER_COLOR = '#C0C0C0';
  const GRAY_COLOR = '#808080';

  // Gradient configurations
  const HIGHER_VALUE_GRADIENT = [COLORS.gradientStart, COLORS.orange]; // Yellow → Orange for highest value
  const LOWER_VALUE_GRADIENT = [SILVER_COLOR, GRAY_COLOR]; // Silver → Gray

  // Determine which side gets which gradient
  // Left (home) always shows homeValue, right (away) always shows awayValue
  const homeGradient = isHomeHigher ? HIGHER_VALUE_GRADIENT : LOWER_VALUE_GRADIENT;
  const awayGradient = isHomeHigher ? LOWER_VALUE_GRADIENT : HIGHER_VALUE_GRADIENT;

  const formatValue = (value: number): string => {
    if (isPercentage) {
      return `${value.toFixed(1)}%`;
    }
    return value.toString();
  };

  return (
    <View style={styles.container}>
      {/* Label */}
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>

      {/* Bar Chart */}
      <View style={styles.barRow}>
        {/* Home Value (always on left) */}
        <View style={styles.valueContainer}>
          <Text style={styles.valueText}>{formatValue(homeValue)}</Text>
        </View>

        {/* Bar - Split into two 50% halves */}
        <View style={styles.barContainer}>
          {/* Left Half (Home Team) - Gray on edge, color towards center */}
          <View style={styles.barHalf}>
            <View style={styles.grayFill} />
            <LinearGradient
              colors={homeGradient}
              start={{ x: 0, y: 0 }}  // Left edge (towards center)
              end={{ x: 1, y: 0 }}    // Right edge (center)
              style={[
                styles.coloredBar,
                {
                  width: `${homePercentageOfHalf}%`,
                },
              ]}
            />
          </View>

          {/* Right Half (Away Team) - Color towards center, gray on edge */}
          <View style={styles.barHalf}>
            <LinearGradient
              colors={awayGradient}
              start={{ x: 1, y: 0 }}  // Right edge (towards center)
              end={{ x: 0, y: 0 }}    // Left edge (center)
              style={[
                styles.coloredBar,
                {
                  width: `${awayPercentageOfHalf}%`,
                },
              ]}
            />
            <View style={styles.grayFill} />
          </View>
        </View>

        {/* Away Value (always on right) */}
        <View style={[styles.valueContainer, styles.valueContainerRight]}>
          <Text style={styles.valueText}>{formatValue(awayValue)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.sm,
  },
  labelContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  label: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.foreground,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  valueContainer: {
    width: 35,
    alignItems: 'flex-end',
  },
  valueContainerRight: {
    alignItems: 'flex-start',
  },
  valueText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.foreground,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
  },
  barContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: COLORS.gray200,
  },
  barHalf: {
    width: '50%',
    flexDirection: 'row',
    height: '100%',
  },
  coloredBar: {
    height: '100%',
  },
  grayFill: {
    flex: 1,
    backgroundColor: COLORS.gray200,
  },
});
