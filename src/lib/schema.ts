/**
 * Schema.org JSON-LD structured data generation utilities
 * These functions generate schema markup for SEO and GEO (Generative Engine Optimization)
 */

export interface PersonSchema {
  '@context': string;
  '@type': 'Person';
  name: string;
  url: string;
  jobTitle?: string;
  worksFor?: {
    '@type': 'Organization';
    name: string;
    url: string;
  };
  sameAs?: string[];
  description?: string;
}

export interface ArticleSchema {
  '@context': string;
  '@type': 'BlogPosting';
  headline: string;
  description?: string;
  datePublished: string;
  dateModified?: string;
  author: {
    '@type': 'Person';
    name: string;
    url: string;
  };
  publisher: {
    '@type': 'Organization';
    name: string;
    logo?: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  mainEntityOfPage: {
    '@type': 'WebPage';
    '@id': string;
  };
}

export interface ProjectSchema {
  '@context': string;
  '@type': 'SoftwareApplication';
  name: string;
  description: string;
  applicationCategory?: string;
  operatingSystem?: string;
  offers?: {
    '@type': 'Offer';
    price: string;
    priceCurrency: string;
  };
  author: {
    '@type': 'Person';
    name: string;
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface BreadcrumbSchema {
  '@context': string;
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}

export interface WebsiteSchema {
  '@context': string;
  '@type': 'WebSite';
  name: string;
  url: string;
  author?: {
    '@type': 'Person';
    name: string;
  };
}

/**
 * Generate Person schema for the site author
 */
export function generatePersonSchema(baseUrl?: string): PersonSchema {
  const url = baseUrl || process.env.NEXT_PUBLIC_BASE_URL || 'https://brandonshoop.com';

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Brandon Shoop',
    url,
    jobTitle: 'Founder',
    worksFor: {
      '@type': 'Organization',
      name: 'AGL Consulting LLC',
      url: 'https://aglflorida.com',
    },
    sameAs: [
      'https://www.linkedin.com/in/brandonshoop/',
      'https://github.com/1shooperman/',
    ],
    description: 'Computer scientist and software generalist working at the intersection of technical product management and hands-on development.',
  };
}

/**
 * Generate Article/BlogPosting schema for blog posts
 */
export function generateArticleSchema(
  title: string,
  datePublished: string,
  url: string,
  excerpt?: string,
  dateModified?: string,
  baseUrl?: string
): ArticleSchema {
  const siteUrl = baseUrl || process.env.NEXT_PUBLIC_BASE_URL || 'https://brandonshoop.com';
  const logoUrl = `${siteUrl}/siteicon.png`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: excerpt,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: 'Brandon Shoop',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Brandon Shoop',
      logo: {
        '@type': 'ImageObject',
        url: logoUrl,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}

/**
 * Generate SoftwareApplication schema for projects
 */
export function generateProjectSchema(
  title: string,
  description: string,
  url: string,
  applicationCategory?: string,
  operatingSystem?: string
): ProjectSchema {
  const schema: ProjectSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: title,
    description,
    author: {
      '@type': 'Person',
      name: 'Brandon Shoop',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  if (applicationCategory) {
    schema.applicationCategory = applicationCategory;
  }

  if (operatingSystem) {
    schema.operatingSystem = operatingSystem;
  }

  return schema;
}

/**
 * Generate BreadcrumbList schema for navigation
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate WebSite schema
 */
export function generateWebsiteSchema(baseUrl?: string): WebsiteSchema {
  const url = baseUrl || process.env.NEXT_PUBLIC_BASE_URL || 'https://brandonshoop.com';

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Brandon Shoop',
    url,
    author: {
      '@type': 'Person',
      name: 'Brandon Shoop',
    },
  };
}

