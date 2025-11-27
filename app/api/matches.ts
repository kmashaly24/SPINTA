import apiClient from './client';
import { Match, MatchDetail, ApiResponse } from '@/types';
import { mockMatches, mockUpcomingMatches, mockMatchDetail } from '@/data/mockData';
import { sleep } from '@/utils/helpers';

/**
 * Matches API endpoints
 * Currently using mock data, but structured for easy backend integration
 */

/**
 * Get all matches
 */
export const getMatches = async (): Promise<ApiResponse<Match[]>> => {
  try {
    // TODO: Replace with real API call
    // const response = await apiClient.get('/matches');
    // return response.data;

    await sleep(800);

    return {
      success: true,
      data: mockMatches,
    };
  } catch (error: any) {
    return {
      success: false,
      data: [],
      error: error.message || 'Failed to fetch matches',
    };
  }
};

/**
 * Get upcoming matches
 */
export const getUpcomingMatches = async (): Promise<ApiResponse<Match[]>> => {
  try {
    // TODO: Replace with real API call
    // const response = await apiClient.get('/matches/upcoming');
    // return response.data;

    await sleep(500);

    return {
      success: true,
      data: mockUpcomingMatches,
    };
  } catch (error: any) {
    return {
      success: false,
      data: [],
      error: error.message || 'Failed to fetch upcoming matches',
    };
  }
};

/**
 * Get past matches
 */
export const getPastMatches = async (): Promise<ApiResponse<Match[]>> => {
  try {
    // TODO: Replace with real API call
    // const response = await apiClient.get('/matches/past');
    // return response.data;

    await sleep(500);

    return {
      success: true,
      data: mockMatches,
    };
  } catch (error: any) {
    return {
      success: false,
      data: [],
      error: error.message || 'Failed to fetch past matches',
    };
  }
};

/**
 * Get match by ID with full details
 */
export const getMatchById = async (id: string): Promise<ApiResponse<MatchDetail>> => {
  try {
    // TODO: Replace with real API call
    // const response = await apiClient.get(`/matches/${id}`);
    // return response.data;

    await sleep(500);

    // For demo, return the mock match detail
    // In real app, this would fetch specific match data
    return {
      success: true,
      data: mockMatchDetail,
    };
  } catch (error: any) {
    return {
      success: false,
      data: null as any,
      error: error.message || 'Failed to fetch match details',
    };
  }
};
