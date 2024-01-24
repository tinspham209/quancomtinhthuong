'use client';

import { useProfileStore } from '@/hooks';
import { cn } from '@/lib/utils';
import { useProfile } from '@/queries/auth';
import { useGetNotifications } from '@/queries/notifications';
import TokenServices from '@/services/token';
import { isEmpty } from '@/utils';
import dayjs from 'dayjs';
import { Lock, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Fragment, useCallback, useMemo } from 'react';
import { Icons } from '../icons';
import ChangePassword from '../sheet/uam/change-password';
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
import AdminNav from './admin-nav';
import CustomersNav from './customers-nav';

interface NavbarProps {}

const NOTI_IMG_URL =
  'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3E2ZnN3Ym1iaWhrY3NmMGg1MmRiMjc3a3hoMHBxeXNvajh5Y3Y4NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/fR7Wcwthfnt5YfKMF0/giphy.gif';

const Navbar = ({}: NavbarProps) => {
  const { handleInvalidateProfile, loading } = useProfile();
  const { profile, onSetProfile } = useProfileStore();

  const router = useRouter();

  const { notifications } = useGetNotifications({
    userName: profile?.userName,
  });

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

  const getRedirectUrl = useCallback((pathname: string) => {
    const routeNeedRedirect = [`/order`];
    if (routeNeedRedirect.some((route) => pathname.includes(route))) {
      return `redirect_url=${pathname}`;
    }
    return ``;
  }, []);

  const getRandomTextColor = () => {
    const textColorClasses = [
      'text-red-500',
      'text-blue-500',
      'text-green-500',
      'text-yellow-500',
      'text-pink-500',
      'text-purple-500',
      'text-indigo-500',
    ];

    const randomIndex = Math.floor(Math.random() * textColorClasses.length);

    return textColorClasses[randomIndex];
  };

  return (
    <nav className="border-b fixed top-0 left-0 w-full z-50 py-1 ">
      <div className="flex items-center px-4">
        {isAdmin ? (
          <AdminNav className="mr-6" />
        ) : isCustomer ? (
          <CustomersNav />
        ) : (
          <Link href="/">
            <Icons.logoFull className="w-[195px] h-[56px] mr-4" />
          </Link>
        )}
        <div className="ml-auto flex items-center space-x-4">
          {loading ? (
            <Skeleton className="w-[40px] h-[40px] rounded-full" />
          ) : (
            <>
              {isEmpty(profile) ? (
                <Link
                  href={`/sign-in?${getRedirectUrl(pathname)}`}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary text-muted-foreground',
                  )}
                >
                  Sign In
                </Link>
              ) : (
                <div className="flex flex-row gap-6">
                  {/* Notification */}
                  {isEmpty(notifications) ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <div className="animate-bounce animate-infinite animate-duration-1000 animate-ease-in-out">
                          <Avatar className="border-none cursor-pointer animate-spin animate-infinite animate-duration-[2000ms] animate-ease-in-out">
                            <AvatarImage
                              src={'/no-noti.gif'}
                              alt="notification"
                              title="Đây là thông báo"
                              className="border-none"
                            />
                            <AvatarFallback>Noti</AvatarFallback>
                          </Avatar>
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[360px] max-h-[560px] overflow-y-auto">
                        <DropdownMenuLabel className="text-md flex flex-row justify-between items-center">
                          <p>Đây là Thông báo</p>
                          <Button
                            variant={'outline'}
                            onClick={() => {
                              window.location.reload();
                            }}
                          >
                            Refresh
                          </Button>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuLabel>Không có thông báo nào ở đây cả!</DropdownMenuLabel>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <div className="animate-bounce animate-infinite animate-duration-1000 animate-ease-in-out">
                          <Avatar className="border-none cursor-pointer animate-spin animate-infinite animate-duration-[2000ms] animate-ease-in-out">
                            <AvatarImage
                              src={NOTI_IMG_URL}
                              alt="notification"
                              title="Thông báo có nợ nè"
                              className=""
                            />
                            <AvatarFallback>Noti</AvatarFallback>
                          </Avatar>
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="max-w-[360px] max-h-[560px] overflow-y-auto">
                        <DropdownMenuLabel className="text-xl flex flex-row justify-between items-center">
                          <p>Đây là Thông báo</p>
                          <Button
                            variant={'outline'}
                            onClick={() => {
                              window.location.reload();
                            }}
                          >
                            Refresh
                          </Button>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        {notifications?.map((notification) => (
                          <Fragment key={notification.createdAt}>
                            <DropdownMenuItem className="cursor-pointer" asChild>
                              <Link href={`/history-orders`} className="flex flex-col">
                                <p className="text-sm">
                                  Bạn có 1 khoản nợ chưa trả của group-order:{' '}
                                  <b>{notification.title}</b> tại store:{' '}
                                  <b>{notification.Store.name}</b> vào ngày{' '}
                                  <b>
                                    {dayjs(new Date(notification.createdAt)).format(
                                      'DD/MM/YYYY HH:MM',
                                    )}
                                  </b>
                                </p>
                                <div className="flex justify-end w-full">
                                  <Button
                                    variant={'destructive'}
                                    className="animate-jump animate-infinite animate-ease-in-out"
                                  >
                                    Trả nợ
                                  </Button>
                                </div>
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                          </Fragment>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}

                  {/* Avatar */}
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Avatar>
                        <AvatarImage src={profile?.imgUrl} />
                        <AvatarFallback>{getUsernameAvatar()}</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>
                        {profile?.name} - {profile?.userName} ({profile?.role.description})
                      </DropdownMenuLabel>

                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link href={`/me`}>
                          <User className="w-4 h-4 mr-2" /> My Profile
                        </Link>
                      </DropdownMenuItem>
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
      {!isEmpty(notifications) && (
        <div className="relative overflow-x-hidden border-t pt-2 bg-gradient-to-r from-sky-400 via-rose-400 to-lime-400">
          <div className="animate-marquee whitespace-nowrap flex flex-row">
            {Array.from({ length: 5 }).map((item, index) => (
              <p
                key={index}
                className={`text-xl mx-2 font-semibold ${getRandomTextColor()} animate-bounce animate-infinite`}
              >
                Bạn có 1 khoản nợ chưa trả
              </p>
            ))}
          </div>
          <div className="absolute top-2 animate-marquee2 whitespace-nowrap flex flex-row">
            {Array.from({ length: 5 }).map((item, index) => (
              <p
                key={index}
                className={`text-xl mx-2 font-semibold ${getRandomTextColor()} animate-bounce animate-infinite`}
              >
                Bạn có 1 khoản nợ chưa trả
              </p>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
