import { expect, it, describe } from "vitest";
import {
  extractFactsFromWikipediaPage,
  extractFactsFromWikipediaPages,
} from "@/core/get_week_info";
import type { WikipediaPage, Fact } from "@/core/get_week_info";

describe("single wikipedia page", () => {
  it("should extract no facts from an empty wikipedia page", () => {
    const wikipediaPage: WikipediaPage = {
      title: "empty page",
      content: "",
    };

    const facts: Array<Fact> = extractFactsFromWikipediaPage(wikipediaPage);

    expect(facts).toEqual([]);
  });

  it("should extract one fact from a wikipedia page with one fact from the 'Événement' page", () => {
    const wikipediaPage: WikipediaPage = {
      title: "one fact page",
      content:
        "Blabla du début\n\n\nÉvénements\n\n\nVe siècle\n475 : This is our fact\n\n\nArt, culture et religion\nother stuff",
    };

    const facts: Array<Fact> = extractFactsFromWikipediaPage(wikipediaPage);

    expect(facts).toEqual([
      {
        date: "475",
        factContent: "This is our fact",
      },
    ]);
  });

  it("should extract multiple facts from a wikipedia page from the 'Événement' page in multiple centuries", () => {
    const wikipediaPage: WikipediaPage = {
      title: "one fact page",
      content:
        "Blabla du début\n\n\nÉvénements\n\n\nVe siècle\n475 : This is our fact\n\n\nVIIe siècle\n681 : Second fact !\n\n\nArt, culture et religion\nother stuff",
    };

    const facts: Array<Fact> = extractFactsFromWikipediaPage(wikipediaPage);

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

  it("should extract multiple facts from a wikipedia page from the 'Événement' page in multiple centuries and multiple within a century", () => {
    const wikipediaPage: WikipediaPage = {
      title: "one fact page",
      content:
        "Blabla du début\n\n\nÉvénements\n\n\nVe siècle\n475 : This is our fact\n\n\nVIIe siècle\n681 : Second fact !\n1792 : third.\n\n\nArt, culture et religion\nother stuff",
    };

    const facts: Array<Fact> = extractFactsFromWikipediaPage(wikipediaPage);

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
});

describe("multiple wikipedia pages", () => {
  it("should work on mulitple wikipedia pages", () => {
    const wikipediaPage1: WikipediaPage = {
      title: "page 1",
      content:
        "Blabla du début\n\n\nÉvénements\n\n\nVe siècle\n475 : This is our fact\n\n\nArt, culture et religion\nother stuff",
    };
    const wikipediaPage2: WikipediaPage = {
      title: "page 2",
      content:
        "Blabla du début\n\n\nÉvénements\n\n\nVe siècle\n687 : second page\n\n\nArt, culture et religion\nother stuff",
    };

    const facts: Array<Fact> = extractFactsFromWikipediaPages([
      wikipediaPage1,
      wikipediaPage2,
    ]);

    expect(facts).toEqual([
      {
        date: "475",
        factContent: "This is our fact",
      },
      {
        date: "687",
        factContent: "second page",
      },
    ]);
  });
});
