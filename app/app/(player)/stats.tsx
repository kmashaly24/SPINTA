import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { DataCard } from '@/components/DataCard';
import { Card } from '@/components/ui';
import { AttributeRadarChart } from '@/components/visualizations/AttributeRadarChart';
import { mockPlayerData } from '@/data/mockData';
import { COLORS, TYPOGRAPHY, SPACING, LAYOUT } from '@/constants/theme';

/**
 * Player Stats Screen
 * Shows player's personal statistics and performance metrics
 */
export default function PlayerStatsScreen() {
  const player = mockPlayerData;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
      >
        {/* Header with Player Info */}
        <Card style={styles.headerCard}>
          <View style={styles.playerHeader}>
            {player.image ? (
              <Image source={{ uri: player.image }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <Text style={styles.avatarText}>{player.name?.charAt(0)}</Text>
              </View>
            )}
            <View style={styles.playerInfo}>
              <Text style={styles.playerName}>{player.name}</Text>
              <Text style={styles.playerAge}>23 years old</Text>
              <Text style={styles.playerDetails}>
                #{player.jerseyNumber} • {player.height} • {player.weight}
              </Text>
              <Text style={styles.matchesPlayed}>
                {player.matchesPlayed} matches played
              </Text>
            </View>
          </View>
        </Card>

        {/* Attribute Overview - Radar Chart */}
        <Text style={styles.sectionTitle}>Attribute Overview</Text>
        <Card style={styles.radarCard}>
          <AttributeRadarChart
            attributes={player.attributes}
            size={300}
          />
        </Card>

        {/* Quick Stats Grid */}
        <Text style={styles.sectionTitle}>Season Performance</Text>
        <View style={styles.statsGrid}>
          <DataCard
            label="Goals"
            value={player.goals}
            gradient
            style={styles.statCard}
          />
          <DataCard
            label="Assists"
            value={player.assists}
            gradient
            style={styles.statCard}
          />
          <DataCard
            label="Matches"
            value={player.matchesPlayed}
            style={styles.statCard}
          />
          <DataCard
            label="xG"
            value={player.xG.toFixed(1)}
            style={styles.statCard}
          />
        </View>

        {/* Attacking Stats */}
        <Text style={styles.sectionTitle}>Attacking</Text>
        <Card style={styles.statsCard}>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Shots per Game</Text>
            <Text style={styles.statValue}>{player.shotsPerGame.toFixed(1)}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Shots on Target</Text>
            <Text style={styles.statValue}>
              {player.shotsOnTarget}/{player.totalShots}
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Shot Accuracy</Text>
            <Text style={styles.statValue}>
              {Math.round((player.shotsOnTarget / player.totalShots) * 100)}%
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Total Dribbles</Text>
            <Text style={styles.statValue}>{player.totalDribbles}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Successful Dribbles</Text>
            <Text style={styles.statValue}>
              {player.successfulDribbles}/{player.totalDribbles}
            </Text>
          </View>
        </Card>

        {/* Passing Stats */}
        <Text style={styles.sectionTitle}>Passing</Text>
        <Card style={styles.statsCard}>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Pass Completion</Text>
            <Text style={styles.statValue}>
              {player.avgPassRate}%
            </Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Total Passes</Text>
            <Text style={styles.statValue}>{player.totalPasses}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Completed Passes</Text>
            <Text style={styles.statValue}>{player.passesCompleted}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Average per Match</Text>
            <Text style={styles.statValue}>{player.avgPasses}</Text>
          </View>
        </Card>

        {/* Defensive Stats */}
        <Text style={styles.sectionTitle}>Defensive</Text>
        <Card style={styles.statsCard}>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Tackles</Text>
            <Text style={styles.statValue}>{player.tackles}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Tackle Success Rate</Text>
            <Text style={styles.statValue}>{player.tackleSuccessRate}%</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Interceptions</Text>
            <Text style={styles.statValue}>{player.interceptions}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Interception Success</Text>
            <Text style={styles.statValue}>{player.interceptionSuccessRate}%</Text>
          </View>
        </Card>

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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: LAYOUT.screenPaddingHorizontal,
    paddingTop: SPACING.xl,
  },
  headerCard: {
    marginBottom: SPACING.xl,
  },
  radarCard: {
    marginBottom: SPACING.md,
    padding: SPACING.lg,
    alignItems: 'center',
  },
  playerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: SPACING.md,
  },
  avatarPlaceholder: {
    backgroundColor: COLORS.gray200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.gray600,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.foreground,
    marginBottom: SPACING.xs / 2,
  },
  playerAge: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.orange,
    marginBottom: SPACING.xs / 2,
  },
  playerDetails: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.mutedForeground,
    marginBottom: SPACING.xs / 2,
  },
  matchesPlayed: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.mutedForeground,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.foreground,
    marginBottom: SPACING.md,
    marginTop: SPACING.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SPACING.xs,
    marginBottom: SPACING.lg,
  },
  statCard: {
    width: '50%',
    paddingHorizontal: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  statsCard: {
    marginBottom: SPACING.lg,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.mutedForeground,
  },
  statValue: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.foreground,
  },
  successValue: {
    color: COLORS.success,
  },
  warningValue: {
    color: COLORS.warning,
  },
  errorValue: {
    color: COLORS.error,
  },
  bottomPadding: {
    height: LAYOUT.bottomNavHeight + LAYOUT.bottomNavSafeArea,
  },
});
