import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS, SHADOWS, GRADIENTS } from '@/constants/theme';
import { Match, MatchStatus } from '@/types';
import { getMatchStatusColor, getMatchStatusBgColor } from '@/utils/helpers';

interface MatchListItemProps {
  match: Match;
  onPress?: () => void;
}

export const MatchListItem: React.FC<MatchListItemProps> = ({ match, onPress }) => {
  const isUpcoming = match.isUpcoming || false;
  const status: MatchStatus = isUpcoming ? 'upcoming' : (match.result || 'upcoming');

  const statusColor = getMatchStatusColor(status);
  const statusBgColor = getMatchStatusBgColor(status);

  const getStatusLabel = () => {
    if (isUpcoming) return 'Upcoming';
    switch (status) {
      case 'win':
        return 'Won';
      case 'loss':
        return 'Lost';
      case 'draw':
        return 'Draw';
      default:
        return 'Upcoming';
    }
  };

  const getStatusGradient = () => {
    switch (status) {
      case 'win':
        return GRADIENTS.badges.win;
      case 'loss':
        return GRADIENTS.badges.loss;
      case 'draw':
        return GRADIENTS.badges.draw;
      case 'upcoming':
        return [COLORS.gradientStart, COLORS.orange];
      default:
        return [COLORS.gradientStart, COLORS.orange];
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: statusBgColor }]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      <View style={styles.content}>
        {/* Date */}
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{match.date}</Text>
        </View>

        {/* Match Info */}
        <View style={styles.matchInfo}>
          <Text style={styles.opponent}>{match.opponent}</Text>
          {match.score && (
            <Text style={styles.score}>{match.score}</Text>
          )}
        </View>

        {/* Status Badge */}
        <LinearGradient
          colors={getStatusGradient()}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.statusBadge}
        >
          <Text style={styles.statusText}>{getStatusLabel()}</Text>
        </LinearGradient>
      </View>

      {/* Indicator Line */}
      <View style={[styles.indicator, { backgroundColor: statusColor }]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS.xl,
    marginBottom: SPACING.md,
    ...SHADOWS.md,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
  },
  dateContainer: {
    marginRight: SPACING.md,
    minWidth: 70,
  },
  date: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.mutedForeground,
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  matchInfo: {
    flex: 1,
  },
  opponent: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.foreground,
    marginBottom: SPACING.xs / 2,
  },
  score: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
    color: COLORS.foreground,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs / 2,
    borderRadius: BORDER_RADIUS.sm,
    marginLeft: SPACING.sm,
  },
  statusText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
    color: COLORS.primaryForeground,
  },
  indicator: {
    height: 4,
    width: '100%',
  },
});
