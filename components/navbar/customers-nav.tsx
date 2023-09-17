'use client';

import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Icons } from '../icons';
import NavLists, { RouteItemNav } from './nav-lists';

const CustomersNav = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();

  const routes: RouteItemNav[] = [
    {
      href: `/dashboard`,
      label: 'Dashboard',
      active: pathname === '/dashboard',
    },
    {
      href: `/history-orders`,
      label: 'History Orders',
      active: pathname.includes('/history-orders'),
    },
  ];

  return (
    <div className={cn('flex items-center space-x-2 sm:space-x-4 lg:space-x-6', className)}>
      <Icons.logo className="w-[32px] h-[32px] mr-4" />
      <NavLists routes={routes} />
    </div>
  );
};

export default CustomersNav;
