'use client';

type Props = {
  label?: string;
};

export default function AlertButton({ label = 'Mostrar Alerta' }: Props) {
  function handleClick() {
    alert('Welcome to Materna360 🚀');
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-[#359b9d] px-6 py-3 text-white text-base font-medium shadow-md hover:opacity-90 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#359b9d]/40"
    >
      {label}
    </button>
  );
}
