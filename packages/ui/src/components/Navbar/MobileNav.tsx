'use client';
import React from 'react';

// framer-motion components
import { AnimatePresence, AnimatePresenceProps, motion, MotionProps } from 'framer-motion';

// @floating-ui
import { useMergeRefs } from '@floating-ui/react';

// utils
import classnames from 'classnames';
import merge from 'deepmerge';
import { twMerge } from 'tailwind-merge';
import objectsToString from '../../utils/objectsToString';

// context
import { useTheme } from '../../context/theme';

// types
import { animate, children, className, open } from '../../types/components/navbar';

export interface MobileNavProps extends Omit<MotionProps, 'animate'> {
  open: open;
  animate?: animate;
  className?: className;
  children: children;
}

interface NewAnimatePresenceProps extends Omit<AnimatePresenceProps, 'children'> {
  children: React.ReactNode;
}

export const MobileNav = React.forwardRef<HTMLDivElement, MobileNavProps>(
  ({ open, animate, className, children, ...rest }, ref) => {
    // 1. init
    const mobileNavRef = React.useRef<HTMLDivElement>(null);
    const { navbar } = useTheme();
    const { styles } = navbar;
    const {
      base: { mobileNav },
    } = styles;

    // 2. set default props
    animate = animate ?? {};
    className = className ?? '';

    // 3. set styles
    const classes = twMerge(classnames(objectsToString(mobileNav)), className);

    // 4. set animations
    const mainAnimation = {
      unmount: {
        height: 0,
        opacity: 0,
        transition: { duration: 0.3, times: '[0.4, 0, 0.2, 1]' },
      },
      mount: {
        opacity: 1,
        height: `${mobileNavRef.current?.scrollHeight}px`,
        transition: { duration: 0.3, times: '[0.4, 0, 0.2, 1]' },
      },
    };

    const appliedAnimation = merge(mainAnimation, animate);
    const NewAnimatePresence: React.FC<NewAnimatePresenceProps> = AnimatePresence;

    // 5. set refs
    const mergedRef = useMergeRefs([ref, mobileNavRef]);

    // 6. return
    return (
      <NewAnimatePresence>
        <motion.div
          {...rest}
          ref={mergedRef}
          className={classes}
          initial="unmount"
          exit="unmount"
          animate={open ? 'mount' : 'unmount'}
          variants={appliedAnimation}
        >
          {children}
        </motion.div>
      </NewAnimatePresence>
    );
  }
);

MobileNav.displayName = 'BlusteryUi.MobileNav';

export default MobileNav;
