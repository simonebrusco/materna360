import Header from "../components/Header";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Greeting />
        <div className="h-4" />
        <MessageOfTheDay />
      </main>
    </>
  );
}
