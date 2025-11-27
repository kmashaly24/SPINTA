import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '@/components/ui';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/constants/theme';

interface DataCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  gradient?: boolean;
  variant?: 'default' | 'success' | 'error' | 'warning';
  style?: ViewStyle;
}

export const DataCard: React.FC<DataCardProps> = ({
  label,
  value,
  subtitle,
  gradient = false,
  variant = 'default',
  style,
}) => {
  const getVariantColor = () => {
    switch (variant) {
      case 'success':
        return COLORS.success;
      case 'error':
        return COLORS.error;
      case 'warning':
        return COLORS.warning;
      default:
        return COLORS.foreground;
    }
  };

  const renderValue = () => {
    if (gradient) {
      return (
        <LinearGradient
          colors={[COLORS.gradientStart, COLORS.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientValue}
        >
          <Text style={[styles.value, styles.gradientText]}>{value}</Text>
        </LinearGradient>
      );
    }

    return (
      <Text style={[styles.value, { color: getVariantColor() }]}>{value}</Text>
    );
  };

  return (
    <Card
      style={[styles.card, style]}
      padding="md"
      variant={gradient ? 'featured' : 'default'}
    >
      <Text style={styles.label} numberOfLines={1}>{label}</Text>
      {renderValue()}
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  label: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.mutedForeground,
    marginBottom: SPACING.xs,
    textAlign: 'center',
    width: '100%',
    paddingHorizontal: SPACING.xs,
  },
  value: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    marginBottom: SPACING.xs / 2,
  },
  gradientValue: {
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.sm,
  },
  gradientText: {
    color: COLORS.primaryForeground,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.mutedForeground,
    textAlign: 'center',
  },
});
