'use client';
import React from 'react';

// utils
import classnames from 'classnames';
import { twMerge } from 'tailwind-merge';
import findMatch from '../../utils/findMatch';
import objectsToString from '../../utils/objectsToString';

// context
import { useTheme } from '../../context/theme';

// types
import type { barProps, className, color, label, size, value, variant } from '../../types/components/progress';

export interface ProgressProps extends React.ComponentProps<'div'> {
  variant?: variant;
  color?: color;
  size?: size;
  value?: value;
  label?: label;
  barProps?: barProps;
  className?: className;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ variant, color, size, value, label, className, barProps, ...rest }, ref) => {
    // 1. init
    const { progress } = useTheme();
    const { defaultProps, valid, styles } = progress;
    const { base, variants, sizes } = styles;

    // 2. set default props
    variant = variant ?? defaultProps.variant;
    color = color ?? defaultProps.color;
    size = size ?? defaultProps.size;
    label = label ?? defaultProps.label;
    className = className ?? defaultProps.className;
    barProps = barProps ?? defaultProps.barProps;

    // 3. set styles
    const progressVariant = objectsToString(
      variants[findMatch(valid.variants, variant, 'filled')][findMatch(valid.colors, color, 'blue')]
    );
    const progressContainerSize = objectsToString(sizes[findMatch(valid.sizes, size, 'md')]['container']['initial']);
    const progressContainer = classnames(objectsToString(base.container.initial), progressContainerSize);
    const progressWithLabelSize = objectsToString(sizes[findMatch(valid.sizes, size, 'md')]['container']['withLabel']);
    const progressWithLabel = classnames(objectsToString(base.container.withLabel), progressWithLabelSize);
    const progressBarSize = objectsToString(sizes[findMatch(valid.sizes, size, 'md')]['bar']);
    const progressBar = classnames(objectsToString(base.bar), progressBarSize);
    const containerClasses = twMerge(classnames(progressContainer, { [progressWithLabel]: label }), className);
    const barClasses = twMerge(classnames(progressBar, progressVariant), barProps?.className);

    // 4. return
    return (
      <div {...rest} ref={ref} className={containerClasses}>
        <div {...barProps} className={barClasses} style={{ width: `${value}%` }}>
          {label && `${value}% ${typeof label === 'string' ? label : ''}`}
        </div>
      </div>
    );
  }
);

Progress.displayName = 'BlusteryUi.Progress';

export default Progress;
