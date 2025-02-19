export type WikipediaPage = {
  title: string;
  content: string;
};

export type Category =
  | "Événements"
  | "Art, Culture et Religion"
  | "Sciences et Technique"
  | "Économie et Société";

export type Fact = {
  date: string;
  factContent: string;
  category: Category;
};

function getCategoryToIndex(paragraphs: string[]): Record<Category, number> {
  const eventsTitlePararaph = paragraphs.findIndex(
    (element) => element === "Événements"
  );
  const artsCultureReligionTitlePararaph = paragraphs.findIndex((element) =>
    element.toLowerCase().includes("art, culture et religion")
  );
  const scienceTechniqueTitlePararaph = paragraphs.findIndex((element) =>
    element.toLowerCase().includes("sciences et technique")
  );
  const ecionopmieSocieteTitlePararaph = paragraphs.findIndex((element) =>
    element.toLowerCase().includes("économie et société")
  );

  return {
    Événements: eventsTitlePararaph,
    "Sciences et Technique": scienceTechniqueTitlePararaph,
    "Art, Culture et Religion": artsCultureReligionTitlePararaph,
    "Économie et Société": ecionopmieSocieteTitlePararaph,
  };
}

export function extractFactsFromWikipediaPage(
  page: WikipediaPage
): Array<Fact> {
  const paragraphs = page.content.split("\n\n\n");
  const categoryToIndex = getCategoryToIndex(paragraphs);

  const naissanceTitlePararaph = paragraphs.findIndex((element) =>
    element.includes("Naissances")
  );

  const factParagraphs = paragraphs
    .map((value, index) => {
      const category =
        (Object.entries(categoryToIndex).find(
          ([_, titleIndex]) => index === titleIndex
        )?.[0] as Category) || ("Événements" as Category);

      return {
        category,
        line: value,
      };
    })
    .filter((_, index) => {
      return (
        index > categoryToIndex["Événements"] && index < naissanceTitlePararaph
      );
    });

  const factsWithDates = factParagraphs.flatMap(({ category, line }) =>
    line
      .split("\n")
      .splice(1)
      .map((value) => ({ category: category, line: value }))
  );

  const facts: Array<Fact> = [];

  let current_date = null;

  for (let index = 0; index < factsWithDates.length; index++) {
    const factWithDate = factsWithDates[index];

    if (factWithDate.line == "") continue;

    // single line fact
    if (
      factWithDate.line.includes(":") &&
      factWithDate.line.match(/-?\d+/) != null &&
      factWithDate.line.split(":")[1].trim() != ""
    ) {
      const splitFactWithDates = factWithDate.line.split(":");

      facts.push({
        date: splitFactWithDates[0].trim(),
        factContent: splitFactWithDates[1].trim(),
        category: factWithDate.category,
      });

      current_date = null;
    }

    // start a multiline multiline
    if (
      factWithDate.line.includes(":") &&
      factWithDate.line.split(":")[1].trim() == ""
    ) {
      current_date = factWithDate.line.split(":")[0].trim();
    }

    // if in multiline
    if (!factWithDate.line.includes(":") && current_date != null) {
      facts.push({
        date: current_date,
        factContent: factWithDate.line,
        category: factWithDate.category,
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
