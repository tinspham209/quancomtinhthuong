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
      href: `/dashboard`,
      label: 'Dashboard',
      active: pathname === '/dashboard',
    },
    {
      href: `/stores`,
      label: 'Stores',
      active: pathname.includes('/stores'),
    },
    {
      href: `/restaurants`,
      label: 'Restaurants',
      active: pathname.includes('/restaurants'),
    },
    {
      href: `/history-orders`,
      label: 'Orders History',
      active: pathname.includes('/history-orders'),
    },
  ];

  return (
    <div className={cn('flex items-center space-x-2 sm:space-x-4 lg:space-x-6', className)}>
      <StoreSwitcher className="hidden sm:flex" />
      <NavLists routes={routes} />
    </div>
  );
};

export default MainNav;
