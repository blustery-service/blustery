'use client';
import React from 'react';

// utils
import classnames from 'classnames';
import { twMerge } from 'tailwind-merge';
import objectsToString from '../../utils/objectsToString';

// context
import { useTheme } from '../../context/theme';
import { TabsContextProvider, useTabs } from './TabsContext';

// tabs components
import { Tab, TabProps } from './Tab';
import { TabPanel, TabPanelProps } from './TabPanel';
import { TabsBody, TabsBodyProps } from './TabsBody';
import { TabsHeader, TabsHeaderProps } from './TabsHeader';

// types
import type { children, className, id, orientation, value } from '../../types/components/tabs';

export interface TabsProps extends React.ComponentProps<'div' | any> {
  id: id;
  value: value;
  orientation?: orientation;
  className?: className;
  children: children;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ id, value, className, orientation, children, ...rest }, ref) => {
    // 1. init
    const { tabs } = useTheme();
    const { defaultProps, styles } = tabs;

    // 2. set default props
    className = className ?? defaultProps.className;
    orientation = orientation ?? defaultProps.orientation;

    // 3. set styles
    const tabsClasses = twMerge(
      classnames(objectsToString(styles.base), {
        [orientation && styles[orientation] && objectsToString(styles[orientation])]: orientation,
      }),
      className
    );

    // 4. return
    return (
      <TabsContextProvider id={id} value={value} orientation={orientation}>
        <div {...rest} ref={ref} className={tabsClasses}>
          {children}
        </div>
      </TabsContextProvider>
    );
  }
);

Tabs.displayName = 'BlusteryUi.Tabs';

export { Tab, TabPanel, Tabs, TabsBody, TabsHeader, useTabs };
export type { TabPanelProps, TabProps, TabsBodyProps, TabsHeaderProps };
export default Object.assign(Tabs, { Tab, Body: TabsBody, Header: TabsHeader, Panel: TabPanel });
