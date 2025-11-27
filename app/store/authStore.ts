import { create } from 'zustand';
import { User, AuthTokens, UserRole } from '@/types';
import { authStorage } from '@/utils/storage';
import * as authApi from '@/api/auth';

/**
 * Auth Store using Zustand
 * Manages authentication state and operations
 */

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string, inviteCode?: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: UserRole, inviteCode: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loadStoredAuth: () => Promise<void>;
  setUser: (user: User) => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  /**
   * Login user
   */
  login: async (email: string, password: string, inviteCode?: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await authApi.login({ email, password, inviteCode });

      if (response.success && response.data) {
        const { user, tokens } = response.data;

        // Store tokens and user data (non-fatal if storage fails)
        try {
          await authStorage.setToken(tokens.accessToken);
          await authStorage.setRefreshToken(tokens.refreshToken);
          await authStorage.setUserData(user);
          await authStorage.setUserRole(user.role);
        } catch (storageError) {
          console.warn('Failed to persist auth data to storage:', storageError);
          // Continue anyway - user is authenticated in memory
        }

        set({
          user,
          tokens,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });

        return true;
      } else {
        set({
          isLoading: false,
          error: response.error || 'Login failed',
        });
        return false;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      set({
        isLoading: false,
        error: errorMessage,
      });
      return false;
    }
  },

  /**
   * Register new user
   */
  register: async (
    name: string,
    email: string,
    password: string,
    role: UserRole,
    inviteCode: string
  ) => {
    set({ isLoading: true, error: null });

    try {
      const response = await authApi.register({
        name,
        email,
        password,
        role,
        inviteCode,
      });

      if (response.success && response.data) {
        const { user, tokens } = response.data;

        // Store tokens and user data (non-fatal if storage fails)
        try {
          await authStorage.setToken(tokens.accessToken);
          await authStorage.setRefreshToken(tokens.refreshToken);
          await authStorage.setUserData(user);
          await authStorage.setUserRole(user.role);
        } catch (storageError) {
          console.warn('Failed to persist auth data to storage:', storageError);
          // Continue anyway - user is authenticated in memory
        }

        set({
          user,
          tokens,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });

        return true;
      } else {
        set({
          isLoading: false,
          error: response.error || 'Registration failed',
        });
        return false;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      set({
        isLoading: false,
        error: errorMessage,
      });
      return false;
    }
  },

  /**
   * Logout user
   */
  logout: async () => {
    set({ isLoading: true });

    try {
      await authApi.logout();

      // Clear local storage (non-fatal if fails)
      try {
        await authStorage.clearAuth();
      } catch (storageError) {
        console.warn('Failed to clear auth storage:', storageError);
      }

      set({
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      // Even if API call fails, clear local data
      try {
        await authStorage.clearAuth();
      } catch (storageError) {
        console.warn('Failed to clear auth storage:', storageError);
      }

      const errorMessage = error instanceof Error ? error.message : 'Logout failed';
      set({
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
        error: errorMessage,
      });
    }
  },

  /**
   * Load stored authentication data on app startup
   */
  loadStoredAuth: async () => {
    set({ isLoading: true });

    try {
      const [token, userData, role] = await Promise.all([
        authStorage.getToken(),
        authStorage.getUserData(),
        authStorage.getUserRole(),
      ]);

      if (token && userData && role) {
        set({
          user: userData,
          tokens: { accessToken: token, refreshToken: '' },
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({
          isLoading: false,
          isAuthenticated: false,
        });
      }
    } catch (error) {
      set({
        isLoading: false,
        isAuthenticated: false,
      });
    }
  },

  /**
   * Set user (for updates)
   */
  setUser: async (user: User) => {
    set({ user });
    try {
      await authStorage.setUserData(user);
    } catch (error) {
      console.error('Failed to persist user data:', error);
      // User is still updated in memory, just log the storage error
    }
  },

  /**
   * Clear error
   */
  clearError: () => {
    set({ error: null });
  },
}));
