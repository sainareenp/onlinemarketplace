"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext"; // Adjust the path as needed
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Adjust the path as needed
import { ModeToggle } from "@/components/ui/mode-toggle";
import NavBarDropDown from "@/components/ui/navBarDropDown";
const NavBar: React.FC = () => {
	const { user } = useAuth();
	const router = useRouter();

	return (
		<nav className="bg-primary-foreground p-4 shadow-md">
			<div className="container mx-auto flex justify-between items-center">
				<span
					onClick={() => router.push("/")}
					className="text-2xl font-bold cursor-pointer"
				>
					SecureMarket
				</span>
				{user ? (
					<div className="flex items-center space-x-4">
						<span className="text-lg">Welcome, {user.name}</span>
						<ModeToggle />
						<NavBarDropDown />
					</div>
				) : (
					<div className="flex space-x-4">
						<Button
							className="bg-secondary-foreground"
							onClick={() => router.push("/auth")}
						>
							Login/Register
						</Button>
						<ModeToggle />
						<NavBarDropDown />
					</div>
				)}
			</div>
		</nav>
	);
};

export default NavBar;
