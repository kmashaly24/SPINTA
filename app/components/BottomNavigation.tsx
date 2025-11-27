import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import { COLORS, TYPOGRAPHY, SPACING, LAYOUT, SHADOWS, BORDER_RADIUS } from '@/constants/theme';

interface Tab {
  name: string;
  path: string;
  icon: string;
  label: string;
}

interface BottomNavigationProps {
  tabs: Tab[];
  role: 'coach' | 'player';
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ tabs, role }) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const getIconPath = (iconName: string): string => {
    // Icon SVG paths (Lucide icons)
    const icons: Record<string, string> = {
      // Coach icons
      users: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
      message: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
      user: 'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',

      // Player icons
      chart: 'M3 3v18h18M18.7 8l-5.1 5.2-2.8-2.7L7 14.3',
      calendar: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
      dumbbell: 'M14.4 14.4L9.6 9.6M22 12h-4M6 12H2M16.01 8v8M8.01 8v8M16.01 4L14.21 5.79M8.01 4L9.81 5.79M16.01 20l-1.8-1.79M8.01 20l1.8-1.79',

      // Shared
      club: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z',
    };

    return icons[iconName] || icons.user;
  };

  const renderIcon = (iconName: string, active: boolean) => {
    // Special case for club icon - use football emoji
    if (iconName === 'club') {
      const color = active
        ? role === 'coach'
          ? COLORS.orange
          : COLORS.gradientEnd
        : COLORS.gray400;
      return <Text style={{ fontSize: 22, color }}>⚽</Text>;
    }

    const iconPath = getIconPath(iconName);

    if (active && role === 'player') {
      // Gradient icon for player
      return (
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <Defs>
            <SvgLinearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor={COLORS.gradientStart} />
              <Stop offset="100%" stopColor={COLORS.gradientEnd} />
            </SvgLinearGradient>
          </Defs>
          <Path
            d={iconPath}
            stroke="url(#iconGradient)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
    } else {
      // Regular icon
      const color = active
        ? role === 'coach'
          ? COLORS.orange
          : COLORS.gradientEnd
        : COLORS.gray400;

      return (
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <Path
            d={iconPath}
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
    }
  };

  const renderLabel = (label: string, active: boolean) => {
    if (active && role === 'player') {
      // Gradient text for player (approximation using two colors)
      return (
        <Text
          style={[
            styles.tabLabel,
            { color: COLORS.gradientEnd }, // Fallback color
          ]}
        >
          {label}
        </Text>
      );
    } else {
      const color = active
        ? role === 'coach'
          ? COLORS.orange
          : COLORS.gradientEnd
        : COLORS.gray600;

      return <Text style={[styles.tabLabel, { color }]}>{label}</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {tabs.map((tab) => {
          const active = isActive(tab.path);

          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.tab}
              onPress={() => router.push(tab.path as any)}
              activeOpacity={0.7}
            >
              <View style={styles.tabContent}>
                {renderIcon(tab.icon, active)}
                {renderLabel(tab.label, active)}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: LAYOUT.screenPaddingHorizontal,
    right: LAYOUT.screenPaddingHorizontal,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
    paddingBottom: 0,
    ...SHADOWS.md,
  },
  content: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.xs,
    paddingTop: SPACING.sm,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xs,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },
  tabLabel: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    marginTop: SPACING.xs / 2,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
});
