import { expect, it } from "vitest";
import { extractFactsFromWikipediaPage } from "@/core/get_week_info";
import type { WikipediaPage, Fact } from "@/core/get_week_info";

it("should extract no facts from an empty wikipedia page", async () => {
  const wikipediaPage: WikipediaPage = {
    title: "empty page",
    content: "",
  };

  const facts: Array<Fact> = await extractFactsFromWikipediaPage(wikipediaPage);

  expect(facts).toEqual([]);
});
