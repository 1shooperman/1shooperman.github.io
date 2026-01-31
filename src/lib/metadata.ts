import type { Metadata, ResolvingMetadata } from 'next';

const humanize = (input: string): string => {
  return input
    .split('/')
    .filter(Boolean)
    .map(segment =>
      segment
        .replace(/[-_]+/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase())
    )
    .join(' ');
}

/**
 * Generate Open Graph metadata for social sharing
 */
export function generateOpenGraphMetadata(
  title: string,
  description: string,
  url: string,
  image?: string,
  type: 'website' | 'article' = 'website'
): Metadata['openGraph'] {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://brandonshoop.com';
  const imageUrl = image || `${baseUrl}/siteicon.png`;

  return {
    title,
    description,
    url,
    siteName: 'Brandon Shoop',
    images: [{ url: imageUrl }],
    locale: 'en_US',
    type,
  };
}

/**
 * Generate Twitter Card metadata
 */
export function generateTwitterMetadata(
  title: string,
  description: string,
  image?: string
): Metadata['twitter'] {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://brandonshoop.com';
  const imageUrl = image || `${baseUrl}/siteicon.png`;

  return {
    card: 'summary_large_image',
    title,
    description,
    images: [imageUrl],
  };
}

// Looks like the interface for this changed between Next 14 and 15?
// Adding a small workaround (hack) to make the typescript compiler happy.
type Params = { 
  params: Promise<{ slug?: string, id?: string }> 
}

export interface MetadataFactoryOptions {
  description?: string;
  image?: string;
  type?: 'website' | 'article';
  includeOpenGraph?: boolean;
  includeTwitter?: boolean;
  robots?: Metadata['robots'];
}

/**
 * Factory function to generate metadata for dynamic routes
 */
export function metadataFactory(
  base: string,
  title: string,
  options: MetadataFactoryOptions = {}
) {
  return async function generateMetadata(
    { params }: Params,
    _parent: ResolvingMetadata
  ): Promise<Metadata> {
    const resolvedParams = await params;
    const slugOrId = resolvedParams.slug ?? resolvedParams.id

    let customTitle;
    let parameterizedSlugOrId;
    if (slugOrId) {
      customTitle = humanize(slugOrId);
      parameterizedSlugOrId = '/' + slugOrId
    }
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://brandonshoop.com';
    const fullTitle = `${base}: ${customTitle || title}`;
    const canonicalUrl = `${baseUrl}/${base.toLowerCase()}${parameterizedSlugOrId || ''}`;
    const description = options.description || `Content from ${base} on Brandon Shoop's blog`;
    const image = options.image;
    const type = options.type || 'website';
    const includeOpenGraph = options.includeOpenGraph !== false;
    const includeTwitter = options.includeTwitter !== false;

    const metadata: Metadata = {
      title: fullTitle,
      description,
      alternates: {
        canonical: canonicalUrl,
      },
    };

    if (options.robots) {
      metadata.robots = options.robots;
    }

    if (includeOpenGraph) {
      metadata.openGraph = generateOpenGraphMetadata(fullTitle, description, canonicalUrl, image, type);
    }

    if (includeTwitter) {
      metadata.twitter = generateTwitterMetadata(fullTitle, description, image);
    }

    return metadata;
  };
}