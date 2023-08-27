"use client";

import JsonView from "@/components/json-view";
import { useProfileStore } from "@/hooks";
import { useGetStoresByUserName } from "@/queries/stores";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface Props {}

const Client: React.FC<Props> = ({}: Props) => {
	const router = useRouter();

	const { profile } = useProfileStore();

	const { storesByUserName, getStoresByUserName } = useGetStoresByUserName({
		userName: profile?.userName || "",
	});

	return (
		<div className="p-4">
			<h1>Dashboard</h1>

			<p className="mt-6">Stores by {profile?.userName}</p>
			<JsonView src={storesByUserName} />
		</div>
	);
};

export default Client;
