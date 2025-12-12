#!/usr/bin/env tsx
/**
 * Schema validation script for Schema.org JSON-LD structured data
 * Validates all generated schemas against JSON Schema definitions
 */

import Ajv, { type ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';
import {
  generatePersonSchema,
  generateArticleSchema,
  generateProjectSchema,
  generateWebsiteSchema,
} from '../src/lib/schema';
import { generateBreadcrumbSchemaForPath } from '../src/lib/BreadcrumbSchema';
import { getSortedPosts } from '../src/lib/getPosts';
import { getSortedProjects } from '../src/lib/getProjects';
import {
  personSchema,
  blogPostingSchema,
  softwareApplicationSchema,
  breadcrumbListSchema,
  webSiteSchema,
} from '../src/lib/schema-definitions';

interface ValidationError {
  schemaType: string;
  schemaName: string;
  errors: Array<{
    path: string;
    message: string;
  }>;
}

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

// Compile schemas
const validatePerson = ajv.compile(personSchema);
const validateBlogPosting = ajv.compile(blogPostingSchema);
const validateSoftwareApplication = ajv.compile(softwareApplicationSchema);
const validateBreadcrumbList = ajv.compile(breadcrumbListSchema);
const validateWebSite = ajv.compile(webSiteSchema);

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://brandonshoop.com';
const errors: ValidationError[] = [];

function validateSchema(
  schema: unknown,
  validator: ValidateFunction,
  schemaType: string,
  schemaName: string
): boolean {
  const valid = validator(schema);
  if (!valid && validator.errors) {
    errors.push({
      schemaType,
      schemaName,
      errors: validator.errors.map((err) => ({
        path: err.instancePath || err.schemaPath || 'root',
        message: err.message || 'Validation error',
      })),
    });
    return false;
  }
  return true;
}

async function main() {
  console.log('Validating Schema.org JSON-LD schemas...\n');

  // Validate Person schema
  console.log('Validating Person schema...');
  const personSchemaData = generatePersonSchema(baseUrl);
  validateSchema(personSchemaData, validatePerson, 'Person', 'Root Person');

  // Validate WebSite schema
  console.log('Validating WebSite schema...');
  const websiteSchema = generateWebsiteSchema(baseUrl);
  validateSchema(websiteSchema, validateWebSite, 'WebSite', 'Root WebSite');

  // Validate all blog post schemas
  console.log('Validating blog post schemas...');
  const posts = getSortedPosts();
  for (const post of posts) {
    const url = `${baseUrl}/blog/${post.slug}`;
    const articleSchema = generateArticleSchema(
      post.title,
      post.date,
      url,
      post.excerpt,
      undefined,
      baseUrl
    );
    validateSchema(
      articleSchema,
      validateBlogPosting,
      'BlogPosting',
      `Blog: ${post.slug}`
    );

    // Validate breadcrumb schema for blog post
    const breadcrumbSchema = generateBreadcrumbSchemaForPath(`/blog/${post.slug}`);
    validateSchema(
      breadcrumbSchema,
      validateBreadcrumbList,
      'BreadcrumbList',
      `Blog breadcrumb: ${post.slug}`
    );
  }
  console.log(`  Validated ${posts.length} blog posts`);

  // Validate all project schemas
  console.log('Validating project schemas...');
  const projects = await getSortedProjects();
  for (const project of projects) {
    const url = `${baseUrl}/projects/${project.id}`;
    const projectSchema = generateProjectSchema(
      project.title,
      project.description,
      url,
      project.applicationCategory || 'MobileApplication',
      project.operatingSystem || 'iOS, Android'
    );
    validateSchema(
      projectSchema,
      validateSoftwareApplication,
      'SoftwareApplication',
      `Project: ${project.id}`
    );

    // Validate breadcrumb schema for project
    const breadcrumbSchema = generateBreadcrumbSchemaForPath(`/projects/${project.id}`);
    validateSchema(
      breadcrumbSchema,
      validateBreadcrumbList,
      'BreadcrumbList',
      `Project breadcrumb: ${project.id}`
    );
  }
  console.log(`  Validated ${projects.length} projects`);

  // Validate additional breadcrumb paths
  console.log('Validating additional breadcrumb schemas...');
  const additionalPaths = ['/blog', '/projects', '/privacy'];
  for (const path of additionalPaths) {
    const breadcrumbSchema = generateBreadcrumbSchemaForPath(path);
    validateSchema(
      breadcrumbSchema,
      validateBreadcrumbList,
      'BreadcrumbList',
      `Breadcrumb: ${path}`
    );
  }

  // Report results
  console.log('\n' + '='.repeat(60));
  if (errors.length === 0) {
    console.log('All schemas validated successfully!');
    process.exit(0);
  } else {
    console.error(`Validation failed: ${errors.length} schema(s) have errors\n`);
    for (const error of errors) {
      console.error(`\n${error.schemaType}: ${error.schemaName}`);
      for (const err of error.errors) {
        console.error(`   • ${err.path}: ${err.message}`);
      }
    }
    console.error('\n' + '='.repeat(60));
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Fatal error during validation:', error);
  process.exit(1);
});

