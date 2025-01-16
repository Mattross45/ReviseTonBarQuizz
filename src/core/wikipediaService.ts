import { z } from "zod";

const API_URL = "http://fr.wikipedia.org/w/api.php";
const USER_AGENT = "https://github.com/Mattross45/ReviseTonBarQuizz";

type WikipediaResponse = z.infer<typeof wikipediaResponseShema>;

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
