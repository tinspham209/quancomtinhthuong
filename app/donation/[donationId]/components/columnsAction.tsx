'use client';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Sheet,
  SheetTrigger,
} from '@/components/ui';
import { useProfileStore } from '@/hooks';
import { DonationPayment, DonationStatus } from '@/queries/donations/types';
import { ExternalLink, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface ColumnsActionProps {
  record: DonationPayment;
}

const ColumnsAction = ({ record }: ColumnsActionProps) => {
  const { profile } = useProfileStore();
  const showPaymentLink =
    record.donationStatus === DonationStatus.NOPE && record.User.id === profile?.id;

  return (
    <div>
      {showPaymentLink && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0" title="More">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href={`${record.donationLink}`}>
                Payment <ExternalLink className="w-4 h-4 ml-2 mb-1" />
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default ColumnsAction;
