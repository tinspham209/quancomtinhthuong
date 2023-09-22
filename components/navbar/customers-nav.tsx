'use client';

import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Icons } from '../icons';
import NavLists, { RouteItemNav } from './nav-lists';
import useMediaQuery, { breakpointScreen } from '@/hooks/use-media-query';
import MenuBar from './menu-bar';

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
      label: 'Orders History',
      active: pathname.includes('/history-orders'),
    },
  ];
  const isMobile = useMediaQuery(breakpointScreen.MOBILE);
  return (
    <div className={cn('flex items-center space-x-2 sm:space-x-4 lg:space-x-6', className)}>
      <Icons.logo className="w-[32px] h-[32px] mr-4" />

      {isMobile ? <MenuBar routes={routes} /> : <NavLists routes={routes} />}
    </div>
  );
};

export default CustomersNav;
