"use client";

import JsonView from "@/components/json-view";
import { useProfileStore } from "@/hooks";
import { useProfile } from "@/queries/auth";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { toast } from "react-hot-toast";

const SetupPage = () => {
	const router = useRouter();

	const { onSetProfile, profile } = useProfileStore();

	const { profile: profileQuery, getMyProfile } = useProfile({
		onSuccess(data) {
			onSetProfile(data);
		},
		onErrorCallback: () => {
			toast.error("Unauthorized, Please sign in");
			router.push("/sign-in");
		},
	});

	useLayoutEffect(() => {
		if (!profileQuery) {
			getMyProfile();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [profileQuery]);

	return (
		<div className="p-4">
			<h1>Dashboard</h1>
			<JsonView src={profile} />
		</div>
	);
};

export default SetupPage;
