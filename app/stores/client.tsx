'use client';

import { Button, Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui';
import { useProfileStore } from '@/hooks';
import ClientOnly from '@/providers/client-only';
import { useGetStoresByUserName } from '@/queries/stores';
import Link from 'next/link';
import React from 'react';

interface Props {}

const Client: React.FC<Props> = ({}: Props) => {
  const { profile } = useProfileStore();

  const { storesByUserName: stores, getStoresByUserName } = useGetStoresByUserName({
    userName: profile?.userName || '',
  });

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row md:justify-between">
        <h1 className="text-3xl font-bold leading-none tracking-tight">Stores</h1>
        <div></div>
      </div>

      <div className="mt-2">
        <div className="justify-center gap-6 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {stores?.map((store) => (
            <Card key={store.id}>
              <CardHeader>
                <CardTitle
                  style={{
                    height: 48,
                    display: '-webkit-box',
                    overflow: 'hidden',
                    lineHeight: '24px',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2,
                  }}
                  title={store.name}
                >
                  {store.name}
                </CardTitle>
                <CardDescription>{store.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-end">
                <Link href={`/stores/${store.id}`}>
                  <Button>Go to store</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Client;
