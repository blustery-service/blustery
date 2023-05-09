export type Variants =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'subtitle1'
  | 'subtitle2';

export type TypographyPropsVariants = {
  h1?: React.ComponentProps<'a'>;
  h2?: React.ComponentProps<'h2'>;
  h3?: React.ComponentProps<'h3'>;
  h4?: React.ComponentProps<'h4'>;
  h5?: React.ComponentProps<'h5'>;
  h6?: React.ComponentProps<'h6'>;
  body1?: React.ComponentProps<'p'>;
  body2?: React.ComponentProps<'p'>;
  caption?: React.ComponentProps<'span'>;
  subtitle1?: React.ComponentProps<'span'>;
  subtitle2?: React.ComponentProps<'span'>;
};

export type Color = 'primary' | 'secondary' | 'info' | 'warning' | 'error' | 'success' | 'text.secondary' | 'text';

export const typographyStyles = {
  root: 'tracking-normal font-sans',
  h1: 'text-[58px] font-extrabold leading-normal',
  h2: 'text-4xl font-extrabold leading-normal',
  h3: 'text-3xl font-bold leading-normal',
  h4: 'text-2xl font-bold leading-normal',
  h5: 'text-xl font-bold leading-normal',
  h6: 'text-lg font-bold leading-normal',
  body1: 'text-base leading-6 font-normal',
  body2: 'text-sm font-normal',
  caption: 'text-xs font-normal',
  subtitle1: 'text-base font-semibold',
  subtitle2: 'text-sm font-semibold',
  text: 'dark:text-white text-black',
  primary: 'text-primary',
  secondary: 'text-secondary',
  info: 'text-info',
  warning: 'text-warning',
  error: 'text-error',
  success: 'text-success',
  underline: 'underline',
  disable: 'text-disabled pointer-events-none select-none',
  'text.secondary': 'text-neutral-600',
} as any;
