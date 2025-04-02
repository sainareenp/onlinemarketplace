"use client";

import React from 'react';
import { useAuth } from '@/context/AuthContext'; // Adjust the path as needed
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'; // Adjust the path as needed
import { ModeToggle } from '@/components/ui/mode-toggle';

const NavBar: React.FC = () => {
	const { user, logout } = useAuth();
	const router = useRouter();

	return (
		<nav className="bg-primary-foreground text-primary p-4 shadow-md">
			<div className="container mx-auto flex justify-between items-center">
				<span
					onClick={() => router.push("/")}
					className="text-2xl font-bold cursor-pointer"
				>
					SecureMarket
				</span>
				<div>
					{user ? (
						<div className="flex items-center space-x-4">
							<span className="text-lg">
								Welcome, {user.name}
							</span>
							<Button
								variant="destructive"
								onClick={() => {
									logout();
									router.push("/auth");
								}}
							>
								Logout
							</Button>
							<ModeToggle />
						</div>
					) : (
						<div className="flex space-x-4">
							<Button
								variant="default"
								onClick={() => router.push("/auth")}
							>
								Login
							</Button>
							<Button
								variant="secondary"
								onClick={() => router.push("/auth")}
							>
								Register
							</Button>
							<ModeToggle />
						</div>
					)}
				</div>
			</div>
		</nav>
	);
};

export default NavBar;