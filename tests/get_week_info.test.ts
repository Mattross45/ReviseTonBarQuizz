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

it("should extract one fact from a wikipedia page with one fact", async () => {
  const wikipediaPage: WikipediaPage = {
    title: "one fact page",
    content:
      "Blabla du début\n\n\nÉvénements\n\n\nVe siècle\n475 : This is our fact",
  };

  const facts: Array<Fact> = await extractFactsFromWikipediaPage(wikipediaPage);

  expect(facts).toEqual([
    {
      date: "475",
      factContent: "This is our fact",
    },
  ]);
});
