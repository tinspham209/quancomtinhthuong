"use client";

import JsonView from "@/components/json-view";
import { useGetStoreById } from "@/queries/stores";
import { useParams } from "next/navigation";
import React from "react";

interface StoreDetailProps {}

const StoreDetail: React.FC<StoreDetailProps> = ({}) => {
	const params = useParams();
	const { storeById } = useGetStoreById({
		storeId: params.slug,
	});

	return (
		<div className="p-4">
			<h1>StoreDetail: </h1>
			<p className="mt-6">{storeById?.name}</p>
			<JsonView src={storeById} />
		</div>
	);
};

export default StoreDetail;
