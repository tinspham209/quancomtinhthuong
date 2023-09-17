'use client';

import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import React from 'react';
import NavLists, { RouteItemNav } from './nav-lists';
import StoreSwitcher from './switcher-stores';

const MainNav = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();

  const routes: RouteItemNav[] = [
    {
      href: `/stores`,
      label: 'Stores',
      active: pathname === '/stores',
    },
    {
      href: `/stores/restaurants`,
      label: 'Restaurants',
      active: pathname.includes('/restaurants'),
    },
  ];

  return (
    <div className={cn('flex items-center space-x-2 sm:space-x-4 lg:space-x-6', className)}>
      <StoreSwitcher />
      <NavLists routes={routes} />
    </div>
  );
};

export default MainNav;
