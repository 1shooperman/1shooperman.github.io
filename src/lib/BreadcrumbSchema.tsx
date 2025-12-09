import { generateBreadcrumbSchema } from './schema';

/**
 * Generate breadcrumb schema for a given pathname
 * Used in page components to add BreadcrumbList structured data
 */
export function generateBreadcrumbSchemaForPath(pathname: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://brandonshoop.com';
  const segments = pathname.split('/').filter(Boolean);

  const items = [
    { name: 'Home', url: baseUrl },
    ...segments.map((segment, index) => {
      const href = '/' + segments.slice(0, index + 1).join('/');
      const name = decodeURIComponent(segment)
        .replace(/[-_]+/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase());
      return {
        name,
        url: `${baseUrl}${href}`,
      };
    }),
  ];

  return generateBreadcrumbSchema(items);
}

