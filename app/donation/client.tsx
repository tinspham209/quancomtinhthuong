'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FC, PropsWithChildren, useEffect } from 'react';

type Props = PropsWithChildren & {};

const Donation: FC<Props> = ({ children }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const donationId = searchParams.get('donationId');

  useEffect(() => {
    if (donationId) {
      router.push(`/donation/${donationId}`);
    }
  }, [donationId, router]);

  return null;
};

export default Donation;
