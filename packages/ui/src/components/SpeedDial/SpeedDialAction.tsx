'use client';
import React from 'react';

// context
import { useTheme } from '../../context/theme';

// utils
import { twMerge } from 'tailwind-merge';
import objectsToString from '../../utils/objectsToString';

// types

export interface SpeedDialActionProps extends React.ComponentProps<'button'> {}

export const SpeedDialAction = React.forwardRef<HTMLButtonElement, SpeedDialActionProps>(
  ({ className, children }, ref) => {
    // 1. init
    const {
      speedDialAction: { styles },
    } = useTheme();

    // 2. set styles
    const classes = twMerge(objectsToString(styles), className);

    // 3. return
    return (
      <button ref={ref} className={classes}>
        {children}
      </button>
    );
  }
);

SpeedDialAction.displayName = 'SpeedDialAction';

export default SpeedDialAction;
