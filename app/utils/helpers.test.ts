import {
  formatDate,
  formatTime,
  getMatchStatusColor,
  getMatchStatusBgColor,
  truncate,
  capitalize,
  formatNumber,
  calculatePercentage,
  clamp,
  getInitials,
  isValidEmail,
} from './helpers';
import { COLORS } from '@/constants/theme';

describe('Helpers', () => {
  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = new Date('2024-01-15');
      const formatted = formatDate(date);
      expect(formatted).toContain('Jan');
      expect(formatted).toContain('15');
    });

    it('handles string dates', () => {
      const formatted = formatDate('2024-01-15');
      expect(formatted).toContain('Jan');
    });
  });

  describe('formatTime', () => {
    it('formats time correctly', () => {
      const date = new Date('2024-01-15T14:30:00');
      const formatted = formatTime(date);
      expect(formatted).toMatch(/\d{1,2}:\d{2}/);
    });
  });

  describe('getMatchStatusColor', () => {
    it('returns correct color for win', () => {
      expect(getMatchStatusColor('win')).toBe(COLORS.success);
    });

    it('returns correct color for loss', () => {
      expect(getMatchStatusColor('loss')).toBe(COLORS.error);
    });

    it('returns correct color for draw', () => {
      expect(getMatchStatusColor('draw')).toBe(COLORS.warning);
    });

    it('returns correct color for upcoming', () => {
      expect(getMatchStatusColor('upcoming')).toBe(COLORS.info);
    });
  });

  describe('getMatchStatusBgColor', () => {
    it('returns correct background color for win', () => {
      expect(getMatchStatusBgColor('win')).toBe(COLORS.successBg);
    });

    it('returns correct background color for loss', () => {
      expect(getMatchStatusBgColor('loss')).toBe(COLORS.errorBg);
    });
  });

  describe('truncate', () => {
    it('truncates long text', () => {
      const text = 'This is a very long text';
      expect(truncate(text, 10)).toBe('This is...');
    });

    it('does not truncate short text', () => {
      const text = 'Short';
      expect(truncate(text, 10)).toBe('Short');
    });
  });

  describe('capitalize', () => {
    it('capitalizes first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    it('handles already capitalized text', () => {
      expect(capitalize('Hello')).toBe('Hello');
    });
  });

  describe('formatNumber', () => {
    it('formats numbers with commas', () => {
      expect(formatNumber(1000)).toBe('1,000');
      expect(formatNumber(1000000)).toBe('1,000,000');
    });

    it('does not add commas to small numbers', () => {
      expect(formatNumber(100)).toBe('100');
    });
  });

  describe('calculatePercentage', () => {
    it('calculates percentage correctly', () => {
      expect(calculatePercentage(50, 100)).toBe(50);
      expect(calculatePercentage(25, 100)).toBe(25);
    });

    it('handles zero total', () => {
      expect(calculatePercentage(10, 0)).toBe(0);
    });

    it('rounds to nearest integer', () => {
      expect(calculatePercentage(1, 3)).toBe(33);
    });
  });

  describe('clamp', () => {
    it('clamps value within range', () => {
      expect(clamp(5, 0, 10)).toBe(5);
      expect(clamp(-5, 0, 10)).toBe(0);
      expect(clamp(15, 0, 10)).toBe(10);
    });
  });

  describe('getInitials', () => {
    it('gets initials from full name', () => {
      expect(getInitials('John Doe')).toBe('JD');
    });

    it('handles single name', () => {
      expect(getInitials('John')).toBe('J');
    });

    it('handles three names', () => {
      expect(getInitials('John Peter Doe')).toBe('JD');
    });
  });

  describe('isValidEmail', () => {
    it('validates correct emails', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
    });

    it('rejects invalid emails', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('no@domain')).toBe(false);
      expect(isValidEmail('@domain.com')).toBe(false);
    });
  });
});
