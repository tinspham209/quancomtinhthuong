export type Dish = {
	id?: string;
	name: string;
	description: string;
	price: number;
	imgUrl?: string;
	category: string;
	disable: boolean;
	additional: boolean;
	restaurantId: string;
	createdAt?: string;
	updatedAt?: string;
};
