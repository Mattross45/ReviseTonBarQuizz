import { extractFactsFromWikipediaPage } from "@/core/get_week_info";
import { fetchWikipediaPage } from "@/core/wikipediaService";

export default async function Home() {
  const page = await fetchWikipediaPage("2_janvier");

  const facts = extractFactsFromWikipediaPage(page);

  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center sm:items-start">
        <h1>Wikipedia Facts</h1>
        <ul>
          {facts.map((fact, index) => (
            <li key={index}>
              {fact.date} : {fact.factContent}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
