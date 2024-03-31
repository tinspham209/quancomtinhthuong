import { CreateGroupDonationPayload } from '@/lib/validators/donations';

export type Donation = {
  id: number;
  title: string;
  description: string;
  donationTarget: number;
  imgUrls: string[];
  Fundraiser: Fundraiser;
  finalized: boolean;
  DonationPayments: any[];
  storeSlug: string;
  dueDate: number;
};

export type Fundraiser = {
  email: string;
  imgUrl: string;
  phoneNumber: string;
  userName: string;
  name: string;
  id: string;
};

export type UpdateGroupDonationPayload = CreateGroupDonationPayload & {
  donationId: Donation['id'];
};
