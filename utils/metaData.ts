import { Metadata } from "next";

export const DOMAIN_PRODUCT = "https://quancomtinhthuong.tinspham.dev";

type SafeMetaData = {
	title?: string;
	description?: string;
	url?: string;
};

export const getMetaData = ({
	title = "Quán Cơm Tình Thương",
	description = "Nhanh tay đặt đồ ăn cùng nhau nào",
	url = DOMAIN_PRODUCT,
}: SafeMetaData): Metadata => {
	return {
		title: `${title}`,
		description: description,

		twitter: {
			card: "summary_large_image",
			title: `${title}`,
			description: description,
			creator: "@tinspham209",
			images: {
				url: "/cover.webp",
				alt: `${title}`,
			},
		},
		metadataBase: new URL(url),
		openGraph: {
			title: `${title}`,
			description: description,
			url: DOMAIN_PRODUCT,
			images: "/cover.webp",
			siteName: `${title}`,
			type: "website",
			locale: "vi_VN",
		},
		themeColor: "#fff",
	};
};
