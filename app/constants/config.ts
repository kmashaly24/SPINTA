/**
 * App Configuration Constants
 */

export const API_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api',
  TIMEOUT: 30000, // 30 seconds
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: '@spinta:auth_token',
  REFRESH_TOKEN: '@spinta:refresh_token',
  USER_DATA: '@spinta:user_data',
  USER_ROLE: '@spinta:user_role',
  ONBOARDING_COMPLETED: '@spinta:onboarding',
};

export const QUERY_KEYS = {
  // Auth
  AUTH_USER: 'auth_user',

  // Players
  PLAYERS: 'players',
  PLAYER_DETAIL: 'player_detail',
  PLAYER_STATS: 'player_stats',

  // Matches
  MATCHES: 'matches',
  MATCH_DETAIL: 'match_detail',
  UPCOMING_MATCHES: 'upcoming_matches',
  PAST_MATCHES: 'past_matches',

  // Training
  TRAINING_PLANS: 'training_plans',
  TRAINING_SESSIONS: 'training_sessions',

  // Club
  CLUB_STATS: 'club_stats',
  CLUB_INFO: 'club_info',

  // Coach
  COACH_PROFILE: 'coach_profile',
};

export const USER_ROLES = {
  PLAYER: 'player',
  COACH: 'coach',
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

export const MATCH_STATUS = {
  WIN: 'win',
  LOSS: 'loss',
  DRAW: 'draw',
  UPCOMING: 'upcoming',
} as const;

export type MatchStatus = typeof MATCH_STATUS[keyof typeof MATCH_STATUS];

export const FIELD_VISUALIZATION_TYPES = {
  HEATMAP: 'heatmap',
  PASSMAP: 'passmap',
  SHOTMAP: 'shotmap',
} as const;

export type FieldVisualizationType = typeof FIELD_VISUALIZATION_TYPES[keyof typeof FIELD_VISUALIZATION_TYPES];
