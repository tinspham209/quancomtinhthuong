// import { getStoreByUserId } from "@/actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SetupLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { userId } = auth();
	if (!userId) {
		redirect("/sign-in");
	}
	// const store = await getStoreByUserId(userId);
	// if (store) {
	// 	redirect(`/${store.id}`);
	// }
	return <>{children}</>;
}
