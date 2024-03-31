'use client';

import { useDeleteGroupDonation, useGetListDonations } from '@/queries/donations';
import { Donation } from '@/queries/donations/types';
import { Trash } from 'lucide-react';
import React from 'react';
import { toast } from 'react-hot-toast';
import { Button, SheetContent, SheetHeader, SheetTitle } from '../../ui';
import { useRouter } from 'next/navigation';

interface Props {
  donationDetail: Donation;
}

const DeleteGroupDonation: React.FC<Props> = ({ donationDetail }) => {
  const router = useRouter();
  const { handleInvalidateListDonations } = useGetListDonations();
  const { deleteGroupDonation, isLoading } = useDeleteGroupDonation({
    onSuccess() {
      handleInvalidateListDonations();

      toast.success('Delete group order successfully.');

      router.push('/a-donations');
      setTimeout(() => {}, 500);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const handleDelete = () => {
    if (donationDetail) {
      deleteGroupDonation({ donationId: donationDetail.id });
    } else {
      toast.error(`Can't get group donation id.`);
    }
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="flex">
          <Trash className="mr-2 h-5 w-5" />
          Delete Group Donation
        </SheetTitle>
      </SheetHeader>

      <div className="max-h-[90vh] overflow-y-auto">
        <p className="text-lg text-muted-foreground mt-4">
          Are you sure you want to delete Group Donation:
        </p>
        <p>
          Name: <b>{donationDetail?.title || 'Unknown'}</b>
        </p>

        <Button onClick={handleDelete} disabled={isLoading} className="mt-4">
          Delete
        </Button>
      </div>
    </SheetContent>
  );
};

export default DeleteGroupDonation;
