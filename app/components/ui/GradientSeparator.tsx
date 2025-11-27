import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING } from '@/constants/theme';

interface GradientSeparatorProps {
  marginVertical?: number;
}

export const GradientSeparator: React.FC<GradientSeparatorProps> = ({
  marginVertical = SPACING.sm,
}) => {
  return (
    <LinearGradient
      colors={['transparent', COLORS.border, 'transparent']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ height: 1, marginVertical }}
    />
  );
};
