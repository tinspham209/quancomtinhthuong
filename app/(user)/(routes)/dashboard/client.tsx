'use client';

import JsonView from '@/components/json-view';
import { Button, Heading } from '@/components/ui';
import { useProfileStore } from '@/hooks';
import Link from 'next/link';
import React from 'react';

interface Props {}

const Client: React.FC<Props> = ({}: Props) => {
  const { profile } = useProfileStore();

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row md:justify-between">
        <Heading title="Dashboard" />
        <div className="mt-2 sm:mt-0">
          <Link href="/history-orders">
            <Button>Orders History</Button>
          </Link>
        </div>
      </div>

      <JsonView src={profile} />
    </div>
  );
};

export default Client;
