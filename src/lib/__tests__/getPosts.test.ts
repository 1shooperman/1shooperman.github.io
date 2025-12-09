// Mock remark before importing getPosts
jest.mock('remark', () => ({
  remark: jest.fn(() => ({
    use: jest.fn().mockReturnThis(),
    process: jest.fn().mockResolvedValue({ toString: () => '<p>test</p>' }),
  })),
}));

jest.mock('remark-html', () => jest.fn());

import { getSortedPosts, getPostBySlug, type BlogPost } from '../getPosts';

describe('getPosts', () => {
  describe('getSortedPosts', () => {
    it('should return an array of blog posts', () => {
      const posts = getSortedPosts();
      expect(Array.isArray(posts)).toBe(true);
      expect(posts.length).toBeGreaterThan(0);
    });

    it('should return posts with required fields', () => {
      const posts = getSortedPosts();
      posts.forEach((post: BlogPost) => {
        expect(post).toHaveProperty('slug');
        expect(post).toHaveProperty('title');
        expect(post).toHaveProperty('date');
        expect(post).toHaveProperty('excerpt');
        expect(typeof post.slug).toBe('string');
        expect(typeof post.title).toBe('string');
        expect(typeof post.date).toBe('string');
        expect(typeof post.excerpt).toBe('string');
      });
    });

    it('should sort posts by date in descending order (newest first)', () => {
      const posts = getSortedPosts();
      if (posts.length < 2) return;

      for (let i = 0; i < posts.length - 1; i++) {
        const currentDate = new Date(posts[i].date);
        const nextDate = new Date(posts[i + 1].date);
        expect(currentDate.getTime()).toBeGreaterThanOrEqual(nextDate.getTime());
      }
    });

    it('should have valid slug format (no .md extension)', () => {
      const posts = getSortedPosts();
      posts.forEach((post: BlogPost) => {
        expect(post.slug).not.toContain('.md');
        expect(post.slug.length).toBeGreaterThan(0);
      });
    });
  });

  describe('getPostBySlug', () => {
    it('should return a post with all required fields including contentHtml', async () => {
      const posts = getSortedPosts();
      if (posts.length === 0) return;

      const firstPost = posts[0];
      const post = await getPostBySlug(firstPost.slug);

      expect(post).toHaveProperty('slug');
      expect(post).toHaveProperty('title');
      expect(post).toHaveProperty('date');
      expect(post).toHaveProperty('excerpt');
      expect(post).toHaveProperty('contentHtml');
      expect(typeof post.slug).toBe('string');
      expect(typeof post.title).toBe('string');
      expect(typeof post.date).toBe('string');
      expect(typeof post.excerpt).toBe('string');
      expect(typeof post.contentHtml).toBe('string');
    });

    it('should return the correct post for a given slug', async () => {
      const posts = getSortedPosts();
      if (posts.length === 0) return;

      const testPost = posts[0];
      const post = await getPostBySlug(testPost.slug);

      expect(post.slug).toBe(testPost.slug);
      expect(post.title).toBe(testPost.title);
      expect(post.date).toBe(testPost.date);
      expect(post.excerpt).toBe(testPost.excerpt);
    });

    it('should return HTML content in contentHtml field', async () => {
      const posts = getSortedPosts();
      if (posts.length === 0) return;

      const post = await getPostBySlug(posts[0].slug);
      expect(post.contentHtml).toBeDefined();
      expect(post.contentHtml.length).toBeGreaterThan(0);
    });

    it('should throw an error for non-existent slug', async () => {
      await expect(getPostBySlug('non-existent-slug-12345')).rejects.toThrow();
    });
  });
});

