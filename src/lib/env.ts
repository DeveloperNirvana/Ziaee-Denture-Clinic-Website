export const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
  '';

export const WP_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_URL ||
  '';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'http://localhost:3000';

if (!GRAPHQL_ENDPOINT) {
  throw new Error(
    'NEXT_PUBLIC_GRAPHQL_ENDPOINT is not defined'
  );
}

if (!WP_URL) {
  throw new Error(
    'NEXT_PUBLIC_WORDPRESS_URL is not defined'
  );
}

if (!SITE_URL) {
  throw new Error(
    'NEXT_PUBLIC_SITE_URL is not defined'
  );
}