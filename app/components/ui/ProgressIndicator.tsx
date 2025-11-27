import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '@/constants/theme';

interface Step {
  number: number;
  label: string;
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
  style?: ViewStyle;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  currentStep,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.stepsContainer}>
        {steps.map((step, index) => {
          const isCompleted = step.number < currentStep;
          const isActive = step.number === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={step.number}>
              <View style={styles.stepWrapper}>
                {/* Circle with number or checkmark */}
                <View
                  style={[
                    styles.circle,
                    isCompleted && styles.circleCompleted,
                    isActive && styles.circleActive,
                  ]}
                >
                  {isCompleted ? (
                    <Text style={styles.checkmark}>✓</Text>
                  ) : (
                    <Text
                      style={[
                        styles.number,
                        isActive && styles.numberActive,
                      ]}
                    >
                      {step.number}
                    </Text>
                  )}
                </View>
                {/* Label */}
                <Text
                  style={[
                    styles.label,
                    isCompleted && styles.labelCompleted,
                    isActive && styles.labelActive,
                  ]}
                >
                  {step.label}
                </Text>
              </View>

              {/* Connector line */}
              {!isLast && (
                <View
                  style={[
                    styles.connector,
                    isCompleted && styles.connectorCompleted,
                  ]}
                />
              )}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.lg,
  },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepWrapper: {
    alignItems: 'center',
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.gray200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xs,
  },
  circleCompleted: {
    backgroundColor: COLORS.success,
  },
  circleActive: {
    backgroundColor: COLORS.orange,
  },
  number: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.gray500,
  },
  numberActive: {
    color: COLORS.primaryForeground,
  },
  checkmark: {
    fontSize: 18,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.primaryForeground,
  },
  label: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.gray500,
    textAlign: 'center',
    maxWidth: 80,
  },
  labelActive: {
    color: COLORS.foreground,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
  },
  labelCompleted: {
    color: COLORS.success,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
  },
  connector: {
    width: 40,
    height: 2,
    backgroundColor: COLORS.gray200,
    marginBottom: 20, // Align with circles
  },
  connectorCompleted: {
    backgroundColor: COLORS.success,
  },
});
