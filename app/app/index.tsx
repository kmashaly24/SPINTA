import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { COLORS } from '@/constants/theme';

/**
 * Index / Entry Screen
 * Redirects users based on authentication state and role
 */
export default function IndexScreen() {
  const { isAuthenticated, isLoading, user } = useAuthStore();

  // Show loading indicator while checking auth
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  // Redirect based on auth state
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  // Redirect based on user role
  if (user?.role === 'coach') {
    return <Redirect href="/(coach)/club" />;
  }

  if (user?.role === 'player') {
    return <Redirect href="/(player)/stats" />;
  }

  // Default fallback to login
  return <Redirect href="/(auth)/login" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
});
