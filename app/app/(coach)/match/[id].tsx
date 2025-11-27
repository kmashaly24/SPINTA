import React, { useState } from 'react';
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
import { Tabs, TabContent, Card } from '@/components/ui';
import { ComparisonStatBar } from '@/components/visualizations/ComparisonStatBar';
import { ProgressCircle } from '@/components/visualizations/ProgressCircle';
import { mockMatchDetail } from '@/data/mockData';
import { COLORS, TYPOGRAPHY, SPACING, LAYOUT, BORDER_RADIUS } from '@/constants/theme';

/**
 * Match Detail Screen (Coach View)
 * Shows match details with Summary, Statistics, and Lineup tabs
 * PDF pages 8-10
 */
export default function CoachMatchDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState('summary');

  // In a real app, fetch match data by ID
  const match = mockMatchDetail;

  if (!match) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  const tabs = [
    { label: 'Summary', value: 'summary' },
    { label: 'Statistics', value: 'statistics' },
    { label: 'Lineup', value: 'lineup' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Match Header */}
      <View style={styles.matchHeader}>
        <Text style={styles.matchDate}>{match.date}</Text>
        <View style={styles.scoreContainer}>
          <View style={styles.teamContainer}>
            <View style={[styles.teamLogo, { backgroundColor: COLORS.orange }]}>
              <Text style={styles.teamLogoText}>TU</Text>
            </View>
            <Text style={styles.teamName}>Thunder United</Text>
          </View>

          <View style={styles.scoreBox}>
            <Text style={styles.score}>{match.homeScore} - {match.awayScore}</Text>
            <View style={[styles.resultBadge,
              match.result === 'win' ? styles.resultWin :
              match.result === 'draw' ? styles.resultDraw : styles.resultLoss
            ]}>
              <Text style={styles.resultText}>
                {match.result === 'win' ? 'WIN' : match.result === 'draw' ? 'DRAW' : 'LOSS'}
              </Text>
            </View>
          </View>

          <View style={[styles.teamContainer, styles.awayTeam]}>
            <View style={[styles.teamLogo, { backgroundColor: COLORS.gray600 }]}>
              <Text style={styles.teamLogoText}>{match.opponent?.substring(0, 2).toUpperCase()}</Text>
            </View>
            <Text style={styles.teamName}>{match.opponent}</Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={{ marginTop: 16, marginBottom: 16, paddingHorizontal: LAYOUT.screenPaddingHorizontal }}>
        <Tabs
          tabs={tabs}
          value={activeTab}
          onValueChange={setActiveTab}
          containerStyle={styles.tabsContainer}
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
      >
        {/* Summary Tab */}
        <TabContent value="summary" activeValue={activeTab}>
          <Text style={styles.sectionTitle}>Goal Scorers</Text>
          <View style={styles.goalScorersContainer}>
            {match.goalScorers.map((scorer, index) => (
              <View
                key={index}
                style={[
                  styles.goalScorerCard,
                  index % 2 === 0 ? styles.goalScorerHome : styles.goalScorerAway
                ]}
              >
                <Text style={styles.goalScorerName}>{scorer.player}</Text>
                <Text style={styles.goalScorerTime}>{scorer.minute}'</Text>
              </View>
            ))}
          </View>
        </TabContent>

        {/* Statistics Tab */}
        <TabContent value="statistics" activeValue={activeTab}>
          {/* Circular Possession Display */}
          <Card style={styles.possessionCard}>
            <Text style={styles.possessionTitle}>Ball Possession</Text>
            <View style={styles.possessionContainer}>
              <View style={styles.possessionTeam}>
                <ProgressCircle
                  percentage={match.statistics.possession.home}
                  size={100}
                  strokeWidth={8}
                />
                <Text style={styles.possessionTeamName}>Thunder United FC</Text>
              </View>
              <View style={styles.possessionTeam}>
                <ProgressCircle
                  percentage={match.statistics.possession.away}
                  size={100}
                  strokeWidth={8}
                />
                <Text style={styles.possessionTeamName}>{match.opponent}</Text>
              </View>
            </View>
          </Card>

          <Text style={styles.sectionTitle}>Match Overview</Text>
          <Card style={styles.statsCard}>
            <ComparisonStatBar
              label="Expected Goals (xG)"
              homeValue={match.statistics.xG.home}
              awayValue={match.statistics.xG.away}
            />
            <ComparisonStatBar
              label="Total Shots"
              homeValue={match.statistics.totalShots.home}
              awayValue={match.statistics.totalShots.away}
            />
            <ComparisonStatBar
              label="Goalkeeper Saves"
              homeValue={match.statistics.goalkeeperSaves.home}
              awayValue={match.statistics.goalkeeperSaves.away}
            />
            <ComparisonStatBar
              label="Total Passes"
              homeValue={match.statistics.totalPasses.home}
              awayValue={match.statistics.totalPasses.away}
            />
            <ComparisonStatBar
              label="Total Dribbles"
              homeValue={match.statistics.totalDribbles.home}
              awayValue={match.statistics.totalDribbles.away}
            />
          </Card>

          <Text style={styles.sectionTitle}>Attacking</Text>
          <Card style={styles.statsCard}>
            {match.comparisonStats.attack.map((stat, index) => (
              <ComparisonStatBar
                key={index}
                label={stat.label}
                homeValue={stat.home}
                awayValue={stat.away}
              />
            ))}
          </Card>

          <Text style={styles.sectionTitle}>Passing</Text>
          <Card style={styles.statsCard}>
            {match.comparisonStats.passing.map((stat, index) => (
              <ComparisonStatBar
                key={index}
                label={stat.label}
                homeValue={stat.home}
                awayValue={stat.away}
              />
            ))}
          </Card>

          <Text style={styles.sectionTitle}>Defending</Text>
          <Card style={styles.statsCard}>
            <View style={styles.tackleSuccessContainer}>
              <View style={styles.tackleSuccessItem}>
                <Text style={styles.tackleSuccessValue}>77.8%</Text>
                <Text style={styles.tackleSuccessLabel}>Thunder United FC</Text>
              </View>
              <View style={styles.tackleSuccessCenter}>
                <Text style={styles.tackleSuccessTitle}>Tackle Success %</Text>
              </View>
              <View style={styles.tackleSuccessItem}>
                <Text style={styles.tackleSuccessValue}>68.2%</Text>
                <Text style={styles.tackleSuccessLabel}>{match.opponent}</Text>
              </View>
            </View>

            {match.comparisonStats.defence.map((stat, index) => (
              <ComparisonStatBar
                key={index}
                label={stat.label}
                homeValue={stat.home}
                awayValue={stat.away}
              />
            ))}
          </Card>
        </TabContent>

        {/* Lineup Tab */}
        <TabContent value="lineup" activeValue={activeTab}>
          <Text style={styles.sectionTitle}>Thunder United FC - Starting XI</Text>
          <Card style={styles.lineupCard}>
            {match.lineup?.map((player, index) => (
              <View key={index} style={styles.lineupRow}>
                <View style={styles.playerNumber}>
                  <Text style={styles.playerNumberText}>{player.jerseyNumber}</Text>
                </View>
                <Text style={styles.playerNameText}>{player.name}</Text>
                <Text style={styles.playerPositionText}>{player.position}</Text>
              </View>
            ))}
          </Card>

          <Text style={styles.sectionTitle}>{match.opponent} - Starting XI</Text>
          <Card style={[styles.lineupCard, styles.awayLineupCard]}>
            {match.awayLineup?.map((player, index) => (
              <View key={index} style={styles.lineupRow}>
                <View style={[styles.playerNumber, styles.playerNumberAway]}>
                  <Text style={styles.playerNumberText}>{player.jerseyNumber}</Text>
                </View>
                <Text style={styles.playerNameText}>{player.name}</Text>
                <Text style={styles.playerPositionText}>{player.position}</Text>
              </View>
            ))}
          </Card>

          {/* Substitutions */}
          {match.substitutions && match.substitutions.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Substitutions</Text>
              <Card style={styles.statsCard}>
                {match.substitutions.map((sub, index) => (
                  <View key={index} style={styles.substitutionRow}>
                    <Text style={styles.substitutionMinute}>{sub.minute}'</Text>
                    <View style={styles.substitutionPlayers}>
                      <Text style={styles.substitutionOut}>OUT: {sub.playerOut}</Text>
                      <Text style={styles.substitutionIn}>IN: {sub.playerIn}</Text>
                    </View>
                  </View>
                ))}
              </Card>
            </>
          )}
        </TabContent>

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
  matchHeader: {
    paddingHorizontal: LAYOUT.screenPaddingHorizontal,
    paddingVertical: 0,
    alignItems: 'center',
    borderBottomWidth: 0,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.background,
    marginBottom: 0,
  },
  matchDate: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.mutedForeground,
    marginBottom: 0,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  teamContainer: {
    alignItems: 'center',
    flex: 1,
  },
  awayTeam: {
    alignItems: 'center',
  },
  teamLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  teamLogoText: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.primaryForeground,
  },
  teamName: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.foreground,
    textAlign: 'center',
  },
  scoreBox: {
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
  },
  score: {
    fontSize: 50,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.foreground,
    marginBottom: 0,
    letterSpacing: 1,
  },
  resultBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
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
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.primaryForeground,
    letterSpacing: 0.5,
  },
  tabsContainer: {
    marginTop: 0,
    marginBottom: 0,
    marginHorizontal: 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: LAYOUT.screenPaddingHorizontal,
    paddingTop: 0,
    paddingBottom: SPACING.sm,
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.foreground,
    marginBottom: SPACING.md,
    marginTop: 0,
  },
  goalScorersContainer: {
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  goalScorerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    minHeight: 56,
  },
  goalScorerHome: {
    backgroundColor: COLORS.orangeBg,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.orange,
  },
  goalScorerAway: {
    backgroundColor: COLORS.gray100,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.gray500,
  },
  possessionCard: {
    marginTop: SPACING.sm,
    marginBottom: SPACING.md,
    padding: SPACING.lg,
  },
  possessionTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.foreground,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  possessionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  possessionTeam: {
    alignItems: 'center',
  },
  possessionTeamName: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.mutedForeground,
    marginTop: SPACING.sm,
    textAlign: 'center',
    maxWidth: 100,
  },
  goalScorerName: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.foreground,
    flex: 1,
  },
  goalScorerTime: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.orange,
    minWidth: 50,
    textAlign: 'right',
  },
  statsCard: {
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  tackleSuccessContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  tackleSuccessItem: {
    alignItems: 'center',
    flex: 1,
  },
  tackleSuccessCenter: {
    flex: 1,
    alignItems: 'center',
  },
  tackleSuccessValue: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.foreground,
    marginBottom: SPACING.xs / 2,
  },
  tackleSuccessLabel: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.mutedForeground,
    textAlign: 'center',
  },
  tackleSuccessTitle: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.mutedForeground,
    textAlign: 'center',
  },
  lineupSubtitle: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.mutedForeground,
    marginBottom: SPACING.xs,
  },
  lineupCard: {
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  awayLineupCard: {
    backgroundColor: COLORS.gray50,
  },
  lineupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    minHeight: 60,
  },
  playerNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.orange,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  playerNumberAway: {
    backgroundColor: COLORS.gray700,
  },
  playerNumberText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.primaryForeground,
  },
  playerNameText: {
    flex: 1,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.foreground,
  },
  playerPositionText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.mutedForeground,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    minWidth: 40,
    textAlign: 'right',
  },
  substitutionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    minHeight: 64,
  },
  substitutionMinute: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.orange,
    marginRight: SPACING.md,
    minWidth: 48,
    paddingHorizontal: SPACING.xs,
  },
  substitutionPlayers: {
    flex: 1,
  },
  substitutionOut: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.error,
    marginBottom: SPACING.xs,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  substitutionIn: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.success,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  bottomPadding: {
    height: LAYOUT.bottomNavHeight + LAYOUT.bottomNavSafeArea,
  },
});
