'use client';
import { useProfileStore } from '@/hooks';
import { useProfile } from '@/queries/auth';
import { useGetStoresByUserName } from '@/queries/stores';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useLayoutEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function StoresLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const { profile, onSetProfile } = useProfileStore();

  const { profile: profileQuery, getMyProfile } = useProfile({
    onSuccess(data) {
      onSetProfile(data);
      if (data.role.name !== 'ADMIN') {
        toast.error(`You don't have permission to access this page`);
        router.push(`/sign-in?redirect_url=${pathname}`);
      }
    },
    onErrorCallback: () => {
      toast.error('Unauthorized, Please sign in');
      router.push(`/sign-in?redirect_url=${pathname}`);
    },
  });

  const { storesByUserName, getStoresByUserName } = useGetStoresByUserName({
    userName: profile?.userName || '',
  });

  useEffect(() => {
    if (profile?.userName && !storesByUserName) {
      getStoresByUserName();
    }
  }, [getStoresByUserName, profile?.userName, storesByUserName]);

  useLayoutEffect(() => {
    if (!profileQuery) {
      getMyProfile();
    }
  }, [getMyProfile, profileQuery]);

  return <>{children}</>;
}
