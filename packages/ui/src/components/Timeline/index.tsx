'use client';
import React from 'react';

// utils
import { twMerge } from 'tailwind-merge';
import objectsToString from '../../utils/objectsToString';

// context
import { useTheme } from '../../context/theme';

// types
import { children, className } from '../../types/components/timeline';

// components
import TimelineBody from './TimelineBody';
import TimelineConnector from './TimelineConnector';
import TimelineHeader from './TimelineHeader';
import TimelineIcon from './TimelineIcon';
import TimelineItem from './TimelineItem';

export interface TimelineProps extends React.HTMLAttributes<HTMLUListElement> {
  className?: className;
  children?: children;
}

export const Timeline = React.forwardRef<HTMLUListElement, TimelineProps>(({ className, children, ...rest }, ref) => {
  // 1. init
  const { timeline } = useTheme();
  const { styles } = timeline;
  const { base } = styles;

  // 3. set styles
  const classes = twMerge(objectsToString(base), className);

  // 4. return
  return (
    <ul ref={ref} {...rest} className={classes}>
      {children}
    </ul>
  );
});

Timeline.displayName = 'BlusteryUi.Timeline';

export { TimelineBody, TimelineConnector, TimelineHeader, TimelineIcon, TimelineItem };
export default Object.assign(Timeline, {
  Item: TimelineItem,
  Icon: TimelineIcon,
  Header: TimelineHeader,
  Body: TimelineBody,
  Connector: TimelineConnector,
});
