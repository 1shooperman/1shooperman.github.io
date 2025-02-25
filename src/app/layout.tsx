import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Brandon Shoop',
  description: 'Personal website and blog of Brandon Shoop',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className="bg-gray-100 text-gray-900">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-4xl font-bold hover:text-gray-700 transition">
              Brandon Shoop
            </Link>
            <div className="space-x-4">
              <a
                href="https://www.linkedin.com/in/brandonshoop/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-600 hover:text-blue-600"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href="https://github.com/1shooperman/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-600 hover:text-gray-900"
              >
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
