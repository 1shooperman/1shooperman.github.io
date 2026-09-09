## Commands

```bash
npm run dev          # dev server (Turbopack)
npm run build        # static export → out/
npm run lint         # ESLint
npm test             # Jest (no watch)
npm test -- <path>   # single test file
npm run validate:schemas  # validate JSON-LD schema definitions
npm run compile      # tsc type-check only
npm run dupes         # jscpd copy-paste detection (fails above 2% duplication)
```

## Security tooling

`eslint-plugin-security` and `eslint-plugin-no-unsanitized` run as part of `npm run lint` (see `eslint.config.mjs`). `security/detect-non-literal-fs-filename` and `security/detect-object-injection` are disabled for `src/lib/get*.ts` and `**/__tests__/**` — those read from a fixed, repo-local content directory at build time on a statically-exported site, so there's no untrusted-input path for them to catch.

`nodejsscan` (njsscan) was evaluated and deliberately not added: it targets Express/Node server vulnerabilities (insecure routes, JWT handling, hardcoded secrets in server code), this site has no server runtime (`output: 'export'`, no API routes), and it would add a Python toolchain to an otherwise Node-only CI pipeline for coverage `eslint-plugin-security` already provides here.

## Architecture

Static Next.js site (App Router, `output: 'export'`). Deployed to GitHub Pages — no server-side features.

**Content flow**: Markdown files in `src/content/blog/` → `src/lib/getPosts.ts` (gray-matter + remark) → page components. Blog posts require front matter: `title`, `date`, `excerpt`.

**SEO layer**: `src/lib/schema.ts` generates JSON-LD structured data; schemas are defined in `src/lib/schema-definitions.ts` and validated via `scripts/validate-schemas.ts` (AJV). `src/lib/metadata.ts` handles Open Graph/meta tags.

**Projects routes** (`/projects`, `/projects/[id]`) are stub redirects to `/blog/page/1` — not real pages.

**Tests** live in `src/app/__tests__/` and `src/lib/__tests__/`, using Jest + React Testing Library.
