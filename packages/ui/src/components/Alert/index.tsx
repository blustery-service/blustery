'use client';
import React from 'react';
// framer-motion
import { AnimatePresence, motion, MotionProps } from 'framer-motion';

// @heroicons
import { XMarkIcon } from '@heroicons/react/24/outline';

// utils
import classnames from 'classnames';
import merge from 'deepmerge';
import { twMerge } from 'tailwind-merge';
import findMatch from '../../utils/findMatch';
import objectsToString from '../../utils/objectsToString';

// context
import { useTheme } from '../../context/theme';

// types
import type { NewAnimatePresenceProps } from '../../types/generic';
import type {
  variant,
  color,
  icon,
  open,
  action,
  animate,
  className,
  children,
  onClose,
} from '../../types/components/alert';
import IconButton from '../IconButton';

export interface AlertProps extends Omit<MotionProps, 'animate'> {
  variant?: variant;
  color?: color;
  icon?: icon;
  open?: open;
  onClose?: onClose;
  action?: action;
  animate?: animate;
  className?: className;
  children: children;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ variant, color, icon, open, action, onClose, animate, className, children, ...rest }, ref) => {
    const { alert } = useTheme();
    const { defaultProps, valid, styles } = alert;
    const { base, variants } = styles;

    variant = variant ?? defaultProps.variant;
    color = color ?? defaultProps.color;
    className = className ?? defaultProps.className;
    animate = animate ?? defaultProps.animate;
    open = open ?? defaultProps.open;
    action = action ?? defaultProps.action;
    onClose = onClose ?? defaultProps.onClose;

    const alertBase = objectsToString(base.alert);
    const alertAction = objectsToString(base.action);
    const alertVariant = objectsToString(
      variants[findMatch(valid.variants, variant, 'filled')][findMatch(valid.colors, color, 'blue')]
    );
    const classes = twMerge(classnames(alertBase, alertVariant), className);
    const actionClasses = classnames(alertAction);

    const mainAnimation = {
      unmount: {
        opacity: 0,
      },
      mount: {
        opacity: 1,
      },
    };
    const appliedAnimation = merge(mainAnimation, animate as any);

    const iconTemplate = <div className="shrink-0">{icon}</div>;

    const NewAnimatePresence: React.FC<NewAnimatePresenceProps> = AnimatePresence;

    return (
      <NewAnimatePresence>
        {open && (
          <motion.div
            {...rest}
            ref={ref}
            role="alert"
            className={`${classes} flex`}
            initial="unmount"
            exit="unmount"
            animate={open ? 'mount' : 'unmount'}
            variants={appliedAnimation}
          >
            {icon && iconTemplate}
            <div className={`${icon ? 'ml-3' : ''} mr-12`}>{children}</div>
            {onClose && !action && (
              <IconButton
                onClick={onClose}
                size="sm"
                variant="text"
                color={variant === 'outlined' || variant === 'ghost' ? color : 'white'}
                className={actionClasses}
              >
                <XMarkIcon className="h-6 w-6" strokeWidth={2} />
              </IconButton>
            )}
            {action || null}
          </motion.div>
        )}
      </NewAnimatePresence>
    );
  }
);

Alert.displayName = 'BlusteryUi.Alert';

export default Alert;
