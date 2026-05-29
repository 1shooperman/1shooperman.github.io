import { render } from '@testing-library/react';
import Home from '../page';

jest.mock('@/lib/getProjects', () => ({
  getSortedProjects: jest.fn(() => [
    {
      id: 'test-project',
      title: 'Test Project',
      description: 'A test project.',
      github: 'https://github.com/1shooperman/test-project',
      technologies: ['TypeScript'],
      status: 'active',
    },
  ]),
}));

describe('Home Page', () => {
  it('should render without crashing', () => {
    const { container } = render(<Home />);
    expect(container).toBeTruthy();
  });

  it('should render projects heading', () => {
    const { getByText } = render(<Home />);
    expect(getByText('Projects')).toBeInTheDocument();
  });

  it('should render a project tile with a github link', () => {
    const { getByRole } = render(<Home />);
    const link = getByRole('link', { name: /test project/i });
    expect(link).toHaveAttribute('href', 'https://github.com/1shooperman/test-project');
  });
});
