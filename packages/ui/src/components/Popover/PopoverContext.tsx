'use client';
import React from 'react';

// types
import type { contextValue, children } from '../../types/components/popover';

export interface PopoverContextProviderProps {
  value: contextValue;
  children: children;
}

export const PopoverContext = React.createContext<contextValue | null>(null);
PopoverContext.displayName = 'BlusteryUi.PopoverContext';

export function usePopover() {
  const context = React.useContext(PopoverContext);

  if (!context) {
    throw new Error(
      'usePopover() must be used within a Popover. It happens when you use PopoverHandler or PopoverContent components outside the Popover component.'
    );
  }

  return context;
}

export const PopoverContextProvider = ({ value, children }: PopoverContextProviderProps) => {
  return <PopoverContext.Provider value={value}>{children}</PopoverContext.Provider>;
};

PopoverContextProvider.displayName = 'BlusteryUi.PopoverContextProvider';
