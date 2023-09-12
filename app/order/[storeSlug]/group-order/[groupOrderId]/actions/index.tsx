import axios from "axios";

export interface IGroupOrderInfoParams {
	groupOrderId?: string;
}

export default async function getGroupOrderInfo(params: IGroupOrderInfoParams) {
	const { groupOrderId } = params;
	console.log("groupOrderId: ", groupOrderId);

	return await fetch(`${process.env.API_URL}/app/group-order/${groupOrderId}`, {
		next: {
			revalidate: 60,
		},
	})
		.then((res) => {
			console.log("res: ", res);
			const data = res.json();
			console.log("data: ", data);
			return data;
		})
		.catch((error) => {
			console.log("error getGroupOrderInfo", error);
		});
}
