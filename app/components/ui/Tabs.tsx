import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ScrollView,
} from 'react-native';
import { COLORS, TYPOGRAPHY, BORDER_RADIUS, SPACING, LAYOUT } from '@/constants/theme';

interface Tab {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  value: string;
  onValueChange: (value: string) => void;
  containerStyle?: ViewStyle;
  tabStyle?: ViewStyle;
  activeTabStyle?: ViewStyle;
  textStyle?: TextStyle;
  activeTextStyle?: TextStyle;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  value,
  onValueChange,
  containerStyle,
  tabStyle,
  activeTabStyle,
  textStyle,
  activeTextStyle,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.container, containerStyle]}
      style={styles.scrollView}
    >
      {tabs.map((tab) => {
        const isActive = value === tab.value;
        return (
          <TouchableOpacity
            key={tab.value}
            style={[
              styles.tab,
              tabStyle,
              isActive && styles.activeTab,
              isActive && activeTabStyle,
            ]}
            onPress={() => onValueChange(tab.value)}
            activeOpacity={0.7}
          >
            {tab.icon && <View style={styles.icon}>{tab.icon}</View>}
            <Text
              style={[
                styles.text,
                textStyle,
                isActive && styles.activeText,
                isActive && activeTextStyle,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

// Tab Content
interface TabContentProps {
  value: string;
  children: React.ReactNode;
  activeValue: string;
}

export const TabContent: React.FC<TabContentProps> = ({
  value,
  children,
  activeValue,
}) => {
  if (value !== activeValue) return null;
  return <View style={styles.content}>{children}</View>;
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    borderRadius: BORDER_RADIUS.full,
    overflow: 'hidden',
  },
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    gap: SPACING.xs,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.gray100,
    borderRadius: BORDER_RADIUS.full,
    padding: 3,
    alignSelf: 'stretch',
    marginHorizontal: 0,
    marginVertical: 0,
    paddingVertical: 3,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: 'transparent',
    minHeight: 24,
  },
  activeTab: {
    backgroundColor: COLORS.background,
  },
  icon: {
    marginRight: SPACING.xs,
  },
  text: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.foreground,
  },
  activeText: {
    color: COLORS.foreground,
  },
  content: {
    flex: 1,
  },
});
