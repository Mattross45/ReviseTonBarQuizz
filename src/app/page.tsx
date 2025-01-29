import FactList from "@/components/fact-list";
import { fetchWeekFacts } from "@/core/wikipedia-service";

export default async function Home() {
  const facts = await fetchWeekFacts();

  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center sm:items-start h-full">
        <FactList facts={facts} />
      </main>
    </div>
  );
}
