export type MyProfile = {
  id: string;
  userName: string;
  name: string;
  slackId: string;
  imgUrl?: string;
  createdAt: string;
  updatedAt: string;
  roleId: number;
  Stores?: Store[];
  role: Role;
  iat: number;
  exp: number;
  email: string;
  phoneNumber: string;
};

export type Role = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type Store = {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  ruleDescription: string;
  createdAt: string;
  updatedAt: string;
  storeSlug: string;
  bankInfo: string;
};

export type Callback<T = any> = (..._args: T[]) => void;
