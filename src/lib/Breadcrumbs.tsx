"use client"

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export const Breadcrumbs = () => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const crumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const label = decodeURIComponent(segment);

    return (
      <span key={href} className="text-sm">
        {index > 0 && ' / '}
        <Link href={href} className="text-blue-600 hover:underline">
          {label}
        </Link>
      </span>
    );
  });

  return <nav aria-label="Breadcrumbs">
    {(segments.length > 0) && <span key={'/'} className="text-sm">
      <Link href={'/'} className="text-blue-600 hover:underline">{"Home / "}</Link>
    </span>}
    {crumbs}
  </nav>;
}
