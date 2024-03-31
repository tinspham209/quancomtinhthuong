'use client';

import JsonView from '@/components/json-view';
import { useGetDonationById } from '@/queries/donations';
import { useParams } from 'next/navigation';
import React from 'react';
import GroupOrderHeader from './components/group-donation-header';

interface DonationDetailProps {}

const DonationDetail: React.FC<DonationDetailProps> = ({}) => {
  const params = useParams();
  const { donationDetail } = useGetDonationById({
    donationId: Number(params.donationId),
  });

  return (
    <div className="p-4 pt-8">
      {/* <StoreHeader store={store} /> */}
      <GroupOrderHeader donationDetail={donationDetail as any} />
      {/* <GroupLists groupLists={groupLists} storeId={params.storeId} /> */}
      <JsonView src={donationDetail} />

      <div className="mt-10" />
    </div>
  );
};

export default DonationDetail;
