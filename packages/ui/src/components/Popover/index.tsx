'use client';
import React from 'react';

// @floating-ui
import {
  autoUpdate,
  flip,
  offset as fuiOffset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useId,
  useInteractions,
  useRole,
} from '@floating-ui/react';

// utils
import { merge } from 'lodash';

// context
import { useTheme } from '../../context/theme';
import { PopoverContextProvider, usePopover } from './PopoverContext';

// types
import type { animate, children, dismiss, handler, offset, open, placement } from '../../types/components/popover';

// popover components
import { PopoverContent, PopoverContentProps } from './PopoverContent';
import { PopoverHandler, PopoverHandlerProps } from './PopoverHandler';

export interface PopoverProps {
  open?: open;
  handler?: handler;
  placement?: placement;
  offset?: offset;
  dismiss?: dismiss;
  animate?: animate;
  children: children;
}

const Popover = ({ open, handler, placement, offset, dismiss, animate, children }: PopoverProps) => {
  // 1. init
  const { popover } = useTheme();
  const { defaultProps } = popover;
  const [internalOpen, setInternalOpen] = React.useState(false);

  // 2. set default props
  open = open ?? internalOpen;
  handler = handler ?? setInternalOpen;
  placement = placement ?? defaultProps.placement;
  offset = offset ?? defaultProps.offset;
  dismiss = dismiss ?? defaultProps.dismiss;
  animate = animate ?? defaultProps.animate;

  // 4. set animation
  const animation = {
    unmount: {
      opacity: 0,
    },
    mount: {
      opacity: 1,
    },
  };
  const appliedAnimation = merge(animation, animate);

  // 5. set @floating-ui
  const { x, y, strategy, refs, update, context } = useFloating({
    open,
    onOpenChange: handler,
    middleware: [fuiOffset(offset), flip(), shift()],
    placement,
  });

  const id = useId();
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useRole(context),
    useDismiss(context, dismiss),
  ]);

  React.useEffect(() => {
    if (refs.reference.current && refs.floating.current && open) {
      return autoUpdate(refs.reference.current, refs.floating.current, update);
    }
  }, [open, update, refs.reference, refs.floating]);

  const contextValue: any = React.useMemo(
    () => ({
      open,
      strategy,
      x,
      y,
      context,
      getReferenceProps,
      getFloatingProps,
      appliedAnimation,
      labelId,
      descriptionId,
    }),
    [open, strategy, x, y, context, getFloatingProps, getReferenceProps, appliedAnimation, labelId, descriptionId]
  );

  // 6. return
  return <PopoverContextProvider value={contextValue}>{children}</PopoverContextProvider>;
};

Popover.displayName = 'BlusteryUi.Popover';

export { Popover, PopoverContent, PopoverHandler, usePopover };
export type { PopoverContentProps, PopoverHandlerProps };
export default Object.assign(Popover, { Handler: PopoverHandler, Content: PopoverContent });
