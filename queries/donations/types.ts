import { CreateGroupDonationPayload } from '@/lib/validators/donations';

export type Donation = {
  id: number;
  title: string;
  description: string;
  donationTarget: number;
  imgUrls: string[];
  Fundraiser: Fundraiser;
  finalized: boolean;
  DonationPayments: DonationPayment[];
  storeSlug: string;
  dueDate: number;
  donated: number;
  slackWebhookId?: string;
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

export type MakeDonationResponse = {
  id: number;
  donationLink: string;
  donationAmount: number;
  donationStatus: string;
  userId: string;
  donationItemId: number;
  createdAt: string;
  updatedAt: string;
};

export type DonationPayment = {
  comment: string;
  createdAt: string;
  donationAmount: number;
  donationLink: string;
  donationStatus: DonationStatus;
  id?: number;
  updatedAt: string;
  User: {
    email: string;
    id: string;
    imgUrl: string;
    name: string;
    phoneNumber: string;
    slackId: string;
    userName: string;
  };
};

export enum DonationStatus {
  NOPE = 'NOPE',
  PAID = 'PAID',
}
