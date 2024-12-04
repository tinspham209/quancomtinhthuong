export interface Invoices {
  id: number;
  title: string;
  description: string;
  imgUrls: string[];
  donationTarget: string;
  userId: string;
  storeSlug: string;
  threadId: null;
  finalized: boolean;
  dueDate: string;
  createdAt: Date;
  updatedAt: Date;
  Invoices: Invoice[];
  donated: number;
  spent: number;
}

export interface Invoice {
  id: number;
  title: string;
  description: string;
  imgUrls: string[];
  amount: number;
  userId: string;
  createdAt: Date;
  updatedAt: null;
  donationItemId: number;
  User: {
    id: string;
    name: string;
    userName: string;
    imgUrl: string;
  };
}

export interface CreateInvoicePayload {
  donationItemId: string;
  title: string;
  description: string;
  imgUrls: { url: string }[];
  amount: number;
}

export interface UpdateInvoicePayload {
  invoiceId: number;
  title: string;
  description: string;
  imgUrls: { url: string }[];
  amount: number;
}
