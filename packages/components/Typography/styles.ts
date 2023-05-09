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
  | 'subtitle2'
  | 'overline';

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
  overline?: React.ComponentProps<'span'>;
};

export const typographyStyles = {
  root: 'tracking-normal',
  h1: 'text-h1 font-extrabold',
  h2: 'text-h2 font-extrabold',
  h3: 'text-h3 font-bold',
  h4: 'text-h4 font-bold',
  h5: 'text-h5 font-bold',
  h6: 'text-h6 font-bold',
  body1: 'symbol',
  body2: 'symbol',
  caption: 'symbol',
  subtitle1: 'symbol',
  subtitle2: 'symbol',
  overline: 'symbol',
  // leadingNone: 'leading-none',
};
