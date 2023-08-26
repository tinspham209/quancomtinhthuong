"use client";

import React from "react";
import JsonView from "@/components/json-view";
import { useProfileStore } from "@/hooks";
import { useProfile } from "@/queries/auth";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { toast } from "react-hot-toast";

interface Props {}

const Client: React.FC<Props> = ({}: Props) => {
	const router = useRouter();

	const { onSetProfile, profile } = useProfileStore();

	return (
		<div className="p-4">
			<h1>Dashboard</h1>
			<JsonView src={profile} />
		</div>
	);
};

export default Client;
