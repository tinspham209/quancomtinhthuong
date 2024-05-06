'use client';

import { useTriggerDonation } from '@/queries/donations';
import { Donation } from '@/queries/donations/types';
import { Trash } from 'lucide-react';
import React from 'react';
import { toast } from 'react-hot-toast';
import { Button, SheetContent, SheetHeader, SheetTitle } from '../../ui';

interface Props {
  donationDetail: Donation;
}

const TriggerGroupDonation: React.FC<Props> = ({ donationDetail }) => {
  const { triggerGroupDonation, isLoading } = useTriggerDonation({
    onSuccess() {
      toast.success('Trigger Group Donation successfully.');
      setTimeout(() => {
        window.location.reload();
      }, 300);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const handleTrigger = () => {
    if (donationDetail) {
      triggerGroupDonation({ donationId: donationDetail.id });
    } else {
      toast.error(`Can't get group donation id.`);
    }
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="flex">Trigger Group Donation</SheetTitle>
      </SheetHeader>

      <div className="max-h-[90vh] overflow-y-auto">
        <p className="text-lg text-muted-foreground mt-4">
          Are you sure you want to trigger Group Donation:
        </p>
        <p>
          Name: <b>{donationDetail?.title || 'Unknown'}</b>
        </p>

        <Button onClick={handleTrigger} disabled={isLoading} className="mt-4">
          Trigger
        </Button>
      </div>
    </SheetContent>
  );
};

export default TriggerGroupDonation;
