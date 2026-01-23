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
        <header className="bg-gray-900 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
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
            <div className="flex items-center space-x-4">
              <a
                href="https://www.linkedin.com/in/brandonshoop/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-100 hover:text-gray-300"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href="https://github.com/1shooperman/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-100 hover:text-gray-300"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://aglflorida.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-100 hover:text-gray-300"
              >
                <i className="fa fa-briefcase"></i>
              </a>
              <a
                href="https://www.goodreads.com/user/show/59372161"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-100 hover:text-gray-300"
              >
                <i className="fab fa-goodreads-g"></i>
              </a>
              <div className="relative group">
                <button
                  className="text-2xl text-gray-100 hover:text-gray-300 p-2"
                  aria-label="Navigation Menu"
                >
                  <i className="fas fa-bars"></i>
                </button>
                <div className="absolute right-0 top-[80%] pt-4 w-48 invisible group-hover:visible">
                  <div className="bg-white rounded-lg shadow-lg py-2">
                    <Link
                      href="/"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Home
                    </Link>
                    <Link
                      href="/blog/page/1"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Posts
                    </Link>
                    <a
                      href="https://aglflorida.com/projects"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      aria-label="Projects (opens in new tab)"
                    >
                      Projects <i className="fas fa-external-link-alt text-xs ml-1" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto p-4">
          <Breadcrumbs />
          {children}
        </main>
        <footer className="text-center py-4 text-gray-600">
          <div>{'\u00A9'} {currentYear} AGL Consulting LLC</div>
          <div className="mt-2">
            <Link href="/privacy" className="text-blue-600 hover:text-blue-800">
              Privacy Policy
            </Link>
            {" | "}
            <a
              href="https://aglflorida.com/security"
              className="text-blue-600 hover:text-blue-800"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Security Policy (opens in new tab)"
            >
              Security Policy <i className="fas fa-external-link-alt text-xs ml-1" aria-hidden="true"></i>
            </a>
            {" | "}
            <a
              href="https://aglflorida.com/contact"
              className="text-blue-600 hover:text-blue-800"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact Us (opens in new tab)"
            >
              Contact Us <i className="fas fa-external-link-alt text-xs ml-1" aria-hidden="true"></i>
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
