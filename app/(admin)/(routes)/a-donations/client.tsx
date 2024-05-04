'use client';

import { CreateStore } from '@/components/sheet';
import CreateGroupDonation from '@/components/sheet/donations/create';
import {
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Sheet,
  SheetTrigger,
} from '@/components/ui';
import { useGetListDonations } from '@/queries/donations';
import { formatMoney } from '@/utils';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

interface Props {}

const Client: React.FC<Props> = ({}: Props) => {
  const { listDonations } = useGetListDonations();

  const [openCreateGroupDonation, setOpenCreateGroupDonation] = useState(false);

  const handleOpenCreateGroupDonation = (open: boolean) => {
    setOpenCreateGroupDonation(open);
  };

  return (
    <div className="p-4 pt-8">
      <div className="flex flex-col sm:flex-row md:justify-between">
        <h1 className="text-3xl font-bold leading-none tracking-tight">List Donations</h1>
        <div className="mt-2 sm:mt-0">
          <div>
            <Sheet open={openCreateGroupDonation} onOpenChange={setOpenCreateGroupDonation}>
              <SheetTrigger className="flex" asChild>
                <Button>
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Create New Group Donation
                </Button>
              </SheetTrigger>
              <CreateGroupDonation
                onClose={() => {
                  handleOpenCreateGroupDonation(false);
                }}
              />
            </Sheet>
          </div>
        </div>
      </div>

      <div className="mt-2">
        <div className="justify-center gap-6 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {listDonations?.map((donation) => (
            <Card key={donation.id}>
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
                  title={donation.title}
                >
                  {donation.title}
                </CardTitle>
                <CardDescription>
                  {donation.description}
                  <br />
                  Donation Target:
                  {formatMoney(donation.donationTarget)} VND
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-end">
                <Link href={`/a-donations/${donation.id}`}>
                  <Button>Go to donation</Button>
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
