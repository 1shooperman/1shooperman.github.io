# brandonshoop.com

Personal blog and portfolio site for Brandon Shoop — computer scientist, software generalist, and technical product manager. This site serves as a central place for thoughts, project showcases, and technical writing.

## About

This is a personal blog/portfolio built with [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com), and TypeScript. The site is hosted on GitHub Pages and features:

- **Blog posts**: Technical writing, career reflections, and thoughts on technology
- **Project showcases**: Personal projects including mobile apps and development tools
- **SEO optimization**: Structured data, Open Graph metadata, and semantic HTML
- **Content management**: Markdown-based content in `src/content/` for easy authoring

The site was largely built using [Cursor AI](https://www.cursor.com/), with selective use of GitHub Copilot for rapid iteration.

## Tech Stack

[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS with Typography plugin
- **Content**: Markdown files processed with `gray-matter` and `remark`
- **Testing**: Jest with React Testing Library
- **Type Safety**: TypeScript
- **Deployment**: GitHub Pages

## Development

### Prerequisites

- Node.js (v18 or later)
- npm

### Setup

```bash
git clone https://github.com/1shooperman/1shooperman.github.io.git
cd 1shooperman.github.io
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run Jest tests
- `npm run validate:schemas` - Validate JSON-LD schema definitions

## Content Structure

- **Blog posts**: `src/content/blog/*.md` - Front matter with title, date, excerpt
- **Projects**: `src/content/projects/*.md` - Front matter with metadata (technologies, links, etc.)

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)