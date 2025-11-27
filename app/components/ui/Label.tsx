import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '@/constants/theme';

interface LabelProps extends TextProps {
  children: React.ReactNode;
  required?: boolean;
}

export const Label: React.FC<LabelProps> = ({
  children,
  required,
  style,
  ...props
}) => {
  return (
    <Text style={[styles.label, style]} {...props}>
      {children}
      {required && <Text style={styles.required}> *</Text>}
    </Text>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.foreground,
    marginBottom: SPACING.xs,
  },
  required: {
    color: COLORS.error,
  },
});
