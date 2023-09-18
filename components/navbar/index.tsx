'use client';

import { useProfileStore } from '@/hooks';
import { cn } from '@/lib/utils';
import { useProfile } from '@/queries/auth';
import TokenServices from '@/services/token';
import { isEmpty } from '@/utils';
import { Lock, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { Icons } from '../icons';
import ChangePassword from '../sheet/uam/change-password';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
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
import AdminNav from './admin-nav';
import CustomersNav from './customers-nav';

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
  const { handleInvalidateProfile, loading } = useProfile();
  const { profile, onSetProfile } = useProfileStore();

  const router = useRouter();

  const getUsernameAvatar = useCallback(() => {
    if (profile) {
      return profile.userName.match(/\b(\w)/g);
    }
  }, [profile]);

  const handleLogout = () => {
    router.push(`/sign-in`);
    handleInvalidateProfile();
    onSetProfile(null);
    TokenServices.clearToken();
  };

  const isAdmin = useMemo(() => {
    if (profile?.role.name === 'ADMIN') return true;
    return false;
  }, [profile]);

  const isCustomer = useMemo(() => {
    if (profile?.role.name === 'CUSTOMER') return true;
    return false;
  }, [profile]);

  const pathname = usePathname();

  return (
    <nav className="border-b">
      <div className="h-16 flex items-center px-4">
        {isAdmin ? (
          <AdminNav className="mr-6" />
        ) : isCustomer ? (
          <CustomersNav />
        ) : (
          <Link href="/">
            <Icons.logo1 className="w-[230px] h-[56px] mr-4" />
          </Link>
        )}
        <div className="ml-auto flex items-center space-x-4">
          {loading ? (
            <Skeleton className="w-[40px] h-[40px] rounded-full" />
          ) : (
            <>
              {isEmpty(profile) ? (
                <Link
                  href={`/sign-in?redirect_url=${pathname}`}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary text-muted-foreground',
                  )}
                >
                  Sign In
                </Link>
              ) : (
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Avatar>
                        <AvatarImage src={profile?.imgUrl} />
                        <AvatarFallback>{getUsernameAvatar()}</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>
                        {profile?.userName} ({profile?.role.description})
                      </DropdownMenuLabel>

                      <DropdownMenuSeparator />
                      <div className="px-2 py-1 text-sm">
                        <Sheet>
                          <SheetTrigger className="flex">
                            <Lock className="w-4 h-4 mr-2" />
                            Change Password
                          </SheetTrigger>
                          <ChangePassword />
                        </Sheet>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
