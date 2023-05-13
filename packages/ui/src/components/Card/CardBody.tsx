'use client';
import React from 'react';

// utils
import classnames from 'classnames';
import { twMerge } from 'tailwind-merge';
import objectsToString from '../../utils/objectsToString';

// context
import { useTheme } from '../../context/theme';

// types
import type { children, className } from '../../types/components/card';

export interface CardBodyProps extends React.ComponentProps<'div'> {
  className?: className;
  children: children;
}

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(({ className, children, ...rest }, ref) => {
  // 1. init
  const { cardBody } = useTheme();
  const {
    defaultProps,
    styles: { base },
  } = cardBody;

  // 2. set default props
  className = className ?? defaultProps.className;

  // 3. set styles
  const cardBodyClasses = twMerge(classnames(objectsToString(base)), className);

  // 4. return
  return (
    <div {...rest} ref={ref} className={cardBodyClasses}>
      {children}
    </div>
  );
});

CardBody.displayName = 'BlusteryUi.CardBody';

export default CardBody;
