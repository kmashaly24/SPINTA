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
import { PlayerListItem } from '@/components/PlayerListItem';
import { Card } from '@/components/ui';
import { usePlayers } from '@/hooks/useQuery';
import { COLORS, TYPOGRAPHY, SPACING, LAYOUT, BORDER_RADIUS } from '@/constants/theme';

/**
 * Coach Players Screen
 * Shows list of all players (both linked and unlinked)
 */
export default function CoachPlayersScreen() {
  const router = useRouter();
  const { data: players, isLoading, error, refetch, isRefetching } = usePlayers();

  const handlePlayerPress = (playerId: string) => {
    router.push(`/(coach)/player/${playerId}`);
  };

  if (isLoading && !isRefetching) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load players</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
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
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Team Players</Text>
        </View>

        {/* Stats Card */}
        <Card style={styles.statsCard}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{players?.length || 0}</Text>
              <Text style={styles.statLabel}>Total Players</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: COLORS.success }]}>{players?.filter(p => p.isLinked).length || 0}</Text>
              <Text style={styles.statLabel}>Linked</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: COLORS.warning }]}>{players?.filter(p => !p.isLinked).length || 0}</Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>
          </View>
        </Card>

        {/* Player List */}
        <View style={styles.playerList}>
          {players && players.length > 0 ? (
            players.map((player) => (
              <PlayerListItem
                key={player.id}
                player={player}
                onPress={() => handlePlayerPress(player.id)}
              />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No players added yet</Text>
              <Text style={styles.emptySubtext}>
                Add players to your team and share their unique invite codes
              </Text>
            </View>
          )}
        </View>

        {/* Bottom padding for navigation */}
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: LAYOUT.screenPaddingHorizontal,
  },
  errorText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.error,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: LAYOUT.screenPaddingHorizontal,
    paddingTop: SPACING.xl,
  },
  header: {
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.foreground,
  },
  statsCard: {
    marginBottom: SPACING.lg,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  statValue: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.foreground,
    marginBottom: SPACING.xs / 2,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.mutedForeground,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.gray200,
  },
  playerList: {
    marginBottom: SPACING.lg,
  },
  emptyContainer: {
    paddingVertical: SPACING['2xl'],
    alignItems: 'center',
  },
  emptyText: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.foreground,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.mutedForeground,
    textAlign: 'center',
    paddingHorizontal: SPACING.xl,
  },
  bottomPadding: {
    height: LAYOUT.bottomNavHeight + LAYOUT.bottomNavSafeArea,
  },
});
