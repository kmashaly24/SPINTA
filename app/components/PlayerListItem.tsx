import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS } from '@/constants/theme';
import { PlayerData } from '@/types';

interface PlayerListItemProps {
  player: PlayerData;
  onPress?: () => void;
}

export const PlayerListItem: React.FC<PlayerListItemProps> = ({ player, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      <View style={styles.content}>
        {/* Jersey Number */}
        <View style={styles.jerseyBadge}>
          <Text style={styles.jerseyNumber}>{player.jerseyNumber}</Text>
        </View>

        {/* Player Image */}
        {player.image ? (
          <Image source={{ uri: player.image }} style={styles.image} />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder]}>
            <Text style={styles.imagePlaceholderText}>
              {player.name ? player.name.charAt(0) : '?'}
            </Text>
          </View>
        )}

        {/* Player Info */}
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {player.name || `Player #${player.jerseyNumber}`}
          </Text>
          <Text style={styles.stats}>
            {player.goals} goals • {player.assists} assists
          </Text>
        </View>

        {/* Key Stat with Gradient */}
        <View style={styles.statContainer}>
          {player.isLinked ? (
            <LinearGradient
              colors={[COLORS.gradientStart, COLORS.gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.statBadge}
            >
              <Text style={styles.statValue}>{player.keyStat}</Text>
            </LinearGradient>
          ) : (
            <View style={[styles.statBadge, styles.statBadgeGray]}>
              <Text style={styles.statValue}>{player.keyStat}</Text>
            </View>
          )}
          <Text style={styles.statLabel}>Goals</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.xl,
    marginBottom: SPACING.md,
    ...SHADOWS.lg,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
  },
  jerseyBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  jerseyNumber: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.primaryForeground,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: SPACING.md,
  },
  imagePlaceholder: {
    backgroundColor: COLORS.gray200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.gray600,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.foreground,
    marginBottom: SPACING.xs / 2,
  },
  stats: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.mutedForeground,
  },
  statContainer: {
    alignItems: 'center',
    marginLeft: SPACING.sm,
  },
  statBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xs / 2,
  },
  statBadgeGray: {
    backgroundColor: COLORS.gray400,
  },
  statValue: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.primaryForeground,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.mutedForeground,
  },
});
