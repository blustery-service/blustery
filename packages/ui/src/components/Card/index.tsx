'use client';
import React from 'react';

// utils
import classnames from 'classnames';
import { twMerge } from 'tailwind-merge';
import findMatch from '../../utils/findMatch';
import objectsToString from '../../utils/objectsToString';

// context
import { useTheme } from '../../context/theme';

// card components
import { CardBody, CardBodyProps } from './CardBody';
import { CardFooter, CardFooterProps } from './CardFooter';
import { CardHeader, CardHeaderProps } from './CardHeader';

// types
import type { children, className, color, shadow, variant } from '../../types/components/card';

export interface CardProps extends React.ComponentProps<'div'> {
  variant?: variant;
  color?: color;
  shadow?: shadow;
  className?: className;
  children: children;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant, color, shadow, className, children, ...rest }, ref) => {
    // 1. init
    const { card } = useTheme();
    const { defaultProps, styles, valid } = card;
    const { base, variants } = styles;

    // 2. set default props
    variant = variant ?? defaultProps.variant;
    color = color ?? defaultProps.color;
    shadow = shadow ?? defaultProps.shadow;
    className = className ?? defaultProps.className;

    // 3. set styles
    const cardRoot = objectsToString(base.initial);
    const cardVariant = objectsToString(
      variants[findMatch(valid.variants, variant, 'filled')][findMatch(valid.colors, color, 'white')]
    );
    const classes = twMerge(classnames(cardRoot, cardVariant, { [objectsToString(base.shadow)]: shadow }), className);

    // 4. return
    return (
      <div {...rest} ref={ref} className={classes}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'BlusteryUi.Card';

export { Card, CardBody, CardFooter, CardHeader };
export type { CardBodyProps, CardFooterProps, CardHeaderProps };
export default Object.assign(Card, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});
