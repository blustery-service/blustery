import React, { ReactNode, createContext, useContext } from 'react';
import { merge } from 'lodash';
import theme from '../theme/index';
import combineMerge from '../utils/combineMerge';

const MaterialTailwindTheme = createContext(theme);

MaterialTailwindTheme.displayName = 'BlusteryUi.ThemeProvider';

function ThemeProvider({ value = theme, children }: { value: any; children: ReactNode }) {
  const mergedValue = merge(theme, value, { arrayMerge: combineMerge });

  return <MaterialTailwindTheme.Provider value={mergedValue}>{children}</MaterialTailwindTheme.Provider>;
}

const useTheme = () => useContext(MaterialTailwindTheme);

export { MaterialTailwindTheme, ThemeProvider, useTheme };
