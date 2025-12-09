import { render } from '@testing-library/react';
// Use relative path for consistency
import ProjectsPage from '../../projects/page';

// Mock the data fetching functions
jest.mock('@/lib/getProjects', () => ({
  getSortedProjects: jest.fn(() => Promise.resolve([
    {
      id: 'test-project-1',
      title: 'Test Project 1',
      date: '2024-01-01',
      description: 'Test description 1',
      contentHtml: '<p>Test content 1</p>',
      features: ['feature1'],
      technologies: ['tech1'],
      links: [{ text: 'GitHub', url: 'https://github.com' }],
    },
    {
      id: 'test-project-2',
      title: 'Test Project 2',
      date: '2024-01-02',
      description: 'Test description 2',
      contentHtml: '<p>Test content 2</p>',
      features: ['feature2'],
      technologies: ['tech2'],
      links: [{ text: 'App Store', url: 'https://apps.apple.com' }],
    },
  ])),
}));

describe('Projects Page', () => {
  it('should render without crashing', async () => {
    const component = await ProjectsPage();
    const { container } = render(component);
    expect(container).toBeTruthy();
  });

  it('should render projects heading', async () => {
    const component = await ProjectsPage();
    const { getByText } = render(component);
    expect(getByText('Projects')).toBeInTheDocument();
  });

  it('should render project descriptions', async () => {
    const component = await ProjectsPage();
    const { getByText } = render(component);
    expect(getByText('The projects we have under development or found interesting. Practical Tech with Real-World Impact.')).toBeInTheDocument();
  });

  it('should render projects', async () => {
    const component = await ProjectsPage();
    const { getByText } = render(component);
    expect(getByText('Test Project 1')).toBeInTheDocument();
    expect(getByText('Test Project 2')).toBeInTheDocument();
  });
});

