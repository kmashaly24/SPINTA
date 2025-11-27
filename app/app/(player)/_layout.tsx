import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { BottomNavigation } from '@/components/BottomNavigation';
import { useAuthStore } from '@/store/authStore';
import { COLORS } from '@/constants/theme';

/**
 * Player Layout
 * Handles navigation for player role with bottom tabs
 */
export default function PlayerLayout() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  // Redirect if not authenticated or not a player
  React.useEffect(() => {
    if (!isAuthenticated || user?.role !== 'player') {
      router.replace('/(auth)/login');
    }
  }, [isAuthenticated, user]);

  const tabs = [
    {
      name: 'stats',
      path: '/(player)/stats',
      icon: 'chart',
      label: 'Stats',
    },
    {
      name: 'matches',
      path: '/(player)/matches',
      icon: 'calendar',
      label: 'Matches',
    },
    {
      name: 'training',
      path: '/(player)/training',
      icon: 'dumbbell',
      label: 'Training',
    },
    {
      name: 'profile',
      path: '/(player)/profile',
      icon: 'user',
      label: 'Profile',
    },
  ];

  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.background },
        }}
      >
        <Stack.Screen name="stats" />
        <Stack.Screen name="matches" />
        <Stack.Screen name="training" />
        <Stack.Screen name="profile" />
      </Stack>

      <BottomNavigation tabs={tabs} role="player" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
