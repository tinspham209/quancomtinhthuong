'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';
import StoreSwitcher from './switcher-stores';

const MainNav = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();

  const storeId = params?.storeId || '';

  const routes = [
    {
      href: `/dashboard`,
      label: 'Dashboard',
      active: pathname === '/dashboard',
    },
    {
      href: `/dashboard/restaurants`,
      label: 'Restaurants',
      active: pathname.includes('/restaurants'),
    },
  ];

  return (
    <div className={cn('flex items-center space-x-2 sm:space-x-4 lg:space-x-6', className)}>
      <StoreSwitcher />
      {routes.map((route, index) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active ? 'text-black dark:text-white' : 'text-muted-foreground',
          )}
        >
          {route.label}
        </Link>
      ))}
    </div>
  );
};

export default MainNav;
