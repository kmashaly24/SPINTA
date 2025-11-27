import apiClient from './client';
import { User, AuthTokens, ApiResponse, UserRole } from '@/types';
import { mockCoachData, mockPlayerData } from '@/data/mockData';
import { sleep } from '@/utils/helpers';

/**
 * Auth API endpoints
 * Currently using mock data, but structured for easy backend integration
 */

interface LoginRequest {
  email: string;
  password: string;
  inviteCode?: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  inviteCode: string;
}

interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}

/**
 * Login with email and password
 * MOCK IMPLEMENTATION - Replace with real API call
 */
export const login = async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
  try {
    // TODO: Replace with real API call
    // const response = await apiClient.post('/auth/login', data);
    // return response.data;

    // Mock implementation
    await sleep(1000); // Simulate network delay

    // Mock validation
    if (!data.email || !data.password) {
      return {
        success: false,
        data: null as any,
        error: 'Email and password are required',
      };
    }

    // Determine mock user based on email
    const isCoach = data.email.includes('coach') || data.email.includes('john');
    const user = isCoach ? mockCoachData : mockPlayerData;

    return {
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
          inviteCode: user.inviteCode,
        },
        tokens: {
          accessToken: 'mock_access_token_' + user.id,
          refreshToken: 'mock_refresh_token_' + user.id,
        },
      },
    };
  } catch (error: any) {
    return {
      success: false,
      data: null as any,
      error: error.message || 'Login failed',
    };
  }
};

/**
 * Register new user
 * MOCK IMPLEMENTATION - Replace with real API call
 */
export const register = async (data: RegisterRequest): Promise<ApiResponse<LoginResponse>> => {
  try {
    // TODO: Replace with real API call
    // const response = await apiClient.post('/auth/register', data);
    // return response.data;

    // Mock implementation
    await sleep(1000);

    // Mock validation
    if (!data.email || !data.password || !data.name) {
      return {
        success: false,
        data: null as any,
        error: 'All fields are required',
      };
    }

    // Only validate invite code for players
    if (data.role === 'player') {
      if (!data.inviteCode) {
        return {
          success: false,
          data: null as any,
          error: 'Invite code is required for players',
        };
      }
      if (data.inviteCode !== 'SPINTA2025') {
        return {
          success: false,
          data: null as any,
          error: 'Invalid invite code',
        };
      }
    }

    // Create mock user
    const user: User = {
      id: 'user_' + Date.now(),
      name: data.name,
      email: data.email,
      role: data.role,
      inviteCode: data.inviteCode,
    };

    return {
      success: true,
      data: {
        user,
        tokens: {
          accessToken: 'mock_access_token_' + user.id,
          refreshToken: 'mock_refresh_token_' + user.id,
        },
      },
    };
  } catch (error: any) {
    return {
      success: false,
      data: null as any,
      error: error.message || 'Registration failed',
    };
  }
};

/**
 * Logout user
 */
export const logout = async (): Promise<ApiResponse<void>> => {
  try {
    // TODO: Replace with real API call
    // await apiClient.post('/auth/logout');

    await sleep(500);

    return {
      success: true,
      data: undefined as any,
    };
  } catch (error: any) {
    return {
      success: false,
      data: undefined as any,
      error: error.message || 'Logout failed',
    };
  }
};

/**
 * Get current user
 */
export const getCurrentUser = async (): Promise<ApiResponse<User>> => {
  try {
    // TODO: Replace with real API call
    // const response = await apiClient.get('/auth/me');
    // return response.data;

    await sleep(500);

    // Mock - return coach data
    return {
      success: true,
      data: {
        id: mockCoachData.id,
        name: mockCoachData.name,
        email: mockCoachData.email,
        role: mockCoachData.role,
        image: mockCoachData.image,
        inviteCode: mockCoachData.inviteCode,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      data: null as any,
      error: error.message || 'Failed to get user',
    };
  }
};

/**
 * Refresh auth token
 */
export const refreshToken = async (refreshToken: string): Promise<ApiResponse<AuthTokens>> => {
  try {
    // TODO: Replace with real API call
    // const response = await apiClient.post('/auth/refresh', { refreshToken });
    // return response.data;

    await sleep(500);

    return {
      success: true,
      data: {
        accessToken: 'new_mock_access_token',
        refreshToken: 'new_mock_refresh_token',
      },
    };
  } catch (error: any) {
    return {
      success: false,
      data: null as any,
      error: error.message || 'Token refresh failed',
    };
  }
};
