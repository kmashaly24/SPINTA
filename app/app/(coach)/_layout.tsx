import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { BottomNavigation } from '@/components/BottomNavigation';
import { useAuthStore } from '@/store/authStore';
import { COLORS, LAYOUT } from '@/constants/theme';

/**
 * Coach Layout
 * Handles navigation for coach role with bottom tabs
 */
export default function CoachLayout() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  // Redirect if not authenticated or not a coach
  React.useEffect(() => {
    if (!isAuthenticated || user?.role !== 'coach') {
      router.replace('/(auth)/login');
    }
  }, [isAuthenticated, user]);

  const tabs = [
    {
      name: 'club',
      path: '/(coach)/club',
      icon: 'club',
      label: 'Club',
    },
    {
      name: 'players',
      path: '/(coach)/players',
      icon: 'users',
      label: 'Players',
    },
    {
      name: 'chatbot',
      path: '/(coach)/chatbot',
      icon: 'message',
      label: 'Chatbot',
    },
    {
      name: 'profile',
      path: '/(coach)/profile',
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
        <Stack.Screen name="club" />
        <Stack.Screen name="players" />
        <Stack.Screen name="chatbot" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="player/[playerId]" />
        <Stack.Screen name="training/create" />
        <Stack.Screen name="training/[trainingId]" />
        <Stack.Screen name="match/[id]" />
        <Stack.Screen name="match/player/[playerId]" />
      </Stack>

      <BottomNavigation tabs={tabs} role="coach" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
