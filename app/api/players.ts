import apiClient from './client';
import { PlayerData, ApiResponse } from '@/types';
import { mockPlayers } from '@/data/mockData';
import { sleep } from '@/utils/helpers';

/**
 * Players API endpoints
 * Currently using mock data, but structured for easy backend integration
 */

/**
 * Get all players
 */
export const getPlayers = async (): Promise<ApiResponse<PlayerData[]>> => {
  try {
    // TODO: Replace with real API call
    // const response = await apiClient.get('/players');
    // return response.data;

    await sleep(800);

    return {
      success: true,
      data: mockPlayers,
    };
  } catch (error: any) {
    return {
      success: false,
      data: [],
      error: error.message || 'Failed to fetch players',
    };
  }
};

/**
 * Get player by ID
 */
export const getPlayerById = async (id: string): Promise<ApiResponse<PlayerData>> => {
  try {
    // TODO: Replace with real API call
    // const response = await apiClient.get(`/players/${id}`);
    // return response.data;

    await sleep(500);

    const player = mockPlayers.find(p => p.id === id);

    if (!player) {
      return {
        success: false,
        data: null as any,
        error: 'Player not found',
      };
    }

    return {
      success: true,
      data: player,
    };
  } catch (error: any) {
    return {
      success: false,
      data: null as any,
      error: error.message || 'Failed to fetch player',
    };
  }
};

/**
 * Get linked players (for coach view)
 */
export const getLinkedPlayers = async (): Promise<ApiResponse<PlayerData[]>> => {
  try {
    // TODO: Replace with real API call
    // const response = await apiClient.get('/players/linked');
    // return response.data;

    await sleep(800);

    const linkedPlayers = mockPlayers.filter(p => p.isLinked);

    return {
      success: true,
      data: linkedPlayers,
    };
  } catch (error: any) {
    return {
      success: false,
      data: [],
      error: error.message || 'Failed to fetch linked players',
    };
  }
};

/**
 * Get player statistics
 */
export const getPlayerStats = async (playerId: string): Promise<ApiResponse<PlayerData>> => {
  try {
    // TODO: Replace with real API call
    // const response = await apiClient.get(`/players/${playerId}/stats`);
    // return response.data;

    await sleep(500);

    const player = mockPlayers.find(p => p.id === playerId);

    if (!player) {
      return {
        success: false,
        data: null as any,
        error: 'Player not found',
      };
    }

    return {
      success: true,
      data: player,
    };
  } catch (error: any) {
    return {
      success: false,
      data: null as any,
      error: error.message || 'Failed to fetch player stats',
    };
  }
};
