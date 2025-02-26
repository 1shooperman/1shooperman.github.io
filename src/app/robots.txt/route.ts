export const dynamic = 'force-static';

export async function GET() {
  return new Response(`User-agent: *
Allow: /

Sitemap: https://brandonshoop.com/sitemap.xml`, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
} 