// Mock remark before importing getProjects
jest.mock('remark', () => ({
  remark: jest.fn(() => ({
    use: jest.fn().mockReturnThis(),
    process: jest.fn().mockResolvedValue({ toString: () => '<p>test content</p>' }),
  })),
}));

jest.mock('remark-html', () => jest.fn());

import { getSortedProjects, getProjectById, type Project } from '../getProjects';

describe('getProjects', () => {
  describe('getSortedProjects', () => {
    it('should return an array of projects', async () => {
      const projects = await getSortedProjects();
      expect(Array.isArray(projects)).toBe(true);
      expect(projects.length).toBeGreaterThan(0);
    });

    it('should return projects with required fields', async () => {
      const projects = await getSortedProjects();
      projects.forEach((project: Project) => {
        expect(project).toHaveProperty('id');
        expect(project).toHaveProperty('title');
        expect(project).toHaveProperty('date');
        expect(project).toHaveProperty('description');
        expect(project).toHaveProperty('contentHtml');
        expect(project).toHaveProperty('technologies');
        expect(typeof project.id).toBe('string');
        expect(typeof project.title).toBe('string');
        expect(typeof project.date).toBe('string');
        expect(typeof project.description).toBe('string');
        expect(typeof project.contentHtml).toBe('string');
        expect(Array.isArray(project.technologies)).toBe(true);
        // features is optional
        if (project.features) {
          expect(Array.isArray(project.features)).toBe(true);
        }
        // links is optional
        if (project.links) {
          expect(Array.isArray(project.links)).toBe(true);
        }
      });
    });

    it('should sort projects by date in descending order (newest first)', async () => {
      const projects = await getSortedProjects();
      if (projects.length < 2) return;

      for (let i = 0; i < projects.length - 1; i++) {
        const currentDate = new Date(projects[i].date);
        const nextDate = new Date(projects[i + 1].date);
        expect(currentDate.getTime()).toBeGreaterThanOrEqual(nextDate.getTime());
      }
    });

    it('should have valid id format (no .md extension)', async () => {
      const projects = await getSortedProjects();
      projects.forEach((project: Project) => {
        expect(project.id).not.toContain('.md');
        expect(project.id.length).toBeGreaterThan(0);
      });
    });

    it('should return HTML content in contentHtml field', async () => {
      const projects = await getSortedProjects();
      projects.forEach((project: Project) => {
        expect(project.contentHtml).toBeDefined();
        expect(typeof project.contentHtml).toBe('string');
      });
    });

    it('should have valid links structure when links exist', async () => {
      const projects = await getSortedProjects();
      projects.forEach((project: Project) => {
        if (project.links && Array.isArray(project.links)) {
          project.links.forEach((link) => {
            expect(link).toHaveProperty('text');
            expect(link).toHaveProperty('url');
            expect(typeof link.text).toBe('string');
            expect(typeof link.url).toBe('string');
          });
        }
      });
    });
  });

  describe('getProjectById', () => {
    it('should return a project with all required fields for a valid id', async () => {
      const projects = await getSortedProjects();
      if (projects.length === 0) return;

      const firstProject = projects[0];
      const project = await getProjectById(firstProject.id);

      expect(project).not.toBeNull();
      if (project) {
        expect(project).toHaveProperty('id');
        expect(project).toHaveProperty('title');
        expect(project).toHaveProperty('date');
        expect(project).toHaveProperty('description');
        expect(project).toHaveProperty('contentHtml');
        expect(project).toHaveProperty('technologies');
        // features and links are optional
      }
    });

    it('should return the correct project for a given id', async () => {
      const projects = await getSortedProjects();
      if (projects.length === 0) return;

      const testProject = projects[0];
      const project = await getProjectById(testProject.id);

      expect(project).not.toBeNull();
      if (project) {
        expect(project.id).toBe(testProject.id);
        expect(project.title).toBe(testProject.title);
        expect(project.date).toBe(testProject.date);
        expect(project.description).toBe(testProject.description);
      }
    });

    it('should return HTML content in contentHtml field', async () => {
      const projects = await getSortedProjects();
      if (projects.length === 0) return;

      const project = await getProjectById(projects[0].id);
      expect(project).not.toBeNull();
      if (project) {
        expect(project.contentHtml).toBeDefined();
        expect(typeof project.contentHtml).toBe('string');
        expect(project.contentHtml.length).toBeGreaterThan(0);
      }
    });

    it('should return null for non-existent id', async () => {
      const project = await getProjectById('non-existent-id-12345');
      expect(project).toBeNull();
    });
  });
});

