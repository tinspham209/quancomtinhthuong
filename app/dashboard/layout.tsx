"use client";
import { useProfileStore } from "@/hooks";
import { useProfile } from "@/queries/auth";
import { getMetaData } from "@/utils/metaData";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { toast } from "react-hot-toast";

export const metadata = getMetaData({
	title: "Dashboard - Quán cơm tình thương",
});

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
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

	return <>{children}</>;
}
