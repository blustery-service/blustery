import React, { ReactNode } from 'react';
import { Color, TypographyPropsVariants, Variants, typographyStyles } from './styles';
import { twMerge } from 'tailwind-merge';
import { classNames, objectToString } from '@packages/utils';

const variantMapping: Record<Variants, keyof JSX.IntrinsicElements> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  subtitle1: 'span',
  subtitle2: 'span',
};

export type CommonProps = {
  variant?: Variants;
  children?: ReactNode;
  color?: Color;
  disable?: boolean;
  underline?: boolean;
  // Add any additional props you want to support
};
export type TypographyProps = CommonProps & TypographyPropsVariants[Variants];

const Typography = (props: TypographyProps) => {
  const { variant = 'body2', children, className, color = 'text', disable, underline } = props;

  const Components = variantMapping[variant];

  const objectClasses = {
    [variant]: typographyStyles[variant],
    [color]: typographyStyles[color],
    root: typographyStyles.root,
  };

  const classes = twMerge(
    classNames(objectToString(objectClasses), {
      [typographyStyles.disable]: disable,
      underline: underline,
    }),
    className
  );
  return <Components className={classes}>{children}</Components>;
};

export default Typography;
