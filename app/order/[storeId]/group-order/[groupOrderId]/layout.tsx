import { getMetaData } from "@/utils/metaData";

export const metadata = getMetaData({
	title: "Đến giờ order rùiiii",
	description: "Nhanh tay order nào!!!",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div>{children}</div>;
}
