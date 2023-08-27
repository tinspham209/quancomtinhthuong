"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icons } from "../icons";
import MainNav from "./main-nav";
import { useProfile } from "@/queries/auth";
import { isEmpty } from "@/utils";
import {
	Avatar,
	AvatarFallback,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Sheet,
	SheetTrigger,
	Skeleton,
} from "../ui";
import { useCallback } from "react";
import TokenServices from "@/services/token";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useProfileStore } from "@/hooks";
import ChangePassword from "./change-password";
import { Lock, LogOut } from "lucide-react";

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
	const { handleInvalidateProfile, loading } = useProfile();
	const { profile, onSetProfile } = useProfileStore();

	const router = useRouter();

	const getUsernameAvatar = useCallback(() => {
		if (profile) {
			return profile.userName.match(/\b(\w)/g);
		}
	}, [profile]);

	const handleLogout = () => {
		router.push("/sign-in");
		handleInvalidateProfile();
		onSetProfile(null);
		TokenServices.clearToken();
	};

	return (
		<nav className="border-b">
			<div className="h-16 flex items-center px-4">
				{!isEmpty(profile) ? (
					<MainNav className="mr-6" />
				) : (
					<Link href="/">
						<Icons.logo1 className="w-[230px] h-[56px] mr-4" />
					</Link>
				)}
				<div className="ml-auto flex items-center space-x-4">
					{loading ? (
						<Skeleton className="w-[40px] h-[40px] rounded-full" />
					) : (
						<>
							{isEmpty(profile) ? (
								<Link
									href={`/sign-in`}
									className={cn(
										"text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
									)}
								>
									Sign In
								</Link>
							) : (
								<div>
									<DropdownMenu>
										<DropdownMenuTrigger>
											<Avatar>
												<AvatarFallback>{getUsernameAvatar()}</AvatarFallback>
											</Avatar>
										</DropdownMenuTrigger>
										<DropdownMenuContent>
											<DropdownMenuLabel>
												{profile?.userName} ({profile?.role.description})
											</DropdownMenuLabel>

											<DropdownMenuSeparator />
											<div className="px-2 py-1 text-sm">
												<Sheet>
													<SheetTrigger className="flex">
														<Lock className="w-4 h-4 mr-2" />
														Change Password
													</SheetTrigger>
													<ChangePassword />
												</Sheet>
											</div>
											<DropdownMenuSeparator />
											<DropdownMenuItem
												className="cursor-pointer"
												onClick={handleLogout}
											>
												<LogOut className="w-4 h-4 mr-2" />
												Logout
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
