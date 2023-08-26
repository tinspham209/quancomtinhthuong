export type MyProfile = {
	id: string;
	userName: string;
	name: string;
	slackId: string;
	createdAt: string;
	updatedAt: string;
	roleId: number;
	Stores: Store[];
	role: Role;
	iat: number;
	exp: number;
};

export type Role = {
	id: number;
	name: string;
	description: string;
	createdAt: string;
	updatedAt: string;
};

export type Store = {
	userId: string;
	storeId: string;
	Store: {
		description: string;
		imgUrl: string;
		name: string;
		id: string;
		createdAt: string;
		updatedAt: string;
	};
};

export type Callback<T = any> = (..._args: T[]) => void;
