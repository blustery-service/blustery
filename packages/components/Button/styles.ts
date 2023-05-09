export const buttonStyles = {
  root: 'gap-1 flex flex-row justify-center items-center rounded font-semibold text-sm min-w-[64px] capitalize box-border select-none',
  fullWidth: 'w-full',
  disable: {
    root: 'pointer-events-none',
    bg: 'bg-disabled-background',
    color: 'text-disabled',
  },
  contained: {
    root: 'border border-transparent',
    primary: {
      color: 'text-white',
      background: 'bg-primary',
      hover: 'hover:bg-primary-dark',
    },
    secondary: {
      color: 'text-white',
      background: 'bg-secondary',
      hover: 'hover:bg-secondary-dark',
    },
    info: {
      color: 'text-white',
      background: 'bg-info',
      hover: 'hover:bg-info-dark',
    },
    warning: {
      color: 'text-white',
      background: 'bg-warning',
      hover: 'hover:bg-warning-dark',
    },
    error: {
      color: 'text-black',
      background: 'bg-error',
      hover: 'hover:bg-error-dark',
    },
    success: {
      color: 'text-white',
      background: 'bg-success',
      hover: 'hover:bg-success-dark',
    },
  },
  outlined: {
    root: 'hover:bg-opacity-10 hover:border-opacity-50 bg-white border',
    primary: {
      color: 'text-primary',
      background: '',
      hover: 'hover:border-primary-dark hover:bg-primary ',
      border: 'border-primary',
    },
    secondary: {
      color: 'text-secondary',
      background: '',
      hover: 'hover:border-secondary-dark hover:bg-secondary',
      border: 'border-secondary',
    },
    info: {
      color: 'text-info',
      background: '',
      hover: 'hover:border-info-dark hover:bg-info',
      border: 'border-info',
    },
    warning: {
      color: 'text-warning',
      background: '',
      hover: 'hover:border-warning-dark hover:bg-warning',
      border: 'border-warning',
    },
    error: {
      color: 'text-error',
      background: '',
      hover: 'hover:border-error-dark hover:bg-error',
      border: 'border-error',
    },
    success: {
      color: 'text-success',
      background: '',
      hover: 'hover:border-success-dark hover:bg-success',
      border: 'border-success',
    },
  },
  text: {
    root: 'hover:bg-opacity-10 bg-white border border-transparent',
    primary: {
      color: 'text-primary',
      hover: 'hover:bg-primary',
    },
    secondary: {
      color: 'text-secondary',
      hover: 'hover:bg-secondary',
    },
    info: {
      color: 'text-info',
      hover: 'hover:bg-info',
    },
    warning: {
      color: 'text-warning',
      hover: 'hover:bg-warning',
    },
    error: {
      color: 'text-error',
      hover: 'hover:bg-error',
    },
    success: {
      color: 'text-success',
      hover: 'hover:bg-success',
    },
  },
  small: 'px-2 py-1.5 text-xs min-w-[56px]',
  medium: 'px-4 py-2 text-sm',
  large: 'px-6 py-2.5 text-base',
} as Record<string, any>;
