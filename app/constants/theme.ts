/**
 * Spinta Mobile Theme
 * Matches the website design system exactly
 */

export const COLORS = {
  // Primary Colors
  primary: '#030213',
  primaryForeground: '#ffffff',

  // Background Colors
  background: '#ffffff',
  foreground: '#333333',

  // Brand Gradient (Yellow to Red)
  gradientStart: '#facc15', // yellow-400
  gradientEnd: '#ef4444',   // red-500

  // Semantic Colors
  success: '#22c55e',       // green-600
  successLight: '#4ade80',  // green-400
  error: '#ef4444',         // red-500
  errorLight: '#f87171',    // red-400
  warning: '#6b7280',       // gray-500
  info: '#3b82f6',          // blue-500
  orange: '#f97316',        // orange-500

  // Status Background Tints
  successBg: '#f0fdf4',     // green-50
  errorBg: '#fef2f2',       // red-50
  warningBg: '#f9fafb',     // gray-50
  infoBg: '#eff6ff',        // blue-50
  orangeBg: '#fff7ed',      // orange-50
  yellowBg: '#fefce8',      // yellow-50
  creamBg: '#FFF9E6',       // Cream/beige for selected cards and info boxes

  // Gray Scale
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',

  // UI Element Colors
  inputBackground: '#f3f3f5',
  border: 'rgba(0, 0, 0, 0.1)',
  borderLight: 'rgba(0, 0, 0, 0.05)',
  muted: '#ececf0',
  mutedForeground: '#717182',
  accent: '#e9ebef',
  secondary: '#f5f5f9',
  switchBackground: '#cbced4',

  // Soccer Field Colors
  fieldGreen: '#4ade80',
  fieldWhite: '#ffffff',
  heatmapRed: '#ef4444',
  passSuccess: '#fbbf24',  // yellow-400
  passFail: '#ef4444',     // red-500

  // Dark Mode (optional)
  dark: {
    background: '#0f0f0f',
    foreground: '#fafafa',
    card: '#1a1a1a',
    border: 'rgba(255, 255, 255, 0.1)',
  },
};

export const TYPOGRAPHY = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },

  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },

  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

export const BORDER_RADIUS = {
  sm: 6,
  md: 8,
  lg: 10,
  xl: 12,
  '2xl': 16,
  '3xl': 24,
  full: 9999,
};

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
};

export const LAYOUT = {
  // Screen padding
  screenPaddingHorizontal: SPACING.lg, // 24px
  screenPaddingVertical: SPACING.lg,   // 24px

  // Card padding
  cardPadding: SPACING.lg,             // 24px
  cardPaddingSm: SPACING.md,           // 16px

  // Bottom navigation height
  bottomNavHeight: 60,
  bottomNavSafeArea: 24, // Additional padding for devices with notch

  // Header height
  headerHeight: 60,

  // Icon sizes
  iconXs: 16,
  iconSm: 20,
  iconMd: 24,
  iconLg: 32,
  iconXl: 40,

  // Avatar sizes
  avatarSm: 32,
  avatarMd: 40,
  avatarLg: 64,
  avatarXl: 96,

  // Button heights
  buttonSm: 32,
  buttonMd: 40,
  buttonLg: 48,

  // Input heights
  inputHeight: 40,
};

export const ANIMATION = {
  // Duration (in milliseconds)
  fast: 150,
  normal: 300,
  slow: 500,

  // Easing
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
};

// Gradient presets
export const GRADIENTS = {
  primary: [COLORS.gradientStart, COLORS.gradientEnd],
  success: ['#22c55e', '#16a34a'],
  error: ['#ef4444', '#dc2626'],
  info: ['#3b82f6', '#2563eb'],
  orange: ['#fb923c', '#f97316'],
  accent: ['#fef3c7', '#fcd34d'],
  badges: {
    win: [COLORS.successLight, COLORS.success],
    loss: [COLORS.errorLight, COLORS.error],
    draw: ['#e5e7eb', '#9ca3af'],
  },
};

// Export default theme object
export const theme = {
  colors: COLORS,
  typography: TYPOGRAPHY,
  spacing: SPACING,
  borderRadius: BORDER_RADIUS,
  shadows: SHADOWS,
  layout: LAYOUT,
  animation: ANIMATION,
  gradients: GRADIENTS,
};

export type Theme = typeof theme;
