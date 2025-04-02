"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button"; // Adjust the path as needed

export default function Dashboard() {
	const { user, logout, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!loading) {
			if (!user) {
				router.push("/auth");
			} else if (!user.isProfileComplete) {
				router.push("/complete-profile"); // ✅ Redirect if profile is incomplete
			}
		}
	}, [user, loading, router]);

	if (loading) return <p>Loading...</p>;
	if (!user) return null;

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
			<div className="bg-card shadow-md rounded-lg p-6 w-full max-w-md">
				<h2 className="text-2xl font-bold text-card-foreground mb-4">
					Dashboard
				</h2>
				<p className="text-muted-foreground mb-4">
					Welcome,{" "}
					<span className="font-medium text-card-foreground">
						{user.name}
					</span>
					!
				</p>
				<div className="mb-4 space-y-2">
					<p className="text-muted-foreground">
						<strong>Email:</strong> {user.email}
					</p>
					<p className="text-muted-foreground">
						<strong>Age:</strong> {user.age}
					</p>
					<p className="text-muted-foreground">
						<strong>Address:</strong> {user.address}
					</p>
					<p className="text-muted-foreground">
						<strong>Profile Complete:</strong>{" "}
						{user.isProfileComplete ? "Yes" : "No"}
					</p>
				</div>
				<Button
					onClick={logout}
					variant="destructive"
					className="w-full"
				>
					Logout
				</Button>
			</div>
		</div>
	);
}
