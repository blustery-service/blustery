'use client';
import React from 'react';

// utils
import classnames from 'classnames';
import { merge } from 'lodash';
import { twMerge } from 'tailwind-merge';
import findMatch from '../../utils/findMatch';
import objectsToString from '../../utils/objectsToString';

// context
import { useTheme } from '../../context/theme';

// types
import type {
  barClassName,
  className,
  color,
  defaultValue,
  inputProps,
  inputRef,
  max,
  min,
  onChange,
  size,
  step,
  thumbClassName,
  trackClassName,
  value,
} from '../../types/components/slider';

export interface SliderProps extends React.ComponentProps<'div'> {
  color?: color;
  size?: size;
  className?: className;
  sliderClassName?: trackClassName;
  trackClassName?: trackClassName;
  thumbClassName?: thumbClassName;
  barClassName?: barClassName;
  value?: value;
  defaultValue?: defaultValue;
  onChange?: onChange;
  min?: min;
  max?: max;
  step?: step;
  inputRef?: inputRef;
  inputProps?: inputProps;
}

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      color,
      size,
      className,
      trackClassName,
      thumbClassName,
      barClassName,
      value,
      defaultValue,
      onChange,
      min,
      max,
      step,
      inputRef,
      inputProps,
      ...rest
    },
    ref
  ) => {
    // 1. init
    const { slider } = useTheme();
    const { valid, defaultProps, styles } = slider;
    const { base, sizes, colors } = styles;
    const [innerValue, setInnerValue] = React.useState(defaultValue || 0);

    React.useMemo(() => {
      if (defaultValue) setInnerValue(defaultValue);
    }, [defaultValue]);

    // 2. set default props
    color = color ?? defaultProps.color;
    size = size ?? defaultProps.size;
    min = min ?? defaultProps.min;
    max = max ?? defaultProps.max;
    step = step ?? defaultProps.step;
    className = classnames(defaultProps.className, className) ?? defaultProps.className;
    thumbClassName = classnames(defaultProps.thumbClassName, thumbClassName) ?? defaultProps.thumbClassName;
    trackClassName = classnames(defaultProps.trackClassName, trackClassName) ?? defaultProps.trackClassName;
    barClassName = classnames(defaultProps.barClassName, barClassName) ?? defaultProps.barClassName;
    inputProps = merge(inputProps, defaultProps?.inputProps || {}) ?? defaultProps.inputProps;

    // 3. set styles
    const sliderContainerClasses = twMerge(
      classnames(
        objectsToString(base.container),
        objectsToString(colors[findMatch(valid.colors, color, 'blue')]),
        objectsToString(sizes[findMatch(valid.sizes, size, 'md')]['container']),
        className
      )
    );
    const sliderBarClasses = twMerge(classnames(objectsToString(base.bar), barClassName));
    const sliderTrackClasses = classnames(
      objectsToString(base.track),
      objectsToString(sizes[findMatch(valid.sizes, size, 'md')]['track'])
    );
    const sliderThumbClasses = classnames(
      objectsToString(base.thumb),
      objectsToString(sizes[findMatch(valid.sizes, size, 'md')]['thumb'])
    );
    const sliderCLasses = classnames(
      objectsToString(base.slider),
      twMerge(sliderTrackClasses, trackClassName),
      twMerge(sliderThumbClasses, thumbClassName)
    );

    // 4. return
    return (
      <div {...rest} ref={ref} className={sliderContainerClasses}>
        <label className={sliderBarClasses} style={{ width: `${value || innerValue}%` }} />
        <input
          ref={inputRef}
          type="range"
          max={max}
          min={min}
          step={step}
          className={sliderCLasses}
          {...(value ? { value } : null)}
          defaultValue={defaultValue}
          onChange={(e) => (onChange ? onChange(e) : setInnerValue(Number(e.target.value)))}
        />
      </div>
    );
  }
);

Slider.displayName = 'BlusteryUi.Slider';

export default Slider;
