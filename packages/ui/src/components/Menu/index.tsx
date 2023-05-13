'use client';
import React from 'react';

// @floating-ui
import { FloatingTree, useFloatingParentNodeId } from '@floating-ui/react';

// context
import { useMenu } from './MenuContext';

// menu components
import { MenuCore, MenuProps } from './MenuCore';
import { MenuHandler, MenuHandlerProps } from './MenuHandler';
import { MenuItem, MenuItemProps } from './MenuItem';
import { MenuList, MenuListProps } from './MenuList';

const Menu = React.forwardRef<HTMLButtonElement, MenuProps>(
  ({ open, handler, placement, offset, dismiss, animate, lockScroll, allowHover, children }, ref) => {
    // 1. init
    const parentId = useFloatingParentNodeId();

    // 3. set props object
    const props = {
      open,
      handler,
      placement,
      offset,
      dismiss,
      animate,
      lockScroll,
      allowHover,
    };

    // 4. return
    if (parentId == null) {
      return (
        <FloatingTree>
          <MenuCore ref={ref} {...props}>
            {children}
          </MenuCore>
        </FloatingTree>
      );
    }

    return (
      <MenuCore ref={ref} {...props}>
        {children}
      </MenuCore>
    );
  }
);

Menu.displayName = 'BlusteryUi.Menu';

export { Menu, MenuHandler, MenuItem, MenuList, useMenu };
export type { MenuHandlerProps, MenuItemProps, MenuListProps, MenuProps };
export default Object.assign(Menu, { Handler: MenuHandler, List: MenuList, Item: MenuItem });
