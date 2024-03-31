'use client';

import CreateGroupDonation from '@/components/sheet/donations/create';
import DeleteGroupDonation from '@/components/sheet/donations/delete';
import { Button, Sheet, SheetTrigger } from '@/components/ui';
import { useOrigin } from '@/hooks';
import useCopyToClipboard from '@/hooks/use-copy-to-clipboard';
import { Donation } from '@/queries/donations/types';
import { Copy, PlusCircle } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

type Props = {
  donationDetail: Donation;
};

const GroupOrderHeader = ({ donationDetail }: Props) => {
  const [openCreateGroupDonation, setOpenCreateGroupDonation] = useState(false);
  const [openDeleteGroupDonation, setOpenDeleteGroupDonation] = useState(false);

  const handleOpenCreateGroupDonation = (open: boolean) => {
    setOpenCreateGroupDonation(open);
  };

  const origin = useOrigin();

  const [_, copy] = useCopyToClipboard();
  return (
    <div className="my-4">
      <div className="flex flex-col md:flex-row justify-between">
        <h1 className="text-3xl font-bold leading-none tracking-tight">
          {donationDetail?.title || 'Unknown'}
        </h1>
        <div className="mt-2 sm:mt-0 flex gap-2">
          <Button
            variant="outline"
            title="Copy Group Donation link"
            onClick={() => {
              const url = `${origin}/donation/${donationDetail.id}`;
              copy(url);
              toast.success('Copy Restaurant link successfully.');
            }}
          >
            Get Link
          </Button>
          <Sheet open={openDeleteGroupDonation} onOpenChange={setOpenDeleteGroupDonation}>
            <SheetTrigger asChild>
              <Button variant="destructive">Delete</Button>
            </SheetTrigger>
            <DeleteGroupDonation donationDetail={donationDetail} />
          </Sheet>

          <Sheet open={openCreateGroupDonation} onOpenChange={setOpenCreateGroupDonation}>
            <SheetTrigger asChild>
              <Button>Update</Button>
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
