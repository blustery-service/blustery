'use client';
import React from 'react';
import { IconProps, Icon as ReactIcon } from '@iconify/react';
import resolveConfig from 'tailwindcss/resolveConfig';

const Icon = (props: IconProps) => {
  return <ReactIcon {...props} />;
};

export default Icon;
