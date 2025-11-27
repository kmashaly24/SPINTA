import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { COLORS, BORDER_RADIUS, SHADOWS, SPACING } from '@/constants/theme';

type CardVariant = 'default' | 'outlined' | 'elevated' | 'featured';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';

interface CardProps extends TouchableOpacityProps {
  variant?: CardVariant;
  padding?: CardPadding;
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  children,
  style,
  onPress,
  ...props
}) => {
  const cardStyles = [
    styles.base,
    styles[`variant_${variant}`],
    padding !== 'none' && styles[`padding_${padding}`],
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyles}
        onPress={onPress}
        activeOpacity={0.7}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyles}>{children}</View>;
};

// Card Header
interface CardHeaderProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, style }) => (
  <View style={[styles.header, style]}>{children}</View>
);

// Card Content
interface CardContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const CardContent: React.FC<CardContentProps> = ({ children, style }) => (
  <View style={[styles.content, style]}>{children}</View>
);

// Card Footer
interface CardFooterProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, style }) => (
  <View style={[styles.footer, style]}>{children}</View>
);

const styles = StyleSheet.create({
  base: {
    borderRadius: BORDER_RADIUS.xl,
    backgroundColor: COLORS.background,
    overflow: 'hidden',
  },

  // Variants
  variant_default: {
    ...SHADOWS.md,
  },
  variant_outlined: {
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  variant_elevated: {
    ...SHADOWS.lg,
  },
  variant_featured: {
    ...SHADOWS.xl,
  },

  // Padding
  padding_sm: {
    padding: SPACING.md,
  },
  padding_md: {
    padding: SPACING.lg,
  },
  padding_lg: {
    padding: SPACING.xl,
  },

  // Header
  header: {
    marginBottom: SPACING.md,
  },

  // Content
  content: {
    // No default styles, allows full flexibility
  },

  // Footer
  footer: {
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
});
