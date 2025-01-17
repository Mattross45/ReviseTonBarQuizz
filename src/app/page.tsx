import { ModeToggle } from "@/components/mode-toggle";
import { Checkbox } from "@/components/ui/checkbox";
import { fetchWeekFacts } from "@/core/wikipediaService";

export default async function Home() {
  const facts = await fetchWeekFacts();

  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center sm:items-start">
        <ModeToggle />
        <h1>Wikipedia Facts</h1>
        <div className="flex flex-col items-start">
          {facts.map((fact, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Checkbox id={`${index}`} className="self-start" />
              <label htmlFor={`${index}`}>
                {fact.date} : {fact.factContent}
              </label>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
