'use client';

import Link from 'next/link';
import React, { Fragment } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Sheet,
  SheetTrigger,
  Skeleton,
} from '../ui';
import { cn } from '@/lib/utils';

export type RouteItemNav = {
  href: string;
  label: string;
  active: boolean;
};

type Props = {
  routes: RouteItemNav[];
};

const MenuBar: React.FC<Props> = ({ routes }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={'ghost'} className="text-md font-medium">
          Menu
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {routes.map((route) => (
          <Fragment key={route.label}>
            <DropdownMenuItem disabled={route.active} asChild>
              <Link
                href={route.href}
                className={cn('', {
                  'font-bold': route.active,
                })}
              >
                {route.label}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuBar;
