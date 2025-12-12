import {
  generateOpenGraphMetadata,
  generateTwitterMetadata,
  metadataFactory,
} from '../metadata';
import type { ResolvingMetadata } from 'next';

// Helper types for testing metadata structures
type OpenGraphTestType = {
  title?: string;
  description?: string;
  url?: string;
  siteName?: string;
  locale?: string;
  type?: 'website' | 'article';
  images?: Array<{ url: string }> | { url: string } | string | string[];
};

type TwitterTestType = {
  card?: string;
  title?: string;
  description?: string;
  images?: string | string[];
};

describe('metadata', () => {
  const mockBaseUrl = 'https://brandonshoop.com';
  const mockParent: ResolvingMetadata = {} as ResolvingMetadata;

  beforeEach(() => {
    process.env.NEXT_PUBLIC_BASE_URL = mockBaseUrl;
  });

  describe('generateOpenGraphMetadata', () => {
    it('should generate valid Open Graph metadata with all required fields', () => {
      const title = 'Test Title';
      const description = 'Test Description';
      const url = `${mockBaseUrl}/test`;

      const og = generateOpenGraphMetadata(title, description, url) as OpenGraphTestType;

      expect(og?.title).toBe(title);
      expect(og?.description).toBe(description);
      expect(og?.url).toBe(url);
      expect(og?.siteName).toBe('Brandon Shoop');
      expect(og?.locale).toBe('en_US');
      expect(og?.type).toBe('website');
      expect(og?.images).toBeDefined();
      const images = Array.isArray(og?.images) ? og.images : [og?.images];
      const firstImage = images[0];
      const imageUrl = typeof firstImage === 'string' ? firstImage : firstImage?.url;
      expect(imageUrl).toBe(`${mockBaseUrl}/siteicon.png`);
    });

    it('should use provided image URL', () => {
      const customImage = `${mockBaseUrl}/custom-image.png`;
      const og = generateOpenGraphMetadata('Title', 'Desc', `${mockBaseUrl}/test`, customImage) as OpenGraphTestType;
      const images = Array.isArray(og?.images) ? og.images : [og?.images];
      const firstImage = images[0];
      const imageUrl = typeof firstImage === 'string' ? firstImage : firstImage?.url;
      expect(imageUrl).toBe(customImage);
    });

    it('should support article type', () => {
      const og = generateOpenGraphMetadata('Title', 'Desc', `${mockBaseUrl}/test`, undefined, 'article') as OpenGraphTestType;
      expect(og?.type).toBe('article');
    });

    it('should fallback to default baseUrl if env var not set', () => {
      const originalEnv = process.env.NEXT_PUBLIC_BASE_URL;
      delete process.env.NEXT_PUBLIC_BASE_URL;

      const og = generateOpenGraphMetadata('Title', 'Desc', 'https://test.com/page') as OpenGraphTestType;
      const images = Array.isArray(og?.images) ? og.images : [og?.images];
      const firstImage = images[0];
      const imageUrl = typeof firstImage === 'string' ? firstImage : firstImage?.url;
      expect(imageUrl).toBe('https://brandonshoop.com/siteicon.png');

      process.env.NEXT_PUBLIC_BASE_URL = originalEnv;
    });
  });

  describe('generateTwitterMetadata', () => {
    it('should generate valid Twitter Card metadata with all required fields', () => {
      const title = 'Test Title';
      const description = 'Test Description';

      const twitter = generateTwitterMetadata(title, description) as TwitterTestType;

      expect(twitter?.card).toBe('summary_large_image');
      expect(twitter?.title).toBe(title);
      expect(twitter?.description).toBe(description);
      expect(twitter?.images).toBeDefined();
      const images = Array.isArray(twitter?.images) ? twitter.images : [twitter?.images];
      expect(images[0]).toBe(`${mockBaseUrl}/siteicon.png`);
    });

    it('should use provided image URL', () => {
      const customImage = `${mockBaseUrl}/custom-image.png`;
      const twitter = generateTwitterMetadata('Title', 'Desc', customImage) as TwitterTestType;
      const images = Array.isArray(twitter?.images) ? twitter.images : [twitter?.images];
      expect(images[0]).toBe(customImage);
    });

    it('should fallback to default baseUrl if env var not set', () => {
      const originalEnv = process.env.NEXT_PUBLIC_BASE_URL;
      delete process.env.NEXT_PUBLIC_BASE_URL;

      const twitter = generateTwitterMetadata('Title', 'Desc') as TwitterTestType;
      const images = Array.isArray(twitter?.images) ? twitter.images : [twitter?.images];
      expect(images[0]).toBe('https://brandonshoop.com/siteicon.png');

      process.env.NEXT_PUBLIC_BASE_URL = originalEnv;
    });
  });

  describe('metadataFactory', () => {
    it('should generate metadata with title and canonical URL', async () => {
      const factory = metadataFactory('Blog', 'All Posts');
      const metadata = await factory({ params: Promise.resolve({}) }, mockParent);

      expect(metadata.title).toBe('Blog: All Posts');
      expect(metadata.alternates?.canonical).toBe(`${mockBaseUrl}/blog`);
    });

    it('should handle slug parameter and humanize it', async () => {
      const factory = metadataFactory('Blog', '');
      const metadata = await factory({ params: Promise.resolve({ slug: 'test-article' }) }, mockParent);

      expect(metadata.title).toBe('Blog: Test Article');
      expect(metadata.alternates?.canonical).toBe(`${mockBaseUrl}/blog/test-article`);
    });

    it('should handle id parameter', async () => {
      const factory = metadataFactory('Projects', '');
      const metadata = await factory({ params: Promise.resolve({ id: 'my-project' }) }, mockParent);

      expect(metadata.title).toBe('Projects: My Project');
      expect(metadata.alternates?.canonical).toBe(`${mockBaseUrl}/projects/my-project`);
    });

    it('should include description when provided', async () => {
      const factory = metadataFactory('Blog', 'All Posts', { description: 'Custom description' });
      const metadata = await factory({ params: Promise.resolve({}) }, mockParent);

      expect(metadata.description).toBe('Custom description');
    });

    it('should include Open Graph metadata by default', async () => {
      const factory = metadataFactory('Blog', 'All Posts', { description: 'Test desc' });
      const metadata = await factory({ params: Promise.resolve({}) }, mockParent);

      expect(metadata.openGraph).toBeDefined();
      expect(metadata.openGraph?.title).toBe('Blog: All Posts');
      expect(metadata.openGraph?.description).toBe('Test desc');
      expect(metadata.openGraph?.url).toBe(`${mockBaseUrl}/blog`);
    });

    it('should include Twitter Card metadata by default', async () => {
      const factory = metadataFactory('Blog', 'All Posts', { description: 'Test desc' });
      const metadata = await factory({ params: Promise.resolve({}) }, mockParent);

      expect(metadata.twitter).toBeDefined();
      expect(metadata.twitter?.title).toBe('Blog: All Posts');
      expect(metadata.twitter?.description).toBe('Test desc');
    });

    it('should allow disabling Open Graph', async () => {
      const factory = metadataFactory('Blog', 'All Posts', { includeOpenGraph: false });
      const metadata = await factory({ params: Promise.resolve({}) }, mockParent);

      expect(metadata.openGraph).toBeUndefined();
    });

    it('should allow disabling Twitter Cards', async () => {
      const factory = metadataFactory('Blog', 'All Posts', { includeTwitter: false });
      const metadata = await factory({ params: Promise.resolve({}) }, mockParent);

      expect(metadata.twitter).toBeUndefined();
    });

    it('should use custom image when provided', async () => {
      const customImage = `${mockBaseUrl}/custom.png`;
      const factory = metadataFactory('Blog', 'All Posts', { image: customImage });
      const metadata = await factory({ params: Promise.resolve({}) }, mockParent);

      const ogImages = Array.isArray(metadata.openGraph?.images) 
        ? metadata.openGraph.images 
        : metadata.openGraph?.images 
          ? [metadata.openGraph.images] 
          : [];
      const twitterImages = Array.isArray(metadata.twitter?.images)
        ? metadata.twitter.images
        : metadata.twitter?.images
          ? [metadata.twitter.images]
          : [];
      const firstOgImage = ogImages[0];
      const ogImageUrl = typeof firstOgImage === 'string' 
        ? firstOgImage 
        : (firstOgImage as { url?: string })?.url;
      expect(ogImageUrl).toBe(customImage);
      expect(twitterImages[0]).toBe(customImage);
    });

    it('should support article type', async () => {
      const factory = metadataFactory('Blog', 'All Posts', { type: 'article' });
      const metadata = await factory({ params: Promise.resolve({}) }, mockParent);

      expect((metadata.openGraph as OpenGraphTestType)?.type).toBe('article');
    });

    it('should use default description when not provided', async () => {
      const factory = metadataFactory('Blog', 'All Posts');
      const metadata = await factory({ params: Promise.resolve({}) }, mockParent);

      expect(metadata.description).toBe('Content from Blog on Brandon Shoop\'s blog');
    });

    it('should handle complex slug with underscores and hyphens', async () => {
      const factory = metadataFactory('Blog', '');
      const metadata = await factory({ params: Promise.resolve({ slug: 'test_article-name' }) }, mockParent);

      expect(metadata.title).toBe('Blog: Test Article Name');
    });
  });
});

