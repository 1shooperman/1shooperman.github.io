/**
 * JSON Schema definitions for Schema.org types
 * Used for validating generated JSON-LD structured data
 */

export const personSchema = {
  type: 'object',
  required: ['@context', '@type', 'name', 'url'],
  properties: {
    '@context': {
      type: 'string',
      const: 'https://schema.org',
    },
    '@type': {
      type: 'string',
      const: 'Person',
    },
    name: {
      type: 'string',
      minLength: 1,
    },
    url: {
      type: 'string',
      format: 'uri',
    },
    jobTitle: {
      type: 'string',
    },
    worksFor: {
      type: 'object',
      required: ['@type', 'name', 'url'],
      properties: {
        '@type': {
          type: 'string',
          const: 'Organization',
        },
        name: {
          type: 'string',
          minLength: 1,
        },
        url: {
          type: 'string',
          format: 'uri',
        },
      },
      additionalProperties: false,
    },
    sameAs: {
      type: 'array',
      items: {
        type: 'string',
        format: 'uri',
      },
    },
    description: {
      type: 'string',
    },
  },
  additionalProperties: false,
};

export const blogPostingSchema = {
  type: 'object',
  required: ['@context', '@type', 'headline', 'datePublished', 'author', 'publisher', 'mainEntityOfPage'],
  properties: {
    '@context': {
      type: 'string',
      const: 'https://schema.org',
    },
    '@type': {
      type: 'string',
      const: 'BlogPosting',
    },
    headline: {
      type: 'string',
      minLength: 1,
    },
    description: {
      type: 'string',
    },
    datePublished: {
      type: 'string',
      pattern: '^\\d{4}-\\d{2}-\\d{2}',
    },
    dateModified: {
      type: 'string',
      pattern: '^\\d{4}-\\d{2}-\\d{2}',
    },
    author: {
      type: 'object',
      required: ['@type', 'name', 'url'],
      properties: {
        '@type': {
          type: 'string',
          const: 'Person',
        },
        name: {
          type: 'string',
          minLength: 1,
        },
        url: {
          type: 'string',
          format: 'uri',
        },
      },
      additionalProperties: false,
    },
    publisher: {
      type: 'object',
      required: ['@type', 'name'],
      properties: {
        '@type': {
          type: 'string',
          const: 'Organization',
        },
        name: {
          type: 'string',
          minLength: 1,
        },
        logo: {
          type: 'object',
          required: ['@type', 'url'],
          properties: {
            '@type': {
              type: 'string',
              const: 'ImageObject',
            },
            url: {
              type: 'string',
              format: 'uri',
            },
          },
          additionalProperties: false,
        },
      },
      additionalProperties: false,
    },
    mainEntityOfPage: {
      type: 'object',
      required: ['@type', '@id'],
      properties: {
        '@type': {
          type: 'string',
          const: 'WebPage',
        },
        '@id': {
          type: 'string',
          format: 'uri',
        },
      },
      additionalProperties: false,
    },
  },
  additionalProperties: false,
};

export const softwareApplicationSchema = {
  type: 'object',
  required: ['@context', '@type', 'name', 'description', 'author', 'offers'],
  properties: {
    '@context': {
      type: 'string',
      const: 'https://schema.org',
    },
    '@type': {
      type: 'string',
      const: 'SoftwareApplication',
    },
    name: {
      type: 'string',
      minLength: 1,
    },
    description: {
      type: 'string',
      minLength: 1,
    },
    applicationCategory: {
      type: 'string',
    },
    operatingSystem: {
      type: 'string',
    },
    author: {
      type: 'object',
      required: ['@type', 'name'],
      properties: {
        '@type': {
          type: 'string',
          const: 'Person',
        },
        name: {
          type: 'string',
          minLength: 1,
        },
      },
      additionalProperties: false,
    },
    offers: {
      type: 'object',
      required: ['@type', 'price', 'priceCurrency'],
      properties: {
        '@type': {
          type: 'string',
          const: 'Offer',
        },
        price: {
          type: 'string',
        },
        priceCurrency: {
          type: 'string',
          pattern: '^[A-Z]{3}$',
        },
      },
      additionalProperties: false,
    },
  },
  additionalProperties: false,
};

export const breadcrumbListSchema = {
  type: 'object',
  required: ['@context', '@type', 'itemListElement'],
  properties: {
    '@context': {
      type: 'string',
      const: 'https://schema.org',
    },
    '@type': {
      type: 'string',
      const: 'BreadcrumbList',
    },
    itemListElement: {
      type: 'array',
      items: {
        type: 'object',
        required: ['@type', 'position', 'name', 'item'],
        properties: {
          '@type': {
            type: 'string',
            const: 'ListItem',
          },
          position: {
            type: 'integer',
            minimum: 1,
          },
          name: {
            type: 'string',
            minLength: 1,
          },
          item: {
            type: 'string',
            format: 'uri',
          },
        },
        additionalProperties: false,
      },
    },
  },
  additionalProperties: false,
};

export const webSiteSchema = {
  type: 'object',
  required: ['@context', '@type', 'name', 'url'],
  properties: {
    '@context': {
      type: 'string',
      const: 'https://schema.org',
    },
    '@type': {
      type: 'string',
      const: 'WebSite',
    },
    name: {
      type: 'string',
      minLength: 1,
    },
    url: {
      type: 'string',
      format: 'uri',
    },
    author: {
      type: 'object',
      required: ['@type', 'name'],
      properties: {
        '@type': {
          type: 'string',
          const: 'Person',
        },
        name: {
          type: 'string',
          minLength: 1,
        },
      },
      additionalProperties: false,
    },
  },
  additionalProperties: false,
};

