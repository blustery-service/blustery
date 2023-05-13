'use client';
import React from 'react';

// utils
import classnames from 'classnames';
import { twMerge } from 'tailwind-merge';
import objectsToString from '../../utils/objectsToString';

// context
import { useTheme } from '../../context/theme';

// types
import type { children, className, disabled } from '../../types/components/menu';

export interface MenuItemProps extends React.ComponentProps<'li'> {
  className?: className;
  disabled?: disabled;
  children: children;
}

export const MenuItem = React.forwardRef<
  HTMLButtonElement,
  MenuItemProps & React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className = '', disabled = false, children, ...rest }, ref) => {
  // 1. init
  const { menu } = useTheme();
  const {
    styles: { base },
  } = menu;

  // 2. set styles
  const menuItemClasses = twMerge(
    classnames(objectsToString(base.item.initial), {
      [objectsToString(base.item.disabled)]: disabled,
    }),
    className
  );

  // 4. return
  return (
    <button {...rest} ref={ref} role="menuitem" className={menuItemClasses}>
      {children}
    </button>
  );
});

MenuItem.displayName = 'BlusteryUi.MenuItem';

export default MenuItem;
