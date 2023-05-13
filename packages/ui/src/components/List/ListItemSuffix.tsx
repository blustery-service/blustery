'use client';
import React from 'react';

// context
import { useTheme } from '../../context/theme';

// utils
import classnames from 'classnames';
import { twMerge } from 'tailwind-merge';
import objectsToString from '../../utils/objectsToString';

// types
import type { children, className } from '../../types/components/list';

export interface ListItemSuffixProps extends React.ComponentProps<'div'> {
  className?: className;
  children: children;
}

export const ListItemSuffix = React.forwardRef<HTMLDivElement, ListItemSuffixProps>(
  ({ className, children, ...rest }, ref) => {
    // 1. init
    const { list } = useTheme();
    const {
      styles: { base },
    } = list;

    // 3. set styles
    const listItemSuffixClasses = twMerge(classnames(objectsToString(base.itemSuffix)), className);

    return (
      <div {...rest} ref={ref} className={listItemSuffixClasses}>
        {children}
      </div>
    );
  }
);

ListItemSuffix.displayName = 'BlusteryUi.ListItemSuffix';

export default ListItemSuffix;
