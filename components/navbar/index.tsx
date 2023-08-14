import { cn } from "@/lib/utils";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { Icons } from "../icons";
import MainNav from "./main-nav";

interface NavbarProps {}

const Navbar = async ({}: NavbarProps) => {
	const { userId } = auth();

	return (
		<nav className="border-b">
			<div className="h-16 flex items-center px-4">
				<Link href="/">
					<Icons.logo1 className="w-[230px] h-[56px] mr-4" />
				</Link>
				{userId && <MainNav className="mx-6" />}
				<div className="ml-auto flex items-center space-x-4">
					{userId ? (
						<UserButton afterSignOutUrl="/" />
					) : (
						<Link
							href={`/auth/sign-in`}
							className={cn(
								"text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
							)}
						>
							Sign In
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
