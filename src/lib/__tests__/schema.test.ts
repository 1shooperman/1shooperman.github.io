import {
  generatePersonSchema,
  generateArticleSchema,
  generateProjectSchema,
  generateBreadcrumbSchema,
  generateWebsiteSchema,
} from '../schema';

describe('schema', () => {
  const mockBaseUrl = 'https://brandonshoop.com';

  describe('generatePersonSchema', () => {
    it('should generate a valid Person schema with all required fields', () => {
      const schema = generatePersonSchema(mockBaseUrl);

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Person');
      expect(schema.name).toBe('Brandon Shoop');
      expect(schema.url).toBe(mockBaseUrl);
      expect(schema.jobTitle).toBe('Founder');
      expect(schema.worksFor).toBeDefined();
      expect(schema.worksFor?.['@type']).toBe('Organization');
      expect(schema.worksFor?.name).toBe('AGL Consulting LLC');
      expect(schema.sameAs).toBeDefined();
      expect(Array.isArray(schema.sameAs)).toBe(true);
      expect(schema.sameAs?.length).toBeGreaterThan(0);
      expect(schema.description).toBeDefined();
    });

    it('should use environment variable if baseUrl is not provided', () => {
      const originalEnv = process.env.NEXT_PUBLIC_BASE_URL;
      process.env.NEXT_PUBLIC_BASE_URL = 'https://test.com';
      
      const schema = generatePersonSchema();
      expect(schema.url).toBe('https://test.com');
      
      process.env.NEXT_PUBLIC_BASE_URL = originalEnv;
    });

    it('should fallback to default URL if no baseUrl provided and no env var', () => {
      const originalEnv = process.env.NEXT_PUBLIC_BASE_URL;
      delete process.env.NEXT_PUBLIC_BASE_URL;
      
      const schema = generatePersonSchema();
      expect(schema.url).toBe('https://brandonshoop.com');
      
      process.env.NEXT_PUBLIC_BASE_URL = originalEnv;
    });
  });

  describe('generateArticleSchema', () => {
    const testTitle = 'Test Article';
    const testDate = '2024-01-01';
    const testUrl = `${mockBaseUrl}/blog/test-article`;
    const testExcerpt = 'This is a test excerpt';

    it('should generate a valid BlogPosting schema with all required fields', () => {
      const schema = generateArticleSchema(testTitle, testDate, testUrl, testExcerpt, undefined, mockBaseUrl);

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('BlogPosting');
      expect(schema.headline).toBe(testTitle);
      expect(schema.description).toBe(testExcerpt);
      expect(schema.datePublished).toBe(testDate);
      expect(schema.dateModified).toBe(testDate);
      expect(schema.author['@type']).toBe('Person');
      expect(schema.author.name).toBe('Brandon Shoop');
      expect(schema.publisher['@type']).toBe('Organization');
      expect(schema.publisher.name).toBe('Brandon Shoop');
      expect(schema.publisher.logo).toBeDefined();
      expect(schema.publisher.logo?.['@type']).toBe('ImageObject');
      expect(schema.mainEntityOfPage['@type']).toBe('WebPage');
      expect(schema.mainEntityOfPage['@id']).toBe(testUrl);
    });

    it('should handle missing excerpt', () => {
      const schema = generateArticleSchema(testTitle, testDate, testUrl, undefined, undefined, mockBaseUrl);
      expect(schema.description).toBeUndefined();
    });

    it('should use dateModified if provided', () => {
      const modifiedDate = '2024-01-02';
      const schema = generateArticleSchema(testTitle, testDate, testUrl, testExcerpt, modifiedDate, mockBaseUrl);
      expect(schema.dateModified).toBe(modifiedDate);
    });

    it('should use environment variable if baseUrl is not provided', () => {
      const originalEnv = process.env.NEXT_PUBLIC_BASE_URL;
      process.env.NEXT_PUBLIC_BASE_URL = 'https://test.com';
      
      const schema = generateArticleSchema(testTitle, testDate, testUrl, testExcerpt);
      expect(schema.publisher.logo?.url).toContain('https://test.com');
      
      process.env.NEXT_PUBLIC_BASE_URL = originalEnv;
    });
  });

  describe('generateProjectSchema', () => {
    const testTitle = 'Test Project';
    const testDescription = 'This is a test project description';
    const testUrl = `${mockBaseUrl}/projects/test-project`;

    it('should generate a valid SoftwareApplication schema with all required fields', () => {
      const schema = generateProjectSchema(testTitle, testDescription, testUrl);

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('SoftwareApplication');
      expect(schema.name).toBe(testTitle);
      expect(schema.description).toBe(testDescription);
      expect(schema.author['@type']).toBe('Person');
      expect(schema.author.name).toBe('Brandon Shoop');
      expect(schema.offers).toBeDefined();
      expect(schema.offers?.['@type']).toBe('Offer');
      expect(schema.offers?.price).toBe('0');
      expect(schema.offers?.priceCurrency).toBe('USD');
    });

    it('should include optional applicationCategory when provided', () => {
      const schema = generateProjectSchema(testTitle, testDescription, testUrl, 'MobileApplication');
      expect(schema.applicationCategory).toBe('MobileApplication');
    });

    it('should include optional operatingSystem when provided', () => {
      const schema = generateProjectSchema(testTitle, testDescription, testUrl, undefined, 'iOS, Android');
      expect(schema.operatingSystem).toBe('iOS, Android');
    });

    it('should handle missing optional fields', () => {
      const schema = generateProjectSchema(testTitle, testDescription, testUrl);
      expect(schema.applicationCategory).toBeUndefined();
      expect(schema.operatingSystem).toBeUndefined();
    });
  });

  describe('generateBreadcrumbSchema', () => {
    it('should generate a valid BreadcrumbList schema', () => {
      const items = [
        { name: 'Home', url: `${mockBaseUrl}/` },
        { name: 'Blog', url: `${mockBaseUrl}/blog` },
        { name: 'Post', url: `${mockBaseUrl}/blog/post` },
      ];

      const schema = generateBreadcrumbSchema(items);

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('BreadcrumbList');
      expect(schema.itemListElement).toHaveLength(3);
      expect(schema.itemListElement[0].position).toBe(1);
      expect(schema.itemListElement[0].name).toBe('Home');
      expect(schema.itemListElement[0].item).toBe(`${mockBaseUrl}/`);
      expect(schema.itemListElement[2].position).toBe(3);
    });

    it('should handle empty array', () => {
      const schema = generateBreadcrumbSchema([]);
      expect(schema.itemListElement).toHaveLength(0);
    });

    it('should handle single item', () => {
      const items = [{ name: 'Home', url: `${mockBaseUrl}/` }];
      const schema = generateBreadcrumbSchema(items);
      expect(schema.itemListElement).toHaveLength(1);
      expect(schema.itemListElement[0].position).toBe(1);
    });
  });

  describe('generateWebsiteSchema', () => {
    it('should generate a valid WebSite schema with all required fields', () => {
      const schema = generateWebsiteSchema(mockBaseUrl);

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('WebSite');
      expect(schema.name).toBe('Brandon Shoop');
      expect(schema.url).toBe(mockBaseUrl);
      expect(schema.author).toBeDefined();
      expect(schema.author?.['@type']).toBe('Person');
      expect(schema.author?.name).toBe('Brandon Shoop');
    });

    it('should use environment variable if baseUrl is not provided', () => {
      const originalEnv = process.env.NEXT_PUBLIC_BASE_URL;
      process.env.NEXT_PUBLIC_BASE_URL = 'https://test.com';
      
      const schema = generateWebsiteSchema();
      expect(schema.url).toBe('https://test.com');
      
      process.env.NEXT_PUBLIC_BASE_URL = originalEnv;
    });

    it('should fallback to default URL if no baseUrl provided and no env var', () => {
      const originalEnv = process.env.NEXT_PUBLIC_BASE_URL;
      delete process.env.NEXT_PUBLIC_BASE_URL;
      
      const schema = generateWebsiteSchema();
      expect(schema.url).toBe('https://brandonshoop.com');
      
      process.env.NEXT_PUBLIC_BASE_URL = originalEnv;
    });
  });
});

