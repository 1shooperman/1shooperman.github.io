import { render } from '@testing-library/react';
import Home from '../page';

// Mock the data fetching functions
jest.mock('@/lib/getPosts', () => ({
  getSortedPosts: jest.fn(() => [
    {
      slug: 'test-post',
      title: 'Test Post',
      date: '2024-01-01',
      excerpt: 'Test excerpt',
    },
  ]),
}));

describe('Home Page', () => {
  it('should render without crashing', async () => {
    const component = await Home();
    const { container } = render(component);
    expect(container).toBeTruthy();
  });

  it('should render blog section', async () => {
    const component = await Home();
    const { getByText } = render(component);
    expect(getByText('Blog')).toBeInTheDocument();
  });

  it('should render link to full blog listing', async () => {
    const component = await Home();
    const { getByText } = render(component);
    expect(getByText('More...')).toBeInTheDocument();
  });
});

