import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Tabs, TabContent, Card } from '@/components/ui';
import { DataCard } from '@/components/DataCard';
import { AttributeRadarChart } from '@/components/visualizations/AttributeRadarChart';
import { MatchListItem } from '@/components/MatchListItem';
import { mockPlayers, mockMatches, mockTrainingPlans } from '@/data/mockData';
import { COLORS, TYPOGRAPHY, SPACING, LAYOUT, BORDER_RADIUS } from '@/constants/theme';

/**
 * Player Detail Screen (Coach View)
 * Shows comprehensive player information with Summary, Matches, and Training tabs
 * PDF pages 12-13
 */
export default function PlayerDetailScreen() {
  const router = useRouter();
  const { playerId } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState('summary');

  // In a real app, fetch player data by playerId
  const player = mockPlayers.find(p => p.id === playerId);
  const matches = mockMatches.slice(0, 5); // Last 5 matches
  const trainingPlans = player ? mockTrainingPlans.filter(plan => plan.playerName === player.name) : [];

  if (!player) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ fontSize: TYPOGRAPHY.fontSize.base, color: COLORS.mutedForeground }}>
          Player not found
        </Text>
      </View>
    );
  }

  const tabs = [
    { label: 'Summary', value: 'summary' },
    { label: 'Matches', value: 'matches' },
    { label: 'Training', value: 'training' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace('/(coach)/players');
            }
          }}
          style={styles.backButton}
        >
          <Text style={styles.backText}>← Back to Players</Text>
        </TouchableOpacity>
      </View>

      {/* Player Header */}
      <View style={styles.playerHeader}>
        {player.image ? (
          <Image source={{ uri: player.image }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <Text style={styles.avatarText}>{player.name?.charAt(0)}</Text>
          </View>
        )}
        <Text style={styles.playerName}>{player.name}</Text>
        <Text style={styles.playerDetails}>
          #{player.jerseyNumber} • {player.position} • {player.height} • {player.weight}
        </Text>
        <Text style={styles.matchesPlayed}>
          {player.matchesPlayed} matches played
        </Text>
      </View>

      {/* Invite Code Section for unlinked players */}
      {!player.isLinked && (
        <View style={styles.inviteCodeContainer}>
          <View style={styles.inviteCodeContent}>
            <View style={styles.inviteCodeIcon}>
              <Text style={styles.inviteCodeIconText}>🎟️</Text>
            </View>
            <View style={styles.inviteCodeInfo}>
              <Text style={styles.inviteCodeLabel}>Pending Invitation</Text>
              <Text style={styles.inviteCodeValue}>{player.inviteCode || 'SPINTA2025'}</Text>
            </View>
            <TouchableOpacity style={styles.copyButton}>
              <Text style={styles.copyButtonText}>Copy</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.inviteCodeHint}>
            Share this code with the player to link their account
          </Text>
        </View>
      )}

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
          {/* Attribute Overview - Radar Chart */}
          <Text style={[styles.sectionTitle, { marginTop: SPACING.sm }]}>Attribute Overview</Text>
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
          <Card style={styles.detailCard}>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Shots per Game</Text>
              <Text style={styles.statValue}>{player.shotsPerGame.toFixed(1)}</Text>
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
          <Card style={styles.detailCard}>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Total Passes</Text>
              <Text style={styles.statValue}>{player.avgPasses * player.matchesPlayed}</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Pass Completion</Text>
              <Text style={styles.statValue}>
                {player.avgPassRate}%
              </Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Average per Match</Text>
              <Text style={styles.statValue}>{player.avgPasses}</Text>
            </View>
          </Card>

          {/* Defensive Stats */}
          <Text style={styles.sectionTitle}>Defensive</Text>
          <Card style={styles.detailCard}>
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
        </TabContent>

        {/* Matches Tab */}
        <TabContent value="matches" activeValue={activeTab}>
          <Text style={[styles.sectionTitle, { marginTop: SPACING.sm }]}>Recent Matches</Text>
          {matches && matches.length > 0 ? (
            matches.map((match) => (
              <MatchListItem
                key={match.id}
                match={match}
                onPress={() => router.push(`/(coach)/match/player/${playerId}`)}
              />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No matches played yet</Text>
            </View>
          )}
        </TabContent>

        {/* Training Tab */}
        <TabContent value="training" activeValue={activeTab}>
          <Text style={[styles.sectionTitle, { marginTop: SPACING.sm }]}>Training Plans</Text>
          {trainingPlans && trainingPlans.length > 0 ? (
            trainingPlans.map((plan) => {
              const isCompleted = plan.status === 'completed';
              const isPending = plan.status === 'pending';

              return (
                <TouchableOpacity
                  key={plan.id}
                  onPress={() => router.push(`/(coach)/training/${plan.id}`)}
                  activeOpacity={0.7}
                >
                  <Card style={styles.trainingCard}>
                    <View style={styles.trainingHeader}>
                      <View style={styles.trainingInfo}>
                        <Text style={styles.trainingTitle}>{plan.title}</Text>
                        <Text style={styles.trainingDate}>{plan.date}</Text>
                      </View>

                      <View
                        style={[
                          styles.statusBadge,
                          isCompleted && styles.statusBadgeCompleted,
                          isPending && styles.statusBadgePending,
                        ]}
                      >
                        <Text
                          style={[
                            styles.statusText,
                            isCompleted && styles.statusTextCompleted,
                            isPending && styles.statusTextPending,
                          ]}
                        >
                          {plan.status === 'completed'
                            ? 'Completed'
                            : plan.status === 'in-progress'
                            ? 'In Progress'
                            : 'Pending'}
                        </Text>
                      </View>
                    </View>

                    {/* Progress Bar */}
                    <View style={styles.progressContainer}>
                      <View style={styles.progressBar}>
                        <View
                          style={[
                            styles.progressFill,
                            { width: `${plan.progress}%` },
                            isCompleted && styles.progressFillCompleted,
                          ]}
                        />
                      </View>
                      <Text style={styles.progressPercentage}>{plan.progress}%</Text>
                    </View>

                    {/* Exercise Count */}
                    <Text style={styles.exerciseCount}>
                      {plan.exercisesCompleted}/{plan.totalExercises} exercises completed
                    </Text>

                    {/* Type Badge */}
                    <View style={styles.typeBadge}>
                      <Text style={styles.typeText}>{plan.type}</Text>
                    </View>

                    {/* Coach Notes Preview */}
                    {plan.coachNotes && (
                      <View style={styles.notesPreview}>
                        <Text style={styles.notesLabel}>Coach's Note:</Text>
                        <Text style={styles.notesText} numberOfLines={2}>
                          {plan.coachNotes}
                        </Text>
                      </View>
                    )}
                  </Card>
                </TouchableOpacity>
              );
            })
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No training plans assigned yet</Text>
            </View>
          )}

          {/* Assign New Training Plan Button */}
          <TouchableOpacity
            style={styles.assignButton}
            onPress={() => router.push('/(coach)/training/create')}
          >
            <Text style={styles.assignButtonText}>+ Assign New Training Plan</Text>
          </TouchableOpacity>
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
  header: {
    paddingHorizontal: LAYOUT.screenPaddingHorizontal,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xs,
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
    paddingVertical: SPACING.sm,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: SPACING.xs,
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
  playerName: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.foreground,
    marginBottom: SPACING.xs / 4,
    textAlign: 'center',
  },
  playerDetails: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.mutedForeground,
    marginBottom: SPACING.xs / 4,
    textAlign: 'center',
  },
  matchesPlayed: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.mutedForeground,
    textAlign: 'center',
  },
  inviteCodeContainer: {
    marginHorizontal: LAYOUT.screenPaddingHorizontal,
    marginTop: SPACING.xs,
    marginBottom: SPACING.xs,
    backgroundColor: COLORS.orangeBg,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.sm,
  },
  inviteCodeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inviteCodeIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  inviteCodeIconText: {
    fontSize: 24,
  },
  inviteCodeInfo: {
    flex: 1,
  },
  inviteCodeLabel: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.orange,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    marginBottom: SPACING.xs / 2,
  },
  inviteCodeValue: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.foreground,
  },
  copyButton: {
    backgroundColor: COLORS.orange,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  copyButtonText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.primaryForeground,
  },
  inviteCodeHint: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.mutedForeground,
    marginTop: SPACING.xs,
    textAlign: 'center',
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
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.foreground,
    marginBottom: SPACING.xs,
    marginTop: SPACING.md,
  },
  radarCard: {
    marginBottom: SPACING.xs,
    padding: SPACING.sm,
    alignItems: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SPACING.xs,
    marginBottom: SPACING.xs,
  },
  statCard: {
    width: '50%',
    paddingHorizontal: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  detailCard: {
    marginBottom: SPACING.xs,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
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
  emptyContainer: {
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.mutedForeground,
    textAlign: 'center',
  },
  trainingCard: {
    marginBottom: SPACING.lg,
  },
  trainingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  trainingInfo: {
    flex: 1,
    marginRight: SPACING.md,
  },
  trainingTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.foreground,
    marginBottom: SPACING.xs / 2,
  },
  trainingDate: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.mutedForeground,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs / 2,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.infoBg,
  },
  statusBadgeCompleted: {
    backgroundColor: COLORS.successBg,
  },
  statusBadgePending: {
    backgroundColor: COLORS.warningBg,
  },
  statusText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.info,
  },
  statusTextCompleted: {
    color: COLORS.success,
  },
  statusTextPending: {
    color: COLORS.warning,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.gray200,
    borderRadius: BORDER_RADIUS.full,
    overflow: 'hidden',
    marginRight: SPACING.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.info,
    borderRadius: BORDER_RADIUS.full,
  },
  progressFillCompleted: {
    backgroundColor: COLORS.success,
  },
  progressPercentage: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.foreground,
    minWidth: 40,
    textAlign: 'right',
  },
  exerciseCount: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.mutedForeground,
    marginBottom: SPACING.sm,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.gray100,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs / 2,
    borderRadius: BORDER_RADIUS.sm,
    marginBottom: SPACING.md,
  },
  typeText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.mutedForeground,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  notesPreview: {
    padding: SPACING.sm,
    backgroundColor: COLORS.gray50,
    borderRadius: BORDER_RADIUS.md,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.orange,
  },
  notesLabel: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.orange,
    marginBottom: SPACING.xs / 2,
  },
  notesText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.foreground,
    lineHeight: TYPOGRAPHY.fontSize.sm * TYPOGRAPHY.lineHeight.normal,
  },
  assignButton: {
    backgroundColor: COLORS.orange,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    marginTop: SPACING.sm,
    marginBottom: SPACING.md,
  },
  assignButtonText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.primaryForeground,
  },
  bottomPadding: {
    height: LAYOUT.bottomNavHeight + LAYOUT.bottomNavSafeArea,
  },
});
