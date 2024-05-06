'use client';

import { Button, Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui';
import { useGetListDonations } from '@/queries/donations';
import { formatMoney } from '@/utils';
import Link from 'next/link';
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

  const { listDonations } = useGetListDonations();

  return (
    <div className="mt-4">
      <h3 className="text-xl font-bold">Group Donations</h3>
      {listDonations?.length === 0 && (
        <div className="my-10">
          <h3 className="text-xl font-semibold text-gray-500 text-center">
            There is no group donations available now.
          </h3>
        </div>
      )}

      <div className="justify-center gap-6 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {listDonations?.map((group) => (
          <Card key={group.id}>
            <CardHeader>
              <CardTitle
                style={{
                  height: 72,
                  display: '-webkit-box',
                  overflow: 'hidden',
                  lineHeight: '24px',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 3,
                }}
                title={group.title}
              >
                {group.title}
              </CardTitle>
              <CardDescription
                style={{
                  height: 48,
                  display: '-webkit-box',
                  overflow: 'hidden',
                  lineHeight: '24px',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2,
                }}
                title={group.title}
              >
                {group.description}
              </CardDescription>
              <CardDescription>
                Donation Target: {formatMoney(group.donationTarget as number)}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-end">
              <Link href={`/donation/${group.id}`}>
                <Button>Go to donation</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Donation;
