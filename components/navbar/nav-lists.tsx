'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

export type RouteItemNav = {
  href: string;
  label: string;
  active: boolean;
};

type Props = {
  routes: RouteItemNav[];
};

const NavLists: React.FC<Props> = ({ routes }) => {
  return (
    <>
      {routes.map((route, index) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            !route.active && 'text-muted-foreground',
          )}
        >
          {route.label}
        </Link>
      ))}
    </>
  );
};

export default NavLists;
