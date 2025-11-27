import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import { API_CONFIG } from '@/constants/config';
import { authStorage } from '@/utils/storage';

/**
 * Axios instance with auth interceptors
 * Currently configured to use mock data, but ready for backend integration
 */

const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor to add auth token
 */
apiClient.interceptors.request.use(
  async (config) => {
    const token = await authStorage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor to handle errors
 */
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const refreshToken = await authStorage.getRefreshToken();
        if (refreshToken) {
          // TODO: Implement token refresh endpoint
          // const { data } = await axios.post(`${API_CONFIG.BASE_URL}/auth/refresh`, {
          //   refreshToken,
          // });
          // await authStorage.setToken(data.accessToken);
          // return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, clear auth and redirect to login
        await authStorage.clearAuth();
        // TODO: Navigate to login screen
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;

/**
 * Helper function to handle API errors
 */
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // Server responded with error
      return error.response.data?.message || error.response.data?.error || 'An error occurred';
    } else if (error.request) {
      // Request made but no response
      return 'Network error. Please check your connection.';
    }
  }
  return 'An unexpected error occurred';
};
