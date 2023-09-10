"use client";

import JsonView from "@/components/json-view";
import { useGetGroupOrdersListByStoreId } from "@/queries/group-orders";
import { useGetStoreById } from "@/queries/stores";
import { useParams } from "next/navigation";
import React from "react";
import { GroupLists, StoreHeader } from "./components";

interface StoreDetailProps {}

const StoreDetail: React.FC<StoreDetailProps> = ({}) => {
	const params = useParams();
	const { storeById: store } = useGetStoreById({
		storeId: params.storeId,
	});

	const { groupLists } = useGetGroupOrdersListByStoreId({
		storeId: params.storeId,
	});

	return (
		<div className="p-4">
			<StoreHeader store={store} />
			<GroupLists groupLists={groupLists} storeId={params.storeId} />

			<div className="mt-10" />
			<JsonView src={store} />
			<JsonView src={groupLists} />
		</div>
	);
};

export default StoreDetail;
