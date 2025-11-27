import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Card } from '@/components/ui';
import { COLORS, TYPOGRAPHY, SPACING, LAYOUT, BORDER_RADIUS } from '@/constants/theme';

/**
 * Player Welcome Screen
 * Shown after successful player registration
 * PDF page 24
 */
export default function WelcomePlayerScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const playerName = params.name as string || 'Player';
  const clubName = params.clubName as string || 'Your Club';
  const jerseyNumber = params.jerseyNumber as string || '10';
  const position = params.position as string || 'Forward';
  const age = params.age as string || '23';
  const profileImage = params.profileImage as string || '';

  const handleGoToDashboard = () => {
    router.replace('/(player)/stats');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Gradient Background Header */}
      <LinearGradient
        colors={[COLORS.gradientStart, COLORS.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientHeader}
      >
        {/* Jersey Number Circle */}
        <View style={styles.jerseyContainer}>
          <View style={styles.jerseyCircle}>
            <Text style={styles.jerseyNumber}>{jerseyNumber}</Text>
          </View>
        </View>

        {/* Welcome Message */}
        <Text style={styles.headerTitle}>Welcome, {playerName}!</Text>
        <Text style={styles.headerSubtitle}>
          Your performance journey begins
        </Text>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Message */}
        <View style={styles.messageContainer}>
          <Text style={styles.messageTitle}>Account Created Successfully</Text>
          <Text style={styles.messageText}>
            Start tracking your stats and improving your game
          </Text>
        </View>

        {/* Player Info Card */}
        <Card style={styles.detailsCard}>
          <Text style={styles.cardTitle}>Your Profile</Text>

          {/* Profile Picture if provided */}
          {profileImage && (
            <View style={styles.profileImageSection}>
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            </View>
          )}

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Text style={styles.detailIconText}>👤</Text>
            </View>
            <View style={styles.detailInfo}>
              <Text style={styles.detailLabel}>Name</Text>
              <Text style={styles.detailValue}>{playerName}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Text style={styles.detailIconText}>⚽</Text>
            </View>
            <View style={styles.detailInfo}>
              <Text style={styles.detailLabel}>Club</Text>
              <Text style={styles.detailValue}>{clubName}</Text>
            </View>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <View style={styles.statIconContainer}>
                <Text style={styles.statIcon}>#</Text>
              </View>
              <Text style={styles.statValue}>{jerseyNumber}</Text>
              <Text style={styles.statLabel}>Jersey</Text>
            </View>

            <View style={styles.statBox}>
              <View style={styles.statIconContainer}>
                <Text style={styles.statIcon}>⚽</Text>
              </View>
              <Text style={styles.statValue}>{position}</Text>
              <Text style={styles.statLabel}>Position</Text>
            </View>

            <View style={styles.statBox}>
              <View style={styles.statIconContainer}>
                <Text style={styles.statIcon}>🎂</Text>
              </View>
              <Text style={styles.statValue}>{age}</Text>
              <Text style={styles.statLabel}>Age</Text>
            </View>
          </View>
        </Card>

        {/* Features Card */}
        <Card style={styles.featuresCard}>
          <Text style={styles.cardTitle}>What's Next?</Text>

          <View style={styles.featureItem}>
            <View style={styles.featureBullet} />
            <Text style={styles.featureText}>View your match statistics and performance</Text>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureBullet} />
            <Text style={styles.featureText}>Complete training plans from your coach</Text>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureBullet} />
            <Text style={styles.featureText}>Track your progress over time</Text>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureBullet} />
            <Text style={styles.featureText}>Review upcoming matches and schedules</Text>
          </View>
        </Card>

        {/* Dashboard Button */}
        <Button
          variant="gradient"
          size="lg"
          onPress={handleGoToDashboard}
          style={styles.dashboardButton}
        >
          Get Started
        </Button>

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
  gradientHeader: {
    paddingTop: SPACING.xl,
    paddingBottom: SPACING['2xl'],
    paddingHorizontal: LAYOUT.screenPaddingHorizontal,
    alignItems: 'center',
  },
  jerseyContainer: {
    marginBottom: SPACING.lg,
  },
  jerseyCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.primaryForeground,
  },
  jerseyNumber: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.primaryForeground,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.primaryForeground,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.primaryForeground,
    textAlign: 'center',
    opacity: 0.9,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: LAYOUT.screenPaddingHorizontal,
    paddingTop: SPACING.xl,
  },
  messageContainer: {
    marginBottom: SPACING.xl,
    alignItems: 'center',
  },
  messageTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.foreground,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  messageText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.mutedForeground,
    textAlign: 'center',
    lineHeight: TYPOGRAPHY.fontSize.base * TYPOGRAPHY.lineHeight.relaxed,
  },
  detailsCard: {
    marginBottom: SPACING.lg,
  },
  cardTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.foreground,
    marginBottom: SPACING.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  detailIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.orangeBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  detailIconText: {
    fontSize: 20,
  },
  detailInfo: {
    flex: 1,
  },
  detailLabel: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.mutedForeground,
    marginBottom: SPACING.xs / 4,
  },
  detailValue: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.foreground,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: SPACING.lg,
    gap: SPACING.md,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.gray50,
    borderRadius: BORDER_RADIUS.md,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.orangeBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  statIcon: {
    fontSize: 20,
  },
  statValue: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.foreground,
    marginBottom: SPACING.xs / 4,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.mutedForeground,
    textAlign: 'center',
  },
  featuresCard: {
    marginBottom: SPACING.xl,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  featureBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.orange,
    marginRight: SPACING.md,
  },
  featureText: {
    flex: 1,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.foreground,
    lineHeight: TYPOGRAPHY.fontSize.base * TYPOGRAPHY.lineHeight.normal,
  },
  dashboardButton: {
    marginBottom: SPACING.xl,
  },
  bottomPadding: {
    height: SPACING.xl,
  },
  profileImageSection: {
    alignItems: 'center',
    marginBottom: SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: COLORS.orange,
  },
});
