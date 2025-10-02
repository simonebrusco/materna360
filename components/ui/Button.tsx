type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' };

export default function Button({ variant = 'primary', className = '', ...props }: Props) {
  const base =
    'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';
  const variants: Record<NonNullable<Props['variant']>, string> = {
    primary: `${base} bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600`,
    secondary: `${base} border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 focus-visible:outline-gray-400`,
    ghost: `${base} text-gray-700 hover:bg-gray-100 focus-visible:outline-gray-300`,
  };
  return <button className={`${variants[variant]} ${className}`} {...props} />;
}
