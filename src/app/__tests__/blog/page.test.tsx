import { render } from '@testing-library/react';
// Use relative path to avoid issues with bracket syntax in module resolution
import BlogPostPage from '../../blog/page/[page]/page';

// Mock the data fetching functions
jest.mock('@/lib/getPosts', () => ({
  getSortedPosts: jest.fn(() => [
    {
      slug: 'test-post-1',
      title: 'Test Post 1',
      date: '2024-01-01',
      excerpt: 'Test excerpt 1',
    },
    {
      slug: 'test-post-2',
      title: 'Test Post 2',
      date: '2024-01-02',
      excerpt: 'Test excerpt 2',
    },
    {
      slug: 'test-post-3',
      title: 'Test Post 3',
      date: '2024-01-03',
      excerpt: 'Test excerpt 3',
    },
  ]),
}));

jest.mock('@/lib/metadata', () => ({
  metadataFactory: jest.fn(() => jest.fn()),
}));

describe('Blog Page', () => {
  it('should render without crashing', async () => {
    const params = Promise.resolve({ page: '1' });
    const component = await BlogPostPage({ params });
    const { container } = render(component);
    expect(container).toBeTruthy();
  });

  it('should render blog posts heading', async () => {
    const params = Promise.resolve({ page: '1' });
    const component = await BlogPostPage({ params });
    const { getByText } = render(component);
    expect(getByText('Blog Posts')).toBeInTheDocument();
  });

  it('should render posts', async () => {
    const params = Promise.resolve({ page: '1' });
    const component = await BlogPostPage({ params });
    const { getByText } = render(component);
    expect(getByText('Test Post 1')).toBeInTheDocument();
  });

  it('should handle pagination', async () => {
    const params = Promise.resolve({ page: '1' });
    const component = await BlogPostPage({ params });
    const { container } = render(component);
    // Should render pagination controls
    expect(container.querySelector('a')).toBeInTheDocument();
  });
});

