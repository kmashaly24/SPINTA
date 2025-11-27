import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/constants/theme';

interface GradientSectionHeaderProps {
  title: string;
  subtitle?: string;
  gradientColors?: string[];
  gradientOpacity?: number;
  style?: ViewStyle;
}

export const GradientSectionHeader: React.FC<GradientSectionHeaderProps> = ({
  title,
  subtitle,
  gradientColors = [COLORS.gradientStart, COLORS.orange],
  gradientOpacity = 0.08,
  style,
}) => {
  // Add opacity to gradient colors (8% = 0x14 in hex)
  const colors = gradientColors.map((color) => {
    const opacity = Math.floor(gradientOpacity * 255)
      .toString(16)
      .padStart(2, '0');
    return color + opacity;
  });

  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.md,
  },
  gradient: {
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.foreground,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.mutedForeground,
    marginTop: SPACING.xs / 2,
  },
});
