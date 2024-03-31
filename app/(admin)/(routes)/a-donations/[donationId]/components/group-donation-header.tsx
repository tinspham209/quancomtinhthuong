'use client';

import CreateGroupDonation from '@/components/sheet/donations/create';
import DeleteGroupDonation from '@/components/sheet/donations/delete';
import { Button, Sheet, SheetTrigger } from '@/components/ui';
import { Donation } from '@/queries/donations/types';
import { PlusCircle } from 'lucide-react';
import React, { useState } from 'react';

type Props = {
  donationDetail: Donation;
};

const GroupOrderHeader = ({ donationDetail }: Props) => {
  const [openCreateGroupDonation, setOpenCreateGroupDonation] = useState(false);
  const [openDeleteGroupDonation, setOpenDeleteGroupDonation] = useState(false);

  const handleOpenCreateGroupDonation = (open: boolean) => {
    setOpenCreateGroupDonation(open);
  };

  return (
    <div className="my-4">
      <div className="flex flex-col md:flex-row justify-between">
        <h1 className="text-3xl font-bold leading-none tracking-tight">
          {donationDetail?.title || 'Unknown'}
        </h1>
        <div className="mt-2 sm:mt-0 flex gap-2">
          <Sheet open={openDeleteGroupDonation} onOpenChange={setOpenDeleteGroupDonation}>
            <SheetTrigger asChild>
              <Button variant="destructive">Delete</Button>
            </SheetTrigger>
            <DeleteGroupDonation donationDetail={donationDetail} />
          </Sheet>

          <Sheet open={openCreateGroupDonation} onOpenChange={setOpenCreateGroupDonation}>
            <SheetTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-5 w-5" />
                Update
              </Button>
            </SheetTrigger>
            <CreateGroupDonation
              isEdit
              donation={donationDetail}
              onClose={() => {
                handleOpenCreateGroupDonation(false);
              }}
            />
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default GroupOrderHeader;
