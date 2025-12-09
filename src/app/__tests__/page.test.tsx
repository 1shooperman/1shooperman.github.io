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

jest.mock('@/lib/getProjects', () => ({
  getSortedProjects: jest.fn(() => Promise.resolve([
    {
      id: 'test-project',
      title: 'Test Project',
      date: '2024-01-01',
      description: 'Test description',
      contentHtml: '<p>Test content</p>',
      features: ['feature1'],
      technologies: ['tech1'],
      links: [{ text: 'GitHub', url: 'https://github.com' }],
    },
  ])),
}));

jest.mock('@/lib/FriendLinks', () => {
  return function FriendLinks() {
    return <div>Friend Links</div>;
  };
});

describe('Home Page', () => {
  it('should render without crashing', async () => {
    const component = await Home();
    const { container } = render(component);
    expect(container).toBeTruthy();
  });

  it('should render welcome section', async () => {
    const component = await Home();
    const { getByText } = render(component);
    expect(getByText('Welcome')).toBeInTheDocument();
  });

  it('should render projects section', async () => {
    const component = await Home();
    const { getByText } = render(component);
    expect(getByText('Projects')).toBeInTheDocument();
  });

  it('should render posts section', async () => {
    const component = await Home();
    const { getByText } = render(component);
    expect(getByText('Posts')).toBeInTheDocument();
  });
});

