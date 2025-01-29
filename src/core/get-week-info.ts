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

  const naissanceTitlePararaph = paragraphs.findIndex((element) =>
    element.includes("Naissances")
  );

  const factParagraphs = paragraphs.splice(
    eventsTitlePararaph + 1,
    naissanceTitlePararaph - 2
  );

  const factsWithDates = factParagraphs.flatMap((p) => p.split("\n").splice(1));

  const facts: Array<Fact> = [];

  let current_date = null;

  for (let index = 0; index < factsWithDates.length; index++) {
    const factWithDate = factsWithDates[index];

    if (factWithDate == "") continue;

    // single line fact
    if (
      factWithDate.includes(":") &&
      factWithDate.match(/-?\d+/) != null &&
      factWithDate.split(":")[1].trim() != ""
    ) {
      const splitFactWithDates = factWithDate.split(":");

      facts.push({
        date: splitFactWithDates[0].trim(),
        factContent: splitFactWithDates[1].trim(),
      });

      current_date = null;
    }

    // start a multiline multiline
    if (factWithDate.includes(":") && factWithDate.split(":")[1].trim() == "") {
      current_date = factWithDate.split(":")[0].trim();
    }

    // if in multiline
    if (!factWithDate.includes(":") && current_date != null) {
      facts.push({
        date: current_date,
        factContent: factWithDate,
      });
    }
  }

  return facts;
}

function extractFirstYear(text: string): number {
  const match = text.match(/-?\d+/);
  return match ? parseInt(match[0], 10) : Infinity;
}

export function extractFactsFromWikipediaPages(
  pages: Array<WikipediaPage>
): Array<Fact> {
  const facts = pages.flatMap((page) => extractFactsFromWikipediaPage(page));
  return facts.sort((a, b) => {
    const yearA = extractFirstYear(a.date);
    const yearB = extractFirstYear(b.date);

    if (yearA < yearB) {
      return -1;
    }
    if (yearA > yearB) {
      return 1;
    }
    return 0;
  });
}
