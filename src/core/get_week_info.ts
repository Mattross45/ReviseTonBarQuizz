export type WikipediaPage = {
  title: string;
  content: string;
};

export type Fact = {
  date: string;
  factContent: string;
};

export function extractFactsFromWikipediaPage(
  page: WikipediaPage
): Array<Fact> {
  const paragraphs = page.content.split("\n\n\n");
  const eventsTitlePararaph = paragraphs.findIndex(
    (element) => element === "Événements"
  );
  const cultureTitlePararaph = paragraphs.findIndex((element) =>
    element.includes("Art, culture et religion")
  );
  const factParagraphs = paragraphs
    .splice(eventsTitlePararaph + 1, cultureTitlePararaph - 1)
    .join("\n");

  const factsWithDates = factParagraphs.split("\n");
  const facts = factsWithDates
    .filter((factWithDate) => factWithDate.includes(":"))
    .map((factWithDate) => {
      const splitFactWithDates = factWithDate.split(":");
      return {
        date: splitFactWithDates[0].trim(),
        factContent: splitFactWithDates[1].trim(),
      };
    });

  return facts;
}

export function extractFactsFromWikipediaPages(
  pages: Array<WikipediaPage>
): Array<Fact> {
  const facts = pages.flatMap((page) => extractFactsFromWikipediaPage(page));
  return facts.sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    return 0;
  });
}
