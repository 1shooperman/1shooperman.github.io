## Commands

```bash
npm run dev          # dev server (Turbopack)
npm run build        # static export → out/
npm run lint         # ESLint
npm test             # Jest (no watch)
npm test -- <path>   # single test file
npm run validate:schemas  # validate JSON-LD schema definitions
npm run compile      # tsc type-check only
```

## Architecture

Static Next.js site (App Router, `output: 'export'`). Deployed to GitHub Pages — no server-side features.

**Content flow**: Markdown files in `src/content/blog/` → `src/lib/getPosts.ts` (gray-matter + remark) → page components. Blog posts require front matter: `title`, `date`, `excerpt`.

**SEO layer**: `src/lib/schema.ts` generates JSON-LD structured data; schemas are defined in `src/lib/schema-definitions.ts` and validated via `scripts/validate-schemas.ts` (AJV). `src/lib/metadata.ts` handles Open Graph/meta tags.

**Projects routes** (`/projects`, `/projects/[id]`) are stub redirects to `/blog/page/1` — not real pages.

**Tests** live in `src/app/__tests__/` and `src/lib/__tests__/`, using Jest + React Testing Library.
