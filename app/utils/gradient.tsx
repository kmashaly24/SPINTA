import React from 'react';
import { Text, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Defs, LinearGradient as SvgLinearGradient, Stop, Text as SvgText } from 'react-native-svg';
import { COLORS } from '@/constants/theme';

/**
 * Gradient Text Component
 * Uses SVG to render text with gradient fill
 * Note: React Native doesn't support gradient text natively
 */
interface GradientTextProps {
  children: string;
  colors?: string[];
  style?: TextStyle;
  fontSize?: number;
  fontWeight?: string;
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  colors = [COLORS.gradientStart, COLORS.gradientEnd],
  style,
  fontSize = 16,
  fontWeight = '500',
}) => {
  // Calculate text width (approximate)
  const textLength = children.length * fontSize * 0.6;

  return (
    <Svg height={fontSize * 1.5} width={textLength}>
      <Defs>
        <SvgLinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor={colors[0]} stopOpacity="1" />
          <Stop offset="100%" stopColor={colors[1]} stopOpacity="1" />
        </SvgLinearGradient>
      </Defs>
      <SvgText
        fill="url(#grad)"
        fontSize={fontSize}
        fontWeight={fontWeight}
        x="0"
        y={fontSize}
      >
        {children}
      </SvgText>
    </Svg>
  );
};

/**
 * Gradient Background View
 * Creates a linear gradient background
 */
interface GradientViewProps {
  colors?: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  children: React.ReactNode;
  style?: any;
}

export const GradientView: React.FC<GradientViewProps> = ({
  colors = [COLORS.gradientStart, COLORS.gradientEnd],
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
  children,
  style,
}) => {
  return (
    <LinearGradient colors={colors} start={start} end={end} style={style}>
      {children}
    </LinearGradient>
  );
};

/**
 * Get gradient color at a specific position (0-1)
 * Useful for calculating intermediate colors
 */
export const getGradientColor = (
  position: number,
  startColor: string = COLORS.gradientStart,
  endColor: string = COLORS.gradientEnd
): string => {
  // Simple linear interpolation between two colors
  // This is a basic implementation, you might want to use a color library for more accuracy

  const start = hexToRgb(startColor);
  const end = hexToRgb(endColor);

  if (!start || !end) return startColor;

  const r = Math.round(start.r + (end.r - start.r) * position);
  const g = Math.round(start.g + (end.g - start.g) * position);
  const b = Math.round(start.b + (end.b - start.b) * position);

  return rgbToHex(r, g, b);
};

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Convert RGB to hex
 */
function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

/**
 * Gradient presets matching website
 */
export const GRADIENT_PRESETS = {
  primary: [COLORS.gradientStart, COLORS.gradientEnd],
  success: [COLORS.successLight, COLORS.success],
  error: [COLORS.errorLight, COLORS.error],
  orange: ['#fb923c', COLORS.orange],
  accent: ['#fef3c7', '#fcd34d'],
};
