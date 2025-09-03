/**
 * Design System Constants
 * Based on the box-dashboard prototype patterns
 */

// Brand Colors
export const colors = {
  primary: {
    main: '#D8550D',      // Primary brand orange
    hover: '#A8420A',     // Darker orange for hover states
    light: '#FFF7ED',     // Light orange background
  },
  status: {
    success: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      hover: 'hover:bg-green-100',
    },
    warning: {
      bg: 'bg-orange-100', 
      text: 'text-orange-800',
      hover: 'hover:bg-orange-100',
    },
    error: {
      bg: 'bg-red-100',
      text: 'text-red-800', 
      hover: 'hover:bg-red-100',
    },
    info: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      hover: 'hover:bg-blue-100',
    },
  },
  gray: {
    50: 'bg-gray-50',
    100: 'bg-gray-100',
    200: 'border-gray-200',
    300: 'border-gray-300',
    400: 'text-gray-400',
    500: 'text-gray-500', 
    600: 'text-gray-600',
    900: 'text-gray-900',
  }
} as const;

// Typography
export const typography = {
  heading: {
    h1: 'text-2xl font-bold text-gray-900',
    h2: 'text-xl font-semibold text-gray-900',
    h3: 'text-lg font-semibold text-gray-900',
  },
  body: {
    default: 'text-sm text-gray-600',
    medium: 'text-sm font-medium',
    small: 'text-xs text-gray-500',
  },
  label: 'text-sm font-medium',
} as const;

// Spacing and Layout
export const spacing = {
  component: 'space-y-6',
  form: 'space-y-4',
  section: 'space-y-8',
  tight: 'space-y-2',
} as const;

// Component Patterns
export const patterns = {
  card: 'bg-white border border-gray-200 rounded-lg',
  input: 'w-full bg-white border-gray-200',
  button: {
    primary: 'text-white',
    primaryStyle: { backgroundColor: colors.primary.main },
    secondary: 'variant="outline"',
  },
  table: {
    row: 'hover:bg-gray-50 transition-colors',
    header: 'text-left font-medium',
  },
  form: {
    sheet: 'w-full sm:max-w-md flex flex-col',
    field: 'space-y-2',
    actions: 'flex gap-3 px-6 py-4 border-t mt-auto',
  }
} as const;

// Animation and Transitions
export const animations = {
  transition: 'transition-colors duration-200',
  hover: 'hover:bg-gray-50 transition-colors',
} as const;

// Icon Sizes
export const iconSizes = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4', 
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
} as const;

// Avatar Sizes  
export const avatarSizes = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-10 w-10',
  xl: 'h-12 w-12',
} as const;

// Layout Constants
export const layout = {
  sidebar: {
    width: 'w-64',
    collapsed: 'w-16',
  },
  content: {
    padding: 'px-6 pb-6',
    paddingWithNav: 'px-6 pt-0 pb-6', // No top padding when there's top navigation
    maxWidth: 'max-w-7xl mx-auto',
  },
  header: {
    height: 'h-16',
    padding: 'px-6',
  }
} as const;