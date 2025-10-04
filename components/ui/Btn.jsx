export default function Btn({ children, variant = 'primary', className = '', ...rest }) {
  const base = 'btn';
  const map = {
    primary: 'btn-primary',
    solid:   'btn-primary', // compat
    ghost:   'btn-ghost',
    subtle:  'btn-subtle',
  };
  const cls = `${base} ${map[variant] ?? 'btn-primary'} ${className}`.trim();
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
