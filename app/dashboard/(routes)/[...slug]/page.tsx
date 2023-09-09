"use client";

import JsonView from "@/components/json-view";
import { Button } from "@/components/ui";
import { useGetStoreById } from "@/queries/stores";
import { Pen, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import StoreHeader from "./store-header";

interface StoreDetailProps {}

const StoreDetail: React.FC<StoreDetailProps> = ({}) => {
	const params = useParams();
	const { storeById: store } = useGetStoreById({
		storeId: params.slug,
	});

	return (
		<div className="p-4">
			<StoreHeader store={store} />

			<JsonView src={store} />
		</div>
	);
};

export default StoreDetail;
