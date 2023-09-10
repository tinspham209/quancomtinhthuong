import "./globals.css";
import { Roboto } from "next/font/google";
import ModalProvider from "@/providers/modal-provider";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/providers/query-provider";
import Navbar from "@/components/navbar";

import { getMetaData } from "@/utils/metaData";
export const font = Roboto({
	weight: ["300", "400", "500", "700"],
	style: ["normal", "italic"],
	subsets: ["latin"],
});

export const metadata = getMetaData({
	title: "Đặt đồ ăn cùng bạn bè nay đã dễ dàng hơn với Đặt đơn nhóm",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={font.className}>
			<body className="min-h-screen" suppressHydrationWarning={true}>
				<QueryProvider>
					<ModalProvider />
					<Toaster />
					<Navbar />
					<main className="">{children}</main>
				</QueryProvider>
			</body>
		</html>
	);
}
