'use client';

import JsonView from '@/components/json-view';
import { useGetDonationById } from '@/queries/donations';
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react';
import GroupOrderHeader from './components/group-donation-header';
import { DataTable } from '@/components/ui';
import { donationColumns } from './components/columns';

interface DonationDetailProps {}

const DonationDetail: React.FC<DonationDetailProps> = ({}) => {
  const params = useParams();
  const { donationDetail } = useGetDonationById({
    donationId: Number(params.donationId),
  });

  const donationsList = useMemo(() => {
    if (donationDetail?.DonationPayments) {
      return donationDetail.DonationPayments;
    }
    return [];
  }, [donationDetail]);

  return (
    <div className="p-4 pt-8">
      <GroupOrderHeader donationDetail={donationDetail as any} />

      <div className="">
        <p className="text-lg font-bold">Danh sách ủng hộ ({donationsList?.length})</p>
        <div className="mt-5">
          <DataTable columns={donationColumns()} data={donationsList} />
        </div>
      </div>

      <div className="mt-10" />
    </div>
  );
};

export default DonationDetail;
