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

// Looks like the interface for this changed between Next 14 and 15?
// Adding a small workaround (hack) to make the typescript compiler happy.
type Params = { 
  params: Promise<{ slug?: string, id?: string }> 
}
export function metadataFactory(base: string, title: string) {
  return async function generateMetadata(
    { params }: Params,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    return {
      title: `${base}: ${customTitle || title}`,
      alternates: {
        canonical: `${baseUrl}/${base.toLowerCase()}${parameterizedSlugOrId || ''}`,
      },
    };
  };
}