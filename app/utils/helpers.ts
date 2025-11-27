import { MATCH_STATUS, MatchStatus } from '@/constants/config';
import { COLORS } from '@/constants/theme';

/**
 * Format a date to a readable string
 */
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  // Validate date
  if (!d || isNaN(d.getTime())) {
    return 'Invalid Date';
  }
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return d.toLocaleDateString('en-US', options);
};

/**
 * Format a time to a readable string
 */
export const formatTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  // Validate date
  if (!d || isNaN(d.getTime())) {
    return 'Invalid Time';
  }
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };
  return d.toLocaleTimeString('en-US', options);
};

/**
 * Format a date and time together
 */
export const formatDateTime = (date: Date | string): string => {
  return `${formatDate(date)} at ${formatTime(date)}`;
};

/**
 * Get relative time (e.g., "2 hours ago", "in 3 days")
 */
export const getRelativeTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  // Validate date
  if (!d || isNaN(d.getTime())) {
    return 'Invalid Date';
  }
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
};

/**
 * Get match status color
 */
export const getMatchStatusColor = (status: MatchStatus): string => {
  switch (status) {
    case MATCH_STATUS.WIN:
      return COLORS.success;
    case MATCH_STATUS.LOSS:
      return COLORS.error;
    case MATCH_STATUS.DRAW:
      return COLORS.warning;
    case MATCH_STATUS.UPCOMING:
      return COLORS.info;
    default:
      return COLORS.gray500;
  }
};

/**
 * Get match status background color
 */
export const getMatchStatusBgColor = (status: MatchStatus): string => {
  switch (status) {
    case MATCH_STATUS.WIN:
      return COLORS.successBg;
    case MATCH_STATUS.LOSS:
      return COLORS.errorBg;
    case MATCH_STATUS.DRAW:
      return COLORS.warningBg;
    case MATCH_STATUS.UPCOMING:
      return COLORS.infoBg;
    default:
      return COLORS.gray50;
  }
};

/**
 * Truncate text with ellipsis
 */
export const truncate = (text: string, maxLength: number): string => {
  // Validate inputs
  if (!text || typeof text !== 'string') return '';
  if (!Number.isFinite(maxLength) || maxLength <= 0) return text;
  if (maxLength < 4) return text.substring(0, maxLength);
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

/**
 * Capitalize first letter
 */
export const capitalize = (text: string): string => {
  // Validate input
  if (!text || typeof text !== 'string') return '';
  if (text.length === 0) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Format number with commas (e.g., 1000 -> 1,000)
 */
export const formatNumber = (num: number): string => {
  // Validate input
  if (!Number.isFinite(num)) return '0';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Calculate percentage
 */
export const calculatePercentage = (value: number, total: number): number => {
  // Validate inputs
  if (!Number.isFinite(value) || !Number.isFinite(total)) return 0;
  if (total === 0) return 0;
  if (value < 0 || total < 0) return 0;

  const percentage = (value / total) * 100;
  return Math.round(Number.isFinite(percentage) ? percentage : 0);
};

/**
 * Clamp a number between min and max
 */
export const clamp = (value: number, min: number, max: number): number => {
  // Validate inputs
  if (!Number.isFinite(value) || !Number.isFinite(min) || !Number.isFinite(max)) {
    return 0;
  }
  if (min > max) {
    console.warn(`clamp: min (${min}) is greater than max (${max}), swapping values`);
    [min, max] = [max, min];
  }
  return Math.min(Math.max(value, min), max);
};

/**
 * Generate initials from name (e.g., "John Doe" -> "JD")
 */
export const getInitials = (name: string): string => {
  // Validate input
  if (!name || typeof name !== 'string') return '?';
  const trimmed = name.trim();
  if (trimmed.length === 0) return '?';

  const parts = trimmed.split(' ').filter(part => part.length > 0);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Generate a unique ID
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Sleep/delay function
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Calculate win rate percentage
 */
export const calculateWinRate = (wins: number, total: number): number => {
  return calculatePercentage(wins, total);
};

/**
 * Format player position abbreviation
 */
export const formatPosition = (position: string): string => {
  const positions: Record<string, string> = {
    goalkeeper: 'GK',
    defender: 'DEF',
    midfielder: 'MID',
    forward: 'FWD',
    striker: 'ST',
  };
  return positions[position.toLowerCase()] || position.toUpperCase();
};
