'use client';
import React from 'react';

// @floating-ui
import {
  FloatingFocusManager,
  FloatingOverlay,
  autoUpdate,
  flip,
  offset as fuiOffset,
  size as fuiSize,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  useTypeahead,
} from '@floating-ui/react';

// framer-motion
import { AnimatePresence, motion, useIsomorphicLayoutEffect } from 'framer-motion';

// utils
import classnames from 'classnames';
import { merge } from 'lodash';
import { twMerge } from 'tailwind-merge';
import findMatch from '../../utils/findMatch';
import objectsToString from '../../utils/objectsToString';

// context
import { useTheme } from '../../context/theme';
import { SelectContextProvider, usePrevious, useSelect } from './SelectContext';

// types
import type {
  animate,
  arrow,
  children,
  className,
  color,
  containerProps,
  disabled,
  dismiss,
  error,
  label,
  labelProps,
  lockScroll,
  menuProps,
  name,
  offset,
  onChange,
  selected,
  size,
  success,
  value,
  variant,
} from '../../types/components/select';
import type { NewAnimatePresenceProps } from '../../types/generic';

// select components
import { SelectOption, SelectOptionProps } from './SelectOption';

export interface SelectProps extends Omit<React.ComponentProps<'div'>, 'value' | 'onChange'> {
  variant?: variant;
  color?: color;
  size?: size;
  label?: label;
  error?: error;
  success?: success;
  arrow?: arrow;
  value?: value;
  onChange?: onChange;
  selected?: selected;
  offset?: offset;
  dismiss?: dismiss;
  animate?: animate;
  lockScroll?: lockScroll;
  labelProps?: labelProps;
  menuProps?: menuProps;
  className?: className;
  disabled?: disabled;
  name?: name;
  children: children;
  containerProps?: containerProps;
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      variant,
      color,
      size,
      label,
      error,
      success,
      arrow,
      value,
      onChange,
      selected,
      offset,
      dismiss,
      animate,
      lockScroll,
      labelProps,
      menuProps,
      className,
      disabled,
      name,
      children,
      containerProps,
      ...rest
    },
    ref
  ) => {
    // 1. init
    const { select } = useTheme();
    const { defaultProps, valid, styles } = select;
    const { base, variants } = styles;
    const [state, setState] = React.useState<string>('close');

    // 2. set default props
    variant = variant ?? defaultProps.variant;
    color = color ?? defaultProps.color;
    size = size ?? defaultProps.size;
    label = label ?? defaultProps.label;
    error = error ?? defaultProps.error;
    success = success ?? defaultProps.success;
    arrow = arrow ?? defaultProps.arrow;
    value = value ?? defaultProps.value;
    onChange = onChange ?? defaultProps.onChange;
    selected = selected ?? defaultProps.selected;
    offset = offset ?? defaultProps.offset;
    dismiss = dismiss ?? defaultProps.dismiss;
    animate = animate ?? defaultProps.animate;
    labelProps = labelProps ?? defaultProps.labelProps;
    menuProps = menuProps ?? defaultProps.menuProps;
    containerProps = merge(containerProps, defaultProps?.containerProps || {}) ?? defaultProps.containerProps;
    className = className ?? defaultProps.className;

    // 3. @floating-ui
    const listItemsRef = React.useRef<Array<HTMLLIElement | null>>([]);
    const listContentRef = React.useRef([
      ...(React.Children.map(children, (child) => {
        const { props }: any = child;
        return props?.value;
      }) ?? []),
    ]);
    const [open, setOpen] = React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [controlledScrolling, setControlledScrolling] = React.useState(false);
    const prevActiveIndex = usePrevious<number | null>(activeIndex);

    const { x, y, strategy, refs, context } = useFloating({
      placement: 'bottom-start',
      open,
      onOpenChange: setOpen,
      whileElementsMounted: autoUpdate,
      middleware: [
        fuiOffset(5),
        flip({ padding: 10 }),
        fuiSize({
          apply({ rects, elements }: any) {
            Object.assign(elements?.floating?.style, {
              width: `${rects?.reference?.width}px`,
              zIndex: 99,
            });
          },
          padding: 20,
        }),
      ],
    });

    React.useEffect(() => {
      setSelectedIndex(Math.max(0, listContentRef.current.indexOf(value) + 1));
    }, [value]);

    const floatingRef = refs.floating;

    const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
      useClick(context),
      useRole(context, { role: 'listbox' }),
      useDismiss(context, { ...dismiss }),
      useListNavigation(context, {
        listRef: listItemsRef,
        activeIndex,
        selectedIndex,
        onNavigate: setActiveIndex,
        loop: true,
      }),
      useTypeahead(context, {
        listRef: listContentRef,
        activeIndex,
        selectedIndex,
        onMatch: open ? setActiveIndex : setSelectedIndex,
      }),
    ]);

    useIsomorphicLayoutEffect(() => {
      const floating = floatingRef.current;

      if (open && controlledScrolling && floating) {
        const item =
          activeIndex != null
            ? listItemsRef.current[activeIndex]
            : selectedIndex != null
            ? listItemsRef.current[selectedIndex]
            : null;

        if (item && prevActiveIndex != null) {
          const itemHeight = listItemsRef.current[prevActiveIndex]?.offsetHeight ?? 0;
          const floatingHeight = floating.offsetHeight;
          const top = item.offsetTop;
          const bottom = top + itemHeight;

          if (top < floating.scrollTop) {
            floating.scrollTop -= floating.scrollTop - top + 5;
          } else if (bottom > floatingHeight + floating.scrollTop) {
            floating.scrollTop += bottom - floatingHeight - floating.scrollTop + 5;
          }
        }
      }
    }, [open, controlledScrolling, prevActiveIndex, activeIndex]);

    const contextValue = React.useMemo(
      () => ({
        selectedIndex,
        setSelectedIndex,
        listRef: listItemsRef,
        setOpen,
        onChange: onChange || (() => {}),
        activeIndex,
        setActiveIndex,
        getItemProps,
        dataRef: context.dataRef,
      }),
      [selectedIndex, onChange, activeIndex, getItemProps, context.dataRef]
    );

    React.useEffect(() => {
      if (open) {
        setState('open');
      } else if ((!open && selectedIndex) || (!open && value)) {
        setState('withValue');
      } else {
        setState('close');
      }
    }, [open, value, selectedIndex, selected]);

    // 4. set styles
    const selectVariant = variants[findMatch(valid.variants, variant, 'outlined')];
    const selectSize = selectVariant.sizes[findMatch(valid.sizes, size, 'md')];
    const selectError = selectVariant.error.select;
    const selectSuccess = selectVariant.success.select;
    const selectColor = selectVariant.colors.select[findMatch(valid.colors, color, 'blue')];
    const labelError = selectVariant.error.label;
    const labelSuccess = selectVariant.success.label;
    const labelColor = selectVariant.colors.label[findMatch(valid.colors, color, 'blue')];
    const stateClasses = selectVariant.states[state];
    const containerClasses = classnames(
      objectsToString(base.container),
      objectsToString(selectSize.container),
      containerProps?.className
    );
    const selectClasses = twMerge(
      classnames(
        objectsToString(base.select),
        objectsToString(selectVariant.base.select),
        objectsToString(stateClasses.select),
        objectsToString(selectSize.select),
        { [objectsToString(selectColor[state])]: !error && !success },
        { [objectsToString(selectError.initial)]: error },
        { [objectsToString(selectError.states[state])]: error },
        { [objectsToString(selectSuccess.initial)]: success },
        { [objectsToString(selectSuccess.states[state])]: success }
      ),
      className
    );
    const labelClasses = twMerge(
      classnames(
        objectsToString(base.label),
        objectsToString(selectVariant.base.label),
        objectsToString(stateClasses.label),
        objectsToString(selectSize.label.initial),
        objectsToString(selectSize.label.states[state]),
        { [objectsToString(labelColor[state])]: !error && !success },
        { [objectsToString(labelError.initial)]: error },
        { [objectsToString(labelError.states[state])]: error },
        { [objectsToString(labelSuccess.initial)]: success },
        { [objectsToString(labelSuccess.states[state])]: success }
      ),
      labelProps?.className ?? ''
    );
    const arrowClasses = classnames(objectsToString(base.arrow.initial), {
      [objectsToString(base.arrow.active)]: open,
    });
    const menuClasses = twMerge(classnames(objectsToString(base.menu)), menuProps?.className ?? '');
    const buttonContentClasses = classnames(
      'absolute top-2/4 -translate-y-2/4',
      variant === 'outlined' ? 'left-3 pt-0.5' : 'left-0 pt-3'
    );

    // 5. set animation
    const animation = {
      unmount: {
        opacity: 0,
        transformOrigin: 'top',
        transform: 'scale(0.95)',
        transition: { duration: 0.2, times: [0.4, 0, 0.2, 1] },
      },
      mount: {
        opacity: 1,
        transformOrigin: 'top',
        transform: 'scale(1)',
        transition: { duration: 0.2, times: [0.4, 0, 0.2, 1] },
      },
    };
    const appliedAnimation = merge(animation, animate);

    // 6. create an instance of AnimatePresence because of the types issue with the children
    const NewAnimatePresence: React.FC<NewAnimatePresenceProps> = AnimatePresence;

    // 7. validate the controlled and uncontrolled select
    React.useEffect(() => {
      if (value && !onChange) {
        console.error(
          'Warning: You provided a `value` prop to a select component without an `onChange` handler. This will render a read-only select. If the field should be mutable use `onChange` handler with `value` together.'
        );
      }
    }, [value, onChange]);

    // 8. select menu
    const selectMenu = (
      <FloatingFocusManager context={context} modal={false}>
        <motion.ul
          {...getFloatingProps({
            ...menuProps,
            ref: refs.setFloating,
            role: 'listbox',
            className: menuClasses,
            style: {
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              overflow: 'auto',
            },
            onPointerEnter(e) {
              const onPointerEnter = menuProps?.onPointerEnter;
              if (typeof onPointerEnter === 'function') {
                onPointerEnter(e);
                setControlledScrolling(false);
              }
              setControlledScrolling(false);
            },
            onPointerMove(e) {
              const onPointerMove = menuProps?.onPointerMove;
              if (typeof onPointerMove === 'function') {
                onPointerMove(e);
                setControlledScrolling(false);
              }
              setControlledScrolling(false);
            },
            onKeyDown(e) {
              const onKeyDown = menuProps?.onKeyDown;
              if (typeof onKeyDown === 'function') {
                onKeyDown(e);
                setControlledScrolling(true);
              }
              setControlledScrolling(true);
            },
          })}
          initial="unmount"
          exit="unmount"
          animate={open ? 'mount' : 'unmount'}
          variants={appliedAnimation}
        >
          {React.Children.map(
            children,
            (child, index) =>
              React.isValidElement(child) &&
              React.cloneElement(child, {
                ...child.props,
                index: child.props?.index || index + 1,
                id: `material-tailwind-select-${index}`,
              })
          )}
        </motion.ul>
      </FloatingFocusManager>
    );

    // 9. return
    return (
      <SelectContextProvider value={contextValue}>
        <div {...containerProps} ref={ref} className={containerClasses}>
          <button
            type="button"
            {...getReferenceProps({
              ...rest,
              ref: refs.setReference,
              className: selectClasses,
              disabled: disabled,
              name: name,
            })}
          >
            {typeof selected === 'function' ? (
              <span className={buttonContentClasses}>
                {selected(React.Children.toArray(children)[selectedIndex - 1] as any, selectedIndex - 1)}
              </span>
            ) : value && !onChange ? (
              <span className={buttonContentClasses}>{value}</span>
            ) : (
              <span
                {...(React.Children.toArray(children)[selectedIndex - 1] as any)?.props}
                className={buttonContentClasses}
              />
            )}
            <div className={arrowClasses}>
              {arrow ?? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </button>
          <label {...labelProps} className={labelClasses}>
            {label}
          </label>
          <NewAnimatePresence>
            {open && <>{lockScroll ? <FloatingOverlay lockScroll>{selectMenu}</FloatingOverlay> : selectMenu}</>}
          </NewAnimatePresence>
        </div>
      </SelectContextProvider>
    );
  }
);

Select.displayName = 'BlusteryUi.Select';

export { SelectOption as Option, Select, usePrevious, useSelect };
export type { SelectOptionProps };
export default Object.assign(Select, { Option: SelectOption });
