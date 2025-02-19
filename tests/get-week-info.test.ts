import { expect, it, describe } from "vitest";
import {
  extractFactsFromWikipediaPage,
  extractFactsFromWikipediaPages,
} from "@/core/get-week-info";
import type { WikipediaPage, Fact } from "@/core/get-week-info";

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
        "Blabla du début\n\n\nÉvénements\n\n\nVe siècle\n475 : This is our fact\n\n\nNaissances\n\n\nOther stuff",
    };

    const facts: Array<Fact> = extractFactsFromWikipediaPage(wikipediaPage);

    expect(facts).toEqual([
      {
        date: "475",
        factContent: "This is our fact",
        category: "Événements",
      },
    ]);
  });

  it("should extract facts from Art, Culture et Religion page", () => {
    const wikipediaPage: WikipediaPage = {
      title: "one fact page",
      content:
        "Blabla du début\n\n\nÉvénements\n\n\nVe siècle\n475 : This is our fact\n\n\nArt, culture et religion\n708 : élection du successeur du pape Jean VII\n\n\nNaissances\n\n\nOther stuff",
    };

    const facts: Array<Fact> = extractFactsFromWikipediaPage(wikipediaPage);

    expect(facts).toEqual([
      {
        date: "475",
        factContent: "This is our fact",
        category: "Événements",
      },
      {
        date: "708",
        factContent: "élection du successeur du pape Jean VII",
        category: "Art, Culture et Religion",
      },
    ]);
  });

  it("should extract facts from all interesting paragraphs", () => {
    const wikipediaPage: WikipediaPage = {
      title: "one fact page",
      content:
        "Blabla du début\n\n\nÉvénements\n\n\nVe siècle\n475 : This is our fact\n\n\nArt, culture et religion\n708 : élection du successeur du pape Jean VII\n\n\nSciences et technique\n1971 : inauguration du barrage d'Assouan en Égypte.\n\n\nÉconomie et société\n1790 : à Paris, l'Assemblée constituante fixe\n\n\nNaissances\n\n\nOther stuff",
    };

    const facts: Array<Fact> = extractFactsFromWikipediaPage(wikipediaPage);

    expect(facts).toEqual([
      {
        date: "475",
        factContent: "This is our fact",
        category: "Événements",
      },
      {
        date: "708",
        factContent: "élection du successeur du pape Jean VII",
        category: "Art, Culture et Religion",
      },
      {
        date: "1971",
        factContent: "inauguration du barrage d'Assouan en Égypte.",
        category: "Sciences et Technique",
      },
      {
        date: "1790",
        factContent: "à Paris, l'Assemblée constituante fixe",
        category: "Économie et Société",
      },
    ]);
  });

  it("should extract multiple facts from a wikipedia page from the 'Événement' page in multiple centuries", () => {
    const wikipediaPage: WikipediaPage = {
      title: "one fact page",
      content:
        "Blabla du début\n\n\nÉvénements\n\n\nVe siècle\n475 : This is our fact\n\n\nVIIe siècle\n681 : Second fact !\n\n\nNaissances\n\n\nOther stuff",
    };

    const facts: Array<Fact> = extractFactsFromWikipediaPage(wikipediaPage);

    expect(facts).toEqual([
      {
        date: "475",
        factContent: "This is our fact",
        category: "Événements",
      },
      {
        date: "681",
        factContent: "Second fact !",
        category: "Événements",
      },
    ]);
  });

  it("should extract multiple facts from a wikipedia page from the 'Événement' page in multiple centuries and multiple within a century", () => {
    const wikipediaPage: WikipediaPage = {
      title: "one fact page",
      content:
        "Blabla du début\n\n\nÉvénements\n\n\nVe siècle\n475 : This is our fact\n\n\nVIIe siècle\n681 : Second fact !\n1792 : third.\n\n\nNaissances\n\n\nOther stuff",
    };

    const facts: Array<Fact> = extractFactsFromWikipediaPage(wikipediaPage);

    expect(facts).toEqual([
      {
        date: "475",
        factContent: "This is our fact",
        category: "Événements",
      },
      {
        date: "681",
        factContent: "Second fact !",
        category: "Événements",
      },
      {
        date: "1792",
        factContent: "third.",
        category: "Événements",
      },
    ]);
  });
  it("should handle multiple events per date, multiline at the end", () => {
    const wikipediaPage: WikipediaPage = {
      title: "one fact page",
      content:
        "Blabla du début\n\n\nÉvénements\n\n\nVe siècle\n475 : This is our fact\n\n\n\n2022 :\nDébut des manifestations\nle premier ministre remet sa démission.\n\n\nNaissances\n\n\nOther stuff",
    };

    const facts: Array<Fact> = extractFactsFromWikipediaPage(wikipediaPage);

    expect(facts).toEqual([
      {
        date: "475",
        factContent: "This is our fact",
        category: "Événements",
      },
      {
        date: "2022",
        factContent: "Début des manifestations",
        category: "Événements",
      },
      {
        date: "2022",
        factContent: "le premier ministre remet sa démission.",
        category: "Événements",
      },
    ]);
  });
  it("should handle multiple events per date, multiline in the middle", () => {
    const wikipediaPage: WikipediaPage = {
      title: "one fact page",
      content:
        "Blabla du début\n\n\nÉvénements\n\n\nIer siècle\n33 :\nDébut des manifestations\nle premier ministre remet sa démission.\n\n\nVe siècle\n475 : This is our fact\n\n\n\n\n\nNaissances\n\n\nOther stuff",
    };

    const facts: Array<Fact> = extractFactsFromWikipediaPage(wikipediaPage);

    expect(facts).toEqual([
      {
        date: "33",
        factContent: "Début des manifestations",
        category: "Événements",
      },
      {
        date: "33",
        factContent: "le premier ministre remet sa démission.",
        category: "Événements",
      },
      {
        date: "475",
        factContent: "This is our fact",
        category: "Événements",
      },
    ]);
  });
});

describe("multiple wikipedia pages", () => {
  it("should work on mulitple wikipedia pages", () => {
    const wikipediaPage1: WikipediaPage = {
      title: "page 1",
      content:
        "Blabla du début\n\n\nÉvénements\n\n\nVe siècle\n475 : This is our fact\n\n\nNaissances\n\n\nOther stuff",
    };
    const wikipediaPage2: WikipediaPage = {
      title: "page 2",
      content:
        "Blabla du début\n\n\nÉvénements\n\n\nVe siècle\n687 : second page\n\n\nNaissances\n\n\nOther stuff",
    };

    const facts: Array<Fact> = extractFactsFromWikipediaPages([
      wikipediaPage1,
      wikipediaPage2,
    ]);

    expect(facts).toEqual([
      {
        date: "475",
        factContent: "This is our fact",
        category: "Événements",
      },
      {
        date: "687",
        factContent: "second page",
        category: "Événements",
      },
    ]);
  });
  it("should return result ordered by date", () => {
    const wikipediaPage1: WikipediaPage = {
      title: "page 1",
      content:
        "Blabla du début\n\n\nÉvénements\n\n\nVe siècle\n475 : This is our fact\n\n\nNaissances\n\n\nOther stuff",
    };
    const wikipediaPage2: WikipediaPage = {
      title: "page 2",
      content:
        "Blabla du début\n\n\nÉvénements\n\n\nVe siècle\n60 : second page\n\n\nNaissances\n\n\nOther stuff",
    };

    const facts: Array<Fact> = extractFactsFromWikipediaPages([
      wikipediaPage1,
      wikipediaPage2,
    ]);

    expect(facts).toEqual([
      {
        date: "60",
        factContent: "second page",
        category: "Événements",
      },
      {
        date: "475",
        factContent: "This is our fact",
        category: "Événements",
      },
    ]);
  });
  it("should return result ordered by date, even with other stuff written in date", () => {
    const wikipediaPage1: WikipediaPage = {
      title: "page 1",
      content:
        "Blabla du début\n\n\nÉvénements\n\n\nVe siècle\n475 : This is our fact\n\n\nNaissances\n\n\nOther stuff",
    };
    const wikipediaPage2: WikipediaPage = {
      title: "page 2",
      content:
        "Blabla du début\n\n\nÉvénements\n\n\nVe siècle\n60 (a very important year): second page\n\n\nNaissances\n\n\nOther stuff",
    };

    const facts: Array<Fact> = extractFactsFromWikipediaPages([
      wikipediaPage1,
      wikipediaPage2,
    ]);

    expect(facts).toEqual([
      {
        date: "60 (a very important year)",
        factContent: "second page",
        category: "Événements",
      },
      {
        date: "475",
        factContent: "This is our fact",
        category: "Événements",
      },
    ]);
  });
  it("should return result ordered by date, even if bc", () => {
    const wikipediaPage1: WikipediaPage = {
      title: "page 1",
      content:
        "Blabla du début\n\n\nÉvénements\n\n\nVe siècle\n475 : This is our fact\n\n\nNaissances\n\n\nOther stuff",
    };
    const wikipediaPage2: WikipediaPage = {
      title: "page 2",
      content:
        "Blabla du début\n\n\nÉvénements\n\n\nVe siècle\n-300 : second page\n\n\nNaissances\n\n\nOther stuff",
    };

    const facts: Array<Fact> = extractFactsFromWikipediaPages([
      wikipediaPage1,
      wikipediaPage2,
    ]);

    expect(facts).toEqual([
      {
        date: "-300",
        factContent: "second page",
        category: "Événements",
      },
      {
        date: "475",
        factContent: "This is our fact",
        category: "Événements",
      },
    ]);
  });
});
