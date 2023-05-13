'use client';
import React from 'react';

// utils
import classnames from 'classnames';
import { twMerge } from 'tailwind-merge';
import findMatch from '../../utils/findMatch';
import objectsToString from '../../utils/objectsToString';

// context
import { useTheme } from '../../context/theme';

// navbar components
import { MobileNav, MobileNavProps } from './MobileNav';

// types
import type { blurred, children, className, color, fullWidth, shadow, variant } from '../../types/components/navbar';

export interface NavbarProps extends React.ComponentProps<'div'> {
  variant?: variant;
  color?: color;
  shadow?: shadow;
  blurred?: blurred;
  fullWidth?: fullWidth;
  className?: className;
  children: children;
}

const Navbar = React.forwardRef<HTMLDivElement, NavbarProps>(
  ({ variant, color, shadow, blurred, fullWidth, className, children, ...rest }, ref) => {
    // 1. init
    const { navbar } = useTheme();
    const { defaultProps, valid, styles } = navbar;
    const { base, variants } = styles;

    // 2. set default props
    variant = variant ?? defaultProps.variant;
    color = color ?? defaultProps.color;
    shadow = shadow ?? defaultProps.shadow;
    blurred = blurred ?? defaultProps.blurred;
    fullWidth = fullWidth ?? defaultProps.fullWidth;
    className = className ?? defaultProps.className;

    // 3. set styles
    const navbarRoot = classnames(objectsToString(base.navbar.initial), {
      [objectsToString(base.navbar.shadow)]: shadow,
      [objectsToString(base.navbar.blurred)]: blurred && color === 'white',
      [objectsToString(base.navbar.fullWidth)]: fullWidth,
    });
    const navbarVariant = classnames(
      objectsToString(variants[findMatch(valid.variants, variant, 'filled')][findMatch(valid.colors, color, 'white')])
    );
    const navbarClasses = twMerge(classnames(navbarRoot, navbarVariant), className);

    // 4. return
    return (
      <nav {...rest} ref={ref} className={navbarClasses}>
        {children}
      </nav>
    );
  }
);

Navbar.displayName = 'BlusteryUi.Navbar';

export { MobileNav, Navbar };
export type { MobileNavProps };
export default Object.assign(Navbar, {
  MobileNav,
});
