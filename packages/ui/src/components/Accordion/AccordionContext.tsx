'use client';
'use client';
import React from 'react';

// types
import type { animate, children, disabled, icon, open } from '../../types/components/accordion';

export interface AccordionContextType {
  open: open;
  icon: icon;
  animate: animate;
  disabled: disabled;
}

export const AccordionContext = React.createContext<AccordionContextType | null>(null);
AccordionContext.displayName = 'BlusteryUi.AccordionContext';

export function useAccordion() {
  const context = React.useContext(AccordionContext);

  if (!context) {
    throw new Error(
      'useAccordion() must be used within an Accordion. It happens when you use AccordionHeader or AccordionBody components outside the Accordion component.'
    );
  }

  return context;
}

export interface AccordionContextProviderProps {
  value: AccordionContextType;
  children: children;
}

export const AccordionContextProvider = ({ value, children }: AccordionContextProviderProps) => {
  return <AccordionContext.Provider value={value}>{children}</AccordionContext.Provider>;
};

AccordionContextProvider.displayName = 'BlusteryUi.AccordionContextProvider';
