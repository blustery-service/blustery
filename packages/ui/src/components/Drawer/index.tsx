'use client';
import React from 'react';

// framer-motion
import { AnimatePresence, motion, useAnimation } from 'framer-motion';

// @floating-ui
import { useDismiss, useFloating, useInteractions } from '@floating-ui/react';

// utils
import classnames from 'classnames';
import merge from 'deepmerge';
import { twMerge } from 'tailwind-merge';
import objectsToString from '../../utils/objectsToString';

// context
import { useTheme } from '../../context/theme';

// types
import {
  children,
  className,
  dismiss,
  onClose,
  open,
  overlay,
  overlayProps,
  overlayRef,
  placement,
  size,
  transition,
} from '../../types/components/drawer';

export interface DrawerProps extends React.ComponentProps<'div'> {
  open: open;
  size?: size;
  overlay?: overlay;
  children: children;
  placement?: placement;
  overlayProps?: overlayProps;
  className?: className;
  onClose?: onClose;
  dismiss?: dismiss;
  transition?: transition;
  overlayRef?: overlayRef;
}

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      open,
      size,
      overlay,
      children,
      placement,
      overlayProps,
      className,
      onClose,
      dismiss,
      transition,
      overlayRef,
      ...rest
    },
    ref
  ) => {
    // 1. init
    const { drawer } = useTheme();
    const {
      defaultProps,
      styles: { base },
    } = drawer;
    const constrols = useAnimation();

    // 2. set default props
    size = size ?? defaultProps.size;
    overlay = overlay ?? defaultProps.overlay;
    placement = placement ?? defaultProps.placement;
    className = className ?? defaultProps.className;
    overlayProps = overlayProps ?? defaultProps.overlayProps;
    onClose = onClose ?? defaultProps.onClose;
    dismiss = merge(defaultProps.dismiss, dismiss || {}) ?? defaultProps.dismiss;
    transition = transition ?? defaultProps.transition;

    // 3. set styles
    const drawerClasses = twMerge(
      classnames(objectsToString(base.drawer), {
        'top-0 right-0': placement === 'right',
        'bottom-0 left-0': placement === 'bottom',
        'top-0 left-0': placement === 'top' || placement === 'left',
      }),
      className
    );
    const overlayClasses = twMerge(classnames(objectsToString(base.overlay)), overlayProps?.className);

    // 4. set the drawer
    const { context } = useFloating({
      open,
      onOpenChange: onClose,
    });

    const { getFloatingProps } = useInteractions([useDismiss(context, dismiss)]);

    React.useEffect(() => {
      constrols.start(open ? 'open' : 'close');
    }, [open, constrols, placement]);

    const drawerAnimation = {
      open: {
        x: 0,
        y: 0,
      },
      close: {
        x: placement === 'left' ? -Number(size) : placement === 'right' ? size : 0,
        y: placement === 'top' ? -Number(size) : placement === 'bottom' ? size : 0,
      },
    };

    const backdropAnimation = {
      unmount: {
        opacity: 0,
        transition: {
          delay: 0.3,
        },
      },
      mount: {
        opacity: 1,
      },
    };

    // 5. return
    return (
      <React.Fragment>
        <AnimatePresence>
          {overlay && open && (
            <motion.div
              ref={overlayRef}
              className={overlayClasses}
              initial="unmount"
              exit="unmount"
              animate={open ? 'mount' : 'unmount'}
              variants={backdropAnimation}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
        <motion.div
          {...getFloatingProps({
            ref,
            ...rest,
          })}
          className={drawerClasses}
          style={{
            maxWidth: placement === 'left' || placement === 'right' ? size : '100%',
            maxHeight: placement === 'top' || placement === 'bottom' ? size : '100%',
            height: placement === 'left' || placement === 'right' ? '100vh' : '100%',
          }}
          initial="close"
          animate={constrols}
          variants={drawerAnimation}
          transition={transition}
        >
          {children}
        </motion.div>
      </React.Fragment>
    );
  }
);

Drawer.displayName = 'BlusteryUi.Drawer';

export default Drawer;
