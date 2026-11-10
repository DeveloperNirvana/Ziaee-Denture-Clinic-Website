
const SCHEMA_QUERY = `
  query PageSchema($uri: ID!) {
    page(id: $uri, idType: URI) {
      schemaCode {
        addCode
      }
    }
  }
`;

export async function getPageSchema(pathname: string) {
  try {
    const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

    if (!graphqlUrl) {
      throw new Error("GraphQL URL is not configured");
    }

    // Normalize page URI
    const uri =
      pathname === "/"
        ? "home"
        : pathname.replace(/^\/|\/$/g, "");

    const response = await fetch(graphqlUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: SCHEMA_QUERY,
        variables: {
          uri,
        },
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch schema from GraphQL");
    }

    const result = await response.json();

    if (result.errors) {
      console.error("Schema GraphQL error:", result.errors);
      return null;
    }

    return result?.data?.page?.schemaCode?.addCode || null;

  } catch (error) {
    console.error("Schema fetch error:", error);
    return null;
  }
}
