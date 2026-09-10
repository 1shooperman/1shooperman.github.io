---
name: seo
description: >
  Use this skill when the user asks for a one-off, full-site SEO audit — checking the
  current state of the entire codebase for SEO alignment, independent of any specific
  diff. Not for a pre-PR gate; that's the agent-seo-peek subagent used by the
  completion promise.
user-invocable: true
allowed-tools: ["Read", "Grep", "Glob", "Bash", "mcp__mobile-design-guide__search_guidelines", "mcp__mobile-design-guide__list_topics", "mcp__mobile-design-guide__get_guideline"]
---

Run a full-site SEO audit of every page/route/schema in the repo, independent of any
diff. This is the arbitrary, on-demand sweep — for the automated pre-PR gate that runs
scoped to a diff as part of `.claude/completion-promise.md`, that's the `agent-seo-peek`
subagent, not this skill.

## Google Search guidance (MCP)

Pull current guidance from the `mobile-design-guide` MCP server before/while auditing.
This repo only cares about the `google-search` platform — ignore `ios` and `android`
entries entirely, they're for unrelated mobile projects sharing this server.

- `mcp__mobile-design-guide__list_topics` with `platform: "google-search"` — see what's
  cached (structured data, crawling, AI-search optimization, etc.).
- `mcp__mobile-design-guide__search_guidelines` with `platform: "google-search"` — query
  per area under audit (e.g. "structured data best practices", "canonical URLs",
  "robots meta directives", "AI search optimization").
- `mcp__mobile-design-guide__get_guideline` — pull a full chunk by slug when a search hit
  needs more context to judge a finding.

If the MCP server is unreachable, note it as a degraded-confidence caveat in the report
and fall back to the static conventions below rather than blocking the audit.

## Scope

Every page/route type that emits its own metadata, checked in full — not diff-scoped:

- `src/app/layout.tsx` (root: title, description, OG, Twitter, Person + Website JSON-LD)
- `src/app/page.tsx`, `src/app/blog/page.tsx`, `src/app/blog/page/[page]/page.tsx`
- `src/app/blog/[slug]/page.tsx` (per-post metadata + Article + Breadcrumb JSON-LD)
- `src/app/sitemap.ts`
- `public/robots.txt`
- `src/content/blog/*.md` front matter

## Checks

1. **Metadata completeness.** Every page under `src/app/**/page.tsx` exports or inherits
   `generateMetadata`/`metadata` with a `title` and `description`. Prefer verifying via
   `metadataFactory` (`src/lib/metadata.ts`) usage rather than ad hoc metadata objects —
   flag pages that hand-roll metadata instead of reusing the factory.
2. **Canonical URLs.** Every generated metadata object sets `alternates.canonical` to an
   absolute URL built from `NEXT_PUBLIC_BASE_URL` (fallback `https://brandonshoop.com`),
   not a relative path.
3. **Open Graph / Twitter.** Pages that render user-facing content include
   `generateOpenGraphMetadata` and `generateTwitterMetadata` output (via the factory's
   `includeOpenGraph`/`includeTwitter` defaults) unless intentionally suppressed.
4. **Structured data (JSON-LD).** Schema-emitting code stays in sync with
   `src/lib/schema.ts` and `src/lib/schema-definitions.ts`. Run `npm run validate:schemas`
   and treat any failure as a hard finding. Flag any inline JSON-LD (`<script
   type="application/ld+json">`) that bypasses the generator functions.
5. **Blog front matter.** Every file in `src/content/blog/` has `title`, `date`, and
   `excerpt` in front matter (required by `getPosts.ts`); flag missing or empty fields.
   `excerpt` should be non-trivial (not a truncated duplicate of the title) since it is
   reused as the meta description and OG description.
6. **Sitemap coverage.** Every real route (not the `/projects` stub redirects) appears in
   `src/app/sitemap.ts`. Cross-check `getSortedPosts()` output against the `blogPosts` map
   — no post silently excluded. New top-level routes need an entry.
7. **Robots directives.** `public/robots.txt` and any per-page `robots` metadata option
   (see the `noai, noimageai` convention on blog posts) stay consistent — don't let a page
   accidentally become indexable/non-indexable against the site's intent.
8. **Heading and image hygiene.** Each page has exactly one `<h1>`. Images rendered via
   `next/image` or raw `<img>` have meaningful `alt` text (not empty, not filename-derived).
9. **Static-export constraints.** Since `next.config.ts` sets `output: 'export'`, flag any
   SEO-relevant code that assumes a server runtime (headers-based redirects, middleware,
   dynamic `robots.ts`/`sitemap.ts` behavior that isn't `force-static`-safe).
10. **Current best-practice drift.** Cross-check the above against live guidance pulled
    from the `google-search` platform via MCP — flag anything the site does that
    contradicts current guidance, citing the slug.

## Running the audit

1. `npm run validate:schemas` — authoritative check for JSON-LD correctness.
2. `npm run compile` and `npm run lint` — catch type/lint issues in metadata/schema code.
3. Pull `google-search` MCP guidance relevant to structured data, crawling, and metadata.
4. Grep for hand-rolled `<title>`, `<meta name="description"`, or ad hoc `metadata = {...}`
   objects that skip `metadataFactory`/`generateOpenGraphMetadata`/`generateTwitterMetadata`.
5. Diff `src/content/blog/` filenames against `sitemap.ts`'s post list.
6. Walk every `src/app/**/page.tsx`, not just changed ones — this is a full sweep.

## Output

Report findings as a short list: file, what's wrong, why it matters for SEO, and the
one-line fix (usually "use `metadataFactory`/`generateOpenGraphMetadata` like the sibling
page does," "add front matter field," or "cite MCP slug X, contradicts current guidance").
No findings → say so plainly, don't pad the report. Do not restate the whole checklist
above — only report actual deviations found.
