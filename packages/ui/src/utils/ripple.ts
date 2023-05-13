// 'use client';
// import React from 'react';

// import resolveConfig from 'tailwindcss/resolveConfig';
// import config from '@tailwind-config';
// import chroma from 'chroma-js';

// const tailwindConfig = resolveConfig(config);

// const getPointerEvent = (
//   clickPointX: number,
//   elementWidth: number,
//   offsetX: number,
//   clickPointY: number,
//   elementHeight: number,
//   offsetY: number
// ) => {
//   const pointerX = clickPointX - offsetX > elementWidth / 2 ? 0 : elementWidth;
//   const pointerY = clickPointY - offsetY > elementHeight / 2 ? 0 : elementHeight;
//   const pointerZ = Math.hypot(pointerX - (clickPointX - offsetX), pointerY - (clickPointY - offsetY));

//   return pointerZ;
// };

// const applyStyles = (
//   element: HTMLSpanElement,
//   rect: DOMRect,
//   radius: number,
//   event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
//   color?: 'primary' | 'secondary' | 'info' | 'warning' | 'error' | 'success' | string,
//   variants?: string
// ) => {
//   let bgColor;

//   if (!color || variants === 'contained') {
//     bgColor = '#FFFFFF';
//   } else if (color) {
//     bgColor = (tailwindConfig?.theme?.colors?.[color] as any)?.['DEFAULT'] || '#FFFFFF';
//   } else {
//     bgColor = '#FFFFFF';
//   }
//   element.classList.add('ripple');
//   element.style.backgroundColor = chroma(bgColor).alpha(0.3).hex();
//   element.style.backgroundColor = element.style.backgroundColor = element.style.borderRadius = '50%';
//   element.style.pointerEvents = 'none';
//   element.style.position = 'absolute';
//   element.style.left = event.clientX - rect.left - radius + 'px';
//   element.style.top = event.clientY - rect.top - radius + 'px';
//   element.style.width = element.style.height = radius * 2 + 'px';
// };

// const applyAnimation = (element: HTMLSpanElement) => {
//   element.animate(
//     [
//       {
//         transform: 'scale(0)',
//         opacity: 1,
//       },
//       {
//         transform: 'scale(1.5)',
//         opacity: 0,
//       },
//     ],
//     {
//       duration: 500,
//       easing: 'linear',
//     }
//   );
// };

// export const createRipple = (
//   event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
//   color?: string,
//   variants?: string
// ) => {
//   const element = event.currentTarget;

//   element.style.position = 'relative';
//   element.style.overflow = 'hidden';

//   const rect = element.getBoundingClientRect();

//   const radius = getPointerEvent(
//     event.clientX,
//     element.offsetWidth,
//     rect.left,
//     event.clientY,
//     element.offsetHeight,
//     rect.top
//   );

//   const circle = document.createElement('span');

//   applyStyles(circle, rect, radius, event, color, variants);
//   applyAnimation(circle);

//   element.appendChild(circle);

//   setTimeout(() => circle.remove(), 500);
// };
