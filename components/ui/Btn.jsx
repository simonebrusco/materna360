export default function Btn({ children, variant = 'primary', className = '', ...rest }) {
  const map = {
    primary: 'btn btn-primary',
    solid: 'btn btn-primary',
    ghost: 'btn btn-ghost',
    subtle: 'btn btn-subtle',
  };
  const cls = `${map[variant] ?? map.primary} ${className}`.trim();
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
