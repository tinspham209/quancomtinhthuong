'use client';

import { useProfileStore } from '@/hooks';
import useAuthNavigate from '@/hooks/use-auth-navigate';
import { useProfile } from '@/queries/auth';
import { useLayoutEffect } from 'react';

export default function AuthLayout({
  children,
  requiredLogin = true,
}: {
  children: React.ReactNode;
  requiredLogin?: boolean;
}) {
  const { navigateToLogin } = useAuthNavigate();
  const { onSetProfile } = useProfileStore();
  const { profile: profileQuery, getMyProfile } = useProfile({
    onSuccess(data) {
      onSetProfile(data);
    },
    onErrorCallback: () => {
      if (requiredLogin) navigateToLogin();
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
