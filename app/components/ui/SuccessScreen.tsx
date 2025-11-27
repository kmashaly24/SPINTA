import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, LAYOUT } from '@/constants/theme';
import { Button } from './Button';

interface SuccessScreenProps {
  title?: string;
  subtitle?: string;
  onContinue: () => void;
  containerStyle?: ViewStyle;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({
  title = 'Welcome!',
  subtitle = 'Your registration has been completed successfully.',
  onContinue,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Text style={styles.checkmark}>✓</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      {/* Continue Button */}
      <View style={styles.buttonContainer}>
        <Button onPress={onContinue} style={styles.button}>
          Continue
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: LAYOUT.screenPaddingHorizontal,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: SPACING['3xl'],
  },
  iconContainer: {
    marginBottom: SPACING['2xl'],
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.successLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    fontSize: 64,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.primaryForeground,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.foreground,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.mutedForeground,
    textAlign: 'center',
    lineHeight: TYPOGRAPHY.lineHeight.relaxed * TYPOGRAPHY.fontSize.base,
    paddingHorizontal: SPACING.lg,
  },
  buttonContainer: {
    paddingBottom: SPACING['2xl'],
  },
  button: {
    width: '100%',
  },
});
