import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Card, Tabs, TabContent } from '@/components/ui';
import { ComparisonStatBar } from '@/components/visualizations/ComparisonStatBar';
import { SoccerField } from '@/components/visualizations/SoccerField';
import { useClubData } from '@/hooks/useQuery';
import { useAuthStore } from '@/store/authStore';
import { COLORS, TYPOGRAPHY, SPACING, LAYOUT } from '@/constants/theme';

/**
 * Coach Club Screen
 * Shows team statistics and club information
 */
export default function CoachClubScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { data: clubData, isLoading, error } = useClubData();
  const [activeTab, setActiveTab] = useState('summary');

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load club data</Text>
      </View>
    );
  }

  const tabs = [
    { label: 'Summary', value: 'summary' },
    { label: 'Statistics', value: 'statistics' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.clubAvatar}>
            <Text style={styles.clubAvatarText}>
              {clubData?.clubName?.charAt(0) || 'T'}
            </Text>
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.clubName}>{clubData?.clubName || 'Thunder United FC'}</Text>
            <Text style={styles.coachName}>Coach: {user?.name || 'John Smith'}</Text>
            <Text style={styles.standing}>League Position: {clubData?.standing || '3rd'}</Text>
          </View>
        </View>

        {/* Tabs - Centered */}
        <View style={styles.tabsWrapper}>
          <Tabs
            tabs={tabs}
            value={activeTab}
            onValueChange={setActiveTab}
            containerStyle={styles.tabsContainer}
          />
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
      >
        {/* Summary Tab */}
        <TabContent value="summary" activeValue={activeTab}>
          <>
          {/* Season Record - Colored Progress Bar */}
          <Card style={styles.seasonRecordCard}>
            <Text style={styles.sectionTitle}>Season Record</Text>
            <View style={styles.recordBarContainer}>
              <View style={[styles.recordBarSegment, styles.recordBarWin, { flex: clubData?.basicStats.wins || 1 }]}>
                <Text style={styles.recordBarText}>{clubData?.basicStats.wins}</Text>
              </View>
              <View style={[styles.recordBarSegment, styles.recordBarDraw, { flex: clubData?.basicStats.draws || 1 }]}>
                <Text style={styles.recordBarText}>{clubData?.basicStats.draws}</Text>
              </View>
              <View style={[styles.recordBarSegment, styles.recordBarLoss, { flex: clubData?.basicStats.losses || 1 }]}>
                <Text style={styles.recordBarText}>{clubData?.basicStats.losses}</Text>
              </View>
            </View>
            <View style={styles.recordLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: COLORS.success }]} />
                <Text style={styles.legendText}>Wins</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: COLORS.gray400 }]} />
                <Text style={styles.legendText}>Draws</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: COLORS.error }]} />
                <Text style={styles.legendText}>Losses</Text>
              </View>
            </View>
          </Card>

          {/* Team Form */}
          <View style={styles.formHeader}>
            <Text style={styles.sectionTitle}>Team Form</Text>
            <Text style={styles.formSubtitle}>Last 5</Text>
          </View>
          <View style={styles.formContainer}>
            {clubData?.teamForm.map((result, index) => (
              <View
                key={index}
                style={[
                  styles.formBadge,
                  result === 'W' && styles.formBadgeWin,
                  result === 'D' && styles.formBadgeDraw,
                  result === 'L' && styles.formBadgeLoss,
                ]}
              >
                <Text
                  style={[
                    styles.formText,
                    result === 'W' && styles.formTextWin,
                    result === 'D' && styles.formTextDraw,
                    result === 'L' && styles.formTextLoss,
                  ]}
                >
                  {result}
                </Text>
              </View>
            ))}
          </View>

          {/* Matches List */}
          <Text style={[styles.sectionTitle, { marginTop: SPACING.lg }]}>Recent Matches</Text>
          {clubData?.recentMatches?.slice(0, 6).map((match, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => router.push(`/(coach)/match/${match.id || index + 1}`)}
              activeOpacity={0.7}
            >
              <Card style={styles.matchCard}>
                <Text style={styles.matchDate}>{match.date}</Text>
                <View style={styles.matchInfo}>
                  <Text style={styles.matchTitle}>{match.homeTeam} {match.homeScore} - {match.awayScore} {match.awayTeam}</Text>
                  <Text style={styles.matchArrow}>›</Text>
                </View>
                <View style={styles.matchResult}>
                  <View style={[styles.resultDot,
                    match.result === 'win' && { backgroundColor: COLORS.success },
                    match.result === 'draw' && { backgroundColor: COLORS.gray400 },
                    match.result === 'loss' && { backgroundColor: COLORS.error },
                  ]} />
                  <Text style={[styles.resultText,
                    match.result === 'win' && { color: COLORS.success },
                    match.result === 'draw' && { color: COLORS.gray400 },
                    match.result === 'loss' && { color: COLORS.error },
                  ]}>
                    {match.result === 'win' ? 'Win' : match.result === 'draw' ? 'Draw' : 'Loss'}
                  </Text>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
          </>
        </TabContent>

        {/* Statistics Tab */}
        <TabContent value="statistics" activeValue={activeTab}>
          <>
          {/* Season Summary */}
          <Card style={styles.statsCard}>
            <Text style={styles.cardSectionTitle}>Season Summary</Text>
            <View style={styles.statRow}>
              <Text style={styles.statRowLabel}>Matches Played</Text>
              <Text style={styles.statRowValue}>{clubData?.basicStats.matchesPlayed || 22}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statRowLabel}>Goals Scored</Text>
              <Text style={styles.statRowValue}>{clubData?.goalsScored || 45}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statRowLabel}>Goals Conceded</Text>
              <Text style={styles.statRowValue}>{clubData?.goalsConceded || 23}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statRowLabel}>Total Assists</Text>
              <Text style={styles.statRowValue}>{clubData?.basicStats.totalAssists || 32}</Text>
            </View>
          </Card>

          {/* Attacking */}
          <Card style={styles.statsCard}>
            <Text style={styles.cardSectionTitle}>Attacking</Text>
            <View style={styles.statRow}>
              <Text style={styles.statRowLabel}>Avg Goals per Match</Text>
              <Text style={styles.statRowValue}>2.0</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statRowLabel}>Avg xG per Match</Text>
              <Text style={styles.statRowValue}>1.9</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statRowLabel}>Avg Total Shots</Text>
              <Text style={styles.statRowValue}>14</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statRowLabel}>Avg Shots on Target</Text>
              <Text style={styles.statRowValue}>2.8</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statRowLabel}>Avg Dribbles</Text>
              <Text style={styles.statRowValue}>12.5</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statRowLabel}>Avg Successful Dribbles</Text>
              <Text style={styles.statRowValue}>8.2</Text>
            </View>
          </Card>

          {/* Passes */}
          <Card style={styles.statsCard}>
            <Text style={styles.cardSectionTitle}>Passes</Text>
            <View style={styles.statRow}>
              <Text style={styles.statRowLabel}>Avg Possession %</Text>
              <Text style={styles.statRowValue}>58%</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statRowLabel}>Avg Passes</Text>
              <Text style={styles.statRowValue}>487</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statRowLabel}>Pass Completion %</Text>
              <Text style={styles.statRowValue}>87%</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statRowLabel}>Avg Final Third Passes</Text>
              <Text style={styles.statRowValue}>145</Text>
            </View>
          </Card>

          {/* Defending */}
          <Card style={styles.statsCard}>
            <Text style={styles.cardSectionTitle}>Defending</Text>
            <View style={styles.statRow}>
              <Text style={styles.statRowLabel}>Total Clean Sheets</Text>
              <Text style={styles.statRowValue}>{clubData?.cleanSheets || 8}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statRowLabel}>Avg Goals Conceded per Match</Text>
              <Text style={styles.statRowValue}>1.0</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statRowLabel}>Avg Tackles</Text>
              <Text style={styles.statRowValue}>16.3</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statRowLabel}>Tackle Success %</Text>
              <Text style={styles.statRowValue}>72%</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statRowLabel}>Avg Interceptions</Text>
              <Text style={styles.statRowValue}>11.8</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statRowLabel}>Interception Success %</Text>
              <Text style={styles.statRowValue}>85%</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statRowLabel}>Avg Ball Recoveries</Text>
              <Text style={styles.statRowValue}>48.5</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statRowLabel}>Avg Saves per Match</Text>
              <Text style={styles.statRowValue}>3.2</Text>
            </View>
          </Card>
          </>
        </TabContent>

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
    paddingTop: SPACING.sm,
  },
  header: {
    paddingHorizontal: LAYOUT.screenPaddingHorizontal,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xs,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.sm,
  },
  clubAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clubAvatarText: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.primaryForeground,
  },
  headerTextContainer: {
    flex: 1,
  },
  clubName: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.foreground,
    marginBottom: SPACING.xs / 2,
  },
  coachName: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.mutedForeground,
    marginBottom: SPACING.xs / 2,
  },
  standing: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.mutedForeground,
  },
  tabsWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsContainer: {
    marginHorizontal: 0,
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 0,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SPACING.xs,
    marginBottom: SPACING.lg,
  },
  statCard: {
    width: '50%',
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    paddingHorizontal: SPACING.xs,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.mutedForeground,
    marginBottom: SPACING.xs,
  },
  statValue: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.foreground,
  },
  seasonRecordCard: {
    marginBottom: SPACING.lg,
  },
  recordBarContainer: {
    flexDirection: 'row',
    height: 40,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: SPACING.sm,
  },
  recordBarSegment: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 40,
  },
  recordBarWin: {
    backgroundColor: COLORS.success,
  },
  recordBarDraw: {
    backgroundColor: COLORS.gray400,
  },
  recordBarLoss: {
    backgroundColor: COLORS.error,
  },
  recordBarText: {
    color: COLORS.primaryForeground,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
  },
  recordLegend: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: SPACING.lg,
    marginTop: SPACING.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.mutedForeground,
  },
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  formSubtitle: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.mutedForeground,
  },
  formCard: {
    marginBottom: SPACING.lg,
  },
  formContainer: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  formBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formBadgeWin: {
    backgroundColor: COLORS.successBg,
  },
  formBadgeDraw: {
    backgroundColor: COLORS.warningBg,
  },
  formBadgeLoss: {
    backgroundColor: COLORS.errorBg,
  },
  formText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
  },
  formTextWin: {
    color: COLORS.success,
  },
  formTextDraw: {
    color: COLORS.warning,
  },
  formTextLoss: {
    color: COLORS.error,
  },
  statsCard: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.foreground,
    marginBottom: SPACING.sm,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  statRowLabel: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.mutedForeground,
  },
  statRowValue: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.foreground,
  },
  goalDifference: {
    color: COLORS.success,
  },
  comparisonCard: {
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  mapCard: {
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    alignItems: 'center',
  },
  emptyState: {
    paddingVertical: SPACING['2xl'],
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.mutedForeground,
    textAlign: 'center',
  },
  cardSectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.foreground,
    marginBottom: SPACING.sm,
  },
  matchCard: {
    marginBottom: SPACING.md,
    padding: SPACING.md,
  },
  matchDate: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.orange,
    marginBottom: SPACING.xs,
  },
  matchInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  matchTitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.foreground,
    flex: 1,
  },
  matchArrow: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    color: COLORS.gray400,
  },
  matchResult: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  resultDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  resultText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  bottomPadding: {
    height: LAYOUT.bottomNavHeight + LAYOUT.bottomNavSafeArea,
  },
});
