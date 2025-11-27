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
import { ProgressCircle } from '@/components/visualizations/ProgressCircle';
import { mockTrainingPlans } from '@/data/mockData';
import { COLORS, TYPOGRAPHY, SPACING, LAYOUT, BORDER_RADIUS, SHADOWS } from '@/constants/theme';

/**
 * Training Detail Screen (Coach View)
 * Shows complete training plan details with exercises and progress
 * PDF pages 18, 29
 */
export default function TrainingDetailScreen() {
  const router = useRouter();
  const { trainingId } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState('overview');

  // In a real app, fetch training plan by trainingId
  const training = mockTrainingPlans.find(plan => plan.id === trainingId) || mockTrainingPlans[0];

  if (!training) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  const tabs = [
    { label: 'Overview', value: 'overview' },
    { label: 'Sessions', value: 'sessions' },
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
              router.replace('/(coach)/club');
            }
          }}
          style={styles.backButton}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      </View>

      {/* Training Header */}
      <View style={styles.trainingHeader}>
        {training.playerImage ? (
          <Image source={{ uri: training.playerImage }} style={styles.playerAvatar} />
        ) : (
          <View style={[styles.playerAvatar, styles.playerAvatarPlaceholder]}>
            <Text style={styles.jerseyNumber}>{training.playerJerseyNumber}</Text>
          </View>
        )}
        <View style={styles.headerInfo}>
          <Text style={styles.trainingTitle}>{training.title}</Text>
          <Text style={styles.playerName}>{training.playerName} • #{training.playerJerseyNumber}</Text>

          {/* Status Badges */}
          <View style={styles.statusContainer}>
            <View style={[
              styles.statusBadge,
              training.status === 'completed' && styles.statusCompleted,
              training.status === 'in-progress' && styles.statusInProgress,
              training.status === 'pending' && styles.statusPending,
            ]}>
              <Text style={styles.statusText}>
                {training.status === 'completed' ? 'Completed' :
                 training.status === 'in-progress' ? 'In Progress' : 'Pending'}
              </Text>
            </View>
            <View style={styles.typeBadge}>
              <Text style={styles.typeText}>{training.type}</Text>
            </View>
          </View>

          <Text style={styles.trainingDate}>{training.createdDate || training.date}</Text>
        </View>
        <View style={styles.progressCircleContainer}>
          <ProgressCircle percentage={training.progress} size={70} strokeWidth={6} />
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
        {/* Overview Tab */}
        <TabContent value="overview" activeValue={activeTab}>
          {/* Progress Stats */}
          <View style={styles.progressStatsContainer}>
            <DataCard
              label="Completed"
              value={training.exercisesCompleted}
              gradient
              style={styles.progressStatCard}
            />
            <DataCard
              label="Remaining"
              value={training.totalExercises - training.exercisesCompleted}
              style={styles.progressStatCard}
            />
            <DataCard
              label="Total"
              value={training.totalExercises}
              style={styles.progressStatCard}
            />
          </View>

          {/* Coach Notes */}
          {training.coachNotes && (
            <>
              <Text style={styles.sectionTitle}>💬 Coach Notes</Text>
              <Card style={styles.notesCard}>
                <View style={styles.notesHeader}>
                  <Text style={styles.notesHeaderText}>Message from your coach</Text>
                </View>
                <Text style={styles.notesText}>{training.coachNotes}</Text>
              </Card>
            </>
          )}

          {/* Exercise List */}
          <Text style={styles.sectionTitle}>All Exercises</Text>
          {training.exercises.map((exercise, index) => (
            <Card key={index} style={styles.exerciseCard}>
              <View style={styles.exerciseHeader}>
                <View style={[
                  styles.exerciseCheckbox,
                  exercise.completed && styles.exerciseCheckboxCompleted
                ]}>
                  {exercise.completed && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </View>
                <View style={styles.exerciseInfo}>
                  <Text style={[
                    styles.exerciseName,
                    exercise.completed && styles.exerciseCompleted
                  ]}>
                    {exercise.name}
                  </Text>
                  <Text style={styles.exerciseDescription}>{exercise.description}</Text>
                </View>
              </View>
              <View style={styles.exerciseDetails}>
                {exercise.sets && (
                  <View style={styles.exerciseDetailItem}>
                    <Text style={styles.exerciseDetailLabel}>Sets</Text>
                    <Text style={styles.exerciseDetailValue}>{exercise.sets}</Text>
                  </View>
                )}
                {exercise.reps && (
                  <View style={styles.exerciseDetailItem}>
                    <Text style={styles.exerciseDetailLabel}>Reps</Text>
                    <Text style={styles.exerciseDetailValue}>{exercise.reps}</Text>
                  </View>
                )}
                {exercise.minutes && (
                  <View style={styles.exerciseDetailItem}>
                    <Text style={styles.exerciseDetailLabel}>Time</Text>
                    <Text style={styles.exerciseDetailValue}>{exercise.minutes}</Text>
                  </View>
                )}
              </View>
            </Card>
          ))}
        </TabContent>

        {/* Sessions Tab */}
        <TabContent value="sessions" activeValue={activeTab}>
          <Text style={styles.sectionTitle}>Training Sessions</Text>
          {training.sessions?.map((session, index) => (
            <Card key={index} style={styles.sessionCard}>
              <View style={styles.sessionHeader}>
                <Text style={styles.sessionDay}>{session.day}</Text>
                <Text style={styles.sessionFocus}>{session.focus}</Text>
              </View>
              <View style={styles.sessionExercises}>
                {session.exercises.map((exercise, exerciseIndex) => (
                  <View key={exerciseIndex} style={styles.sessionExerciseRow}>
                    <Text style={styles.sessionExerciseName}>{exercise.name}</Text>
                    <Text style={styles.sessionExerciseDetails}>
                      {exercise.sets && `${exercise.sets} sets`}
                      {exercise.reps && ` × ${exercise.reps}`}
                      {exercise.time && ` • ${exercise.time}`}
                    </Text>
                  </View>
                ))}
              </View>
            </Card>
          ))}
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
    paddingTop: SPACING.md,
    paddingBottom: SPACING.sm,
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
  trainingHeader: {
    paddingHorizontal: LAYOUT.screenPaddingHorizontal,
    paddingVertical: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  playerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: SPACING.md,
  },
  playerAvatarPlaceholder: {
    backgroundColor: COLORS.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  jerseyNumber: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.primaryForeground,
  },
  headerInfo: {
    flex: 1,
  },
  trainingTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.foreground,
    marginBottom: SPACING.xs / 2,
  },
  playerName: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.mutedForeground,
    marginBottom: SPACING.xs / 2,
  },
  trainingDate: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.mutedForeground,
  },
  progressCircleContainer: {
    marginLeft: SPACING.md,
    marginTop: -SPACING.lg,
  },
  statusContainer: {
    flexDirection: 'row',
    paddingHorizontal: 0,
    paddingVertical: SPACING.xs,
    gap: SPACING.sm,
  },
  statusBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
  },
  statusCompleted: {
    backgroundColor: COLORS.successBg,
  },
  statusInProgress: {
    backgroundColor: COLORS.warningBg,
  },
  statusPending: {
    backgroundColor: COLORS.gray200,
  },
  statusText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.foreground,
  },
  typeBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.gray100,
  },
  typeText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.mutedForeground,
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
    paddingTop: SPACING.md,
  },
  progressStatsContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  progressStatCard: {
    flex: 1,
    minWidth: 0,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.foreground,
    marginBottom: SPACING.sm,
    marginTop: SPACING.md,
  },
  notesCard: {
    padding: SPACING.md,
    marginBottom: SPACING.md,
    backgroundColor: COLORS.orangeBg,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.orange,
  },
  notesHeader: {
    marginBottom: SPACING.sm,
  },
  notesHeaderText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.orange,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  notesText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.foreground,
    lineHeight: TYPOGRAPHY.fontSize.base * 1.6,
  },
  exerciseCard: {
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  exerciseHeader: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
  },
  exerciseCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.orange,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
    backgroundColor: 'transparent',
  },
  exerciseCheckboxCompleted: {
    backgroundColor: COLORS.orange,
  },
  checkmark: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.primaryForeground,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.foreground,
    marginBottom: SPACING.xs / 2,
  },
  exerciseCompleted: {
    textDecorationLine: 'line-through',
    color: COLORS.mutedForeground,
  },
  exerciseDescription: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.mutedForeground,
    lineHeight: TYPOGRAPHY.fontSize.sm * 1.5,
  },
  exerciseDetails: {
    flexDirection: 'row',
    gap: SPACING.md,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray100,
  },
  exerciseDetailItem: {
    alignItems: 'center',
  },
  exerciseDetailLabel: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.mutedForeground,
    marginBottom: SPACING.xs / 2,
  },
  exerciseDetailValue: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.foreground,
  },
  sessionCard: {
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOWS.md,
  },
  sessionHeader: {
    marginBottom: SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.orange,
    backgroundColor: COLORS.orangeBg,
    marginHorizontal: -SPACING.md,
    marginTop: -SPACING.md,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    borderTopLeftRadius: BORDER_RADIUS.lg,
    borderTopRightRadius: BORDER_RADIUS.lg,
  },
  sessionDay: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.foreground,
    marginBottom: SPACING.xs / 2,
  },
  sessionFocus: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.orange,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
  },
  sessionExercises: {
    gap: SPACING.sm,
  },
  sessionExerciseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  sessionExerciseName: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
    color: COLORS.foreground,
    flex: 1,
    marginRight: SPACING.sm,
  },
  sessionExerciseDetails: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.mutedForeground,
    textAlign: 'right',
  },
  bottomPadding: {
    height: LAYOUT.bottomNavHeight + LAYOUT.bottomNavSafeArea,
  },
});
