import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Card } from '@/components/ui';
import { useTrainingPlans } from '@/hooks/useQuery';
import { mockPlayerData } from '@/data/mockData';
import { COLORS, TYPOGRAPHY, SPACING, LAYOUT, BORDER_RADIUS } from '@/constants/theme';
import { TrainingPlan } from '@/types';

/**
 * Player Training Screen
 * Shows training plans and progress
 */
export default function PlayerTrainingScreen() {
  const router = useRouter();
  const {
    data: trainingPlans,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useTrainingPlans(mockPlayerData.id);

  const handlePlanPress = (planId: string) => {
    router.push(`/(player)/training/${planId}`);
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
        <Text style={styles.errorText}>Failed to load training plans</Text>
      </View>
    );
  }

  const renderTrainingPlan = (plan: TrainingPlan) => {
    const isCompleted = plan.status === 'completed';
    const isPending = plan.status === 'pending';

    return (
      <TouchableOpacity
        key={plan.id}
        onPress={() => handlePlanPress(plan.id)}
        activeOpacity={0.7}
      >
        <Card style={styles.planCard}>
          <View style={styles.planHeader}>
            <View style={styles.planInfo}>
              <Text style={styles.planTitle}>{plan.title}</Text>
              <Text style={styles.planDate}>{plan.date}</Text>
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
            <Text style={styles.progressText}>{plan.progress}%</Text>
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
  };

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
          <Text style={styles.title}>Training Plans</Text>
          <Text style={styles.subtitle}>
            {trainingPlans?.length || 0} plan{trainingPlans?.length !== 1 ? 's' : ''}
          </Text>
        </View>

        {/* Training Plans */}
        {trainingPlans && trainingPlans.length > 0 ? (
          trainingPlans.map(renderTrainingPlan)
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No training plans yet</Text>
            <Text style={styles.emptySubtext}>
              Your coach will assign training plans for you
            </Text>
          </View>
        )}

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
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.foreground,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.mutedForeground,
  },
  planCard: {
    marginBottom: SPACING.lg,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  planInfo: {
    flex: 1,
    marginRight: SPACING.md,
  },
  planTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.foreground,
    marginBottom: SPACING.xs / 2,
  },
  planDate: {
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
  progressText: {
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
