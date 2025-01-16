import { z } from "zod";

const API_URL = "http://fr.wikipedia.org/w/api.php";
const USER_AGENT = "https://github.com/Mattross45/ReviseTonBarQuizz";

const wikipediaResponseShema = z.object({
  query: z.object({
    pages: z.record(
      z.string(),
      z.object({
        pageid: z.string(),
        title: z.string(),
        extract: z.string(),
      })
    ),
  }),
});

type WikipediaResponse = z.infer<typeof wikipediaResponseShema>;

export type WikipediaPage = {
  title: string;
  content: string;
};

export async function fetch_page_date(
  title: string
): Promise<WikipediaResponse> {
  const url = `${API_URL}?action=query&titles=${title}&format=json&explaintext=1&exsectionformat=plain&prop=extracts`;
  const options = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      USER_AGENT: USER_AGENT,
    },
    body: undefined,
  };

  const response = await fetch(url, options);
  const data = await response.json();
  const wikipediaPage = wikipediaResponseShema.parse(data);
  return wikipediaPage;
}

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
  const factParagraph = paragraphs[eventsTitlePararaph + 1];
  const factsWithDates = factParagraph.split("\n");
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
