import { ModeToggle } from "@/components/mode-toggle";
import { Checkbox } from "@/components/ui/checkbox";
import { extractFactsFromWikipediaPage } from "@/core/get_week_info";
import { fetchWikipediaPage } from "@/core/wikipediaService";

export default async function Home() {
  const page = await fetchWikipediaPage("2_janvier");

  const facts = extractFactsFromWikipediaPage(page);

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
