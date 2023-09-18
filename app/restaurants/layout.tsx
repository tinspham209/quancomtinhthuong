'use client';
import { useProfileStore } from '@/hooks';
import { useProfile } from '@/queries/auth';
import { usePathname, useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function RestaurantsLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const { onSetProfile } = useProfileStore();

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

  useLayoutEffect(() => {
    if (!profileQuery) {
      getMyProfile();
    }
  }, [getMyProfile, profileQuery]);

  return <>{children}</>;
}
