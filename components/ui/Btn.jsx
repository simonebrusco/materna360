'use client';

import React from 'react';

const join = (...classes) => classes.filter(Boolean).join(' ');

export default function Btn({
  children,
  variant = 'solid',
  className = '',
  style,
  ...rest
}) {
  const variantClass =
    variant === 'ghost' ? 'btn-ghost' :
    variant === 'subtle' ? 'btn-ghost' :
    'btn-primary';

  return (
    <button
      {...rest}
      style={style}
      className={join('btn', variantClass, className)}
    >
      {children}
    </button>
  );
}
