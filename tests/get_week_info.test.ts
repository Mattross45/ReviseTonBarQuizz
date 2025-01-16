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

it("should extract one fact from a wikipedia page with one fact from the 'Événement' page", async () => {
  const wikipediaPage: WikipediaPage = {
    title: "one fact page",
    content:
      "Blabla du début\n\n\nÉvénements\n\n\nVe siècle\n475 : This is our fact\n\n\nArt, culture et religion\nother stuff",
  };

  const facts: Array<Fact> = await extractFactsFromWikipediaPage(wikipediaPage);

  expect(facts).toEqual([
    {
      date: "475",
      factContent: "This is our fact",
    },
  ]);
});

it("should extract multiple facts from a wikipedia page from the 'Événement' page in multiple centuries", async () => {
  const wikipediaPage: WikipediaPage = {
    title: "one fact page",
    content:
      "Blabla du début\n\n\nÉvénements\n\n\nVe siècle\n475 : This is our fact\n\n\nVIIe siècle\n681 : Second fact !\n\n\nArt, culture et religion\nother stuff",
  };

  const facts: Array<Fact> = await extractFactsFromWikipediaPage(wikipediaPage);

  expect(facts).toEqual([
    {
      date: "475",
      factContent: "This is our fact",
    },
    {
      date: "681",
      factContent: "Second fact !",
    },
  ]);
});

it("should extract multiple facts from a wikipedia page from the 'Événement' page in multiple centuries and multiple within a century", async () => {
  const wikipediaPage: WikipediaPage = {
    title: "one fact page",
    content:
      "Blabla du début\n\n\nÉvénements\n\n\nVe siècle\n475 : This is our fact\n\n\nVIIe siècle\n681 : Second fact !\n1792 : third.\n\n\nArt, culture et religion\nother stuff",
  };

  const facts: Array<Fact> = await extractFactsFromWikipediaPage(wikipediaPage);

  expect(facts).toEqual([
    {
      date: "475",
      factContent: "This is our fact",
    },
    {
      date: "681",
      factContent: "Second fact !",
    },
    {
      date: "1792",
      factContent: "third.",
    },
  ]);
});
