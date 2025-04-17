"use client";

import { useRouter } from "next/navigation";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu"; // Adjust the import paths as needed
import { Button } from "@/components/ui/button"; // Adjust the import paths as needed
import { HamburgerMenuIcon } from "@radix-ui/react-icons"; // Adjust the import paths as needed
import { useAuth } from "@/context/AuthContext";

const NavBarDropDown: React.FC = () => {
	const router = useRouter();
	const { logout } = useAuth();

	return (
		<div className="flex items-center space-x-4">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button className="bg-secondary-foreground">
						<HamburgerMenuIcon className="h-5 w-5" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Navigation</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => router.push("/dashboard")}>
						Dashboard
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => router.push("/explore")}>
						Explore
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => router.push("/favorites")}>
						Favorites
					</DropdownMenuItem>
					<DropdownMenuItem variant="destructive" onClick={logout}>
						Log Out
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default NavBarDropDown;
