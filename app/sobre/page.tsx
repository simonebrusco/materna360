import Link from 'next/link';

export default function SobrePage() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <section className="mx-auto w-full max-w-2xl rounded-2xl bg-white p-8 shadow">
        <h1 className="text-2xl font-semibold">About Materna360</h1>
        <p className="mt-3 text-gray-700">
          This is a simple test page to validate internal navigation using the Next.js App Router.
          It demonstrates a centered card layout with a button to return to the homepage.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            aria-label="Back to Home"
            className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-gray-900 px-5 py-3 text-white shadow-md hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/50"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
