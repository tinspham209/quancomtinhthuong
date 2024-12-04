'use client';

import CreateGroupDonation from '@/components/sheet/donations/create';
import DeleteGroupDonation from '@/components/sheet/donations/delete';
import TriggerGroupDonation from '@/components/sheet/donations/trigger';
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sheet,
  SheetTrigger,
} from '@/components/ui';
import { useOrigin } from '@/hooks';
import useCopyToClipboard from '@/hooks/use-copy-to-clipboard';
import { Donation } from '@/queries/donations/types';
import { useGetSlackWebhooks } from '@/queries/slack';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
type Props = {
  donationDetail: Donation;
};

const GroupOrderHeader = ({ donationDetail }: Props) => {
  const [openCreateGroupDonation, setOpenCreateGroupDonation] = useState(false);
  const [openDeleteGroupDonation, setOpenDeleteGroupDonation] = useState(false);
  const [openTriggerGroupDonation, setOpenTriggerGroupDonation] = useState(false);
  const { slackWebhooks } = useGetSlackWebhooks();
  const [slackWebhookId, setSlackWebhookId] = useState<string | null>(null);
  const handleChangeSlackWebhook = useCallback(
    (value: string) => {
      setSlackWebhookId(value);
    },
    [setSlackWebhookId],
  );

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

          <Link href={`/donation/${donationDetail?.id}`}>
            <Button className="w-full" variant="outline">
              Go to Donation
            </Button>
          </Link>

          <Sheet open={openTriggerGroupDonation} onOpenChange={setOpenTriggerGroupDonation}>
            <SheetTrigger asChild>
              <Button variant="outline">Trigger</Button>
            </SheetTrigger>
            <TriggerGroupDonation donationDetail={donationDetail} slackWebhookId={slackWebhookId || ''} />
          </Sheet>

          <div className="mt-2 sm:mt-0">
            <div>
              <Select onValueChange={(value: string) => handleChangeSlackWebhook(value)}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select channel to post *" />
                </SelectTrigger>
                <SelectContent>
                  {slackWebhooks.map((slackWebhook) => (
                    <SelectItem key={slackWebhook.id} value={slackWebhook.id}>
                      {slackWebhook.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

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
