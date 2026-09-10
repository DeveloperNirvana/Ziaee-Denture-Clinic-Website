import type { MetadataRoute } from "next";

const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
const SITE_URL = "https://www.ziaeedentureclinic.ca";

async function fetchSitemapPages() {
  if (!GRAPHQL_URL) {
    throw new Error("NEXT_PUBLIC_GRAPHQL_URL is not configured");
  }

  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query GetSitemapPages {
          pages(first: 100) {
            nodes {
              uri
              modified
            }
          }
        }
      `,
    }),
    cache: "no-store",
  });

  //console.log("SITEMAP STATUS:", response.status);

  const json = await response.json();

  // console.log(
  //   "SITEMAP GRAPHQL RESPONSE:",
  //   JSON.stringify(json, null, 2)
  // );

  if (json.errors) {
    console.error("Sitemap GraphQL Error:", json.errors);
    throw new Error(json.errors[0].message);
  }

  return json.data?.pages?.nodes ?? [];
}
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await fetchSitemapPages();

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },

    ...pages
      .filter((page: any) => page.uri && page.uri !== "/")
      .map((page: any) => ({
        url: `${SITE_URL}${page.uri.startsWith("/") ? page.uri : `/${page.uri}`}`,
        lastModified: page.modified
          ? new Date(page.modified)
          : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
  ];
}