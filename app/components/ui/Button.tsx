import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, TYPOGRAPHY, BORDER_RADIUS, LAYOUT, SHADOWS } from '@/constants/theme';

type ButtonVariant = 'default' | 'primary' | 'outline' | 'ghost' | 'gradient';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'md',
  loading = false,
  disabled,
  children,
  style,
  textStyle,
  ...props
}) => {
  const buttonStyles = [
    styles.base,
    styles[`size_${size}`],
    variant !== 'gradient' && styles[`variant_${variant}`],
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`textSize_${size}`],
    variant !== 'gradient' && styles[`textVariant_${variant}`],
    disabled && styles.textDisabled,
    textStyle,
  ];

  const content = (
    <>
      {loading && (
        <ActivityIndicator
          testID="button-loading-indicator"
          size="small"
          color={variant === 'outline' || variant === 'ghost' ? COLORS.primary : COLORS.primaryForeground}
          style={styles.loader}
        />
      )}
      <Text style={textStyles}>{children}</Text>
    </>
  );

  if (variant === 'gradient') {
    return (
      <TouchableOpacity
        {...props}
        disabled={disabled || loading}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[COLORS.gradientStart, COLORS.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.base, styles[`size_${size}`], styles.gradient, disabled && styles.disabled, style]}
        >
          {loading && (
            <ActivityIndicator
              testID="button-loading-indicator"
              size="small"
              color={COLORS.primaryForeground}
              style={styles.loader}
            />
          )}
          <Text style={[textStyles, styles.textGradient]}>{children}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      {...props}
      style={buttonStyles}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: 16,
  },

  // Sizes
  size_sm: {
    height: LAYOUT.buttonSm,
    paddingHorizontal: 12,
  },
  size_md: {
    height: LAYOUT.buttonMd,
    paddingHorizontal: 16,
  },
  size_lg: {
    height: LAYOUT.buttonLg,
    paddingHorizontal: 24,
  },

  // Variants
  variant_default: {
    backgroundColor: COLORS.primary,
    ...SHADOWS.sm,
  },
  variant_primary: {
    backgroundColor: COLORS.primary,
    ...SHADOWS.sm,
  },
  variant_outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  variant_ghost: {
    backgroundColor: 'transparent',
  },
  gradient: {
    ...SHADOWS.sm,
  },

  disabled: {
    opacity: 0.5,
  },

  // Text styles
  text: {
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    textAlign: 'center',
  },
  textSize_sm: {
    fontSize: TYPOGRAPHY.fontSize.sm,
  },
  textSize_md: {
    fontSize: TYPOGRAPHY.fontSize.base,
  },
  textSize_lg: {
    fontSize: TYPOGRAPHY.fontSize.lg,
  },

  textVariant_default: {
    color: COLORS.primaryForeground,
  },
  textVariant_primary: {
    color: COLORS.primaryForeground,
  },
  textVariant_outline: {
    color: COLORS.foreground,
  },
  textVariant_ghost: {
    color: COLORS.foreground,
  },
  textGradient: {
    color: COLORS.primaryForeground,
  },

  textDisabled: {
    opacity: 0.5,
  },

  loader: {
    marginRight: 8,
  },
});
