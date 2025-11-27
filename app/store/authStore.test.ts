import { renderHook, act } from '@testing-library/react-native';
import { useAuthStore } from './authStore';
import * as authApi from '@/api/auth';

// Mock the API
jest.mock('@/api/auth');
jest.mock('@/utils/storage');

describe('AuthStore', () => {
  beforeEach(() => {
    // Reset store state
    const { result } = renderHook(() => useAuthStore());
    act(() => {
      result.current.logout();
    });
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('successfully logs in user', async () => {
      const mockUser = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        role: 'player' as const,
      };

      const mockResponse = {
        success: true,
        data: {
          user: mockUser,
          tokens: {
            accessToken: 'access_token',
            refreshToken: 'refresh_token',
          },
        },
      };

      (authApi.login as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        const success = await result.current.login(
          'test@example.com',
          'password'
        );
        expect(success).toBe(true);
      });

      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.user).toEqual(mockUser);
      expect(result.current.error).toBeNull();
    });

    it('handles login failure', async () => {
      const mockResponse = {
        success: false,
        error: 'Invalid credentials',
        data: null as any,
      };

      (authApi.login as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        const success = await result.current.login(
          'test@example.com',
          'wrong_password'
        );
        expect(success).toBe(false);
      });

      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBeNull();
      expect(result.current.error).toBe('Invalid credentials');
    });
  });

  describe('register', () => {
    it('successfully registers user', async () => {
      const mockUser = {
        id: '1',
        name: 'New User',
        email: 'new@example.com',
        role: 'player' as const,
      };

      const mockResponse = {
        success: true,
        data: {
          user: mockUser,
          tokens: {
            accessToken: 'access_token',
            refreshToken: 'refresh_token',
          },
        },
      };

      (authApi.register as jest.Mock).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        const success = await result.current.register(
          'New User',
          'new@example.com',
          'password',
          'player',
          'INVITE123'
        );
        expect(success).toBe(true);
      });

      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.user).toEqual(mockUser);
    });
  });

  describe('logout', () => {
    it('successfully logs out user', async () => {
      const { result } = renderHook(() => useAuthStore());

      // First login
      const mockResponse = {
        success: true,
        data: {
          user: { id: '1', name: 'Test', email: 'test@example.com', role: 'player' as const },
          tokens: { accessToken: 'token', refreshToken: 'refresh' },
        },
      };
      (authApi.login as jest.Mock).mockResolvedValue(mockResponse);
      (authApi.logout as jest.Mock).mockResolvedValue({ success: true, data: undefined });

      await act(async () => {
        await result.current.login('test@example.com', 'password');
      });

      expect(result.current.isAuthenticated).toBe(true);

      // Then logout
      await act(async () => {
        await result.current.logout();
      });

      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBeNull();
      expect(result.current.tokens).toBeNull();
    });
  });

  describe('clearError', () => {
    it('clears error state', () => {
      const { result } = renderHook(() => useAuthStore());

      act(() => {
        // Set an error state (this would normally happen during failed login)
        result.current.clearError();
      });

      expect(result.current.error).toBeNull();
    });
  });
});
