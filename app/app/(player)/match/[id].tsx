import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Card } from '@/components/ui';
import { mockMatchPlayerStats } from '@/data/mockData';
import { COLORS, TYPOGRAPHY, SPACING, LAYOUT } from '@/constants/theme';

/**
 * Match Player Stats Screen (Player View)
 * Shows player's individual performance in a specific match
 * PDF page 15
 */
export default function PlayerMatchDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // In a real app, fetch player match stats by match id
  const playerStats = mockMatchPlayerStats;

  if (!playerStats) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Header with Back Button */}
      <Card style={styles.headerCard}>
        <TouchableOpacity
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace('/(player)/matches');
            }
          }}
          style={styles.backButton}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      </Card>

      {/* Player Header */}
      <View style={styles.playerHeader}>
        <View style={styles.jerseyNumber}>
          <Text style={styles.jerseyNumberText}>{playerStats.jerseyNumber}</Text>
        </View>
        <View style={styles.playerInfo}>
          <Text style={styles.playerName}>{playerStats.playerName}</Text>
          <View style={styles.matchInfoContainer}>
            <Text style={styles.matchInfo}>
              vs {playerStats.opponent} • {playerStats.date}
            </Text>
            <View style={styles.matchScoreContainer}>
              <Text style={styles.matchScore}>
                {playerStats.homeScore} - {playerStats.awayScore}
              </Text>
              <View style={[
                styles.resultBadge,
                playerStats.homeScore > playerStats.awayScore ? styles.resultWin :
                playerStats.homeScore === playerStats.awayScore ? styles.resultDraw : styles.resultLoss
              ]}>
                <Text style={styles.resultText}>
                  {playerStats.homeScore > playerStats.awayScore ? 'WON' :
                   playerStats.homeScore === playerStats.awayScore ? 'DRAW' : 'LOST'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        decelerationRate={0.95}
        scrollEventThrottle={16}
        bounces={false}
        overScrollMode="never"
        alwaysBounceVertical={false}
      >
        {/* Attacking */}
        <Text style={styles.sectionTitle}>Attacking</Text>
          <Card style={styles.statsCard}>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Goals</Text>
              <Text style={styles.statValue}>{playerStats.stats.goals}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Assists</Text>
              <Text style={styles.statValue}>{playerStats.stats.assists}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Expected Goals (xG)</Text>
              <Text style={styles.statValue}>{playerStats.stats.xG}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Shots</Text>
              <Text style={styles.statValue}>{playerStats.stats.shots}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Shots on Target</Text>
              <Text style={styles.statValue}>{playerStats.stats.shotsOnTarget}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Total Dribbles</Text>
              <Text style={styles.statValue}>{playerStats.stats.totalDribbles}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Successful Dribbles</Text>
              <Text style={styles.statValue}>{playerStats.stats.dribblesSuccessful}</Text>
            </View>
          </Card>

          {/* Passing */}
          <Text style={styles.sectionTitle}>Passing</Text>
          <Card style={styles.statsCard}>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Total Passes</Text>
              <Text style={styles.statValue}>{playerStats.stats.totalPasses}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Passes Completed</Text>
              <Text style={styles.statValue}>{playerStats.stats.passesCompleted}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Short Passes</Text>
              <Text style={styles.statValue}>{playerStats.stats.shortPasses}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Long Passes</Text>
              <Text style={styles.statValue}>{playerStats.stats.longPasses}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Final Third Passes</Text>
              <Text style={styles.statValue}>{playerStats.stats.finalThirdPasses}</Text>
            </View>
          </Card>

          {/* Defending */}
          <Text style={styles.sectionTitle}>Defending</Text>
          <Card style={styles.statsCard}>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Tackles</Text>
              <Text style={styles.statValue}>{playerStats.stats.tackles}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Tackle Success %</Text>
              <Text style={styles.statValue}>{playerStats.stats.tackleSuccessRate}%</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Interceptions</Text>
              <Text style={styles.statValue}>{playerStats.stats.interceptions}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Interception Success %</Text>
              <Text style={styles.statValue}>{playerStats.stats.interceptionSuccessRate}%</Text>
            </View>
          </Card>

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
  headerCard: {
    marginHorizontal: LAYOUT.screenPaddingHorizontal,
    marginTop: SPACING.sm,
    marginBottom: SPACING.md,
    padding: SPACING.md,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.foreground,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  playerHeader: {
    paddingHorizontal: LAYOUT.screenPaddingHorizontal,
    paddingVertical: SPACING.xl,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  jerseyNumber: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.orange,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.lg,
  },
  jerseyNumberText: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.primaryForeground,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.foreground,
    marginBottom: SPACING.xs,
  },
  matchInfoContainer: {
    marginBottom: SPACING.sm,
  },
  matchInfo: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.mutedForeground,
    marginBottom: SPACING.xs,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  matchScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  matchScore: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.foreground,
  },
  resultBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs / 2,
    borderRadius: 12,
  },
  resultWin: {
    backgroundColor: COLORS.success,
  },
  resultDraw: {
    backgroundColor: COLORS.gray500,
  },
  resultLoss: {
    backgroundColor: COLORS.error,
  },
  resultText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.primaryForeground,
    letterSpacing: 0.5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: LAYOUT.screenPaddingHorizontal,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.sm,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.foreground,
    marginBottom: SPACING.md,
    marginTop: SPACING.xl,
  },
  statsCard: {
    marginBottom: SPACING.lg,
    padding: SPACING.md,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    minHeight: 50,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.foreground,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    flex: 1,
  },
  statValue: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.orange,
    minWidth: 60,
    textAlign: 'right',
  },
  successValue: {
    color: COLORS.success,
  },
  bottomPadding: {
    height: LAYOUT.bottomNavHeight + LAYOUT.bottomNavSafeArea,
  },
});
