// Mock remark before importing getPolicies
jest.mock('remark', () => ({
  remark: jest.fn(() => ({
    use: jest.fn().mockReturnThis(),
    process: jest.fn().mockResolvedValue({ toString: () => '<p>policy content</p>' }),
  })),
}));

jest.mock('remark-html', () => jest.fn());

import { getPolicies, getPolicyById, type Policy } from '../getPolicies';
import fs from 'fs';
import path from 'path';

const policiesDirectory = path.join(process.cwd(), 'src/content/policies');
const policiesDirectoryExists = fs.existsSync(policiesDirectory);

describe('getPolicies', () => {
  describe('getPolicies', () => {
    it('should return an array of policies', async () => {
      if (!policiesDirectoryExists) {
        // Skip test if policies directory doesn't exist
        return;
      }
      const policies = await getPolicies();
      expect(Array.isArray(policies)).toBe(true);
      expect(policies.length).toBeGreaterThan(0);
    });

    it('should return policies with required fields', async () => {
      if (!policiesDirectoryExists) {
        return;
      }
      const policies = await getPolicies();
      policies.forEach((policy: Policy) => {
        expect(policy).toHaveProperty('id');
        expect(policy).toHaveProperty('title');
        expect(policy).toHaveProperty('content');
        expect(typeof policy.id).toBe('string');
        expect(typeof policy.title).toBe('string');
        expect(typeof policy.content).toBe('string');
      });
    });

    it('should have valid id format (no .md extension)', async () => {
      if (!policiesDirectoryExists) {
        return;
      }
      const policies = await getPolicies();
      policies.forEach((policy: Policy) => {
        expect(policy.id).not.toContain('.md');
        expect(policy.id.length).toBeGreaterThan(0);
      });
    });

    it('should generate title from id (capitalized words)', async () => {
      if (!policiesDirectoryExists) {
        return;
      }
      const policies = await getPolicies();
      policies.forEach((policy: Policy) => {
        expect(policy.title).toBeDefined();
        expect(policy.title.length).toBeGreaterThan(0);
        // Title should be capitalized (first letter of each word)
        const words = policy.title.split(' ');
        words.forEach((word) => {
          if (word.length > 0) {
            expect(word[0]).toBe(word[0].toUpperCase());
          }
        });
      });
    });

    it('should return HTML content in content field', async () => {
      if (!policiesDirectoryExists) {
        return;
      }
      const policies = await getPolicies();
      policies.forEach((policy: Policy) => {
        expect(policy.content).toBeDefined();
        expect(typeof policy.content).toBe('string');
        expect(policy.content.length).toBeGreaterThan(0);
      });
    });
  });

  describe('getPolicyById', () => {
    it('should return a policy with all required fields for a valid id', async () => {
      if (!policiesDirectoryExists) {
        return;
      }
      const policies = await getPolicies();
      if (policies.length === 0) return;

      const firstPolicy = policies[0];
      const policy = await getPolicyById(firstPolicy.id);

      expect(policy).not.toBeNull();
      if (policy) {
        expect(policy).toHaveProperty('id');
        expect(policy).toHaveProperty('title');
        expect(policy).toHaveProperty('content');
        expect(typeof policy.id).toBe('string');
        expect(typeof policy.title).toBe('string');
        expect(typeof policy.content).toBe('string');
      }
    });

    it('should return the correct policy for a given id', async () => {
      if (!policiesDirectoryExists) {
        return;
      }
      const policies = await getPolicies();
      if (policies.length === 0) return;

      const testPolicy = policies[0];
      const policy = await getPolicyById(testPolicy.id);

      expect(policy).not.toBeNull();
      if (policy) {
        expect(policy.id).toBe(testPolicy.id);
        expect(policy.title).toBe(testPolicy.title);
      }
    });

    it('should generate title from id (capitalized words)', async () => {
      if (!policiesDirectoryExists) {
        return;
      }
      const policies = await getPolicies();
      if (policies.length === 0) return;

      const policy = await getPolicyById(policies[0].id);
      expect(policy).not.toBeNull();
      if (policy) {
        const words = policy.title.split(' ');
        words.forEach((word) => {
          if (word.length > 0) {
            expect(word[0]).toBe(word[0].toUpperCase());
          }
        });
      }
    });

    it('should return null for non-existent id', async () => {
      const policy = await getPolicyById('non-existent-id-12345');
      expect(policy).toBeNull();
    });
  });
});

