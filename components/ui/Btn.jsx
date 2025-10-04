'use client';

import clsx from 'clsx';

export default function Btn({
  children,
  variant = 'primary',     // 'primary' | 'ghost' | 'subtle'
  className = '',
  ...rest
}) {
  const classes = clsx(
    'btn',
    variant === 'primary' && 'btn-primary',
    variant === 'ghost' && 'btn-ghost',
    variant === 'subtle' && 'btn-subtle',
    className
  );

  return (
    <button type="button" {...rest} className={classes}>
      {children}
    </button>
  );
}
