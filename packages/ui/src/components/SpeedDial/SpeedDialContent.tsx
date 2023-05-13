'use client';
import React from 'react';

// framer-motion
import { AnimatePresence, motion } from 'framer-motion';

// @floating-ui
import { useMergeRefs } from '@floating-ui/react';

// context
import { useTheme } from '../../context/theme';
import { useSpeedDial } from './index';

// utils
import { twMerge } from 'tailwind-merge';
import objectsToString from '../../utils/objectsToString';

// types
import type { NewAnimatePresenceProps } from '../../types/generic';

export interface SpeedDialContentProps extends React.ComponentProps<'div'> {}

export const SpeedDialContent = React.forwardRef<HTMLDivElement, SpeedDialContentProps>(
  ({ children, className, ...rest }, ref) => {
    // 1. init
    const {
      speedDialContent: { styles },
    } = useTheme();
    const { x, y, refs, open, strategy, getFloatingProps, animation } = useSpeedDial();
    const mergedRefs = useMergeRefs([ref]);

    // 2. set styles
    const classes = twMerge(objectsToString(styles), className);

    // 3. create an instance of AnimatePresence because of the types issue with the children
    const NewAnimatePresence: React.FC<NewAnimatePresenceProps> = AnimatePresence;

    // 4. return
    return (
      <NewAnimatePresence>
        {open && (
          <div
            {...rest}
            ref={mergedRefs}
            className={classes}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            }}
            {...getFloatingProps()}
          >
            {React.Children.map(children as any, (child: React.ReactElement) => (
              <motion.div initial="unmount" exit="unmount" animate={open ? 'mount' : 'unmount'} variants={animation}>
                {child}
              </motion.div>
            ))}
          </div>
        )}
      </NewAnimatePresence>
    );
  }
);

SpeedDialContent.displayName = 'BlusteryUi.SpeedDialContent';

export default SpeedDialContent;
