/**
 * Core TypeScript types for Spinta Mobile App
 */

// User and Auth Types
export type UserRole = 'player' | 'coach';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  inviteCode?: string;
  image?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

// Match Types
export type MatchResult = 'win' | 'draw' | 'loss';
export type MatchStatus = 'win' | 'draw' | 'loss' | 'upcoming';

export interface Match {
  id: string;
  opponent: string;
  date: string;
  score?: string;
  result?: MatchResult;
  isUpcoming?: boolean;
}

export interface GoalScorer {
  player: string;
  minute: number;
  isOurTeam: boolean;
}

export interface ManOfTheMatch {
  name: string;
  jerseyNumber: number;
}

export interface MatchStatistics {
  possession: {
    home: number;
    away: number;
  };
  xG: {
    home: number;
    away: number;
  };
  totalShots: {
    home: number;
    away: number;
  };
  goalkeeperSaves: {
    home: number;
    away: number;
  };
  totalPasses: {
    home: number;
    away: number;
  };
  totalDribbles: {
    home: number;
    away: number;
  };
}

export interface ComparisonStat {
  label: string;
  home: number;
  away: number;
  isPercentage: boolean;
}

export interface Player {
  id?: string;
  jerseyNumber: number;
  name: string;
  position: string;
}

export interface MatchDetail {
  id: string;
  opponent: string;
  date: string;
  finalScore: string;
  homeScore: number;
  awayScore: number;
  result: MatchResult;
  goalScorers: GoalScorer[];
  manOfTheMatch: ManOfTheMatch;
  statistics: MatchStatistics;
  heatmapData: HeatmapPoint[];
  passData: PassData[];
  shotData: ShotData[];
  matchStats: {
    overview: ComparisonStat[];
    attacking: ComparisonStat[];
    passing: ComparisonStat[];
    defending: ComparisonStat[];
  };
  comparisonStats: {
    general: ComparisonStat[];
    attack: ComparisonStat[];
    passing: ComparisonStat[];
    defence: ComparisonStat[];
    discipline: ComparisonStat[];
  };
  lineup: Player[];
  awayLineup: Player[];
  substitutions: Substitution[];
}

export interface Substitution {
  playerOut: string;
  playerIn: string;
  minute: number;
}

// Player Types
export interface PlayerAttributes {
  attacking: number;
  technique: number;
  tactical: number;
  defending: number;
  creativity: number;
}

export interface PlayerAdvancedStat {
  label: string;
  player: number;
  teamAvg: number;
  isPercentage: boolean;
}

export interface PlayerData {
  id: string;
  jerseyNumber: number;
  name?: string;
  isLinked: boolean;
  inviteCode?: string;
  keyStat: string;
  image?: string;
  height?: string;
  weight?: string;
  goals: number;
  assists: number;
  minutesPlayed: number;
  matchesPlayed: number;
  avgPassRate: number;
  avgPossession?: number;
  distance?: number;
  avgPasses: number;
  avgShots?: number;
  avgShotsOnTarget?: number;
  totalPasses: number;
  totalShots: number;
  shotsOnTarget: number;
  yellowCards: number;
  redCards: number;
  attributes: PlayerAttributes;
  xG: number;
  shotsPerGame: number;
  shotsOnTargetPerGame: number;
  passesCompleted: number;
  totalDribbles: number;
  successfulDribbles: number;
  tackles: number;
  tackleSuccessRate: number;
  interceptions: number;
  interceptionSuccessRate: number;
  advancedStats?: PlayerAdvancedStat[];
}

// Field Visualization Types
export interface HeatmapPoint {
  x: number;
  y: number;
  intensity: number;
}

export interface PassData {
  from: { x: number; y: number };
  to: { x: number; y: number };
  successful: boolean;
}

export type ShotOutcome = 'goal' | 'on-target' | 'off-target' | 'blocked';

export interface ShotData {
  x: number;
  y: number;
  outcome: ShotOutcome;
}

// Club Types
export interface ClubData {
  clubName: string;
  coachName: string;
  standing: string;
  goalsScored: number;
  goalsConceded: number;
  cleanSheets: number;
  teamForm: ('W' | 'D' | 'L')[];
  heatmapData: HeatmapPoint[];
  passData: PassData[];
  shotData: ShotData[];
  recentMatches?: {
    id: string;
    date: string;
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    result: 'win' | 'draw' | 'loss';
  }[];
  basicStats: {
    matchesPlayed: number;
    wins: number;
    losses: number;
    draws: number;
    totalPoints: number;
    goalDifference: string;
    cleanSheets: number;
    totalGoalsScored: number;
    totalAssists: number;
    avgPasses: number;
    avgPossession: number;
    avgShots: number;
    avgPassCompletionRate: number;
    avgShotsOnTarget: number;
    avgShotsOnTargetPercentage: number;
    avgXg: number;
    avgDribbles: number;
    avgSuccessfulDribbles: number;
    avgFinalThirdPasses: number;
    avgCrosses: number;
    avgTackles: number;
    tackleSuccessRate: number;
    avgInterceptions: number;
    interceptionSuccessRate: number;
    avgBallRecoveries: number;
    avgSavesPerMatch: number;
  };
  advancedStats: ComparisonStat[];
}

// Training Types
export type TrainingStatus = 'completed' | 'pending' | 'in-progress';

export interface Exercise {
  name: string;
  description: string;
  sets: string;
  reps: string;
  minutes: string;
  completed: boolean;
}

export interface TrainingSession {
  day: string;
  focus: string;
  exercises: {
    name: string;
    sets: number;
    reps: number;
    time: string;
  }[];
}

export interface TrainingPlan {
  id: string;
  title: string;
  date: string;
  createdDate: string;
  status: TrainingStatus;
  type: string;
  playerName: string;
  playerJerseyNumber: number;
  playerImage: string;
  progress: number;
  exercisesCompleted: number;
  totalExercises: number;
  coachNotes: string;
  exercises: Exercise[];
  sessions: TrainingSession[];
}

// Match Player Stats Types
export interface MatchPlayerStats {
  opponent: string;
  date: string;
  homeScore: number;
  awayScore: number;
  playerName: string;
  jerseyNumber: number;
  rating: number;
  minutesPlayed: number;
  stats: {
    goals: number;
    assists: number;
    xG: number;
    shots: number;
    shotsOnTarget: number;
    totalDribbles: number;
    dribblesSuccessful: number;
    touchesInBox: number;
    totalPasses: number;
    passesCompleted: number;
    passAccuracy: number;
    shortPasses: number;
    longPasses: number;
    finalThirdPasses: number;
    crosses: number;
    keyPasses: number;
    dispossessed: number;
    tackles: number;
    tacklesWon: number;
    tacklesLost: number;
    tackleSuccessRate: number;
    interceptions: number;
    interceptionSuccessRate: number;
    ballRecovery: number;
    foulsCommitted: number;
    foulsSuffered: number;
    distanceCovered: string;
    duelsWon: number;
  };
  comparisonStats: ComparisonStat[];
  heatmapData: HeatmapPoint[];
  passData: PassData[];
  shotData: ShotData[];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}
