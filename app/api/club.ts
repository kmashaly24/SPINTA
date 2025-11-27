import apiClient from './client';
import { ClubData, TrainingPlan, ApiResponse } from '@/types';
import { mockClubData, mockTrainingPlans } from '@/data/mockData';
import { sleep } from '@/utils/helpers';

/**
 * Club and Training API endpoints
 * Currently using mock data, but structured for easy backend integration
 */

/**
 * Get club data and statistics
 */
export const getClubData = async (): Promise<ApiResponse<ClubData>> => {
  try {
    // TODO: Replace with real API call
    // const response = await apiClient.get('/club');
    // return response.data;

    await sleep(800);

    return {
      success: true,
      data: mockClubData,
    };
  } catch (error: any) {
    return {
      success: false,
      data: null as any,
      error: error.message || 'Failed to fetch club data',
    };
  }
};

/**
 * Get training plans
 */
export const getTrainingPlans = async (playerId?: string): Promise<ApiResponse<TrainingPlan[]>> => {
  try {
    // TODO: Replace with real API call
    // const response = await apiClient.get('/training', { params: { playerId } });
    // return response.data;

    await sleep(500);

    return {
      success: true,
      data: mockTrainingPlans,
    };
  } catch (error: any) {
    return {
      success: false,
      data: [],
      error: error.message || 'Failed to fetch training plans',
    };
  }
};

/**
 * Get training plan by ID
 */
export const getTrainingPlanById = async (id: string): Promise<ApiResponse<TrainingPlan>> => {
  try {
    // TODO: Replace with real API call
    // const response = await apiClient.get(`/training/${id}`);
    // return response.data;

    await sleep(500);

    const plan = mockTrainingPlans.find(p => p.id === id);

    if (!plan) {
      return {
        success: false,
        data: null as any,
        error: 'Training plan not found',
      };
    }

    return {
      success: true,
      data: plan,
    };
  } catch (error: any) {
    return {
      success: false,
      data: null as any,
      error: error.message || 'Failed to fetch training plan',
    };
  }
};

/**
 * Update training plan progress
 */
export const updateTrainingProgress = async (
  planId: string,
  exerciseIndex: number,
  completed: boolean
): Promise<ApiResponse<TrainingPlan>> => {
  try {
    // TODO: Replace with real API call
    // const response = await apiClient.patch(`/training/${planId}/exercise/${exerciseIndex}`, {
    //   completed,
    // });
    // return response.data;

    await sleep(300);

    const plan = mockTrainingPlans.find(p => p.id === planId);

    if (!plan) {
      return {
        success: false,
        data: null as any,
        error: 'Training plan not found',
      };
    }

    // Mock update
    if (plan.exercises[exerciseIndex]) {
      plan.exercises[exerciseIndex].completed = completed;
      plan.exercisesCompleted = plan.exercises.filter(e => e.completed).length;
      plan.progress = Math.round((plan.exercisesCompleted / plan.totalExercises) * 100);
    }

    return {
      success: true,
      data: plan,
    };
  } catch (error: any) {
    return {
      success: false,
      data: null as any,
      error: error.message || 'Failed to update training progress',
    };
  }
};
