import { z } from "zod";

const API_URL = "http://fr.wikipedia.org/w/api.php";
const USER_AGENT = "https://github.com/Mattross45/ReviseTonBarQuizz";

const wikipediaResponseShema = z.object({
  query: z.object({
    pages: z.record(
      z.coerce.number(),
      z.object({
        pageid: z.coerce.number(),
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

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    const wikipediaPage = wikipediaResponseShema.parse(data);
    console.log(wikipediaPage);
    return wikipediaPage;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export type Fact = {
  date: number;
  fact: string;
};

export function extractFactsFromWikipediaPage(
  page: WikipediaPage
): Array<Fact> {
  return [];
}
