'use client';
import React, { useEffect, useRef, useState } from 'react';
import Typography from '../Typography';

interface TextFieldProps extends React.ComponentProps<'input'> {}

const TextField = (props: TextFieldProps) => {
  const { onFocus, onBlur } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    inputRef.current?.focus();
    setFocused(true);
  };

  console.log(focused);

  const styles = focused ? 'border-2 border-primary' : '';

  return (
    <div className={`relative min-h-[32px] box-border`}>
      <input
        onFocus={(event) => {
          setFocused(true);
          return typeof onFocus === 'function' && onFocus(event);
        }}
        onBlur={(event) => {
          setFocused(false);
          return typeof onBlur === 'function' && onBlur(event);
        }}
        className="w-full px-4 py-2 border-0 outline-none z-10 relative bg-transparent"
      />
      {/* <label className="absolute left-4 top-2 transition-all duration-300 ease-out pointer-events-none text-gray-500">
        label
      </label> */}
      <fieldset
        className={`border absolute rounded-md inset-0 px-4 py-0 ${
          focused && '-top-1.5'
        } border-gray-300 z-0 ${styles}`}
      >
        <legend className={`leading-none tracking-normal ${!focused && 'hidden'}`}>
          <Typography variant="caption" className="px-1">
            Label
          </Typography>
        </legend>
      </fieldset>
    </div>
  );
};

export default TextField;
