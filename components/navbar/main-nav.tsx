"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

const MainNav = ({
	className,
	...props
}: React.HTMLAttributes<HTMLElement>) => {
	const pathname = usePathname();
	const params = useParams();

	const storeId = params?.storeId || "";

	const routes = [
		{
			href: `/dashboard/${storeId}`,
			label: "Overview",
			active: pathname === `/dashboard/${storeId}`,
		},
		// {
		// 	href: `/dashboard/${storeId}/billboards`,
		// 	label: "Billboards",
		// 	active: pathname === `/dashboard/${storeId}/billboards`,
		// },
		{
			href: `/dashboard/${storeId}/settings`,
			label: "Settings",
			active: pathname === `/dashboard/${storeId}/settings`,
		},
	];

	return (
		<div className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
			{routes.map((route, index) => (
				<Link
					key={route.href}
					href={route.href}
					className={cn(
						"text-sm font-medium transition-colors hover:text-primary",
						route.active
							? "text-black dark:text-white"
							: "text-muted-foreground"
					)}
				>
					{route.label}
				</Link>
			))}
		</div>
	);
};

export default MainNav;
