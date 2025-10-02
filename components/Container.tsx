export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-md md:max-w-2xl lg:max-w-4xl px-4 sm:px-6">{children}</div>
  );
}
