import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryProvider } from '@/providers/QueryProvider';
import { useAuthStore } from '@/store/authStore';
import { COLORS } from '@/constants/theme';
import { ErrorBoundary } from '@/components/ErrorBoundary';

/**
 * Root Layout
 * Sets up providers and loads authentication state
 */
export default function RootLayout() {
  const { loadStoredAuth } = useAuthStore();

  useEffect(() => {
    // Load stored authentication on app startup
    loadStoredAuth();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ErrorBoundary>
        <QueryProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: COLORS.background },
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)/login" />
            <Stack.Screen name="(auth)/register" />
            <Stack.Screen name="(coach)" />
            <Stack.Screen name="(player)" />
          </Stack>
        </QueryProvider>
      </ErrorBoundary>
    </GestureHandlerRootView>
  );
}
