'use client';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <main className="mx-auto max-w-2xl p-6">
          <h1 className="text-2xl font-semibold">Something went wrong</h1>
          <p className="mt-3 text-gray-600">{error.message}</p>
          <button className="mt-4 rounded bg-black px-3 py-1.5 text-white" onClick={() => reset()}>Try again</button>
        </main>
      </body>
    </html>
  );
}
