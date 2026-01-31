import './globals.css';
import Link from 'next/link';
import Image from 'next/image';

import { Breadcrumbs } from '@/lib/Breadcrumbs';
import { generatePersonSchema, generateWebsiteSchema } from '@/lib/schema';
import { generateOpenGraphMetadata, generateTwitterMetadata } from '@/lib/metadata';

import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://brandonshoop.com';
  const title = 'Brandon Shoop: Blog';
  const description = 'Personal blog of Brandon Shoop, computer scientist and software generalist. Technical product management, hands-on development, and thoughts on technology.';

  return {
    title,
    description,
    alternates: {
      canonical: baseUrl,
    },
    icons: {
      icon: '/favicon.png',
    },
    openGraph: generateOpenGraphMetadata(title, description, baseUrl),
    twitter: generateTwitterMetadata(title, description),
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const currentYear = new Date().getFullYear();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://brandonshoop.com';
  const personSchema = generatePersonSchema(baseUrl);
  const websiteSchema = generateWebsiteSchema(baseUrl);

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="bg-gray-100 text-gray-900">
        <header className="relative h-32 overflow-hidden">
          <Image
            src="/assets/map.jpeg"
            alt=""
            fill
            className="object-cover z-0"
            priority
          />
          <div className="absolute inset-0 bg-gray-900/70 z-10">
            <div className="max-w-7xl mx-auto px-4 h-full flex justify-between items-center">
              <Link href="/" className="flex items-center space-x-3 hover:text-gray-300 transition">
                <Image
                  src="/siteicon.png"
                  alt="Brandon Shoop site icon"
                  width={40}
                  height={40}
                  style={{ width: '40px', height: '40px' }}
                  className="rounded-full"
                />
                <span className="text-4xl font-bold text-gray-100 hidden md:inline">Brandon Shoop</span>
              </Link>
              <div className="flex items-center gap-3">
                <a
                  href="https://aglflorida.com/projects"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-900 font-medium rounded-md hover:bg-gray-200 transition"
                  aria-label="Portfolio (opens in new tab)"
                >
                  <i className="fa fa-briefcase" aria-hidden="true"></i>
                  <span className="hidden md:inline">Portfolio</span>
                </a>
                <a
                  href="https://github.com/1shooperman?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-900 font-medium rounded-md hover:bg-gray-200 transition"
                  aria-label="GitHub (opens in new tab)"
                >
                  <i className="fab fa-github" aria-hidden="true"></i>
                  <span className="hidden md:inline">GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto p-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-64 shrink-0 order-2 lg:order-1" aria-label="Site navigation">
              <nav className="bg-white p-6 rounded-lg shadow sticky top-4">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Navigate
                </h2>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="text-gray-700 hover:text-gray-900 transition">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/page/1" className="text-gray-700 hover:text-gray-900 transition">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://aglflorida.com/projects"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-gray-900 transition"
                      aria-label="Projects (opens in new tab)"
                    >
                      Porfolio <i className="fas fa-external-link-alt text-xs ml-1" aria-hidden="true"></i>
                    </a>
                  </li>
                </ul>
              </nav>
            </aside>
            <div className="flex-1 min-w-0 order-1 lg:order-2">
              <Breadcrumbs />
              {children}
            </div>
          </div>
        </main>
        <footer className="mt-16 bg-gray-800 text-gray-300">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
              <div className="md:max-w-sm">
                <h3 className="text-sm font-semibold text-gray-100 uppercase tracking-wider mb-4">
                  About Brandon
                </h3>
                <p className="text-sm text-gray-400">
                  Brandon is a husband, father of two, occasional blogger, and speaker with a long, winding relationship with technology. A self-described generalist, he has spent his career moving between disciplines, roles, and square holes that never quite fit for long. He writes sporadically but honestly about adult ADHD, technology, and what it’s like to build things when your brain works a little sideways.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:flex-1 md:justify-end">
                <div>
                  <h3 className="text-sm font-semibold text-gray-100 uppercase tracking-wider mb-4">
                    Site
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/" className="hover:text-white transition">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog/page/1" className="hover:text-white transition">
                        Blog
                      </Link>
                    </li>
                    <li>
                      <a
                        href="https://aglflorida.com/projects"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition"
                        aria-label="Projects (opens in new tab)"
                      >
                        Portfolio <i className="fas fa-external-link-alt text-xs ml-1" aria-hidden="true"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-100 uppercase tracking-wider mb-4">
                    Legal
                  </h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/privacy" className="hover:text-white transition">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://aglflorida.com/security"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition"
                      aria-label="Security Policy (opens in new tab)"
                    >
                      Security Policy <i className="fas fa-external-link-alt text-xs ml-1" aria-hidden="true"></i>
                    </a>
                  </li>
                </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-100 uppercase tracking-wider mb-4">
                    Connect
                  </h3>
                <div className="flex gap-4 mb-4">
                  <a
                    href="https://www.linkedin.com/in/brandonshoop/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl text-gray-300 hover:text-white transition"
                    aria-label="LinkedIn"
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a
                    href="https://github.com/1shooperman/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl text-gray-300 hover:text-white transition"
                    aria-label="GitHub"
                  >
                    <i className="fab fa-github"></i>
                  </a>
                  <a
                    href="https://www.goodreads.com/user/show/59372161"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl text-gray-300 hover:text-white transition"
                    aria-label="Goodreads"
                  >
                    <i className="fab fa-goodreads-g"></i>
                  </a>
                </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-100 uppercase tracking-wider mb-4">
                    Friends &amp; Family
                  </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="https://www.lindsaydareshoop.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition"
                      aria-label="Lindsay Dare Shoop, OLY (opens in new tab)"
                    >
                      Lindsay Dare Shoop, OLY
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://wearekuzaa.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition"
                      aria-label="Kuzaa (opens in new tab)"
                    >
                      Kuzaa
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://universaldesign.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition"
                      aria-label="The UD Project (opens in new tab)"
                    >
                      The UD Project
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://inocula.novacove.ai/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition"
                      aria-label="Novacove.ai (opens in new tab)"
                    >
                      Novacove.ai
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://spark-code.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition"
                      aria-label="S&C Advisory (opens in new tab)"
                    >
                      S&C Advisory
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://mybrandi.ai/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition"
                      aria-label="Brandi.ai (opens in new tab)"
                    >
                      Brandi.ai
                    </a>
                  </li>
                </ul>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-500">
              {'\u00A9'} {currentYear}{' '}
              <a
                href="https://aglflorida.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-400 underline transition"
                aria-label="AGL Consulting LLC (opens in new tab)"
              >
                AGL Consulting LLC
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
