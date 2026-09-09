const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

export async function fetchGraphQL<T = any>(
  query: string,
  variables: Record<string, any> = {}
): Promise<T> {
  if (!GRAPHQL_ENDPOINT) {
    throw new Error(
      "NEXT_PUBLIC_GRAPHQL_ENDPOINT is missing in .env.local"
    );
  }

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
    query,
    variables,
}),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  const json = await response.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error(json.errors[0].message);
  }

  return json.data;
}