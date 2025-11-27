/**
 * React Query hooks for data fetching
 * Provides type-safe hooks for all API endpoints
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/config';
import * as playersApi from '@/api/players';
import * as matchesApi from '@/api/matches';
import * as clubApi from '@/api/club';

/**
 * Players Hooks
 */
export const usePlayers = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.PLAYERS],
    queryFn: async () => {
      const response = await playersApi.getPlayers();
      if (!response.success) throw new Error(response.error);
      return response.data;
    },
  });
};

export const useLinkedPlayers = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.PLAYERS, 'linked'],
    queryFn: async () => {
      const response = await playersApi.getLinkedPlayers();
      if (!response.success) throw new Error(response.error);
      return response.data;
    },
  });
};

export const usePlayer = (playerId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PLAYER_DETAIL, playerId],
    queryFn: async () => {
      const response = await playersApi.getPlayerById(playerId);
      if (!response.success) throw new Error(response.error);
      return response.data;
    },
    enabled: !!playerId,
  });
};

export const usePlayerStats = (playerId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PLAYER_STATS, playerId],
    queryFn: async () => {
      const response = await playersApi.getPlayerStats(playerId);
      if (!response.success) throw new Error(response.error);
      return response.data;
    },
    enabled: !!playerId,
  });
};

/**
 * Matches Hooks
 */
export const useMatches = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.MATCHES],
    queryFn: async () => {
      const response = await matchesApi.getMatches();
      if (!response.success) throw new Error(response.error);
      return response.data;
    },
  });
};

export const useUpcomingMatches = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.UPCOMING_MATCHES],
    queryFn: async () => {
      const response = await matchesApi.getUpcomingMatches();
      if (!response.success) throw new Error(response.error);
      return response.data;
    },
  });
};

export const usePastMatches = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.PAST_MATCHES],
    queryFn: async () => {
      const response = await matchesApi.getPastMatches();
      if (!response.success) throw new Error(response.error);
      return response.data;
    },
  });
};

export const useMatch = (matchId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.MATCH_DETAIL, matchId],
    queryFn: async () => {
      const response = await matchesApi.getMatchById(matchId);
      if (!response.success) throw new Error(response.error);
      return response.data;
    },
    enabled: !!matchId,
  });
};

/**
 * Club Hooks
 */
export const useClubData = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CLUB_INFO],
    queryFn: async () => {
      const response = await clubApi.getClubData();
      if (!response.success) throw new Error(response.error);
      return response.data;
    },
  });
};

/**
 * Training Hooks
 */
export const useTrainingPlans = (playerId?: string) => {
  return useQuery({
    queryKey: playerId
      ? [QUERY_KEYS.TRAINING_PLANS, playerId]
      : [QUERY_KEYS.TRAINING_PLANS],
    queryFn: async () => {
      const response = await clubApi.getTrainingPlans(playerId);
      if (!response.success) throw new Error(response.error);
      return response.data;
    },
  });
};

export const useTrainingPlan = (planId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.TRAINING_PLANS, planId],
    queryFn: async () => {
      const response = await clubApi.getTrainingPlanById(planId);
      if (!response.success) throw new Error(response.error);
      return response.data;
    },
    enabled: !!planId,
  });
};

/**
 * Training Mutations
 */
export const useUpdateTrainingProgress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      planId,
      exerciseIndex,
      completed,
    }: {
      planId: string;
      exerciseIndex: number;
      completed: boolean;
    }) => {
      const response = await clubApi.updateTrainingProgress(planId, exerciseIndex, completed);
      if (!response.success) throw new Error(response.error);
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch training plans
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TRAINING_PLANS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TRAINING_PLANS, variables.planId] });
    },
  });
};
