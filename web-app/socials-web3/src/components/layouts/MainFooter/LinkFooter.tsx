'use client';

import React from 'react';
import Link from 'next/link';

interface LinkFooterProps {
  label: string;
  url: string;
  isInternal: boolean;
}
const styleItem =
  'font-semibold text-text-secondary text-sm hover:text-text-primary duration-300';

const LinkFooter = ({ label, url, isInternal }: LinkFooterProps) => {
  return (
    <li className="mt-4">
      {isInternal && (
        <Link prefetch={false} className={styleItem} href={url}>
          {label}
        </Link>
      )}
      {!isInternal && (
        <a href={url} target="_blank" className={styleItem}>
          {label}
        </a>
      )}
    </li>
  );
};

export default LinkFooter;
