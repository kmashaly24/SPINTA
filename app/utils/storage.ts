import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '@/constants/config';

/**
 * Storage utility for AsyncStorage
 * Provides type-safe methods for storing and retrieving data
 */

export const storage = {
  /**
   * Store a value
   */
  async set(key: string, value: any): Promise<void> {
    try {
      const stringValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, stringValue);
    } catch (error) {
      console.error(`Error storing ${key}:`, error);
      throw error;
    }
  },

  /**
   * Get a value
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error retrieving ${key}:`, error);
      return null;
    }
  },

  /**
   * Remove a value
   */
  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
      throw error;
    }
  },

  /**
   * Clear all storage
   */
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  },

  /**
   * Get multiple values
   */
  async getMultiple(keys: string[]): Promise<Record<string, any>> {
    try {
      const values = await AsyncStorage.multiGet(keys);
      return values.reduce((acc, [key, value]) => {
        acc[key] = value ? JSON.parse(value) : null;
        return acc;
      }, {} as Record<string, any>);
    } catch (error) {
      console.error('Error getting multiple values:', error);
      return {};
    }
  },

  /**
   * Set multiple values
   */
  async setMultiple(items: [string, any][]): Promise<void> {
    try {
      const stringItems: [string, string][] = items.map(([key, value]) => [
        key,
        JSON.stringify(value),
      ]);
      await AsyncStorage.multiSet(stringItems);
    } catch (error) {
      console.error('Error setting multiple values:', error);
      throw error;
    }
  },
};

/**
 * Auth-specific storage helpers
 */
export const authStorage = {
  async setToken(token: string): Promise<void> {
    await storage.set(STORAGE_KEYS.AUTH_TOKEN, token);
  },

  async getToken(): Promise<string | null> {
    return storage.get<string>(STORAGE_KEYS.AUTH_TOKEN);
  },

  async setRefreshToken(token: string): Promise<void> {
    await storage.set(STORAGE_KEYS.REFRESH_TOKEN, token);
  },

  async getRefreshToken(): Promise<string | null> {
    return storage.get<string>(STORAGE_KEYS.REFRESH_TOKEN);
  },

  async setUserData(userData: any): Promise<void> {
    await storage.set(STORAGE_KEYS.USER_DATA, userData);
  },

  async getUserData(): Promise<any> {
    return storage.get(STORAGE_KEYS.USER_DATA);
  },

  async setUserRole(role: string): Promise<void> {
    await storage.set(STORAGE_KEYS.USER_ROLE, role);
  },

  async getUserRole(): Promise<string | null> {
    return storage.get<string>(STORAGE_KEYS.USER_ROLE);
  },

  async clearAuth(): Promise<void> {
    await Promise.all([
      storage.remove(STORAGE_KEYS.AUTH_TOKEN),
      storage.remove(STORAGE_KEYS.REFRESH_TOKEN),
      storage.remove(STORAGE_KEYS.USER_DATA),
      storage.remove(STORAGE_KEYS.USER_ROLE),
    ]);
  },
};
