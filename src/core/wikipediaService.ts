import { z } from "zod";
import { WikipediaPage } from "./get_week_info";

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

export async function fetchWikipediaPage(
  title: string
): Promise<WikipediaPage> {
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
  const wikipediaResponse = wikipediaResponseShema.parse(data);

  const pageId = Object.values(wikipediaResponse.query.pages)[0].pageid;

  const wikipediaPage = {
    title: wikipediaResponse.query.pages[pageId].title,
    content: wikipediaResponse.query.pages[pageId].extract,
  };

  return wikipediaPage;
}
