import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MatchListItem } from '@/components/MatchListItem';
import { usePastMatches } from '@/hooks/useQuery';
import { COLORS, TYPOGRAPHY, SPACING, LAYOUT } from '@/constants/theme';

/**
 * Player Matches Screen
 * Shows match history in a single unified list (no tabs)
 * Matches PDF design on page 26
 */
export default function PlayerMatchesScreen() {
  const router = useRouter();

  const {
    data: matches,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = usePastMatches();

  const handleMatchPress = (matchId: string) => {
    router.push(`/(player)/match/${matchId}`);
  };

  if (isLoading && !isRefetching) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Match History</Text>
      </View>

      {/* Match List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            tintColor={COLORS.primary}
          />
        }
      >
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Failed to load matches</Text>
          </View>
        ) : matches && matches.length > 0 ? (
          matches.map((match) => (
            <MatchListItem
              key={match.id}
              match={match}
              onPress={() => handleMatchPress(match.id)}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No matches played yet</Text>
          </View>
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  header: {
    padding: LAYOUT.screenPaddingHorizontal,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.foreground,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: LAYOUT.screenPaddingHorizontal,
  },
  errorContainer: {
    paddingVertical: SPACING['2xl'],
    alignItems: 'center',
  },
  errorText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.error,
    textAlign: 'center',
  },
  emptyContainer: {
    paddingVertical: SPACING['2xl'],
    alignItems: 'center',
  },
  emptyText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.mutedForeground,
    textAlign: 'center',
  },
  bottomPadding: {
    height: LAYOUT.bottomNavHeight + LAYOUT.bottomNavSafeArea,
  },
});
