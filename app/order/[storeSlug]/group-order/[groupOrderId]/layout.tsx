'use client';

import { useProfileStore } from '@/hooks';
import { useProfile } from '@/queries/auth';
import { usePathname, useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';
import toast from 'react-hot-toast';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const { onSetProfile } = useProfileStore();

  const { profile: profileQuery, getMyProfile } = useProfile({
    onSuccess(data) {
      onSetProfile(data);
    },
    onErrorCallback: () => {
      toast.error('Unauthorized, Please sign in first');
      router.push(`/sign-in?redirect_url=${pathname}`);
    },
  });

  useLayoutEffect(() => {
    if (!profileQuery) {
      getMyProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileQuery]);

  return <div>{children}</div>;
}
