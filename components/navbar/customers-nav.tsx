'use client';

import useMediaQuery, { breakpointScreen } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Icons } from '../icons';
import MenuBar from './menu-bar';
import NavLists, { RouteItemNav } from './nav-lists';
import Link from 'next/link';

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
      <Link href={'/'}>
        {isMobile ? (
          <Icons.logo className="w-[48px] h-[48px] " />
        ) : (
          <Icons.logoFull className="w-[195px] h-[56px] " />
        )}
      </Link>

      {isMobile ? <MenuBar routes={routes} /> : <NavLists routes={routes} />}
    </div>
  );
};

export default CustomersNav;
