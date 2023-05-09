'use client';
import React, { ReactElement } from 'react';
import { buttonStyles } from './styles';
import { twMerge } from 'tailwind-merge';
import { createRipple, objectToString, classNames } from '@utils';
export type ButtonColor = 'primary' | 'secondary' | 'info' | 'warning' | 'error' | 'success';

export interface ButtonProps extends React.ComponentProps<'button'> {
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  color?: ButtonColor;
  fullWidth?: boolean;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  disable?: boolean;
  disableRipple?: boolean;
}

const Button = (props: ButtonProps) => {
  const {
    children,
    disable,
    variant = 'contained',
    size = 'medium',
    color = 'primary',
    endIcon,
    startIcon,
    fullWidth,
    className,
    onMouseDown,
    disableRipple,
    ...other
  } = props;

  const objectClasses = {
    root: buttonStyles['root'],
    [`${variant}-root`]: buttonStyles[variant]['root'],
    [variant]: buttonStyles[variant][color],
    [size]: buttonStyles[size],
  };
  const classes = twMerge(
    classNames(objectToString(objectClasses), {
      [buttonStyles.fullWidth]: fullWidth,
      [objectToString(buttonStyles.disable)]: disable,
    }),
    className
  );
  console.log('🚀 ~ file: index.tsx:51 ~ Button ~ classes:', classes);

  return (
    <button
      className={classes}
      color={color}
      onMouseDown={(e) => {
        !disableRipple && createRipple(e, color, variant);
        typeof onMouseDown === 'function' && onMouseDown(e);
      }}
      {...other}
    >
      {startIcon}
      {children}
      {endIcon}
    </button>
  );
};
export default Button;
