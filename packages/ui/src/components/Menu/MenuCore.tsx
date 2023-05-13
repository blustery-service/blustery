'use client';
import React from 'react';

// @floating-ui
import {
  FloatingNode,
  autoUpdate,
  flip,
  offset as fuiOffset,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingTree,
  useHover,
  useInteractions,
  useListNavigation,
  useMergeRefs,
  useRole,
  useTypeahead,
} from '@floating-ui/react';

// context
import { useTheme } from '../../context/theme';
import { MenuContextProvider } from './MenuContext';

// types
import { merge } from 'lodash';
import type {
  animate,
  children,
  dismiss,
  handler,
  lockScroll,
  offset,
  open,
  placement,
} from '../../types/components/menu';

export interface MenuProps {
  open?: open;
  handler?: handler;
  placement?: placement;
  offset?: offset;
  dismiss?: dismiss;
  animate?: animate;
  lockScroll?: lockScroll;
  children: children;
  allowHover?: boolean;
}

export const MenuCore = React.forwardRef<HTMLButtonElement, MenuProps & React.HTMLProps<HTMLButtonElement>>(
  ({ open, handler, placement, offset, dismiss, animate, lockScroll, allowHover, children }, ref) => {
    // 1. init
    const { menu } = useTheme();
    const { defaultProps } = menu;
    const [internalOpen, setInternalOpen] = React.useState(false);
    const [internalAllowHover, setInternalAllowHover] = React.useState(false);

    // 2. set default props
    open = open ?? internalOpen;
    handler = handler ?? setInternalOpen;
    placement = placement ?? defaultProps.placement;
    offset = offset ?? defaultProps.offset;
    dismiss = dismiss ?? defaultProps.dismiss;
    animate = animate ?? defaultProps.animate;
    lockScroll = lockScroll ?? defaultProps.lockScroll;

    // 3. set animation
    const animation = {
      unmount: {
        opacity: 0,
        transformOrigin: 'top',
        transform: 'scale(0.95)',
        transition: { duration: 0.2, times: [0.4, 0, 0.2, 1] },
      },
      mount: {
        opacity: 1,
        transformOrigin: 'top',
        transform: 'scale(1)',
        transition: { duration: 0.2, times: [0.4, 0, 0.2, 1] },
      },
    };
    const appliedAnimation = merge(animation, animate);

    // 4. set @floating-ui
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
    const listItemsRef = React.useRef<Array<HTMLButtonElement | null>>([]);
    const listContentRef = React.useRef(
      React.Children.map(children, (child) => (React.isValidElement(child) ? child.props.label : null)) as Array<
        string | null
      >
    );

    const tree = useFloatingTree();
    const nodeId = useFloatingNodeId();
    const parentId = useFloatingParentNodeId();
    const nested = parentId != null;

    const { x, y, strategy, refs, context } = useFloating<HTMLButtonElement>({
      open,
      nodeId,
      placement,
      onOpenChange: handler,
      middleware: [fuiOffset(offset), flip(), shift()],
      whileElementsMounted: autoUpdate,
    });

    const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
      useHover(context, {
        handleClose: safePolygon({
          // restMs: 25,

          blockPointerEvents: true,
        }),
        enabled: allowHover || (nested && internalAllowHover),
        delay: { open: 75 },
      }),
      useClick(context, {
        toggle: !nested || !internalAllowHover,
        event: 'mousedown',
        ignoreMouse: nested,
      }),
      useRole(context, { role: 'menu' }),
      useDismiss(context, dismiss),
      useListNavigation(context, {
        listRef: listItemsRef,
        activeIndex,
        nested,
        onNavigate: setActiveIndex,
      }),
      useTypeahead(context, {
        listRef: listContentRef,
        onMatch: open ? setActiveIndex : undefined,
        activeIndex,
      }),
    ]);

    React.useEffect(() => {
      function handleTreeClick() {
        if (dismiss?.itemPress) {
          handler && handler(false);
        }
      }

      function onSubMenuOpen(event: { nodeId: string; parentId: string }) {
        if (event.nodeId !== nodeId && event.parentId === parentId) {
          handler && handler(false);
        }
      }

      tree?.events.on('click', handleTreeClick);
      tree?.events.on('menuopen', onSubMenuOpen);

      return () => {
        tree?.events.off('click', handleTreeClick);
        tree?.events.off('menuopen', onSubMenuOpen);
      };
    }, [tree, nodeId, parentId, handler, dismiss]);

    React.useEffect(() => {
      if (open) {
        tree?.events.emit('menuopen', {
          parentId,
          nodeId,
        });
      }
    }, [tree, open, nodeId, parentId]);

    React.useEffect(() => {
      function onPointerMove({ pointerType }: PointerEvent) {
        if (pointerType !== 'touch') {
          setInternalAllowHover(true);
        }
      }

      function onKeyDown() {
        setInternalAllowHover(false);
      }

      window.addEventListener('pointermove', onPointerMove, {
        once: true,
        capture: true,
      });

      window.addEventListener('keydown', onKeyDown, true);
      return () => {
        window.removeEventListener('pointermove', onPointerMove, {
          capture: true,
        });

        window.removeEventListener('keydown', onKeyDown, true);
      };
    }, [internalAllowHover]);

    const referenceRef = useMergeRefs([refs.setReference, ref]);

    const contextValue: any = React.useMemo(
      () => ({
        open,
        handler,
        setInternalOpen,
        strategy,
        x,
        y,
        reference: referenceRef,
        floating: refs.setFloating,
        listItemsRef,
        getReferenceProps,
        getFloatingProps,
        getItemProps,
        appliedAnimation,
        lockScroll,
        context,
        activeIndex,
        tree,
        allowHover,
        internalAllowHover,
        nested,
        setActiveIndex,
      }),
      [
        open,
        handler,
        setInternalOpen,
        strategy,
        x,
        y,
        referenceRef,
        refs,
        getReferenceProps,
        getFloatingProps,
        getItemProps,
        appliedAnimation,
        lockScroll,
        context,
        activeIndex,
        tree,
        allowHover,
        internalAllowHover,
        nested,
        setActiveIndex,
      ]
    );

    // 5. return
    return (
      <MenuContextProvider value={contextValue}>
        <FloatingNode id={nodeId}>{children}</FloatingNode>
      </MenuContextProvider>
    );
  }
);

MenuCore.displayName = 'BlusteryUi.MenuCore';

export default MenuCore;
